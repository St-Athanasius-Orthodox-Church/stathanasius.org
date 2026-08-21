'use server'

import { redirect } from 'next/navigation'

import { donationRequestSchema, resolveEarmark } from '@/lib/donation'
import { getStripe } from '@/lib/stripe'
import { buildCheckoutSessionParams } from '@/lib/stripe-checkout'
import { getServerSideURL } from '@/utilities/getURL'

export type CheckoutState = {
  error?: string
}

export async function startCheckout(
  _prevState: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  const parsed = donationRequestSchema.safeParse({
    amount: String(formData.get('amount') ?? ''),
    frequency: String(formData.get('frequency') ?? ''),
    earmark: resolveEarmark(String(formData.get('earmark') ?? '')),
    comments: String(formData.get('comments') ?? ''),
  })

  if (!parsed.success) {
    return { error: 'Invalid donation details.' }
  }

  let checkoutURL: string

  try {
    const session = await getStripe().checkout.sessions.create(
      buildCheckoutSessionParams(parsed.data, getServerSideURL()),
    )

    if (!session.url) {
      throw new Error('Stripe Checkout Session did not include a redirect URL.')
    }

    checkoutURL = session.url
  } catch (error) {
    console.error('Unable to create Stripe Checkout Session:', error)
    return { error: 'Secure checkout could not be started. Please try again.' }
  }

  redirect(checkoutURL)
}
