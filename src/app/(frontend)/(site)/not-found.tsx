import Link from 'next/link'

import { SiteStatusPage } from '@/components/site/status-page'
import { Button } from '@/components/ui/button'

export default function SiteNotFound() {
  return (
    <SiteStatusPage
      title="Page not found"
      description="The page you are looking for may have been moved or no longer exists."
      actions={
        <>
          <Button asChild variant="byzantineGold">
            <Link href="/">Return home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/calendar">View calendar</Link>
          </Button>
        </>
      }
    />
  )
}
