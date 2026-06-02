import type { ReactNode } from 'react'

import { SiteFooter } from '@/layouts/site-footer'
import { SiteHeader } from '@/layouts/site-header'

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-crimson-pro">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
