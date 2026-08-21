import type { Metadata } from 'next'
import Image from 'next/image'

import { Hero } from '@/components/ui/hero'
import { Hyperlink } from '@/components/ui/hyperlink'
const stAthanasiusUrl = '/assets/st_athanasius_tall.jpg'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about St. Athanasius Orthodox Church, our parish community, and Orthodox Christian faith in Santa Barbara.',
}

export default function AboutUs() {
  return (
    <>
      <Hero
        size="medium"
        title="Our Parish"
        subtitle="A vibrant community at the altar of Christ since 1987"
      />

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <article className="mx-auto prose prose-lg max-w-none text-byzantine-blue">
          <div className="mb-12">
            <p className="leading-relaxed">
              Founded in 1987, St. Athanasius Orthodox Church is a vibrant faith
              community of all ages and backgrounds who are working out their
              faith and raising their families in accordance with the
              commandments of Our Lord and Savior Jesus Christ. Our community is
              part of the ancient Greek Orthodox Patriarchate of Antioch where
              St. Luke in the Book of Acts tells us the believers were first
              mockingly called Christians (Acts 11:26). Our parish church is
              part of the Eastern Orthodox Church communion spread throughout
              the world. A communion of local churches throughout the world
              sharing, proclaiming, and living out the Faith once delivered to
              us through the Apostles. There are over 250 million Eastern
              Orthodox Christians in the world today and over 1 million in the
              United States. The majority of our congregants journeyed to the
              Orthodox Church from other Christian faith traditions, some even
              from non-Christian traditions, while several families grew up
              within the Orthodox Church and Faith.
            </p>
            <p className="leading-relaxed">
              We join together every Sunday and throughout the week to glorify
              the Holy Trinity: Father, Son, and Holy Spirit within the Orthodox
              Church&apos;s ancient forms of worship and prayer, to partake of the
              sacraments Christ offers us, and to learn together how to follow
              the spiritual life handed down to us from the Apostles. We
              continue in the tradition of what was said of the first converts
              to Jesus Christ who &ldquo;devoted themselves to the apostles&rsquo; teaching
              and the fellowship, to the breaking of bread and the prayers.&rdquo;
              (Acts 2:42) When you visit us you will experience this reality! We
              welcome all to walk with us, even if just for a visit to &ldquo;come and
              see&rdquo; the worship of God: Father, Son, and Holy Spirit. You are
              welcome at St. Athanasius.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Our Patron Saint
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <div className="flex flex-col gap-12 md:flex-row">
              <div className="flex-1 leading-relaxed">
                <p>
                  Athanasius was born in Alexandria in the year 296 A.D. and
                  from his early childhood had an inclination to the spiritual
                  life. He was a deacon to Archbishop Alexander and accompanied
                  him to the First Ecumenical Council [Nicaea, 325 A.D.]. It was
                  at this Council that Athanasius became renowned for his
                  learning, devotion to and zeal for Orthodoxy. He contributed
                  greatly to destroy the heresy of Arius and to strengthen
                  Orthodoxy. He wrote the Symbol of Faith [The Creed] which was
                  adopted at the Council.
                </p>
                <p>
                  Following the death of Alexander, Athanasius was elected
                  Archbishop of Alexandria. In his calling as Archbishop of
                  Alexandria, he remained for forty years, although not for the
                  entire time on the archepiscopal throne of the archbishopric.
                  With few exceptions, throughout his life he was persecuted by
                  heretics. Of the emperors, he was persecuted mostly by
                  Constantius, Julian and Valens; of the bishops, by Eusebius of
                  Nicomedia and many others; and by the heretic Arius and his
                  followers. Athanasius was forced to hide from his persecutors,
                  even in a well, in a grave, in private homes and in the
                  deserts. Twice he was forced to flee to Rome. Only before his
                  death, did he live peacefully for a while as the good shepherd
                  among his good flock who truly loved him.
                </p>
                <p>
                  Few are the saints who were so mercilessly slandered and so
                  criminally persecuted as St. Athanasius. His great soul
                  patiently endured all for the love of Christ and, in the end,
                  emerged victorious from this entire, terrible and long-lasting
                  struggle. For counsel, for comfort and for moral support,
                  Athanasius often visited St. Anthony, whom he respected as his
                  spiritual father. For a man who formulated the greatest truth,
                  Athanasius had much to suffer for that truth until in the year
                  373 A.D., the Lord gave him repose in His kingdom as His
                  faithful servant.
                </p>
              </div>
              <div>
                <Image src={stAthanasiusUrl} alt="St. Athanasius" width={150} height={389} />
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Our Building
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              In January of 2014, we moved into a newly-constructed building
              that is part of a 3-phase building project. We currently use the
              building and patio for worship, fellowship, classes and
              administration. We have an active building campaign to raise the
              funds needed to pay off the mortgage on Phase One, and to begin
              construction on our Temple, a stand alone dedicated Orthodox
              liturgical worship space.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              More About us
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              To learn more about our history read this account from one of our
              founding members about our parish&apos;s history stretching from the
              1970s before uniting to the Holy Orthodox Church into the 2010s.{' '}
              <Hyperlink href="/about/history">Our History</Hyperlink>
            </p>
          </div>
        </article>
      </section>
    </>
  )
}
