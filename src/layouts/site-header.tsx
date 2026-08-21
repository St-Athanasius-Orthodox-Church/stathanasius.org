import { getPayload } from 'payload'
import Link from 'next/link'
import { headers as getHeaders } from 'next/headers'

import { GoldSeparator } from '@/components/ui/gold-separator'
import { DesktopNav } from '@/layouts/desktop-nav'
import { MobileNav } from '@/layouts/mobile-nav'
import { saocLogoUrl } from '@/layouts/nav-items'
import config from '@payload-config'

import type { User } from '@/payload-types'

export async function SiteHeader() {
  let user: User | null = null

  try {
    const payload = await getPayload({ config: await config })
    const headersList = await getHeaders()
    const result = await payload.auth({ headers: headersList })
    user = result.user as User | null
  } catch {
    user = null
  }

  const isSignedIn = Boolean(user)

  let authLabel: string | null = null
  let authHref: string | null = null

  if (!isSignedIn) {
    authLabel = 'Sign In'
    authHref = '/login'
  } else {
    authLabel = 'Sign Out'
    authHref = null
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-byzantine-blue shadow-lg">
      <GoldSeparator variant="full" />

      <nav className="container relative mx-auto flex items-center gap-6 px-4 py-3 font-crimson-pro">
        <Link href="/" className="block h-10 w-fit shrink-0 md:h-12">
          <img
            src={saocLogoUrl}
            alt="St. Athanasius Orthodox Church"
            className="h-full w-auto object-contain"
          />
        </Link>

        <DesktopNav authLabel={authLabel} authHref={authHref} />
        <MobileNav authLabel={authLabel} authHref={authHref} />
      </nav>
    </header>
  )
}
