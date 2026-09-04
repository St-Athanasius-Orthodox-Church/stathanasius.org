import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)
import { redirects } from './redirects'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

const nextConfig: NextConfig = {
  // Temporarily required on Windows until Next.js fixes Turbopack Sass resolution.
  // See: https://github.com/vercel/next.js/issues/86431
  sassOptions: {
    loadPaths: ['./node_modules/@payloadcms/ui/dist/scss/'],
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/media/**',
      },
      {
        pathname: '/assets/**',
      },
    ],
    qualities: [75, 100],
    // Narrowed from Next defaults (8 device + 8 image sizes) to cut the
    // worst-case unique `url/w/q` optimizer variants per photo from 16 to 6.
    // 640 covers mobile 100vw, 1080 covers 50vw/cards/896px heroes, 1920 is
    // required by `getOptimizedImageUrl` lightbox URLs. 96 covers 80px
    // avatars, 256/384 cover gallery thumbnails (20-33vw).
    deviceSizes: [640, 1080, 1920],
    imageSizes: [96, 256, 384],
    // Source URLs embed the media `updatedAt` as a cache-buster, so a long
    // TTL is safe and keeps repeat scraper hits on the edge cache instead of
    // re-running (and re-billing) the optimizer.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'http' | 'https',
        }
      }),
      // Media stored in Vercel Blob is served from the blob CDN in production,
      // so its absolute URLs must be optimizable via remotePatterns.
      {
        hostname: '**.blob.vercel-storage.com',
        protocol: 'https',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
