// Google Calendar renders a compact agenda view for small screens and the
// full grid otherwise. Two iframes toggled with CSS keep this a server
// component - no viewport-detection JavaScript needed.
const MOBILE_CALENDAR_URL =
  'https://calendar.google.com/calendar/embed?src=office%40stathanasius.org&ctz=America%2FLos_Angeles&mode=AGENDA&showTitle=0&showNav=1&showPrint=0&showTabs=1&showCalendars=0'
const DESKTOP_CALENDAR_URL =
  'https://calendar.google.com/calendar/embed?src=office%40stathanasius.org&ctz=America%2FLos_Angeles&showTitle=0&showNav=1&showPrint=0&showTabs=1&showCalendars=0'

export function CalendarEmbed() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-lg bg-white shadow-lg">
        <iframe
          src={MOBILE_CALENDAR_URL}
          className="h-[600px] w-full border-0 md:hidden"
          title="St. Athanasius Orthodox Church Calendar"
        />
        <iframe
          src={DESKTOP_CALENDAR_URL}
          className="hidden h-[600px] w-full border-0 md:block md:h-[700px]"
          title="St. Athanasius Orthodox Church Calendar"
        />
      </div>
    </section>
  )
}
