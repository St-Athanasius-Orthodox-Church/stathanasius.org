import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { Bulletin, Homily, Media, Person, PhotoAlbum, Post } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

import { getSpeakerImage } from './homilies'

export type RecentItemType = 'blog' | 'photos' | 'homily' | 'bulletin'

export type RecentItem = {
  type: RecentItemType
  type_label: string
  title: string
  date: string
  href: string
  image_url: string | null
}

function getMediaImageUrl(media: Media | null): string | null {
  if (!media) return null

  return media.url ? getMediaUrl(media.url, media.updatedAt) : null
}

function toBlogItem(post: Post): RecentItem {
  const coverImage = typeof post.coverImage === 'object' ? post.coverImage : null

  return {
    type: 'blog',
    type_label: 'Blog',
    title: post.title,
    date: post.publishedAt ?? post.createdAt,
    href: `/blog/${post.slug}`,
    image_url: getMediaImageUrl(coverImage),
  }
}

function toAlbumItem(album: PhotoAlbum): RecentItem {
  const coverPhoto =
    typeof album.coverPhoto === 'object' && album.coverPhoto
      ? album.coverPhoto
      : album.photos?.find(
          (photo): photo is Media => photo !== null && typeof photo === 'object',
        )

  return {
    type: 'photos',
    type_label: 'Photos',
    title: album.title || 'Untitled Album',
    date: album.date || album.createdAt,
    href: `/photo-albums/${album.id}`,
    image_url: coverPhoto ? getMediaImageUrl(coverPhoto) : null,
  }
}

function toHomilyItem(homily: Homily): RecentItem {
  const person = typeof homily.speaker === 'object' ? homily.speaker : null
  const speaker = person?.name || 'Unknown speaker'
  const photo =
    person && typeof person.photo === 'object' && person.photo
      ? (person.photo as Media)
      : null

  return {
    type: 'homily',
    type_label: 'Homily',
    title: homily.title,
    date: homily.date,
    href: '/homilies',
    image_url: getMediaImageUrl(photo) || getSpeakerImage(speaker),
  }
}

function getBulletinPdfUrl(bulletin: Bulletin): string | null {
  if (typeof bulletin.file !== 'object') return null

  const file = bulletin.file

  if (file.url) {
    return getMediaUrl(file.url, file.updatedAt)
  }

  return file.filename ? `/files/${encodeURIComponent(file.filename)}` : null
}

function toBulletinItem(bulletin: Bulletin): RecentItem {
  const pdfUrl = getBulletinPdfUrl(bulletin)

  return {
    type: 'bulletin',
    type_label: 'Bulletin',
    title: 'Parish Bulletin',
    date: bulletin.date,
    href: pdfUrl ?? '/bulletins',
    image_url: null,
  }
}

export const getRecentItems = cache(async (limit = 5): Promise<RecentItem[]> => {
  const payload = await getPayload({ config: configPromise })

  const [posts, albums, homilies, bulletins] = await Promise.all([
    payload.find({
      collection: 'posts',
      depth: 1,
      limit: 5,
      overrideAccess: false,
      pagination: false,
      sort: '-publishedAt',
      where: {
        _status: { equals: 'published' },
      },
    }),
    payload.find({
      collection: 'photo-albums',
      depth: 1,
      limit: 5,
      overrideAccess: false,
      pagination: false,
      sort: '-date',
    }),
    payload.find({
      collection: 'homilies',
      depth: 1,
      limit: 5,
      overrideAccess: false,
      pagination: false,
      sort: '-date',
    }),
    payload.find({
      collection: 'bulletins',
      depth: 1,
      limit: 5,
      overrideAccess: false,
      pagination: false,
      sort: '-date',
    }),
  ])

  const items: RecentItem[] = [
    ...posts.docs.map(toBlogItem),
    ...albums.docs.map(toAlbumItem),
    ...homilies.docs.map(toHomilyItem),
    ...bulletins.docs.map(toBulletinItem),
  ]

  return items
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
})
