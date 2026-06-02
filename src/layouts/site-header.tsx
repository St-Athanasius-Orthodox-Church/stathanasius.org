import Link from 'next/link'

import { GoldSeparator } from '@/components/ui/gold-separator'
import { DesktopNav } from '@/layouts/desktop-nav'
import { MobileNav } from '@/layouts/mobile-nav'
import { saocLogoUrl } from '@/layouts/nav-items'

export function SiteHeader() {
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

        <DesktopNav />
        <MobileNav />
      </nav>
    </header>
  )
}
