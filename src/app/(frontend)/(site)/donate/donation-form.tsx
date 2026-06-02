'use client'

import { CircleCheckIcon } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Field,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select'
import { Textarea } from '@/components/ui/textarea'

const EARMARK_OPTIONS = [
  'General Donation',
  'Tithe',
  'Temple Fund',
  "Pastor's Fund",
  'St. Athanasius Bookstore',
  "Women's Fellowship Service Project",
  'Agape Meal',
  'Pre-marital Counseling',
  'St. Brigid Fellowship',
  'Retreat Registration',
  '2026 CGS Formation Course',
  '2025 Golf Tournament General Donation',
  'Sponsor Fr Nicholas - Hole 10',
  'Dn Richard - Putting Contest',
  'Project Mexico Mission Team',
] as const

type EarmarkOption = (typeof EARMARK_OPTIONS)[number]

function resolveEarmark(value: string | undefined): EarmarkOption {
  if (value && EARMARK_OPTIONS.includes(value as EarmarkOption)) {
    return value as EarmarkOption
  }
  return 'General Donation'
}

type DonationFormProps = {
  isSuccess?: boolean
  initialEarmark?: string
}

export function DonationForm({
  isSuccess = false,
  initialEarmark,
}: DonationFormProps) {
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    street_address: '',
    city: '',
    country: 'United States',
    state: 'California',
    zip: '',
    email: '',
    phone: '',
    amount: '',
    earmark: resolveEarmark(initialEarmark),
    comments: '',
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
  }

  function setField<K extends keyof typeof data>(key: K, value: (typeof data)[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Card
      variant="orthodox"
      goldBorderTop
      className="w-full max-w-2xl gap-4 rounded-lg"
    >
      <CardHeader className="pb-0 text-center">
        <CardTitle className="font-cinzel text-2xl font-semibold text-byzantine-blue md:text-3xl">
          Make a Donation
        </CardTitle>
      </CardHeader>

      <CardContent>
        {isSuccess && (
          <Alert variant="success" className="mb-6">
            <CircleCheckIcon />
            <AlertTitle>Thank You for Your Donation!</AlertTitle>
            <AlertDescription>
              Your generous gift has been received. May God bless you for your
              support of St. Athanasius Orthodox Church.
            </AlertDescription>
          </Alert>
        )}

        <div className="mb-6 space-y-4 text-center text-byzantine-blue/90">
          <p>
            We thank you for considering a donation to St. Athanasius Orthodox
            Church. Your generosity will help us continue and grow our many
            worthy ministries - to the glorification of our Lord and Savior,
            Jesus Christ.
          </p>
          <p>
            To make a donation, please fill out the secure donation form below.
            If you would like to make a donation by phone, please call our church
            office at{' '}
            <a
              href="tel:805-685-5400"
              className="font-medium text-orthodox-gold hover:underline"
            >
              805-685-5400
            </a>
            .
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="first_name" className="text-byzantine-blue">
                  First Name
                </FieldLabel>
                <Input
                  id="first_name"
                  type="text"
                  value={data.first_name}
                  onChange={(e) => setField('first_name', e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="last_name" className="text-byzantine-blue">
                  Last Name
                </FieldLabel>
                <Input
                  id="last_name"
                  type="text"
                  value={data.last_name}
                  onChange={(e) => setField('last_name', e.target.value)}
                  required
                />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="street_address" className="text-byzantine-blue">
                Street Address
              </FieldLabel>
              <Input
                id="street_address"
                type="text"
                value={data.street_address}
                onChange={(e) => setField('street_address', e.target.value)}
                required
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="city" className="text-byzantine-blue">
                  City
                </FieldLabel>
                <Input
                  id="city"
                  type="text"
                  value={data.city}
                  onChange={(e) => setField('city', e.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="state" className="text-byzantine-blue">
                  State
                </FieldLabel>
                <Input
                  id="state"
                  type="text"
                  value={data.state}
                  onChange={(e) => setField('state', e.target.value)}
                  required
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="zip" className="text-byzantine-blue">
                  ZIP/Postal Code
                </FieldLabel>
                <Input
                  id="zip"
                  type="text"
                  value={data.zip}
                  onChange={(e) => setField('zip', e.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="country" className="text-byzantine-blue">
                  Country
                </FieldLabel>
                <Input
                  id="country"
                  type="text"
                  value={data.country}
                  onChange={(e) => setField('country', e.target.value)}
                  required
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="email" className="text-byzantine-blue">
                  E-mail Address
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setField('email', e.target.value)}
                  autoComplete="email"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="phone" className="text-byzantine-blue">
                  Phone Number
                </FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  value={data.phone}
                  onChange={(e) => setField('phone', e.target.value)}
                  autoComplete="tel"
                  required
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="amount" className="text-byzantine-blue">
                  Donation Amount
                </FieldLabel>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  step="0.01"
                  value={data.amount}
                  onChange={(e) => setField('amount', e.target.value)}
                  placeholder="$0.00"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="earmark" className="text-byzantine-blue">
                  Earmark
                </FieldLabel>
                <NativeSelect
                  id="earmark"
                  value={data.earmark}
                  onChange={(e) =>
                    setField('earmark', resolveEarmark(e.target.value))
                  }
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
            </div>

            <Field>
              <FieldLabel htmlFor="comments" className="text-byzantine-blue">
                Comments & Notes{' '}
                <span className="text-muted-foreground">(optional)</span>
              </FieldLabel>
              <Textarea
                id="comments"
                value={data.comments}
                onChange={(e) => setField('comments', e.target.value)}
                rows={4}
              />
            </Field>

            <Button
              type="submit"
              variant="byzantineGold"
              size="lg"
              className="w-full"
            >
              Submit Donation
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
