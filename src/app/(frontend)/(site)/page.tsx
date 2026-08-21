import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  BookOpenIcon,
  CalendarIcon,
  ClockIcon,
  FileTextIcon,
  ImageIcon,
  MailIcon,
  MapPinIcon,
  Mic2Icon,
  PhoneIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Hero } from '@/components/ui/hero'
import { Hyperlink } from '@/components/ui/hyperlink'
import { formatPostDate } from '@/lib/posts'
import { getRecentItems, type RecentItemType } from '@/lib/recent'
const bishopUrl = '/assets/bishop.jpg'
const fr1Url = '/assets/fr1.jpg'
const preachUrl = '/assets/preach.jpg'
const theophanyUrl = '/assets/theophany.jpg'

export const metadata: Metadata = {
  title: 'Welcome',
  description:
    'St. Athanasius Antiochian Orthodox Church in Santa Barbara, CA. Join us for Divine Liturgy, learn about Orthodox Christianity, and become part of our community.',
}

export const revalidate = 600

function RecentItemIcon({ type }: { type: RecentItemType }) {
  const iconClass = 'size-10 text-byzantine-blue/30'

  switch (type) {
    case 'blog':
      return <BookOpenIcon className={iconClass} />
    case 'photos':
      return <ImageIcon className={iconClass} />
    case 'homily':
      return <Mic2Icon className={iconClass} />
    case 'bulletin':
      return <FileTextIcon className={iconClass} />
  }
}

export default async function Welcome() {
  const recentItems = await getRecentItems(5)
  return (
    <>
      <Hero
        size="full"
        gradientIntensity="light"
        title="Welcome to St. Athanasius"
        subtitle="Come and See the Beauty of Orthodox Christianity"
        actions={
          <>
            <Button asChild variant="byzantineGold" size="xl">
              <Link href="#services">Visit Us</Link>
            </Button>
            <Button asChild variant="byzantineOutline" size="xl">
              <Link href="#contact-us">Contact Us</Link>
            </Button>
            <Button asChild variant="byzantineOutline" size="xl">
              <Link href="#what-is-orthodoxy">What is Orthodoxy?</Link>
            </Button>
          </>
        }
      />

      {/* Recently Section */}
      <section className="container mx-auto max-w-5xl px-4 py-16" id="recently">
        <h2 className="heading-orthodox mb-2 text-center text-3xl font-semibold md:text-4xl">
          Recently
        </h2>
        <div className="mx-auto mb-10 h-0.5 w-16" style={{ background: 'var(--orthodox-gold)' }} />

        {recentItems.length === 0 ? null : (
          <div className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0 lg:pb-0">
            {recentItems.map((item) => (
              <Link
                key={`${item.type}-${item.href}`}
                href={item.href}
                className="group w-[85%] shrink-0 snap-start overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:border-orthodox-gold/50 hover:shadow-lg sm:w-[calc((100%-1.5rem)/2)] lg:w-auto"
                target="_blank"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-byzantine-blue/10">
                      <RecentItemIcon type={item.type} />
                    </div>
                  )}
                  <span className="absolute top-3 left-3 rounded-full bg-byzantine-blue/90 px-2.5 py-1 text-xs font-medium text-white">
                    {item.type_label}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-2 font-cinzel text-base font-medium text-byzantine-blue transition-colors group-hover:text-orthodox-gold">
                    {item.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <CalendarIcon className="size-3.5" />
                    {formatPostDate(item.date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Services Section */}
      <section className="container mx-auto max-w-5xl px-4 py-16" id="services">
        <h2 className="heading-orthodox mb-2 text-center text-3xl font-semibold md:text-4xl">
          Services
        </h2>
        <div className="mx-auto mb-10 h-0.5 w-16" style={{ background: 'var(--orthodox-gold)' }} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Service Cards */}
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            {/* Saturday */}
            <Card
              variant="orthodox"
              goldBorderTop
              className="rounded-lg sm:flex-1 sm:basis-[calc(50%-0.5rem)]"
            >
              <CardContent className="p-6 py-0">
                <h3 className="mb-4 text-center font-cinzel text-xl font-semibold text-byzantine-blue">
                  Saturday
                </h3>
                <div className="flex justify-between gap-2">
                  <span className="font-medium">Great Vespers</span>
                  <span className="text-sm text-burgundy">5:30 PM</span>
                </div>
              </CardContent>
            </Card>

            {/* Sunday */}
            <Card
              variant="orthodox"
              goldBorderTop
              className="rounded-lg sm:flex-1 sm:basis-[calc(50%-0.5rem)]"
            >
              <CardContent className="p-6 py-0">
                <h3 className="mb-4 text-center font-cinzel text-xl font-semibold text-byzantine-blue">
                  Sunday
                </h3>
                <div className="flex justify-between gap-2">
                  <span className="font-medium">Matins</span>
                  <span className="text-sm text-burgundy">9:00 AM</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="font-medium">Divine Liturgy</span>
                  <span className="text-sm text-burgundy">10:00 AM</span>
                </div>
              </CardContent>
            </Card>

            {/* Other */}
            <Card variant="orthodox" goldBorderTop className="w-full rounded-lg">
              <CardContent className="p-6 py-0">
                <h3 className="mb-4 text-center font-cinzel text-xl font-semibold text-byzantine-blue">
                  Other
                </h3>
                <div className="flex justify-between gap-2">
                  <span className="font-medium">Daily Vespers</span>
                  <span className="text-sm text-burgundy">Tuesday/Thursday 5:30 PM</span>
                </div>
                <div className="mb-4 flex justify-between gap-2">
                  <span className="font-medium">Bible Study</span>
                  <span className="text-sm text-burgundy">Tuesday 6:00 PM</span>
                </div>
                <p className="leading-relaxed">
                  For weekday and feast day services, please check the{' '}
                  <Hyperlink href="/calendar" className="font-medium">
                    calendar
                  </Hyperlink>
                  .
                </p>
              </CardContent>
            </Card>

            <div className="mt-4 w-full text-center">
              <Button asChild variant="byzantineGold" size="xl">
                <Link href="/calendar">View Full Calendar</Link>
              </Button>
            </div>
          </div>

          {/* Google Maps */}
          <div
            className="overflow-hidden rounded-lg shadow-lg"
            style={{ border: '2px solid var(--parchment)' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.716770163627!2d-119.81655222239607!3d34.43394877301571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e93f69b6b77a29%3A0x310258d0bbe016e4!2sSt.%20Athanasius%20Orthodox%20Church!5e0!3m2!1sen!2sus!4v1765230570761!5m2!1sen!2sus"
              style={{ border: 0 }}
              className="h-full min-h-[350px] w-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="St. Athanasius Orthodox Church location"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16" style={{ background: 'var(--soft-cream)' }} id="what-is-orthodoxy">
        <h2 className="heading-orthodox mb-2 text-center text-3xl font-semibold md:text-4xl">
          What is Orthodox Christianity?
        </h2>
        <div className="mx-auto mb-10 h-0.5 w-16" style={{ background: 'var(--orthodox-gold)' }} />

        <div className="container mx-auto flex max-w-6xl flex-col gap-16 px-4">
          {/* What is the Orthodox Church? */}
          <div className="flex flex-col items-center gap-8 md:flex-row-reverse md:gap-12">
            <div className="flex-1">
              <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
                What is the Orthodox Church?
              </h2>
              <div className="mb-6 h-0.5 w-12" style={{ background: 'var(--orthodox-gold)' }} />
              <div className="prose prose-lg max-w-none" style={{ color: 'var(--byzantine-blue)' }}>
                <p>
                  To be Orthodox is to have the correct and complete (Ortho-) doctrine and worship
                  (-dox) of Jesus Christ and to live as He taught us to live; that is, to love God
                  with all your heart, with all your soul, with all your mind, with all your
                  strength, and to love your neighbor as yourself.
                </p>
                <p>
                  <strong>
                    The Orthodox Church is the gathering of the believers to be the Body of Jesus
                    Christ
                  </strong>
                  <br />
                  <strong>We gather in His name</strong>
                  <br />
                  <strong>We share a common faith and love in Him</strong>
                  <br />
                  <strong>
                    We affirm the truth and fullness of our faith and experience of Him
                  </strong>
                  <br />
                  <strong>We proclaim the Good News of Jesus Christ in word and deed.</strong>
                </p>
                <p>
                  The Orthodox Church traces its origin back to Jesus Christ and His Apostles and
                  came into the fullness of its life on Pentecost, 50 days after Jesus Christ's
                  defeat of death by His rising from the dead. We are part of the unbroken chain of
                  the Apostles' laying on of hands from one Bishop to the next as they established
                  communities that worship, fellowship, serve, and grow in discipleship throughout
                  the world. Today there are over 250 million Eastern Orthodox Christians throughout
                  the world and over 1.5 million in the United States who gather in some 2800
                  parishes and monasteries.
                </p>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <img
                  src={theophanyUrl}
                  alt="What is the Orthodox Church?"
                  className="h-auto w-full"
                />
                <div
                  className="absolute inset-0 rounded-lg ring-1 ring-inset"
                  style={{
                    ['--tw-ring-color' as string]: 'var(--orthodox-gold)',
                    opacity: 0.3,
                  }}
                />
              </div>
            </div>
          </div>

          {/* What will I see? */}
          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
            <div className="flex-1">
              <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
                What will I see?
              </h2>
              <div className="mb-6 h-0.5 w-12" style={{ background: 'var(--orthodox-gold)' }} />
              <div className="prose prose-lg max-w-none" style={{ color: 'var(--byzantine-blue)' }}>
                <p>
                  In our parish you will see a community united together as we turn toward our
                  Savior and God, Jesus Christ, the Son of the Heavenly Father. You will find people
                  embracing a way of life set apart from the world even as we live in it. You will
                  experience a community preserving, through the activity of the Holy Spirit, the
                  deposit of Faith given to us from Jesus Christ through the Apostles. You will see
                  a people experiencing and acknowledging the holiness and majesty of God.
                </p>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <img src={fr1Url} alt="What will I see?" className="h-auto w-full" />
                <div
                  className="absolute inset-0 rounded-lg ring-1 ring-inset"
                  style={{
                    ['--tw-ring-color' as string]: 'var(--orthodox-gold)',
                    opacity: 0.3,
                  }}
                />
              </div>
            </div>
          </div>

          {/* What we believe */}
          <div className="flex flex-col items-center gap-8 md:flex-row-reverse md:gap-12">
            <div className="flex-1">
              <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
                What we believe
              </h2>
              <div className="mb-6 h-0.5 w-12" style={{ background: 'var(--orthodox-gold)' }} />
              <div className="prose prose-lg max-w-none" style={{ color: 'var(--byzantine-blue)' }}>
                <p>
                  We believe in the Holy Trinity: Father, Son, and Holy Spirit; one in essence and
                  in love and distinct only in persons, whom we worship and glorify. We believe in
                  the Son who became Man for our salvation who suffered and died and rose from the
                  dead during the reign of Pontius Pilate.
                </p>
                <p>
                  We believe in the scriptures of the Old and New Testament as the record of God's
                  works with His People and understand them through the activity of the Holy Spirit
                  who preserves and guides unchanging Tradition of the Church. We believe that the
                  Tradition is Holy and is the life of God's people and unites us believers
                  throughout time. All of these attest to our salvation in Jesus Christ.
                </p>
                <p>
                  We believe that the Church is One Holy Catholic and Apostolic and preserved by the
                  promise of Jesus Christ that "the gates of hell will not prevail against it."
                </p>
                <p>
                  We believe that the Church is where we are able to work out our salvation in Jesus
                  Christ freely with fear and trembling that we may be united to God.
                </p>
                <p>
                  Every Sunday During the Divine Liturgy, and at many other times, we proclaim these
                  things in unison by reciting the Nicene-Constantinopolitan Creed.
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <img src={preachUrl} alt="What we believe" className="h-auto w-full" />
                <div
                  className="absolute inset-0 rounded-lg ring-1 ring-inset"
                  style={{
                    ['--tw-ring-color' as string]: 'var(--orthodox-gold)',
                    opacity: 0.3,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
            <div className="flex-1">
              <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
                How we live
              </h2>
              <div className="mb-6 h-0.5 w-12" style={{ background: 'var(--orthodox-gold)' }} />
              <div className="prose prose-lg max-w-none" style={{ color: 'var(--byzantine-blue)' }}>
                <p>
                  We serve God through our public worship, the serving of the Sacraments and in our
                  private prayers. Weekly we gather to proclaim His salvation, participate in the
                  common action of the Divine Liturgy, and commune with God in the Sacrament of
                  Eucharist. We gather more often during the week for communal prayer services to
                  know God, discern His will, to thank Him, and to ask for his mercy and grace.
                  Through the year we celebrate Feast Days that are commemorations and enactments of
                  the events of our salvation. We regularly serve the sacraments to be united to God
                  throughout our lives.
                </p>
                <p>
                  We serve others through fellowship, discipleship, and stewardship. In our
                  fellowship we are united in our common faith and life as we travel further into
                  the Kingdom of God. We serve each other with love, respect, and hospitality as
                  fellow members in the Body of Christ. We are discipled in the Church through the
                  Pastoral relationship with our priest to deepen our communion with God. We are
                  stewards of the gifts God has given us by offering our time, talents, and
                  treasures back to Him in the communal life of the parish.
                </p>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative overflow-hidden rounded-lg shadow-xl">
                <img src={bishopUrl} alt="What will I see?" className="h-auto w-full" />
                <div
                  className="absolute inset-0 rounded-lg ring-1 ring-inset"
                  style={{
                    ['--tw-ring-color' as string]: 'var(--orthodox-gold)',
                    opacity: 0.3,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="container mx-auto max-w-3xl px-4 py-16">
        <h2 className="heading-orthodox mb-2 text-center text-3xl font-semibold md:text-4xl">
          Contact Us
        </h2>
        <div className="mx-auto mb-10 h-0.5 w-16" style={{ background: 'var(--orthodox-gold)' }} />

        <Card variant="orthodox" className="rounded-lg">
          <CardContent className="grid gap-6 p-8 py-0 sm:grid-cols-2">
            {/* Address */}
            <div>
              <h3 className="mb-2 font-cinzel text-lg font-semibold text-byzantine-blue">
                <MapPinIcon className="mr-2 inline-block h-4 w-4 text-orthodox-gold" />
                Address
              </h3>
              <p className="leading-relaxed text-foreground/80">
                300 Sumida Gardens Lane, Santa Barbara, CA 93111
              </p>
            </div>

            {/* Phone */}
            <div>
              <h3 className="mb-2 font-cinzel text-lg font-semibold text-byzantine-blue">
                <PhoneIcon className="mr-2 inline-block h-4 w-4 text-orthodox-gold" />
                Phone
              </h3>
              <a
                href="tel:805-685-5400"
                className="h-auto p-0 text-burgundy underline underline-offset-2 hover:text-burgundy-dark"
              >
                805-685-5400
              </a>
            </div>

            {/* Email */}
            <div>
              <h3 className="mb-2 font-cinzel text-lg font-semibold text-byzantine-blue">
                <MailIcon className="mr-2 inline-block h-4 w-4 text-orthodox-gold" />
                Email
              </h3>
              <a
                href="mailto:office@stathanasius.org"
                className="h-auto p-0 text-burgundy underline underline-offset-2 hover:text-burgundy-dark"
              >
                office@stathanasius.org
              </a>
            </div>

            <div>
              <h3 className="mb-2 font-cinzel text-lg font-semibold text-byzantine-blue">
                <ClockIcon className="mr-2 inline-block h-4 w-4 text-orthodox-gold" />
                Office Hours
              </h3>
              <span className="h-auto p-0">Tuesday - Friday: 12:00 PM - 5:00 PM</span>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  )
}
