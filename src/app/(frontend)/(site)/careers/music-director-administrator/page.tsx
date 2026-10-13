import type { Metadata } from 'next'

import { Hero } from '@/components/ui/hero'
export const metadata: Metadata = {
  title: 'Parish Music Director and Administrator Position',
  description:
    'St. Athanasius Orthodox Church is hiring a full-time Parish Music Director and Administrator.',
  robots: { index: false, follow: false },
}

export default function MusicDirectorAdministrator() {
  return (
    <>
      <Hero
        size="medium"
        title="Parish Music Director and Administrator Position"
      />

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <article className="mx-auto prose prose-lg max-w-none text-byzantine-blue">
          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Join Our Parish Staff
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />

            <p className="leading-relaxed">
              St. Athanasius Orthodox Church is hiring a service-minded
              professional to support its worship and parish life. A full-time
              position serving in a dual role as a Music Director and an
              Administrator.
            </p>
            <p className="mt-3 leading-relaxed">
              The Music Director related responsibilities are leading the
              liturgical music ministry, preparing music for services,
              developing choir members and chanters, and encouraging reverent
              congregational participation.
            </p>
            <p className="mt-3 leading-relaxed">
              The Administrative role&apos;s responsibilities are to coordinate
              office operations, communications, calendars, events, records,
              finances, facilities, vendors, staff, and volunteers.
            </p>
            <p className="mt-3 leading-relaxed">
              The ideal candidate must be a practicing, baptized Orthodox
              Christian, committed to Orthodox parish life, be proactive,
              collaborative, organized, with strong vocal and music-leadership
              skills, and effective communication, technology, and financial
              skills.
            </p>
            <p className="mt-3 leading-relaxed">
              Join a mission-focused faith community where your talents, sound
              judgment, and dedication can help worship, ministries, and parish
              operations thrive.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Job Descriptions
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <ul>
              <li>
                <a
                  href="/careers/music-director-job-description.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Music Director Job Description (PDF)
                </a>
              </li>
              <li>
                <a
                  href="/careers/parish-administrator-job-description.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Parish Administrator Job Description (PDF)
                </a>
              </li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              How to Apply
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              Please send your resume with a cover letter to apply for the
              position to{' '}
              <a href="mailto:frsymeon@stathanasius.org">
                frsymeon@stathanasius.org
              </a>
              .
            </p>
          </div>
        </article>
      </section>
    </>
  )
}
