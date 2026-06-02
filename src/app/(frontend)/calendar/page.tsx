import type { Metadata } from 'next'

import { Hero } from '@/components/ui/hero'
import { MainLayout } from '@/layouts/main-layout'

import { CalendarEmbed } from './calendar-embed'

export const metadata: Metadata = {
  title: 'Calendar',
  description:
    'Upcoming services, feast days, and events at St. Athanasius Orthodox Church.',
}

export default function Calendar() {
  return (
    <MainLayout>
      <Hero
        size="medium"
        title="Calendar"
        subtitle="Upcoming services and events"
      />

      <CalendarEmbed />
    </MainLayout>
  )
}
