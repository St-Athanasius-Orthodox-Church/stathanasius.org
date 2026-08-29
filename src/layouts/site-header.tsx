import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

import { GoldSeparator } from '@/components/ui/gold-separator'
import { DesktopNav } from '@/layouts/desktop-nav'
import { MobileNav } from '@/layouts/mobile-nav'
import { saocLogoUrl } from '@/layouts/nav-items'
import config from '@payload-config'

import type { User } from '@/payload-types'

export async function SiteHeader() {
  let user: User | null = null

  // Dynamic API calls must stay outside the try/catch: swallowing the error Next
  // throws while prerendering would hide the "bail out to dynamic rendering"
  // signal and leave pages incorrectly baked as static (leading to
  // "Page changed from static to dynamic at runtime" errors in production).
  const headersList = await getHeaders()

  try {
    const payload = await getPayload({ config: await config })
    const result = await payload.auth({ headers: headersList })
    user = result.user as User | null
  } catch {
    user = null
  }

  const isSignedIn = Boolean(user)
  const hasAdminAccess = user?.role === 'admin' || user?.role === 'editor'

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
    <>
      {hasAdminAccess && (
        <div className="w-full bg-black text-white">
          <div className="container mx-auto flex justify-end px-4 py-1 font-crimson-pro text-sm">
            <Link href="/admin">Edit Site Content</Link>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 w-full bg-byzantine-blue shadow-lg">
        <GoldSeparator variant="full" />

        <nav className="container relative mx-auto flex items-center gap-6 px-4 py-3 font-crimson-pro">
          <Link href="/" className="block h-10 w-fit shrink-0 md:h-12">
            <Image
              src={saocLogoUrl}
              alt="St. Athanasius Orthodox Church"
              width={327}
              height={51}
              priority
              className="h-full w-auto object-contain"
            />
          </Link>

          <DesktopNav authLabel={authLabel} authHref={authHref} />
          <MobileNav authLabel={authLabel} authHref={authHref} />
        </nav>
      </header>
    </>
  )
}
