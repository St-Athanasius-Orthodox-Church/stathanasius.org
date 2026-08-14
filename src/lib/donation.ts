import { z } from 'zod'

export const EARMARK_OPTIONS = [
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

export const DONATION_FREQUENCIES = ['one-time', 'monthly'] as const
export const DONATION_FREQUENCY_LABELS = {
  'one-time': 'One-time',
  monthly: 'Recurring monthly',
} as const satisfies Record<(typeof DONATION_FREQUENCIES)[number], string>
export const MIN_DONATION_CENTS = 100
export const MAX_DONATION_CENTS = 10_000_000
export const DONATION_NOTES_MAX_LENGTH = 500

const dollarAmountPattern = /^\d+(?:\.\d{1,2})?$/

export function dollarsToCents(amount: string): number {
  const [dollars, fraction = ''] = amount.split('.')
  return Number(dollars) * 100 + Number(fraction.padEnd(2, '0'))
}

const amountSchema = z
  .string()
  .regex(dollarAmountPattern, 'Enter a valid dollar amount with no more than two decimal places.')
  .refine((amount) => {
    const cents = dollarsToCents(amount)
    return cents >= MIN_DONATION_CENTS && cents <= MAX_DONATION_CENTS
  }, 'Donation amount must be between $1.00 and $100,000.00.')

export const donationRequestSchema = z
  .object({
    amount: amountSchema,
    frequency: z.enum(DONATION_FREQUENCIES),
    earmark: z.enum(EARMARK_OPTIONS),
    comments: z.string().trim().max(DONATION_NOTES_MAX_LENGTH).optional(),
  })
  .strict()

export type DonationRequest = z.infer<typeof donationRequestSchema>
export type EarmarkOption = (typeof EARMARK_OPTIONS)[number]

export function resolveEarmark(value: string | undefined): EarmarkOption {
  if (value && EARMARK_OPTIONS.includes(value as EarmarkOption)) {
    return value as EarmarkOption
  }

  return 'General Donation'
}
