import type { Metadata } from 'next'

import { Hero } from '@/components/ui/hero'
import { MainLayout } from '@/layouts/main-layout'

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Orthodox Christian resources, books, and links from St. Athanasius Orthodox Church.',
}

export default function Resources() {
  return (
    <MainLayout>
      <Hero
        size="medium"
        title="Resources"
        subtitle="Helpful resources for your Orthodox journey"
      />

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <article className="mx-auto prose prose-lg max-w-none text-byzantine-blue">
          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Online Resources
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <ul className="space-y-3 leading-relaxed">
              <li>
                <a
                  href="http://www.antiochian.org/"
                  className="text-orthodox-gold underline hover:text-orthodox-gold/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Antiochian Orthodox Archdiocese of North America
                </a>
              </li>
              <li>
                <a
                  href="https://www.akathists.com/"
                  className="text-orthodox-gold underline hover:text-orthodox-gold/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Akathists.com
                </a>{' '}
                - a site with many Akathist prayer services to saints.
              </li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              YouTube Channels
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <ul className="space-y-3 leading-relaxed">
              <li>
                <a
                  href="https://www.youtube.com/@PatristicNectarFilms/"
                  className="text-orthodox-gold underline hover:text-orthodox-gold/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Patristic Nectar Films
                </a>{' '}
                (Fr. Josiah Trenham&apos;s online work)
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@FatherSpyridonROCOR"
                  className="text-orthodox-gold underline hover:text-orthodox-gold/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fr. Spyridon
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@frpaul"
                  className="text-orthodox-gold underline hover:text-orthodox-gold/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fr. Paul Truebenbach
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@FatherTurbo"
                  className="text-orthodox-gold underline hover:text-orthodox-gold/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fr. Turbo Qualls
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@TheRoyalPath/"
                  className="text-orthodox-gold underline hover:text-orthodox-gold/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The Royal Path
                </a>{' '}
                (Fr. Turbo Qualls&apos; group podcast)
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@OrthodoxWisdom/"
                  className="text-orthodox-gold underline hover:text-orthodox-gold/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Orthodox Wisdom
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@otelders/"
                  className="text-orthodox-gold underline hover:text-orthodox-gold/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Orthodox Teaching of the Elders
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@Trisagionfilms/"
                  className="text-orthodox-gold underline hover:text-orthodox-gold/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Trisagion Films
                </a>
                , especially the films playlist called &ldquo;Saints of the Orthodox
                Church&rdquo; -{' '}
                <a
                  href="https://youtube.com/playlist?list=PL0AwxAWi5VQ33OaRuyXmi1mlpmSggxp7V&si=Re98vAYFkqJ5mTFf"
                  className="text-orthodox-gold underline hover:text-orthodox-gold/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Playlist
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@ProtectingVeil/"
                  className="text-orthodox-gold underline hover:text-orthodox-gold/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Protecting Veil
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@JonathanPageau/"
                  className="text-orthodox-gold underline hover:text-orthodox-gold/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Symbolic World
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/playlist?list=PLU2phFsLe3HP2Jqh-4NIfapX71MzTjvLm&si=W_SPxXxvO4UwLrzl"
                  className="text-orthodox-gold underline hover:text-orthodox-gold/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lives of Saints from Bible Illustrated called &ldquo;The Reliquary&rdquo;
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@AMENDOMSE/"
                  className="text-orthodox-gold underline hover:text-orthodox-gold/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AMEN
                </a>{' '}
                (Men&apos;s Ministry of the Diocese of Miami and the South)
              </li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Podcasts
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <div className="mb-6">
              <p className="mb-4 leading-relaxed">
                <a
                  href="http://www.ancientfaith.com"
                  className="text-orthodox-gold underline hover:text-orthodox-gold/80"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ancient Faith Radio
                </a>
              </p>
              <p className="mb-3 font-semibold leading-relaxed">
                From Ancient Faith Radio:
              </p>
              <ul className="space-y-3 pl-6 leading-relaxed">
                <li>
                  <strong>&ldquo;The Whole Counsel of God&rdquo;</strong> by Fr. Stephen De
                  Young offering a verse by verse Bible study.
                </li>
                <li>
                  <strong>&ldquo;Saint of the Day&rdquo;</strong> is a reading of the life of
                  a saint commemorated that day.
                </li>
                <li>
                  <strong>&ldquo;The Path&rdquo;</strong> where Fr. Thomas Soroka reads the
                  daily scripture readings and thoughtful commentary by the
                  Fathers.
                </li>
                <li>
                  <strong>&ldquo;Lord of Spirits&rdquo;</strong> where Fr. Andrew Damick and
                  Fr. Stephen De Young have a topical discussion about lesser
                  knowns parts of scripture and tradition.
                </li>
                <li>
                  <strong>&ldquo;In a Certain Kingdom&rdquo;</strong> by Dn. Nicholas Kotar
                  retelling Russian fairy tales with commentary at the end.
                </li>
                <li>
                  <strong>&ldquo;As Iron Sharpens Iron&rdquo;</strong> is a collection of
                  teaching geared toward men.
                </li>
              </ul>
            </div>
          </div>
        </article>
      </section>
    </MainLayout>
  )
}
