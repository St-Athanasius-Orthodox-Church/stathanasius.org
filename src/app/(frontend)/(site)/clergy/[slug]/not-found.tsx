import Link from 'next/link'

import { SiteStatusPage } from '@/components/site/status-page'
import { Button } from '@/components/ui/button'

export default function ClergyMemberNotFound() {
  return (
    <SiteStatusPage
      title="Clergy member not found"
      description="We could not find a biography for this clergy member."
      actions={
        <>
          <Button asChild variant="byzantineGold">
            <Link href="/clergy">View all clergy</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Return home</Link>
          </Button>
        </>
      }
    />
  )
}
