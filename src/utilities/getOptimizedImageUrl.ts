import { getMediaUrl } from './getMediaUrl'

/**
 * Builds a Next.js Image Optimization API URL (`/_next/image?...`) that can be
 * used as a plain `<img>` src — e.g. lightbox sources that bypass the
 * `<Image>` component. The optimizer fetches, resizes, and caches the source
 * on demand, so no pre-generated transforms need to be stored.
 *
 * Mirrors the default loader used by `next/image`. The width must be one of
 * `deviceSizes`/`imageSizes` and the quality one of `images.qualities` in
 * next.config.
 */
export const getOptimizedImageUrl = (
  url: string | null | undefined,
  width: number,
  quality: number,
  cacheTag?: string | null,
): string => {
  const src = getMediaUrl(url, cacheTag)

  if (!src) return ''

  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
}
