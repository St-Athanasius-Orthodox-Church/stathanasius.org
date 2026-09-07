import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { Media, PhotoAlbum } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export type PhotoAlbumSummary = {
  id: string
  title: string
  date: string
  photo_count: number
  cover_photo_url: string | null
}

export type PhotoAlbumPage = {
  docs: PhotoAlbumSummary[]
  hasNextPage: boolean
  hasPrevPage: boolean
  page: number
  totalPages: number
}

export type Photo = {
  id: string
  thumbnail_url: string
  carousel_url: string
}

export type PhotoAlbumDetail = {
  id: string
  title: string
  date: string
  photos: Photo[]
}

function getMediaImageUrl(media: Media): string | null {
  return media.url ? getMediaUrl(media.url, media.updatedAt) : null
}

function toPhoto(media: Media): Photo | null {
  const url = getMediaImageUrl(media)

  // Drop photos with no URL: an empty `<Image src="">` throws at runtime
  // (500s, wasted function invocations) instead of rendering nothing.
  if (!url) return null

  // COST: direct Blob/static URL, never an `/_next/image` optimizer URL.
  // The optimizer billed a transform + cache write per MISS; the lightbox
  // loads the same file the thumbnail uses, via CDN cache.
  return {
    id: String(media.id),
    thumbnail_url: url,
    carousel_url: url,
  }
}

function toPhotoAlbumSummary(album: PhotoAlbum): PhotoAlbumSummary {
  const coverPhoto =
    typeof album.coverPhoto === 'object' && album.coverPhoto
      ? album.coverPhoto
      : album.photos?.find(
          (photo): photo is Media => photo !== null && typeof photo === 'object',
        )

  return {
    id: String(album.id),
    title: album.title || 'Untitled Album',
    date: album.date || album.createdAt,
    photo_count: album.photos?.length || 0,
    cover_photo_url: coverPhoto ? getMediaImageUrl(coverPhoto) : null,
  }
}

function toPhotoAlbumDetail(album: PhotoAlbum): PhotoAlbumDetail {
  const photos = (album.photos || [])
    .filter((photo): photo is Media => typeof photo === 'object')
    .map(toPhoto)
    .filter((photo): photo is Photo => photo !== null)

  return {
    id: String(album.id),
    title: album.title || 'Untitled Album',
    date: album.date || album.createdAt,
    photos,
  }
}

export const getPhotoAlbums = cache(async (page = 1): Promise<PhotoAlbumPage> => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'photo-albums',
    depth: 1,
    limit: 20,
    overrideAccess: false,
    page,
    sort: '-date',
  })

  return {
    docs: result.docs.map(toPhotoAlbumSummary),
    hasNextPage: result.hasNextPage,
    hasPrevPage: result.hasPrevPage,
    page: result.page || page,
    totalPages: result.totalPages,
  }
})

export const getPhotoAlbum = cache(async (id: string): Promise<PhotoAlbumDetail | null> => {
  const numericId = Number(id)

  if (!Number.isInteger(numericId)) {
    return null
  }

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'photo-albums',
    depth: 1,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      id: {
        equals: numericId,
      },
    },
  })

  const album = result.docs[0]

  return album ? toPhotoAlbumDetail(album) : null
})

export function formatAlbumDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
