import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'

import { getServerSideURL } from '@/utilities/getURL'

type SeoDocument = {
  slug?: string | null
  title?: string | null
}

const generateTitle: GenerateTitle<SeoDocument> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<SeoDocument> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  vercelBlobStorage({
    enabled: process.env.NODE_ENV !== 'development' && !!process.env.BLOB_READ_WRITE_TOKEN,
    clientUploads: true,
    addRandomSuffix: true,
    collections: {
      media: true,
      audios: true,
      files: true,
    },
    token: process.env.BLOB_READ_WRITE_TOKEN,
  }),
]
