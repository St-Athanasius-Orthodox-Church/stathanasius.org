'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import { SiteStatusPage } from '@/components/site/status-page'
import { Button } from '@/components/ui/button'

type SiteErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function SiteError({ error, reset }: SiteErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <SiteStatusPage
      title="Something went wrong"
      description="We could not load this page. Please try again, or return to the homepage."
      actions={
        <>
          <Button variant="byzantineGold" type="button" onClick={reset}>
            Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Return home</Link>
          </Button>
        </>
      }
    />
  )
}
