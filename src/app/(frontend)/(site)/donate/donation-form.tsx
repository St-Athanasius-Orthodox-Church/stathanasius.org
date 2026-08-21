'use client'

import { CircleCheckIcon, CircleXIcon, ClockIcon, TriangleAlertIcon } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import {
  DONATION_FREQUENCIES,
  DONATION_FREQUENCY_LABELS,
  DONATION_NOTES_MAX_LENGTH,
  EARMARK_OPTIONS,
  MAX_DONATION_CENTS,
  MIN_DONATION_CENTS,
  resolveEarmark,
} from '@/lib/donation'
import type { DonationCheckoutStatus } from '@/lib/stripe-checkout'

type DonationFormProps = {
  checkoutStatus?: DonationCheckoutStatus | 'canceled'
  initialEarmark?: string
  portalURL?: string
}

export function DonationForm({ checkoutStatus, initialEarmark, portalURL }: DonationFormProps) {
  const [data, setData] = useState({
    amount: '',
    frequency: 'one-time',
    earmark: resolveEarmark(initialEarmark),
    comments: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState<string>()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmissionError(undefined)

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result: unknown = await response.json()

      if (
        !response.ok ||
        typeof result !== 'object' ||
        result === null ||
        !('url' in result) ||
        typeof result.url !== 'string'
      ) {
        throw new Error('Checkout Session creation failed.')
      }

      window.location.assign(result.url)
    } catch {
      setSubmissionError('Secure checkout could not be started. Please try again.')
      setIsSubmitting(false)
    }
  }

  function setField<K extends keyof typeof data>(key: K, value: (typeof data)[K]) {
    setData((previous) => ({ ...previous, [key]: value }))
  }

  return (
    <Card variant="orthodox" goldBorderTop className="w-full max-w-lg mx-auto gap-4 rounded-lg">
      <CardHeader className="pb-0 text-center">
        <CardTitle className="font-cinzel text-2xl font-semibold text-byzantine-blue md:text-3xl">
          Make a Donation
        </CardTitle>
      </CardHeader>

      <CardContent>
        {checkoutStatus === 'successful' && (
          <Alert variant="success" className="mb-6">
            <CircleCheckIcon />
            <AlertTitle>Thank You for Your Donation!</AlertTitle>
            <AlertDescription>
              Your payment was successful. May God bless you for your support of St. Athanasius
              Orthodox Church.
            </AlertDescription>
          </Alert>
        )}
        {checkoutStatus === 'processing' && (
          <Alert className="mb-6">
            <ClockIcon />
            <AlertTitle>Payment Still Processing</AlertTitle>
            <AlertDescription>
              Stripe is still processing your payment. Please check your email for confirmation.
            </AlertDescription>
          </Alert>
        )}
        {checkoutStatus === 'canceled' && (
          <Alert className="mb-6">
            <CircleXIcon />
            <AlertTitle>Checkout Canceled</AlertTitle>
            <AlertDescription>No payment was made. You can try again below.</AlertDescription>
          </Alert>
        )}
        {checkoutStatus === 'unverified' && (
          <Alert variant="destructive" className="mb-6">
            <TriangleAlertIcon />
            <AlertTitle>Unable to Verify Checkout</AlertTitle>
            <AlertDescription>
              We could not verify this checkout with Stripe. Please check your email or contact the
              church office before trying again.
            </AlertDescription>
          </Alert>
        )}

        <div className="mb-6 space-y-4 text-center text-byzantine-blue/90">
          <p>
            We thank you for considering a donation to St. Athanasius Orthodox Church. Your
            generosity will help us continue and grow our many worthy ministries - to the
            glorification of our Lord and Savior, Jesus Christ.
          </p>
          <p>
            To make a donation, please fill out the secure donation form below. If you would like to
            make a donation by phone, please call our church office at{' '}
            <a href="tel:805-685-5400" className="font-medium text-orthodox-gold hover:underline">
              805-685-5400
            </a>
            .
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <FieldGroup>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="amount" className="text-byzantine-blue">
                  Donation Amount
                </FieldLabel>
                <Input
                  id="amount"
                  type="number"
                  min={MIN_DONATION_CENTS / 100}
                  max={MAX_DONATION_CENTS / 100}
                  step="0.01"
                  value={data.amount}
                  onChange={(event) => setField('amount', event.target.value)}
                  placeholder="$0.00"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="frequency" className="text-byzantine-blue">
                  Frequency
                </FieldLabel>
                <NativeSelect
                  id="frequency"
                  value={data.frequency}
                  onChange={(event) => setField('frequency', event.target.value)}
                  required
                  wrapperClassName="w-full"
                  className="w-full"
                >
                  {DONATION_FREQUENCIES.map((frequency) => (
                    <NativeSelectOption key={frequency} value={frequency}>
                      {DONATION_FREQUENCY_LABELS[frequency]}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="earmark" className="text-byzantine-blue">
                Earmark
              </FieldLabel>
              <NativeSelect
                id="earmark"
                value={data.earmark}
                onChange={(event) => setField('earmark', resolveEarmark(event.target.value))}
                required
                wrapperClassName="w-full"
                className="w-full"
              >
                {EARMARK_OPTIONS.map((option) => (
                  <NativeSelectOption key={option} value={option}>
                    {option}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </Field>

            <Field>
              <FieldLabel htmlFor="comments" className="text-byzantine-blue">
                Comments & Notes <span className="text-muted-foreground">(optional)</span>
              </FieldLabel>
              <Textarea
                id="comments"
                value={data.comments}
                onChange={(event) => setField('comments', event.target.value)}
                maxLength={DONATION_NOTES_MAX_LENGTH}
                rows={4}
              />
            </Field>

            {submissionError && (
              <Alert variant="destructive">
                <TriangleAlertIcon />
                <AlertTitle>Unable to Continue</AlertTitle>
                <AlertDescription>{submissionError}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              variant="byzantineGold"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting && <Spinner />}
              {isSubmitting ? 'Opening secure checkout...' : 'Continue to secure checkout'}
            </Button>

            {portalURL && (
              <section className="border-t border-orthodox-gold/35 pt-6 text-center">
                <a
                  href={portalURL}
                  className="font-semibold text-[#4169e1] underline underline-offset-4 hover:text-[#3151b7]"
                >
                  Manage existing donations
                </a>
              </section>
            )}
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
