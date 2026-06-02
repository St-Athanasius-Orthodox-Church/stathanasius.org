import Link from 'next/link'

import { SiteStatusPage } from '@/components/site/status-page'
import { Button } from '@/components/ui/button'

export default function PhotoAlbumNotFound() {
  return (
    <SiteStatusPage
      title="Photo album not found"
      description="This album may have been removed or the link is incorrect."
      actions={
        <>
          <Button asChild variant="byzantineGold">
            <Link href="/photo-albums">View all albums</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Return home</Link>
          </Button>
        </>
      }
    />
  )
}
