import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { Bulletin as PayloadBulletin, File } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export type Bulletin = {
  id: string
  date: string
  pdf_url: string | null
}

export type BulletinPage = {
  docs: Bulletin[]
  hasNextPage: boolean
  hasPrevPage: boolean
  page: number
  totalPages: number
}

function getFileUrl(file: File | null): string | null {
  if (!file) return null

  if (file.url) {
    return getMediaUrl(file.url, file.updatedAt)
  }

  return file.filename ? `/files/${encodeURIComponent(file.filename)}` : null
}

function toBulletin(doc: PayloadBulletin): Bulletin {
  return {
    id: String(doc.id),
    date: doc.date,
    pdf_url: getFileUrl(typeof doc.file === 'object' ? doc.file : null),
  }
}

export const getBulletins = cache(async (page = 1): Promise<BulletinPage> => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'bulletins',
    depth: 1,
    limit: 20,
    page,
    overrideAccess: false,
    sort: '-date',
  })

  return {
    docs: result.docs.map(toBulletin),
    hasNextPage: result.hasNextPage,
    hasPrevPage: result.hasPrevPage,
    page: result.page || page,
    totalPages: result.totalPages,
  }
})

export function formatBulletinDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
