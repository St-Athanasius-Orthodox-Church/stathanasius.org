/**
 * Helpers for keeping link-preview / AI crawlers off the Next.js Image
 * Optimization path (`/_next/image`).
 *
 * Background: `og:image` tags and `<Image>` srcsets expose optimizer URLs.
 * When a page is shared, scrapers such as Facebook's `meta-externalagent`
 * fetch those URLs, and each unique `url`/`w`/`q` combo bills an Image
 * Optimization transform on Vercel. Redirecting bots straight to the
 * source image preserves link previews/SEO while skipping the optimizer.
 *
 * Kept free of Next.js imports so it can be unit-tested in plain Node.
 */

const BOT_TOKENS = [
  // Link-preview / social scrapers
  'facebookexternalhit',
  'meta-externalagent',
  'facebot',
  'twitterbot',
  'xbot',
  'linkedinbot',
  'slackbot',
  'slack-imgproxy',
  'discordbot',
  'telegrambot',
  'whatsapp',
  'skype',
  'viber',
  'line',
  'pinterest',
  'embedly',
  'quora',
  'snapchat',
  // Search crawlers that fetch images
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'sogou',
  'exabot',
  'applebot',
  // AI crawlers
  'ccbot',
  'gptbot',
  'chatgpt-user',
  'oai-searchbot',
  'anthropic-ai',
  'claudebot',
  'claude-web',
  'cohere-ai',
  'bytespider',
  'diffbot',
  'perplexitybot',
  'ia_archiver',
]

const BOT_PATTERN = new RegExp(BOT_TOKENS.join('|'), 'i')

/** True when the User-Agent looks like a preview bot or crawler. */
export const isImageBotRequest = (userAgent: string | null | undefined): boolean => {
  if (!userAgent) return false
  return BOT_PATTERN.test(userAgent)
}

/**
 * Resolve a safe redirect target for a bot requesting
 * `/_next/image?url=<src>&w=..&q=..`: the underlying source image.
 *
 * Returns `null` when `src` is missing or points somewhere we don't
 * recognize, in which case the caller should fall through to the normal
 * optimizer rather than open-redirecting.
 */
export const getBotImageRedirectTarget = (
  src: string | null | undefined,
  requestHost: string | null | undefined,
): string | null => {
  if (!src) return null

  // Relative source (local `/media/**`, `/api/media/file/**`, `/assets/**`).
  if (src.startsWith('/')) {
    // Protocol-relative URLs (`//evil.com/x`) are not same-origin.
    if (src.startsWith('//')) return null
    return src
  }

  let parsed: URL
  try {
    parsed = new URL(src)
  } catch {
    return null
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null

  const host = parsed.hostname.toLowerCase()
  const reqHost = (requestHost || '').toLowerCase()

  // Production media lives on Vercel Blob; always safe to send bots there.
  if (host.endsWith('.blob.vercel-storage.com')) return src
  // Same-host absolute URLs (e.g. absolute media URLs in metadata).
  if (reqHost && host === reqHost) return src

  return null
}
