export type Bulletin = {
  id: number
  date: string
  pdf_url: string | null
}

/** Placeholder until bulletins are wired from Payload. */
export const bulletins: Bulletin[] = []

export function formatBulletinDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
