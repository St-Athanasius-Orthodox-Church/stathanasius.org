import 'dotenv/config'

import { createWriteStream } from 'node:fs'
import { mkdtemp, mkdir, readFile, rm, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { basename, extname, join } from 'node:path'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import type { ReadableStream as NodeReadableStream } from 'node:stream/web'

import config from '@payload-config'
import { getPayload } from 'payload'
import type { File } from 'payload'
import { z } from 'zod'
import type { PhotoAlbum } from '@/payload-types'

import { mapWithConcurrency } from './lib/map-with-concurrency'

const DEFAULT_API_URL = 'https://www.stathanasius.org/photo_albums.json'
const DEFAULT_WORKER_COUNT = 10
const API_URL = process.env.OLD_PHOTO_ALBUMS_API_URL || DEFAULT_API_URL

const albumSummarySchema = z.object({
  id: z.number().int(),
  title: z.string().min(1),
  date: z.iso.date(),
  photo_count: z.number().int().nonnegative(),
  cover_photo_url: z.url().nullable(),
})

const albumListSchema = z.object({
  photo_albums: z.array(albumSummarySchema),
  pagination: z.object({
    current_page: z.number().int().positive(),
    total_pages: z.number().int().positive(),
    total_count: z.number().int().nonnegative(),
  }),
})

const albumDetailSchema = z.object({
  photo_album: z.object({
    id: z.number().int(),
    title: z.string().min(1),
    date: z.iso.date(),
  }),
  photos: z
    .array(
      z.object({
        id: z.number().int(),
        thumbnail_url: z.url(),
        carousel_url: z.url(),
        file_url: z.url(),
      }),
    )
    .min(1),
})

type ImportedAlbum = {
  id: number
  title: string
  date: string
  coverUrl: string | null
  photos: ImportedPhoto[]
}

type ImportedPhoto = {
  fileUrl: string
}

type DownloadedPhoto = {
  filename: string
  localPath: string
  mimetype: string
  size: number
  sourceUrl: string
}

type UploadedPhoto = {
  id: number
  filename: string
  sourceUrl: string
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

function getAlbumDetailUrl(id: number): string {
  const listUrl = new URL(API_URL)
  listUrl.pathname = listUrl.pathname.replace(/\.json$/, '/')
  return new URL(`${encodeURIComponent(String(id))}.json`, listUrl).toString()
}

async function fetchJsonResponse(url: string): Promise<unknown> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`The API returned ${response.status} for ${url}.`)
  }

  return response.json()
}

async function fetchAlbums(limit: number | undefined): Promise<ImportedAlbum[]> {
  const albums: ImportedAlbum[] = []
  const listUrl = new URL(API_URL)

  while (true) {
    const pageUrl = listUrl.toString()
    const list = parseJson(albumListSchema, await fetchJsonResponse(pageUrl), pageUrl)

    for (const summary of list.photo_albums) {
      const detailUrl = getAlbumDetailUrl(summary.id)
      const detail = parseJson(
        albumDetailSchema,
        await fetchJsonResponse(detailUrl),
        `photo album ${summary.id}`,
      )

      albums.push({
        id: detail.photo_album.id,
        title: detail.photo_album.title,
        date: new Date(detail.photo_album.date).toISOString(),
        coverUrl: summary.cover_photo_url,
        photos: detail.photos.map((photo) => ({ fileUrl: photo.file_url })),
      })

      if (limit !== undefined && albums.length >= limit) return albums
    }

    if (list.pagination.current_page >= list.pagination.total_pages) break

    listUrl.searchParams.set('page', String(list.pagination.current_page + 1))
  }

  return albums
}

function getFilename(fileUrl: string): string {
  const pathname = new URL(fileUrl).pathname
  const filename = decodeURIComponent(basename(pathname))

  if (!filename) {
    throw new Error(`The file URL has no filename: ${fileUrl}`)
  }

  return filename
}

function getPhotoIdentity(fileUrl: string): string {
  const pathname = new URL(fileUrl).pathname
  return pathname.match(/\/redirect\/([^/]+)/)?.[1] || pathname
}

function getMimeType(response: Response, filename: string): string {
  const contentType = response.headers.get('content-type')?.split(';')[0].trim()
  if (contentType?.startsWith('image/')) return contentType

  const mimeTypes: Record<string, string> = {
    '.gif': 'image/gif',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
  }
  const mimeType = mimeTypes[extname(filename).toLowerCase()]

  if (!mimeType) {
    throw new Error(`The API did not provide an image MIME type for ${filename}.`)
  }

  return mimeType
}

async function downloadPhoto(photo: ImportedPhoto, localPath: string): Promise<DownloadedPhoto> {
  const response = await fetch(photo.fileUrl)

  if (!response.ok) {
    throw new Error(`The photo download returned ${response.status} for ${photo.fileUrl}.`)
  }

  const filename = getFilename(photo.fileUrl)
  const mimetype = getMimeType(response, filename)

  if (!response.body) {
    throw new Error(`The photo download returned an empty body for ${photo.fileUrl}.`)
  }

  await pipeline(
    Readable.fromWeb(response.body as unknown as NodeReadableStream),
    createWriteStream(localPath),
  )
  const fileStat = await stat(localPath)

  return {
    filename,
    localPath,
    mimetype,
    size: fileStat.size,
    sourceUrl: photo.fileUrl,
  }
}

async function getUploadFile(photo: DownloadedPhoto): Promise<File> {
  return {
    data: await readFile(photo.localPath),
    mimetype: photo.mimetype,
    name: photo.filename,
    size: photo.size,
  }
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

async function importAlbums() {
  const dryRun = process.argv.includes('--dry-run')
  const force = process.argv.includes('--force')
  const limit = parseLimitArg()
  const workers = parseWorkerArg()
  const albums = await fetchAlbums(limit)

  console.log(`Found ${albums.length} photo albums.`)

  if (dryRun) {
    for (const [albumIndex, album] of albums.entries()) {
      const albumProgress = `[Album ${albumIndex + 1}/${albums.length}]`
      console.log(`${albumProgress} Would import "${album.title}".`)

      for (const [photoIndex, photo] of album.photos.entries()) {
        console.log(
          `${albumProgress} [Photo ${photoIndex + 1}/${album.photos.length}] Would import ${getFilename(photo.fileUrl)}.`,
        )
      }

      console.log(`${albumProgress} Complete. ${album.photos.length} photos.`)
    }
    return
  }

  const payload = await getPayload({ config })
  const stagingDirectory = await mkdtemp(join(tmpdir(), 'st-athanasius-photo-albums-'))

  try {
    const existingAlbums = force
      ? []
      : await payload.find({
          collection: 'photo-albums',
          depth: 0,
          limit: 100000,
          overrideAccess: true,
        })
    const existingDocs: PhotoAlbum[] = Array.isArray(existingAlbums)
      ? existingAlbums
      : existingAlbums.docs
    const existingKeys = new Set(
      existingDocs.map(
        (album) => `${album.title}\u0000${new Date(album.date).toISOString().slice(0, 10)}`,
      ),
    )

    for (const [albumIndex, album] of albums.entries()) {
      const albumProgress = `[Album ${albumIndex + 1}/${albums.length}]`
      const albumKey = `${album.title}\u0000${album.date.slice(0, 10)}`
      if (!force && existingKeys.has(albumKey)) {
        console.log(`${albumProgress} Skipping existing album "${album.title}".`)
        continue
      }

      console.log(`${albumProgress} Importing "${album.title}".`)

      const albumDirectory = join(stagingDirectory, String(album.id))
      await mkdir(albumDirectory)

      const downloadFailures: { filename: string; reason: string }[] = []
      const downloadedPhotos = (
        await mapWithConcurrency(
          album.photos,
          workers,
          async (photo, photoIndex) => {
            const photoProgress = `${albumProgress} [Photo ${photoIndex + 1}/${album.photos.length}]`
            const filename = getFilename(photo.fileUrl)

            try {
              console.log(`${photoProgress} Downloading ${filename}.`)
              const downloaded = await downloadPhoto(
                photo,
                join(albumDirectory, String(photoIndex)),
              )
              console.log(`${photoProgress} Downloaded ${filename}.`)
              return downloaded
            } catch (error) {
              const reason = error instanceof Error ? error.message : String(error)
              downloadFailures.push({ filename, reason })
              console.warn(`${photoProgress} Failed to download ${filename}: ${reason}`)
              return undefined
            }
          },
        )
      ).filter((photo): photo is DownloadedPhoto => photo !== undefined)

      console.log(
        `${albumProgress} Downloaded ${downloadedPhotos.length}/${album.photos.length} photos. Uploading.`,
      )

      const uploadFailures: { filename: string; reason: string }[] = []
      const uploadedPhotos = (
        await mapWithConcurrency(
          downloadedPhotos,
          workers,
          async (photo, photoIndex) => {
            const photoProgress = `${albumProgress} [Photo ${photoIndex + 1}/${downloadedPhotos.length}]`

            try {
              console.log(`${photoProgress} Uploading ${photo.filename}.`)
              const media = await payload.create({
                collection: 'media',
                data: { alt: photo.filename },
                file: await getUploadFile(photo),
                overrideAccess: true,
              })

              const uploaded = {
                id: media.id,
                filename: media.filename || photo.filename,
                sourceUrl: photo.sourceUrl,
              }
              console.log(`${photoProgress} Uploaded ${uploaded.filename}.`)
              return uploaded
            } catch (error) {
              const reason = error instanceof Error ? error.message : String(error)
              uploadFailures.push({ filename: photo.filename, reason })
              console.warn(`${photoProgress} Failed to upload ${photo.filename}: ${reason}`)
              return undefined
            }
          },
        )
      ).filter((photo): photo is UploadedPhoto => photo !== undefined)

      if (uploadedPhotos.length === 0) {
        console.warn(`${albumProgress} Skipping album "${album.title}": no photos were uploaded.`)
        await rm(albumDirectory, { force: true, recursive: true })
        continue
      }

      const coverPhoto = album.coverUrl
        ? uploadedPhotos.find(
            (photo) => getPhotoIdentity(photo.sourceUrl) === getPhotoIdentity(album.coverUrl!),
          )
        : undefined

      if (album.coverUrl && !coverPhoto) {
        console.warn(`No uploaded photo matches the cover URL for "${album.title}".`)
      }

      let createdAlbum: PhotoAlbum
      try {
        createdAlbum = await payload.create({
          collection: 'photo-albums',
          data: {
            title: album.title,
            date: new Date(`${album.date.slice(0, 10)}T12:00:00.000Z`).toISOString(),
            photos: uploadedPhotos.map((photo) => photo.id),
            ...(coverPhoto ? { coverPhoto: coverPhoto.id } : {}),
          },
          context: { disableRevalidate: true },
          overrideAccess: true,
        })
      } catch (error) {
        console.warn(
          `${albumProgress} Album creation failed; deleting ${uploadedPhotos.length} uploaded media item(s).`,
        )
        await mapWithConcurrency(uploadedPhotos, workers, async (photo) => {
          await payload.delete({ collection: 'media', id: photo.id, overrideAccess: true })
        })
        throw error
      }

      console.log(
        `${albumProgress} Imported "${createdAlbum.title}" with ${uploadedPhotos.length}/${album.photos.length} photos.`,
      )
      if (downloadFailures.length > 0 || uploadFailures.length > 0) {
        console.warn(
          `${albumProgress} Skipped ${downloadFailures.length} download(s) and ${uploadFailures.length} upload(s).`,
        )
      }
      await rm(albumDirectory, { force: true, recursive: true })
    }
  } finally {
    try {
      await rm(stagingDirectory, { force: true, recursive: true })
    } finally {
      await payload.destroy()
    }
  }
}

try {
  await importAlbums()
} catch (error) {
  console.error(error)
  process.exitCode = 1
}
