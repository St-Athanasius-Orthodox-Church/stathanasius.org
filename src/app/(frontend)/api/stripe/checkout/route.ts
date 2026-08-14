import { donationRequestSchema } from '@/lib/donation'
import { getStripe } from '@/lib/stripe'
import { buildCheckoutSessionParams } from '@/lib/stripe-checkout'
import { getServerSideURL } from '@/utilities/getURL'

export async function POST(request: Request): Promise<Response> {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid donation details.' }, { status: 400 })
  }

  const result = donationRequestSchema.safeParse(body)

  if (!result.success) {
    return Response.json({ error: 'Invalid donation details.' }, { status: 400 })
  }

  try {
    const session = await getStripe().checkout.sessions.create(
      buildCheckoutSessionParams(result.data, getServerSideURL()),
    )

    if (!session.url) {
      throw new Error('Stripe Checkout Session did not include a redirect URL.')
    }

    return Response.json({ url: session.url })
  } catch (error) {
    console.error('Unable to create Stripe Checkout Session:', error)
    return Response.json({ error: 'Unable to start secure checkout.' }, { status: 500 })
  }
}
