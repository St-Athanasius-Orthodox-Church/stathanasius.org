import { NextResponse, type NextRequest } from 'next/server'

import { getBotImageRedirectTarget, isImageBotRequest } from '@/utilities/botImageRedirect'

/**
 * Keep crawlers off Vercel Image Optimization.
 *
 * Preview bots (Facebook `meta-externalagent`, Twitterbot, Slackbot, …) and
 * AI crawlers fetch `/_next/image` URLs found in page HTML and `og:image`
 * tags. Each unique `url`/`w`/`q` combo bills an optimization transform.
 * Bots don't benefit from responsive resizing, so 307-redirect them to the
 * underlying source image: previews/SEO keep working, the optimizer is
 * never invoked for these requests.
 *
 * Runs at the edge (cheap) before the optimizer (expensive). The internal
 * `vercel-image-optimization` fetch that retrieves the source image does
 * not go through middleware, so real-user optimizations are unaffected.
 */
export function middleware(request: NextRequest) {
  if (!isImageBotRequest(request.headers.get('user-agent'))) {
    return NextResponse.next()
  }

  const target = getBotImageRedirectTarget(
    request.nextUrl.searchParams.get('url'),
    request.nextUrl.hostname,
  )

  if (!target) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL(target, request.url), 307)
}

export const config = {
  matcher: '/_next/image',
}
