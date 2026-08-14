import 'dotenv/config'

import { basename } from 'node:path'

import config from '@payload-config'
import { getPayload } from 'payload'
import type { File } from 'payload'
import { z } from 'zod'
import type { Bulletin, File as FileDocument } from '@/payload-types'

import { mapWithConcurrency } from './lib/map-with-concurrency'

const DEFAULT_API_URL = 'https://stathanasius.org/bulletins.json'
const DEFAULT_WORKER_COUNT = 10
const API_URL = process.env.OLD_BULLETINS_API_URL || DEFAULT_API_URL

const bulletinSchema = z.object({
  id: z.number().int(),
  date: z.iso.date(),
  pdf_url: z.url(),
})

const bulletinListSchema = z.object({
  bulletins: z.array(bulletinSchema),
  pagination: z.object({
    current_page: z.number().int().positive(),
    total_pages: z.number().int().positive(),
    total_count: z.number().int().nonnegative(),
  }),
})

type ImportedBulletin = {
  id: number
  date: string
  pdfUrl: string
}

type UploadedFile = {
  id: number
  filename: string
}

function parseJson<T>(schema: z.ZodType<T>, value: unknown, description: string): T {
  const result = schema.safeParse(value)

  if (!result.success) {
    throw new Error(
      `The API returned invalid data for ${description}:\n${z.prettifyError(result.error)}`,
    )
  }

  return result.data
}

async function fetchJsonResponse(url: string): Promise<unknown> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`The API returned ${response.status} for ${url}.`)
  }

  return response.json()
}

async function fetchBulletins(limit: number | undefined): Promise<ImportedBulletin[]> {
  const bulletins: ImportedBulletin[] = []
  const listUrl = new URL(API_URL)

  while (true) {
    const pageUrl = listUrl.toString()
    const list = parseJson(bulletinListSchema, await fetchJsonResponse(pageUrl), pageUrl)

    for (const bulletin of list.bulletins) {
      bulletins.push({
        id: bulletin.id,
        date: new Date(bulletin.date).toISOString(),
        pdfUrl: bulletin.pdf_url,
      })

      if (limit !== undefined && bulletins.length >= limit) return bulletins
    }

    if (list.pagination.current_page >= list.pagination.total_pages) break

    listUrl.searchParams.set('page', String(list.pagination.current_page + 1))
  }

  return bulletins
}

function getFilename(fileUrl: string): string {
  const pathname = new URL(fileUrl).pathname
  const filename = decodeURIComponent(basename(pathname))

  if (!filename) {
    throw new Error(`The file URL has no filename: ${fileUrl}`)
  }

  return filename
}

function getMimeType(response: Response): string {
  return response.headers.get('content-type')?.split(';')[0].trim() || 'application/octet-stream'
}

async function downloadFile(fileUrl: string): Promise<{ file: File; filename: string }> {
  const response = await fetch(fileUrl)

  if (!response.ok) {
    throw new Error(`The file download returned ${response.status} for ${fileUrl}.`)
  }

  const filename = getFilename(fileUrl)
  const data = Buffer.from(await response.arrayBuffer())

  return {
    file: {
      data,
      mimetype: getMimeType(response),
      name: filename,
      size: data.length,
    },
    filename,
  }
}

function normalizeFilename(filename: string): string {
  return decodeURIComponent(filename).toLowerCase()
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

function parseWorkerArg(): number {
  const flag = process.argv.find((arg) => arg.startsWith('--worker'))

  if (!flag) return DEFAULT_WORKER_COUNT

  const raw = flag.includes('=') ? flag.split('=')[1] : process.argv[process.argv.indexOf(flag) + 1]
  const workers = Number(raw)

  if (!Number.isInteger(workers) || workers <= 0) {
    throw new Error('--worker must be a positive integer, e.g. --worker 10 or --worker=10.')
  }

  return workers
}

async function importBulletins() {
  const dryRun = process.argv.includes('--dry-run')
  const force = process.argv.includes('--force')
  const limit = parseLimitArg()
  const workers = parseWorkerArg()
  const bulletins = await fetchBulletins(limit)

  console.log(`Found ${bulletins.length} bulletins.`)

  if (dryRun) {
    for (const [bulletinIndex, bulletin] of bulletins.entries()) {
      const bulletinProgress = `[Bulletin ${bulletinIndex + 1}/${bulletins.length}]`
      console.log(`${bulletinProgress} Would import ${getFilename(bulletin.pdfUrl)}.`)
    }
    return
  }

  const payload = await getPayload({ config })
  const existingBulletins = force
    ? []
    : await payload.find({
        collection: 'bulletins',
        depth: 1,
        limit: 100000,
        overrideAccess: true,
      })
  const existingDocs: Bulletin[] = Array.isArray(existingBulletins)
    ? existingBulletins
    : existingBulletins.docs
  const existingDates = new Set(
    existingDocs.map((bulletin) => new Date(bulletin.date).toISOString().slice(0, 10)),
  )
  const existingFiles = await payload.find({
    collection: 'files',
    depth: 0,
    limit: 100000,
    overrideAccess: true,
  })
  const existingFileDocs: FileDocument[] = Array.isArray(existingFiles)
    ? existingFiles
    : existingFiles.docs
  const existingFilesByFilename = new Map<string, UploadedFile>()

  for (const file of existingFileDocs) {
    if (file.filename) {
      existingFilesByFilename.set(normalizeFilename(file.filename), {
        id: file.id,
        filename: file.filename,
      })
    }
  }

  const uploadedByUrl = new Map<string, UploadedFile>()
  const inFlightUploads = new Map<string, Promise<UploadedFile>>()

  try {
    await mapWithConcurrency(bulletins, workers, async (bulletin, bulletinIndex) => {
      const bulletinProgress = `[Bulletin ${bulletinIndex + 1}/${bulletins.length}]`
      const filename = getFilename(bulletin.pdfUrl)
      const bulletinDate = bulletin.date.slice(0, 10)

      if (!force && existingDates.has(bulletinDate)) {
        console.log(`${bulletinProgress} Skipping existing bulletin for ${bulletinDate}.`)
        return
      }

      console.log(`${bulletinProgress} Importing bulletin for ${bulletinDate}.`)
      let uploaded = uploadedByUrl.get(bulletin.pdfUrl)

      if (!uploaded) {
        let inFlight = inFlightUploads.get(bulletin.pdfUrl)

        if (!inFlight) {
          inFlight = (async () => {
            const existing = existingFilesByFilename.get(normalizeFilename(filename))

            if (existing) {
              console.log(`${bulletinProgress} Reusing ${existing.filename}.`)
              return existing
            }

            console.log(`${bulletinProgress} Downloading ${filename}.`)
            const downloaded = await downloadFile(bulletin.pdfUrl)
            const file = await payload.create({
              collection: 'files',
              data: {},
              file: downloaded.file,
              overrideAccess: true,
            })

            const result = {
              id: file.id,
              filename: downloaded.filename,
            }
            existingFilesByFilename.set(normalizeFilename(filename), result)
            console.log(`${bulletinProgress} Uploaded ${downloaded.filename}.`)
            return result
          })()

          inFlightUploads.set(bulletin.pdfUrl, inFlight)
        }

        uploaded = await inFlight
        uploadedByUrl.set(bulletin.pdfUrl, uploaded)
      } else {
        console.log(`${bulletinProgress} Reusing ${uploaded.filename}.`)
      }

      const createdBulletin = await payload.create({
        collection: 'bulletins',
        data: {
          date: new Date(`${bulletinDate}T12:00:00.000Z`).toISOString(),
          file: uploaded.id,
        },
        overrideAccess: true,
      })

      existingDates.add(bulletinDate)
      console.log(`${bulletinProgress} Imported bulletin for ${createdBulletin.date}.`)
    })
  } finally {
    await payload.destroy()
  }
}

try {
  await importBulletins()
} catch (error) {
  console.error(error)
  process.exitCode = 1
}
