import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { Media, Person, Post as PayloadPost } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export type PostSummary = {
  id: string
  slug: string
  title: string
  published_at: string
  excerpt: string | null
  cover_image_url: string | null
  author: string | null
}

export type PostDetail = PostSummary & {
  content: PayloadPost['content']
}

export type PostPage = {
  docs: PostSummary[]
  hasNextPage: boolean
  hasPrevPage: boolean
  page: number
  totalPages: number
}

function getCoverImageUrl(media: Media | null): string | null {
  if (!media) return null

  return media.url ? getMediaUrl(media.url, media.updatedAt) : null
}

function toPostSummary(doc: PayloadPost): PostSummary {
  const coverImage = typeof doc.coverImage === 'object' ? doc.coverImage : null
  const author = typeof doc.author === 'object' ? doc.author : null

  return {
    id: String(doc.id),
    slug: doc.slug ?? '',
    title: doc.title,
    published_at: doc.publishedAt ?? doc.createdAt,
    excerpt: doc.excerpt ?? null,
    cover_image_url: getCoverImageUrl(coverImage),
    author: author?.name ?? null,
  }
}

export const getPosts = cache(async (page = 1): Promise<PostPage> => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 20,
    overrideAccess: false,
    page,
    sort: '-publishedAt',
    where: {
      _status: { equals: 'published' },
    },
  })

  return {
    docs: result.docs.map(toPostSummary),
    hasNextPage: result.hasNextPage,
    hasPrevPage: result.hasPrevPage,
    page: result.page || page,
    totalPages: result.totalPages,
  }
})

export const getPost = cache(async (slug: string): Promise<PostDetail | null> => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
    },
  })

  const post = result.docs[0]

  return post ? { ...toPostSummary(post), content: post.content } : null
})

export const getAllPostSlugs = cache(async (): Promise<string[]> => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    depth: 0,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
    sort: '-publishedAt',
    where: {
      _status: { equals: 'published' },
    },
  })

  return result.docs.map((doc) => doc.slug).filter((slug): slug is string => Boolean(slug))
})

export function formatPostDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
