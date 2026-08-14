import type Stripe from 'stripe'

import {
  DONATION_FREQUENCIES,
  dollarsToCents,
  EARMARK_OPTIONS,
  type DonationRequest,
} from '@/lib/donation'

export type DonationCheckoutStatus = 'successful' | 'processing' | 'unverified'

export function buildCheckoutSessionParams(
  donation: DonationRequest,
  serverURL: string,
): Stripe.Checkout.SessionCreateParams {
  const baseURL = serverURL.replace(/\/$/, '')
  const metadata = {
    donation: 'true',
    earmark: donation.earmark,
    frequency: donation.frequency,
    notes: donation.comments ?? '',
  }
  const priceData: Stripe.Checkout.SessionCreateParams.LineItem.PriceData = {
    currency: 'usd',
    product_data: {
      name: 'St. Athanasius Donation',
    },
    unit_amount: dollarsToCents(donation.amount),
  }

  if (donation.frequency === 'monthly') {
    priceData.recurring = { interval: 'month' }
  }

  const params: Stripe.Checkout.SessionCreateParams = {
    mode: donation.frequency === 'monthly' ? 'subscription' : 'payment',
    submit_type: 'donate',
    billing_address_collection: 'required',
    name_collection: { individual: { enabled: true, optional: false } },
    phone_number_collection: { enabled: true },
    payment_method_types: ['card', 'link'],
    line_items: [{ price_data: priceData, quantity: 1 }],
    metadata,
    success_url: `${baseURL}/donate?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseURL}/donate?checkout=canceled`,
  }

  if (donation.frequency === 'monthly') {
    params.subscription_data = { metadata }
  } else {
    params.customer_creation = 'always'
    params.payment_intent_data = { metadata }
  }

  return params
}

export async function verifyCheckoutSession(
  sessionID: string,
  stripe: Stripe,
): Promise<DonationCheckoutStatus> {
  if (!/^cs_(?:live_|test_)[A-Za-z0-9]+$/.test(sessionID)) {
    return 'unverified'
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionID)
    const frequency = session.metadata?.frequency
    const hasDonationMetadata =
      session.metadata?.donation === 'true' &&
      DONATION_FREQUENCIES.some((value) => value === frequency) &&
      EARMARK_OPTIONS.some((value) => value === session.metadata?.earmark) &&
      ((frequency === 'one-time' && session.mode === 'payment') ||
        (frequency === 'monthly' && session.mode === 'subscription'))

    if (hasDonationMetadata && session.status === 'complete' && session.payment_status === 'paid') {
      return 'successful'
    }

    if (
      hasDonationMetadata &&
      session.status === 'complete' &&
      session.payment_status === 'unpaid'
    ) {
      return 'processing'
    }

    return 'unverified'
  } catch (error) {
    console.error('Unable to verify Stripe Checkout Session:', error)
    return 'unverified'
  }
}
