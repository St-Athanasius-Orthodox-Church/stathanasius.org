import type { Metadata } from 'next'

import { Hero } from '@/components/ui/hero'
import { getStripe } from '@/lib/stripe'
import { verifyCheckoutSession, type DonationCheckoutStatus } from '@/lib/stripe-checkout'
import { DonationForm } from './donation-form'

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support St. Athanasius Orthodox Church through online donations.',
}

type DonatePageProps = {
  searchParams: Promise<{ checkout?: string; earmark?: string; session_id?: string }>
}

export async function getDonationCheckoutStatus(params: {
  [key: string]: string | undefined
  checkout?: string
  session_id?: string
}): Promise<DonationCheckoutStatus | 'canceled' | undefined> {
  let checkoutStatus: DonationCheckoutStatus | 'canceled' | undefined

  if (params.session_id) {
    try {
      checkoutStatus = await verifyCheckoutSession(params.session_id, getStripe())
    } catch (error) {
      console.error('Unable to initialize Stripe while verifying Checkout Session:', error)
      checkoutStatus = 'unverified'
    }
  } else if (params.checkout === 'canceled') {
    checkoutStatus = 'canceled'
  }

  return checkoutStatus
}

export default async function DonatePage({ searchParams }: DonatePageProps) {
  const params = await searchParams
  const checkoutStatus = await getDonationCheckoutStatus(params)

  return (
    <>
      <Hero size="fullPage" gradientIntensity="strong">
        <DonationForm
          checkoutStatus={checkoutStatus}
          initialEarmark={params.earmark}
        />
      </Hero>
    </>
  )
}
