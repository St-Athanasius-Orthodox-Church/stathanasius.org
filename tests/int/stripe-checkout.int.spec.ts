import type Stripe from 'stripe'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  DONATION_NOTES_MAX_LENGTH,
  donationRequestSchema,
  dollarsToCents,
} from '@/lib/donation'
import { buildCheckoutSessionParams, verifyCheckoutSession } from '@/lib/stripe-checkout'

const createSession = vi.fn()

vi.mock('@/lib/stripe', () => ({
  getStripe: () => ({ checkout: { sessions: { create: createSession } } }),
}))

// Server functions call redirect() to send the donor to Stripe's hosted page.
// The real redirect throws a special error; mimic that so actions can be
// asserted on outside a Next.js request context.
const redirectMock = vi.hoisted(() => vi.fn())

vi.mock('next/navigation', () => ({
  redirect: redirectMock,
}))

function donationFormData(donation: Record<string, string>): FormData {
  const formData = new FormData()

  for (const [key, value] of Object.entries(donation)) {
    formData.set(key, value)
  }

  return formData
}

const validDonation = {
  amount: '25.00',
  frequency: 'one-time' as const,
  earmark: 'General Donation' as const,
  comments: 'For the parish',
}

describe('donation request validation', () => {
  it.each([
    ['1', 100],
    ['1.5', 150],
    ['1.05', 105],
    ['100000.00', 10_000_000],
  ])('accepts %s and converts it to exact cents', (amount, cents) => {
    expect(donationRequestSchema.safeParse({ ...validDonation, amount }).success).toBe(true)
    expect(dollarsToCents(amount)).toBe(cents)
  })

  it.each(['0.99', '100000.01', '1.001', '1.', '.50', '1e2', '$10'])('rejects amount %s', (amount) => {
    expect(donationRequestSchema.safeParse({ ...validDonation, amount }).success).toBe(false)
  })

  it('rejects unsupported frequencies and earmarks', () => {
    expect(
      donationRequestSchema.safeParse({ ...validDonation, frequency: 'weekly' }).success,
    ).toBe(false)
    expect(
      donationRequestSchema.safeParse({ ...validDonation, earmark: 'Unsupported Fund' }).success,
    ).toBe(false)
  })

  it('trims notes and enforces their maximum length', () => {
    const result = donationRequestSchema.parse({ ...validDonation, comments: '  Thank you  ' })

    expect(result.comments).toBe('Thank you')
    expect(
      donationRequestSchema.safeParse({
        ...validDonation,
        comments: 'x'.repeat(DONATION_NOTES_MAX_LENGTH + 1),
      }).success,
    ).toBe(false)
  })
})

describe('Stripe Checkout parameters', () => {
  it('configures one-time donations and propagates metadata', () => {
    const params = buildCheckoutSessionParams(validDonation, 'https://example.com')

    expect(params).toMatchObject({
      mode: 'payment',
      submit_type: 'donate',
      billing_address_collection: 'required',
      name_collection: { individual: { enabled: true, optional: false } },
      phone_number_collection: { enabled: true },
      payment_method_types: ['card', 'link'],
      customer_creation: 'always',
      metadata: {
        donation: 'true',
        earmark: 'General Donation',
        frequency: 'one-time',
        notes: 'For the parish',
      },
      payment_intent_data: {
        metadata: {
          donation: 'true',
          earmark: 'General Donation',
          frequency: 'one-time',
          notes: 'For the parish',
        },
      },
      success_url: 'https://example.com/donate?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://example.com/donate?checkout=canceled',
    })
    expect(params.line_items?.[0]).toMatchObject({
      quantity: 1,
      price_data: {
        currency: 'usd',
        product_data: { name: 'St. Athanasius Donation' },
        unit_amount: 2500,
      },
    })
  })

  it('configures monthly donations and propagates subscription metadata', () => {
    const donation = { ...validDonation, frequency: 'monthly' as const }
    const params = buildCheckoutSessionParams(donation, 'https://example.com')

    expect(params.mode).toBe('subscription')
    expect(params.payment_intent_data).toBeUndefined()
    expect(params.subscription_data?.metadata).toEqual(params.metadata)
    expect(params.line_items?.[0]?.price_data).toMatchObject({
      recurring: { interval: 'month' },
      unit_amount: 2500,
    })
  })
})

describe('Checkout Session verification', () => {
  function stripeReturning(
    session: Partial<Stripe.Checkout.Session> & { payment_status: string; status: string },
  ): Stripe {
    return {
      checkout: {
        sessions: {
          retrieve: vi.fn().mockResolvedValue({
            metadata: {
              donation: 'true',
              earmark: 'General Donation',
              frequency: 'one-time',
            },
            mode: 'payment',
            ...session,
          }),
        },
      },
    } as unknown as Stripe
  }

  it('accepts only complete, paid Sessions as successful', async () => {
    await expect(
      verifyCheckoutSession(
        'cs_test_paid',
        stripeReturning({ status: 'complete', payment_status: 'paid' }),
      ),
    ).resolves.toBe('successful')
  })

  it('reports complete but unpaid Sessions as processing', async () => {
    await expect(
      verifyCheckoutSession(
        'cs_test_unpaid',
        stripeReturning({ status: 'complete', payment_status: 'unpaid' }),
      ),
    ).resolves.toBe('processing')
  })

  it.each([
    ['open', 'unpaid'],
    ['expired', 'unpaid'],
    ['complete', 'no_payment_required'],
  ] as const)('does not verify a %s/%s Session', async (status, paymentStatus) => {
    await expect(
      verifyCheckoutSession(
        'cs_test_invalid',
        stripeReturning({ status, payment_status: paymentStatus }),
      ),
    ).resolves.toBe('unverified')
  })

  it('gracefully handles inaccessible Sessions', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const stripe = {
      checkout: { sessions: { retrieve: vi.fn().mockRejectedValue(new Error('Not found')) } },
    } as unknown as Stripe

    await expect(verifyCheckoutSession('cs_test_invalid', stripe)).resolves.toBe('unverified')
    expect(errorSpy).toHaveBeenCalled()
  })

  it('rejects unrelated paid Checkout Sessions', async () => {
    await expect(
      verifyCheckoutSession(
        'cs_test_unrelated',
        stripeReturning({
          metadata: {},
          mode: 'payment',
          status: 'complete',
          payment_status: 'paid',
        }),
      ),
    ).resolves.toBe('unverified')
  })

  it('rejects malformed Session IDs without calling Stripe', async () => {
    const retrieve = vi.fn()
    const stripe = { checkout: { sessions: { retrieve } } } as unknown as Stripe

    await expect(verifyCheckoutSession('not-a-session', stripe)).resolves.toBe('unverified')
    expect(retrieve).not.toHaveBeenCalled()
  })
})

describe('checkout server function', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://example.com'
    createSession.mockReset()
    redirectMock.mockReset()
    redirectMock.mockImplementation((url: string) => {
      throw new Error(`NEXT_REDIRECT:${url}`)
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('redirects to the Stripe-hosted Checkout URL', async () => {
    createSession.mockResolvedValue({ url: 'https://checkout.stripe.com/test' })
    const { startCheckout } = await import('@/app/(frontend)/(site)/donate/actions')

    await expect(
      startCheckout({}, donationFormData(validDonation)),
    ).rejects.toThrow('NEXT_REDIRECT:https://checkout.stripe.com/test')
    expect(redirectMock).toHaveBeenCalledWith('https://checkout.stripe.com/test')
  })

  it('returns an error for invalid form submissions without calling Stripe', async () => {
    const { startCheckout } = await import('@/app/(frontend)/(site)/donate/actions')
    const result = await startCheckout({}, donationFormData({ ...validDonation, amount: '0.50' }))

    expect(result).toEqual({ error: 'Invalid donation details.' })
    expect(createSession).not.toHaveBeenCalled()
  })

  it('returns an error for a missing amount without calling Stripe', async () => {
    const { startCheckout } = await import('@/app/(frontend)/(site)/donate/actions')
    const result = await startCheckout(
      {},
      donationFormData({ frequency: 'one-time', earmark: 'General Donation' }),
    )

    expect(result).toEqual({ error: 'Invalid donation details.' })
    expect(createSession).not.toHaveBeenCalled()
  })

  it('logs Stripe failures and returns a generic error', async () => {
    const stripeError = new Error('Sensitive Stripe failure')
    createSession.mockRejectedValue(stripeError)
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)
    const { startCheckout } = await import('@/app/(frontend)/(site)/donate/actions')
    const result = await startCheckout({}, donationFormData(validDonation))

    expect(result).toEqual({ error: 'Secure checkout could not be started. Please try again.' })
    expect(redirectMock).not.toHaveBeenCalled()
    expect(errorSpy).toHaveBeenCalledWith('Unable to create Stripe Checkout Session:', stripeError)
  })
})

describe('donate page status', () => {
  it('does not treat a spoofed success query parameter as payment success', async () => {
    const { getDonationCheckoutStatus } = await import(
      '@/app/(frontend)/(site)/donate/page'
    )

    await expect(getDonationCheckoutStatus({ success: 'true' })).resolves.toBeUndefined()
  })
})
