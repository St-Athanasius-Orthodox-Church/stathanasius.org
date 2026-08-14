import 'dotenv/config'

import { basename, extname } from 'node:path'

import config from '@payload-config'
import { getPayload } from 'payload'
import type { File } from 'payload'
import { z } from 'zod'
import type { Audio, Homily, Person } from '@/payload-types'

const DEFAULT_API_URL = 'https://www.stathanasius.org/homilies.json'
const API_URL = process.env.OLD_HOMILIES_API_URL || DEFAULT_API_URL

const homilySchema = z.object({
  id: z.number().int(),
  title: z.string().min(1),
  speaker: z.string().min(1),
  date: z.iso.date(),
  audio_url: z.url().nullable(),
  audio_download_url: z.string().nullable(),
})

const homilyListSchema = z.object({
  homilies: z.array(homilySchema),
  pagination: z.object({
    current_page: z.number().int().positive(),
    total_pages: z.number().int().positive(),
    total_count: z.number().int().nonnegative(),
  }),
})

/**
 * Maps every speaker name variant found in the old API to one canonical name.
 *
 * Variants like "Very Rev. Fr. John Finley" and "Fr. John Finley" are the
 * same person and must import as a single People document. The script
 * discovers speaker names from the API and fails loudly when one is missing
 * here, so new variants get added before they pollute the import.
 */
const SPEAKER_NAME_MAP: Record<string, string> = {
  'Dn. Gary Braun': 'Dn. Gary Braun',
  'Dn. Rico Monge': 'Dn. Rico Monge',
  'Fr. John Finley': 'Fr. John Finley',
  'Very Rev. Fr. John Finley': 'Fr. John Finley',
  'Fr. Jon Braun': 'Fr. Jon Braun',
  'Fr. Jon Stephen Hedges': 'Fr. Jon Stephen Hedges',
  'Fr. Nicholas Speier': 'Fr. Nicholas Speier',
  'Very Rev. Fr. Nicholas Speier': 'Fr. Nicholas Speier',
  'Fr. Symeon Halsell': 'Fr. Symeon Halsell',
  'Rev. Fr. Symeon Halsell': 'Fr. Symeon Halsell',
  'Rev. Fr. John Carrillo': 'Fr. John Carrillo',
}

type ImportedHomily = {
  title: string
  date: string
  speaker: string
  canonicalSpeaker: string
  audioUrl: string | null
}

type UploadedAudio = {
  id: number
  filename: string
}

function parseJson<T>(schema: z.ZodType<T>, value: unknown, description: string): T {
  const result = schema.safeParse(value)

  if (!result.success) {
    throw new Error(`The API returned invalid data for ${description}:\n${z.prettifyError(result.error)}`)
  }

  return result.data
}

function canonicalizeSpeaker(speaker: string): string {
  const canonical = SPEAKER_NAME_MAP[speaker]

  if (!canonical) {
    throw new Error(
      `Unknown speaker "${speaker}". Add it to SPEAKER_NAME_MAP in scripts/import-homilies.ts.`,
    )
  }

  return canonical
}

async function fetchJsonResponse(url: string): Promise<unknown> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`The API returned ${response.status} for ${url}.`)
  }

  return response.json()
}

async function fetchHomilies(limit: number | undefined): Promise<ImportedHomily[]> {
  const homilies: ImportedHomily[] = []
  const listUrl = new URL(API_URL)

  while (true) {
    const pageUrl = listUrl.toString()
    const list = parseJson(homilyListSchema, await fetchJsonResponse(pageUrl), pageUrl)

    for (const homily of list.homilies) {
      homilies.push({
        title: homily.title.trim(),
        date: new Date(homily.date).toISOString(),
        speaker: homily.speaker,
        canonicalSpeaker: canonicalizeSpeaker(homily.speaker),
        audioUrl: homily.audio_url,
      })

      if (limit !== undefined && homilies.length >= limit) return homilies
    }

    if (list.pagination.current_page >= list.pagination.total_pages) break

    listUrl.searchParams.set('page', String(list.pagination.current_page + 1))
  }

  return homilies
}

function getFilename(fileUrl: string): string {
  const pathname = new URL(fileUrl).pathname
  const filename = decodeURIComponent(basename(pathname))

  if (!filename) {
    throw new Error(`The file URL has no filename: ${fileUrl}`)
  }

  return filename
}

function getMimeType(response: Response, filename: string): string {
  const contentType = response.headers.get('content-type')?.split(';')[0].trim()
  if (contentType?.startsWith('audio/')) return contentType

  const mimeTypes: Record<string, string> = {
    '.m4a': 'audio/mp4',
    '.mp3': 'audio/mpeg',
    '.ogg': 'audio/ogg',
    '.opus': 'audio/ogg',
    '.wav': 'audio/wav',
    '.webm': 'audio/webm',
  }
  const mimeType = mimeTypes[extname(filename).toLowerCase()]

  if (!mimeType) {
    throw new Error(`The API did not provide an audio MIME type for ${filename}.`)
  }

  return mimeType
}

async function downloadAudio(fileUrl: string): Promise<{ file: File; filename: string }> {
  const response = await fetch(fileUrl)

  if (!response.ok) {
    throw new Error(`The audio download returned ${response.status} for ${fileUrl}.`)
  }

  const filename = getFilename(fileUrl)
  const data = Buffer.from(await response.arrayBuffer())

  return {
    file: {
      data,
      mimetype: getMimeType(response, filename),
      name: filename,
      size: data.length,
    },
    filename,
  }
}

function normalizeFilename(filename: string): string {
  return decodeURIComponent(filename).toLowerCase()
}

function getHomilyKey(homily: ImportedHomily): string {
  return `${homily.canonicalSpeaker}\u0000${homily.date.slice(0, 10)}\u0000${homily.title}`
}

function parseLimitArg(): number | undefined {
  const flag = process.argv.find((arg) => arg.startsWith('--limit'))

  if (!flag) return undefined

  const raw = flag.includes('=') ? flag.split('=')[1] : process.argv[process.argv.indexOf(flag) + 1]
  const limit = Number(raw)

  if (!Number.isInteger(limit) || limit <= 0) {
    throw new Error('--limit must be a positive integer, e.g. --limit 10 or --limit=10.')
  }

  return limit
}

async function importHomilies() {
  const dryRun = process.argv.includes('--dry-run')
  const force = process.argv.includes('--force')
  const limit = parseLimitArg()
  const homilies = await fetchHomilies(limit)

  console.log(`Found ${homilies.length} homilies.`)

  const speakerVariants = [...new Set(homilies.map((homily) => homily.speaker))].sort()
  console.log(`Found ${speakerVariants.length} distinct speaker name variants:`)
  for (const speaker of speakerVariants) {
    console.log(`  "${speaker}" -> "${canonicalizeSpeaker(speaker)}"`)
  }
  const canonicalSpeakers = new Set(speakerVariants.map(canonicalizeSpeaker))
  console.log(`Deduplicated to ${canonicalSpeakers.size} speakers.`)

  if (dryRun) {
    for (const [homilyIndex, homily] of homilies.entries()) {
      const homilyProgress = `[Homily ${homilyIndex + 1}/${homilies.length}]`
      console.log(
        `${homilyProgress} Would import "${homily.title}" by ${homily.canonicalSpeaker} (${getFilename(homily.audioUrl ?? '')}).`,
      )
    }
    return
  }

  const payload = await getPayload({ config })
  const existingHomilies = force
    ? []
    : await payload.find({
        collection: 'homilies',
        depth: 1,
        limit: 100000,
        overrideAccess: true,
      })
  const existingDocs: Homily[] = Array.isArray(existingHomilies)
    ? existingHomilies
    : existingHomilies.docs
  const existingKeys = new Set(
    existingDocs.map((homily) => {
      const speaker = typeof homily.speaker === 'object' ? (homily.speaker?.name ?? '') : ''
      return `${speaker}\u0000${new Date(homily.date).toISOString().slice(0, 10)}\u0000${homily.title}`
    }),
  )
  const existingPeople = await payload.find({
    collection: 'people',
    depth: 0,
    limit: 100000,
    overrideAccess: true,
  })
  const existingPeopleDocs: Person[] = Array.isArray(existingPeople)
    ? existingPeople
    : existingPeople.docs
  const peopleByName = new Map<string, Person>()

  for (const person of existingPeopleDocs) {
    if (person.name) {
      peopleByName.set(person.name, person)
    }
  }

  const existingAudios = await payload.find({
    collection: 'audios',
    depth: 0,
    limit: 100000,
    overrideAccess: true,
  })
  const existingAudioDocs: Audio[] = Array.isArray(existingAudios)
    ? existingAudios
    : existingAudios.docs
  const existingAudiosByFilename = new Map<string, UploadedAudio>()

  for (const audio of existingAudioDocs) {
    if (audio.filename) {
      existingAudiosByFilename.set(normalizeFilename(audio.filename), {
        id: audio.id,
        filename: audio.filename,
      })
    }
  }

  const uploadedByUrl = new Map<string, UploadedAudio>()

  try {
    for (const [homilyIndex, homily] of homilies.entries()) {
      const homilyProgress = `[Homily ${homilyIndex + 1}/${homilies.length}]`
      const homilyKey = getHomilyKey(homily)

      if (!force && existingKeys.has(homilyKey)) {
        console.log(`${homilyProgress} Skipping existing homily "${homily.title}".`)
        continue
      }

      if (!homily.audioUrl) {
        console.warn(`${homilyProgress} Skipping "${homily.title}": no audio URL.`)
        continue
      }

      let person = peopleByName.get(homily.canonicalSpeaker)

      if (!person) {
        person = await payload.create({
          collection: 'people',
          data: { name: homily.canonicalSpeaker },
          overrideAccess: true,
        })
        peopleByName.set(homily.canonicalSpeaker, person)
        console.log(`${homilyProgress} Created speaker "${homily.canonicalSpeaker}".`)
      }

      const filename = getFilename(homily.audioUrl)
      let uploaded = uploadedByUrl.get(homily.audioUrl)

      if (!uploaded) {
        uploaded = existingAudiosByFilename.get(normalizeFilename(filename))

        if (uploaded) {
          uploadedByUrl.set(homily.audioUrl, uploaded)
          console.log(`${homilyProgress} Reusing ${uploaded.filename}.`)
        } else {
          console.log(`${homilyProgress} Downloading ${filename}.`)
          const downloaded = await downloadAudio(homily.audioUrl)
          const audio = await payload.create({
            collection: 'audios',
            data: {},
            file: downloaded.file,
            overrideAccess: true,
          })

          uploaded = {
            id: audio.id,
            filename: downloaded.filename,
          }
          uploadedByUrl.set(homily.audioUrl, uploaded)
          existingAudiosByFilename.set(normalizeFilename(filename), uploaded)
          console.log(`${homilyProgress} Uploaded ${downloaded.filename}.`)
        }
      } else {
        console.log(`${homilyProgress} Reusing ${uploaded.filename}.`)
      }

      const createdHomily = await payload.create({
        collection: 'homilies',
        data: {
          title: homily.title,
          date: new Date(`${homily.date.slice(0, 10)}T12:00:00.000Z`).toISOString(),
          speaker: person.id,
          audio: uploaded.id,
        },
        overrideAccess: true,
      })

      existingKeys.add(homilyKey)
      console.log(`${homilyProgress} Imported "${createdHomily.title}".`)
    }
  } finally {
    await payload.destroy()
  }
}

try {
  await importHomilies()
} catch (error) {
  console.error(error)
  process.exitCode = 1
}
