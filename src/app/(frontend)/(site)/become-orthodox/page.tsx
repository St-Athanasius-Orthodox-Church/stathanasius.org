import type { Metadata } from 'next'
import Link from 'next/link'

import { Hero } from '@/components/ui/hero'
export const metadata: Metadata = {
  title: 'Become Orthodox',
  description:
    'Learn how to become Orthodox Christian. Information about catechism, baptism, and chrismation at St. Athanasius.',
}

export default function BecomeOrthodox() {
  return (
    <>
      <Hero
        size="medium"
        title="How to Become Orthodox"
        subtitle="The Journey into the Church"
      />

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <article className="mx-auto prose prose-lg max-w-none text-byzantine-blue">
          <div className="mb-12">
            <p className="leading-relaxed">
              Inquiring into the Orthodox Faith, becoming a Catechumen, and
              being received into the full sacramental life of the Church is a
              spiritual journey. The following is for you to have a mapped
              outline of this path, providing key information for your journey
              into the Orthodox Christian life.
            </p>
            <p className="leading-relaxed">
              It is expected for one&apos;s approach toward full reception into the
              Church to take a full year or longer in which you study the faith,
              adopt the practices and beliefs of the Faith as your own,
              consistently attend the services of the parish and join its life,
              and are forming relationships with Orthodox Christians. Your
              reception into the Church will change your life, therefore the
              Church in her wisdom embraces the varying lengths of time it may
              take for you to adapt your personal life to the Church&apos;s life
              before receiving you fully into the fold– chiefly by walking away
              from lifestyles and habits of sin accompanied by the ongoing
              spiritual counsel and cooperation with the Pastor.
            </p>
            <p className="leading-relaxed">
              This is a time to learn Orthodox teaching and make the Orthodox
              life your own. Eventually, an inquirer will understand the dogma
              and life of the Church enough to renounce all previously held
              heresies and any heterodox congregational leadership positions,
              and to make the commitment to live as an Orthodox Christian under
              the guidance of the parish&apos;s Pastor and Bishop. When you are ready
              for this, the Pastor will enroll you as a Catechumen with a
              prayer.
            </p>
            <p className="leading-relaxed">
              A Catechumen is one who is receiving instruction and personal
              guidance from the Pastor. They are purposefully spiritually
              preparing themselves to receive the Sacraments of Baptism,
              Chrismation, and Communion. The Catechumens of this parish come
              forward during the Prayer for the Catechumen at the Sunday Divine
              Liturgies and during the Pre-sanctified Liturgies during Great
              Lent. The traditional days in this parish for receiving converts
              are Holy Saturday and the Feast of Theophany.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Explore the Journey
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="mb-6 leading-relaxed">
              The sections below cover the main areas of this journey in more
              depth. Select a topic to continue.
            </p>
            <div className="grid gap-4">
              <Link
                href="/become-orthodox/stages-expectations"
                className="rounded border border-orthodox-gold/30 px-5 py-4 text-byzantine-blue transition hover:border-orthodox-gold hover:text-byzantine-blue/80"
              >
                The Stages and Expectations of Orthodox Conversion
              </Link>
              <Link
                href="/become-orthodox/reading-list"
                className="rounded border border-orthodox-gold/30 px-5 py-4 text-byzantine-blue transition hover:border-orthodox-gold hover:text-byzantine-blue/80"
              >
                A Recommended Reading List for Inquirers and Catechumens
              </Link>
              <Link
                href="/become-orthodox/icon-corner"
                className="rounded border border-orthodox-gold/30 px-5 py-4 text-byzantine-blue transition hover:border-orthodox-gold hover:text-byzantine-blue/80"
              >
                Setting up a Home Icon Corner
              </Link>
              <Link
                href="/become-orthodox/prayer-postures"
                className="rounded border border-orthodox-gold/30 px-5 py-4 text-byzantine-blue transition hover:border-orthodox-gold hover:text-byzantine-blue/80"
              >
                The Basic Postures and Movements of Orthodox Christian Prayer & Piety
              </Link>
              <Link
                href="/become-orthodox/beginning-to-fast"
                className="rounded border border-orthodox-gold/30 px-5 py-4 text-byzantine-blue transition hover:border-orthodox-gold hover:text-byzantine-blue/80"
              >
                Beginning to Fast with the Church
              </Link>
            </div>
          </div>
        </article>
      </section>
    </>
  )
}
