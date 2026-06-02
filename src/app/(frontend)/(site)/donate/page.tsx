import type { Metadata } from 'next'

import { Hero } from '@/components/ui/hero'
import { DonationForm } from './donation-form'

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support St. Athanasius Orthodox Church through online donations.',
}

type DonatePageProps = {
  searchParams: Promise<{ success?: string; earmark?: string }>
}

export default async function DonatePage({ searchParams }: DonatePageProps) {
  const params = await searchParams
  const isSuccess = 'success' in params

  return (
    <>
      <Hero size="fullPage" gradientIntensity="dark">
        <DonationForm
          isSuccess={isSuccess}
          initialEarmark={params.earmark}
        />
      </Hero>
    </>
  )
}
