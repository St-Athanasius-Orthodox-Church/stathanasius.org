'use client'

import { useIsMobile } from '@/hooks/use-mobile'

export function CalendarEmbed() {
  const isMobile = useIsMobile()

  // Desktop: Full calendar embed view
  // Mobile: Agenda/list view optimized for mobile screens
  const calendarUrl = isMobile
    ? 'https://calendar.google.com/calendar/embed?src=office%40stathanasius.org&ctz=America%2FLos_Angeles&mode=AGENDA&showTitle=0&showNav=1&showPrint=0&showTabs=1&showCalendars=0'
    : 'https://calendar.google.com/calendar/embed?src=office%40stathanasius.org&ctz=America%2FLos_Angeles&showTitle=0&showNav=1&showPrint=0&showTabs=1&showCalendars=0'

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-lg bg-white shadow-lg">
        <iframe
          src={calendarUrl}
          className="h-[600px] w-full border-0 md:h-[700px]"
          title="St. Athanasius Orthodox Church Calendar"
        />
      </div>
    </section>
  )
}
