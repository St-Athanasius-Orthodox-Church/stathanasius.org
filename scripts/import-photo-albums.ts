import 'dotenv/config'

import { basename, extname } from 'node:path'

import config from '@payload-config'
import { getPayload } from 'payload'
import type { File } from 'payload'
import type { Media, PhotoAlbum } from '@/payload-types'

const DEFAULT_API_URL = 'https://www.stathanasius.org/photo_albums.json'
const API_URL = process.env.OLD_PHOTO_ALBUMS_API_URL || DEFAULT_API_URL

type JsonObject = Record<string, unknown>

type OldPhotoAlbum = {
  id: string | number
  title: string
  date: string
  coverUrl: string | null
  photos: OldPhoto[]
}

type OldPhoto = {
  id: string | number | null
  fileUrl: string
}

type UploadedPhoto = {
  id: number
  filename: string
}

function asObject(value: unknown): JsonObject | null {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as JsonObject)
    : null
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function asArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value

  const object = asObject(value)
  if (!object) return []

  for (const key of ['data', 'docs', 'photo_albums', 'photoAlbums', 'photos']) {
    if (Array.isArray(object[key])) return object[key]
  }

  return []
}

function firstString(object: JsonObject, keys: string[]): string | null {
  for (const key of keys) {
    const value = asString(object[key])
    if (value) return value
  }

  return null
}

function unwrapObject(value: unknown, keys: string[]): JsonObject | null {
  const object = asObject(value)
  if (!object) return null

  for (const key of keys) {
    const nested = asObject(object[key])
    if (nested) return nested
  }

  return object
}

function getFileUrl(value: unknown, baseUrl: string): string | null {
  const object = asObject(value)
  const fileUrl = object ? firstString(object, ['file_url', 'fileUrl']) : asString(value)

  if (!fileUrl) return null

  return new URL(fileUrl, baseUrl).toString()
}

function getFilename(fileUrl: string): string {
  const pathname = new URL(fileUrl).pathname
  const filename = decodeURIComponent(basename(pathname))

  if (filename && filename !== '.' && filename !== '/') return filename

  throw new Error(`The file URL has no filename: ${fileUrl}`)
}

function getCoverUrl(object: JsonObject, baseUrl: string): string | null {
  for (const key of ['cover_photo', 'coverPhoto', 'cover_photo_url', 'coverPhotoUrl', 'cover']) {
    const url = getFileUrl(object[key], baseUrl)
    if (url) return url
  }

  return null
}

function getPhotos(object: JsonObject): unknown[] {
  for (const key of ['photos', 'images']) {
    const photos = asArray(object[key])
    if (photos.length > 0) return photos
  }

  return []
}

function getAlbumDetailUrl(id: string | number): string {
  const listUrl = new URL(API_URL)
  listUrl.pathname = listUrl.pathname.replace(/\.json$/, '/')
  return new URL(`${encodeURIComponent(String(id))}.json`, listUrl).toString()
}

function parseAlbum(value: unknown, baseUrl: string): OldPhotoAlbum {
  const rootObject = asObject(value)
  const nestedObject = unwrapObject(value, ['photo_album', 'photoAlbum', 'album', 'data'])
  const object =
    rootObject && nestedObject && rootObject !== nestedObject
      ? { ...rootObject, ...nestedObject }
      : nestedObject

  if (!object) throw new Error('The API returned an invalid photo album.')

  const id = object.id
  const title = firstString(object, ['title', 'name'])
  const date = firstString(object, [
    'date',
    'published_at',
    'publishedAt',
    'created_at',
    'createdAt',
  ])

  if ((typeof id !== 'string' && typeof id !== 'number') || !title || !date) {
    throw new Error(`The API returned an incomplete photo album: ${JSON.stringify(object)}`)
  }

  const photos = getPhotos(object).map((photo, index) => {
    const photoObject = asObject(photo)
    const fileUrl = getFileUrl(photoObject?.file_url ?? photoObject?.fileUrl, baseUrl)

    if (!fileUrl) {
      throw new Error(`Photo ${index + 1} in album ${String(id)} has no file_url.`)
    }

    const photoId = photoObject?.id

    return {
      id: typeof photoId === 'string' || typeof photoId === 'number' ? photoId : null,
      fileUrl,
    }
  })

  if (photos.length === 0) {
    throw new Error(`Photo album ${String(id)} has no photos.`)
  }

  return {
    id,
    title,
    date: new Date(date).toISOString(),
    coverUrl: getCoverUrl(object, baseUrl),
    photos,
  }
}

async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`The API returned ${response.status} for ${url}.`)
  }

  return response.json()
}

async function fetchAlbums(): Promise<OldPhotoAlbum[]> {
  const listResponse = await fetchJson(API_URL)
  const list = asArray(listResponse)

  if (list.length === 0) {
    throw new Error('The photo album list is empty or has an unsupported response shape.')
  }

  const albums: OldPhotoAlbum[] = []

  for (const summary of list) {
    const summaryObject = unwrapObject(summary, ['photo_album', 'photoAlbum', 'album', 'data'])
    const id = summaryObject?.id

    if (typeof id !== 'string' && typeof id !== 'number') {
      throw new Error(
        `The photo album list contains an item without an id: ${JSON.stringify(summary)}`,
      )
    }

    const detailUrl = getAlbumDetailUrl(id)
    const detailResponse = await fetchJson(detailUrl)
    const detailObject = asObject(detailResponse)

    if (!detailObject) throw new Error(`The API returned an invalid album for id ${String(id)}.`)

    const mergedObject = { ...summaryObject, ...detailObject }
    albums.push(parseAlbum(mergedObject, API_URL))
  }

  return albums
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

async function downloadPhoto(photo: OldPhoto): Promise<{ file: File; filename: string }> {
  const response = await fetch(photo.fileUrl)

  if (!response.ok) {
    throw new Error(`The photo download returned ${response.status} for ${photo.fileUrl}.`)
  }

  const filename = getFilename(photo.fileUrl)
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

async function importAlbums() {
  const dryRun = process.argv.includes('--dry-run')
  const force = process.argv.includes('--force')
  const albums = await fetchAlbums()

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
    existingDocs.map((album) => `${album.title}\u0000${new Date(album.date).toISOString()}`),
  )
  const existingMedia = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 100000,
    overrideAccess: true,
  })
  const existingMediaDocs: Media[] = Array.isArray(existingMedia)
    ? existingMedia
    : existingMedia.docs
  const existingMediaByFilename = new Map<string, UploadedPhoto>()

  for (const media of existingMediaDocs) {
    if (media.filename) {
      existingMediaByFilename.set(normalizeFilename(media.filename), {
        id: media.id,
        filename: media.filename,
      })
    }
  }

  const uploadedByUrl = new Map<string, UploadedPhoto>()

  try {
    for (const [albumIndex, album] of albums.entries()) {
      const albumProgress = `[Album ${albumIndex + 1}/${albums.length}]`
      const albumKey = `${album.title}\u0000${album.date}`
      if (!force && existingKeys.has(albumKey)) {
        console.log(`${albumProgress} Skipping existing album "${album.title}".`)
        continue
      }

      console.log(`${albumProgress} Importing "${album.title}".`)
      const uploadedPhotos: UploadedPhoto[] = []

      for (const [photoIndex, photo] of album.photos.entries()) {
        const photoProgress = `${albumProgress} [Photo ${photoIndex + 1}/${album.photos.length}]`
        const filename = getFilename(photo.fileUrl)
        let uploaded = uploadedByUrl.get(photo.fileUrl)

        if (!uploaded) {
          uploaded = existingMediaByFilename.get(normalizeFilename(filename))

          if (uploaded) {
            uploadedByUrl.set(photo.fileUrl, uploaded)
            console.log(`${photoProgress} Reusing ${uploaded.filename}.`)
          } else {
            console.log(`${photoProgress} Downloading ${filename}.`)
            const downloaded = await downloadPhoto(photo)
            const media = await payload.create({
              collection: 'media',
              data: { alt: downloaded.filename },
              file: downloaded.file,
              overrideAccess: true,
            })

            uploaded = {
              id: media.id,
              filename: downloaded.filename,
            }
            uploadedByUrl.set(photo.fileUrl, uploaded)
            existingMediaByFilename.set(normalizeFilename(filename), uploaded)
            console.log(`${photoProgress} Uploaded ${downloaded.filename}.`)
          }
        } else {
          console.log(`${photoProgress} Reusing ${uploaded.filename}.`)
        }

        uploadedPhotos.push(uploaded)
        console.log(`${photoProgress} Complete.`)
      }

      const coverPhoto = album.coverUrl
        ? uploadedByUrl.get(album.coverUrl) ||
          uploadedPhotos.find(
            (photo) =>
              normalizeFilename(photo.filename) === normalizeFilename(getFilename(album.coverUrl!)),
          )
        : undefined

      if (album.coverUrl && !coverPhoto) {
        console.warn(`No uploaded photo matches the cover filename for "${album.title}".`)
      }

      const createdAlbum = await payload.create({
        collection: 'photo-albums',
        data: {
          title: album.title,
          date: album.date,
          photos: uploadedPhotos.map((photo) => photo.id),
          ...(coverPhoto ? { coverPhoto: coverPhoto.id } : {}),
        },
        context: { disableRevalidate: true },
        overrideAccess: true,
      })

      existingKeys.add(albumKey)
      console.log(
        `${albumProgress} Imported "${createdAlbum.title}" with ${uploadedPhotos.length} photos.`,
      )
    }
  } finally {
    await payload.destroy()
  }
}

try {
  await importAlbums()
} catch (error) {
  console.error(error)
  process.exitCode = 1
}
