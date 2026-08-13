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

function getMediaImageUrl(media: Media, size: 'thumbnail' | 'large'): string | null {
  const url =
    size === 'thumbnail'
      ? media.sizes?.thumbnail?.url || media.thumbnailURL || media.url
      : media.sizes?.large?.url || media.sizes?.xlarge?.url || media.url

  return url ? getMediaUrl(url, media.updatedAt) : null
}

function toPhoto(media: Media): Photo {
  return {
    id: String(media.id),
    thumbnail_url: getMediaImageUrl(media, 'thumbnail') || '',
    carousel_url: getMediaImageUrl(media, 'large') || '',
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
    cover_photo_url: coverPhoto ? getMediaImageUrl(coverPhoto, 'thumbnail') : null,
  }
}

function toPhotoAlbumDetail(album: PhotoAlbum): PhotoAlbumDetail {
  const photos = (album.photos || [])
    .filter((photo): photo is Media => typeof photo === 'object')
    .map(toPhoto)

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
