import type { Metadata } from 'next'

import { Hero } from '@/components/ui/hero'
import { CalendarEmbed } from './calendar-embed'

export const metadata: Metadata = {
  title: 'Calendar',
  description:
    'Upcoming services, feast days, and events at St. Athanasius Orthodox Church.',
}

export default function Calendar() {
  return (
    <>
      <Hero
        size="medium"
        title="Calendar"
        subtitle="Upcoming services and events"
      />

      <CalendarEmbed />
    </>
  )
}
