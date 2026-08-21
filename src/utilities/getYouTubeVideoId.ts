const YOUTUBE_HOSTS = new Set(['youtube.com', 'youtu.be', 'youtube-nocookie.com'])

export function getYouTubeVideoId(value: string): string | null {
  let url: URL

  try {
    url = new URL(value.trim())
  } catch {
    return null
  }

  const hostname = url.hostname.toLowerCase().replace(/^www\./, '')
  if (!YOUTUBE_HOSTS.has(hostname) || !['http:', 'https:'].includes(url.protocol)) {
    return null
  }

  const pathParts = url.pathname.split('/').filter(Boolean)
  const videoId =
    hostname === 'youtu.be'
      ? pathParts[0]
      : url.pathname === '/watch'
        ? url.searchParams.get('v')
        : ['embed', 'shorts', 'live'].includes(pathParts[0])
          ? pathParts[1]
          : null

  return videoId && /^[A-Za-z0-9_-]{11}$/.test(videoId) ? videoId : null
}
