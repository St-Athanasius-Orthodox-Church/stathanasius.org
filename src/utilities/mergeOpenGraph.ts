import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'St. Athanasius Antiochian Orthodox Church in Santa Barbara, CA',
  images: [
    {
      url: '/og-image.jpg',
    },
  ],
  siteName: 'St. Athanasius Orthodox Church',
  title: 'St. Athanasius Orthodox Church',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
