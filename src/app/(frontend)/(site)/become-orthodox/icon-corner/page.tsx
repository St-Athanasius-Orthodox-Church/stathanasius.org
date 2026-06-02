import type { Metadata } from 'next'

import { Hero } from '@/components/ui/hero'
export const metadata: Metadata = {
  title: 'Setting up a Home Icon Corner',
  description:
    'Guidance for setting up a home icon corner for Orthodox Christian prayer.',
}

export default function IconCorner() {
  return (
    <>
      <Hero
        size="medium"
        title="Setting up a Home Icon Corner"
        subtitle="The center of your personal devotions and prayer"
      />

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <article className="mx-auto prose prose-lg max-w-none text-byzantine-blue">
          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Setting Up a Home Icon Corner or Wall
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="mb-4 leading-relaxed font-semibold">
              The center of your personal devotions and prayer
            </p>
            <blockquote className="mb-6 border-l-4 border-orthodox-gold pl-4 leading-relaxed italic">
              &ldquo;When you pray, you must not be like the hypocrites; for they love
              to stand and pray in the synagogues and at the street corners,
              that they may be seen by men…But when you pray, go into your room
              and shut the door and pray to your Father who is in secret.&rdquo;
              Matthew 6:5-6
            </blockquote>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                Setting up the prayer corner
              </h3>
              <p className="mb-3 leading-relaxed font-semibold">
                Every Icon Corner or Wall ought to have the following:
              </p>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>an Icon of Christ</li>
                <li>an Icon of the Theotokos</li>
                <li>a Cross</li>
                <li>a candle or lampada (oil lamp)</li>
                <li>a Holy Bible</li>
                <li>a Prayer Book</li>
              </ul>
              <p className="mt-3 leading-relaxed">
                The icons are placed so that when you face your icons you are
                oriented east, or as close as possible as you can make it in
                your home. When choosing a location, you will want a wall or
                corner in a common central place of your home. Try to give
                yourself enough room to make bows and prostrations in front of
                the icons. Your prayer books and bible should be placed on a
                shelf or surface on the same wall or corner.
              </p>
              <p className="mt-3 leading-relaxed">
                Now with these icons and books in place your icon corner will
                grow from there. Usually, this means adding icons of patron
                saints or ones to whom you or your family become close, an
                incense burner, different prayer books and services, holy water,
                etc. The icon corner becomes the dedicated place for your
                prayers to God, like an altar in your home. It is also common to
                have icons or even have smaller icon corners in other rooms.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                Recommended Sources for Buying Icon Prints and Icon Corner
                Supplies
              </h3>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>Legacy Icons</li>
                <li>Jordanville Monastery Icon Studio</li>
                <li>Skete.com</li>
                <li>Uncut Mountain Supply</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                Recommended Prayer Books:
              </h3>
              <p className="leading-relaxed">
                The Antiochian Pocket Prayer Book and the Holy Transfiguration
                Monastery Prayer Book are a highly recommend combination as
                together you would have all the most common Orthodox prayers and
                services for personal use.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">Holy Bibles</h3>
              <p className="leading-relaxed">
                The Orthodox Study Bible (OSB) is highly recommended as a good
                bible for personal reading. Also, best recommended translations
                for personal reading are NKJV or KJV and the RSV with
                deuterocanonical books included. The OSB contains the New
                Testament with the NKJV and a translation of the Old Testament
                according to the Septuagint that follows the linguistic style of
                the NKJV. The Oxford RSV with deuterocanonical books is also
                recommended, since the RSV has come closest to becoming the
                standard within the Divine Services at English speaking Orthodox
                parishes, and it matches the typical translation heard in
                Antiochian parishes when the Epistle and Gospel passages are
                read.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">Other Common Items</h3>
              <p className="mb-3 leading-relaxed">
                After a prayer book, icons, and a bible are obtained it is
                common and recommended that the faithful Orthodox Christian,
                also begins to add the following to their prayer corner.
              </p>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>
                  <strong>A liturgical calendar</strong> - This shows you the
                  saints of the day, if there is feast, the level of fasting
                  discipline for the day, and the scripture readings on a
                  specific day. It is essential to following the rhythms of the
                  Church. There are many ways to obtain an Orthodox liturgical
                  calendar: get a hard copy from the priest provided by the
                  parish, downloading the Daily Readings App to your smartphone,
                  or adding the online calendar provided by the Greek
                  Archdiocese to your personal online calendar.
                </li>
                <li>
                  <strong>A prayer rope</strong> for praying the Jesus Prayer.
                  It is recommended to get a 100 knot and a 33 knot to carry in
                  a pocket or keep on your wrist. St. Paisius Monastery in
                  Safford, AZ is a good source.
                </li>
                <li>
                  <strong>The Psalter</strong> published by Holy Transfiguration
                  Monastery (HTM) - The book of psalms divided up to follow the
                  Orthodox liturgical prayer usage. HTM&apos;s Psalter has become the
                  most common and is the translation used in Antiochian parishes
                  and many others for Psalmody. There are small and large
                  formats.
                </li>
                <li>
                  <strong>The Book of the Hours</strong> published by HTM -
                  psalms and prayers for various times of day.
                </li>
                <li>
                  Collecting{' '}
                  <strong>
                    Akathists and Supplicatory Canons (Paraklesis)
                  </strong>
                  , dedicated to certain saints or icons to seek their
                  intercession for certain needs or to cultivate a relationship
                  with them. St. Paisius Monastery in Safford, AZ has many.
                </li>
                <li>
                  <strong>The Prologue of Ohrid</strong> published by St.
                  Sebastian Press – This work is written by St. Nikolai of Ohrid
                  containing a short vita entry of the major saints for the day,
                  a poem, reflections on spiritual themes, meditations on
                  scripture, and short homilies. It is a good and consistent
                  source for spiritual reading.
                </li>
              </ul>
            </div>
          </div>
        </article>
      </section>
    </>
  )
}
