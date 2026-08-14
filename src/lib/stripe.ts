import 'server-only'

import Stripe from 'stripe'

let stripe: Stripe | undefined

export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim()

  if (!secretKey) {
    throw new Error('Stripe is not configured: STRIPE_SECRET_KEY is missing.')
  }

  stripe ??= new Stripe(secretKey)
  return stripe
}
