import type { Metadata } from 'next'

import { Hero } from '@/components/ui/hero'
export const metadata: Metadata = {
  title: 'Mission & Values',
  description:
    'Our mission and core values at St. Athanasius Orthodox Church.',
}

export default function MissionValues() {
  return (
    <>
      <Hero size="medium" title="Mission & Values" />

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <article className="mx-auto prose prose-lg max-w-none text-byzantine-blue">
          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Mission Statement
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              We gather around our resurrected Lord, God, and Savior Jesus
              Christ to joyfully order our whole life in obedience and love, and
              unite with Him in prayer and sacrament. We minister, teach, and
              support our neighbors from all walks of life, inviting everyone in
              our local community to know Christ&apos;s peace and a holy life with
              God in His Church.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Vision Statement
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              We seek to establish a permanent and steadfast relational life
              with our Lord by becoming a deeply rooted community that
              participates in the work of God the Holy Trinity. We honor the
              apostolic faith handed down to us by our forebears in worship and
              in our daily lives as a holy people. We are excited to lovingly
              share with our neighbors and labor with them for the Kingdom of
              Jesus Christ in His Church to reflect and live for the Kingdom of
              Heaven here and now.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Our Parish Values
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <ul className="list-none space-y-4 pl-0">
              <li className="leading-relaxed">
                Faithful Worship of the Holy Trinity within Jesus Christ&apos;s
                Church
              </li>
              <li className="leading-relaxed">
                Growing the Heart in Love & Spiritual Joy
              </li>
              <li className="leading-relaxed">
                Be a Loving Family in Jesus Christ
              </li>
              <li className="leading-relaxed">
                Be Christ&apos;s Light to our Community
              </li>
              <li className="leading-relaxed">
                Build up our Parish Life with an Inter-generational Outlook for
                Generations to Come
              </li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Our Goals & Priorities
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />

            <div className="mb-8">
              <h3 className="heading-orthodox mb-3 text-xl font-semibold">
                Faithful Worship of the Holy Trinity within Jesus Christ&apos;s
                Church
              </h3>
              <p className="leading-relaxed">
                Through obedience to the Holy Tradition of the One Holy Catholic
                and Apostolic Church we embrace the unity bestowed on us in
                Jesus Christ. We liturgically worship with one mouth and one
                heart alongside our Hierarchs within the Orthodox Tradition here
                in America. We commit to obeying the God ordained authority of
                our Bishop, the Presbyters, and the Deacons who stand in the
                succession of the Apostles serving within Christ&apos;s Church.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="heading-orthodox mb-3 text-xl font-semibold">
                Growing the Heart in Love & Spiritual Joy
              </h3>
              <p className="leading-relaxed">
                By living according to the Greatest Commandment (Matthew
                22:37-38) by making the Divine Services and Sacraments the
                heartbeat and breath of our communal fellowship. Deepening our
                faith through diligence in our prayer rules, accountability to a
                Father Confessor, study of the Holy Scriptures, dedicated
                spiritual reading, and the works of the spiritual writers of the
                Church.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="heading-orthodox mb-3 text-xl font-semibold">
                Be a Loving Family in Jesus Christ
              </h3>
              <p className="leading-relaxed">
                By living the New Commandment of our Lord to love one another as
                He has loved us (John 13:34-35). Through personal, local, caring
                and helping relationships as a community in all areas of our
                lives. By showing up and encouraging one another in the walk of
                Faith in Christ that we may hear the Holy Spirit and know God.
                By laying down our lives as servants and friends.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="heading-orthodox mb-3 text-xl font-semibold">
                Be Christ&apos;s Light to our Community
              </h3>
              <p className="leading-relaxed">
                By living the Second Greatest Commandment (Matthew 22:39).
                Through exploring new & innovative ways of evangelizing the lost
                as well as educating others about Orthodoxy. Through active
                participation within established organizations in which we can
                care for those in need of Christ&apos;s mercy. Provide hope, love,
                and healing in a world full of despair, indifference, and hurt
                by warmly welcoming people of all ages, cultures, and walks of
                life to come experience the peace of our Lord by providing
                support to the needy and serving them.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="heading-orthodox mb-3 text-xl font-semibold">
                Build up our Parish Life with an Inter-generational Outlook for
                Generations to Come
              </h3>
              <p className="leading-relaxed">
                Through our ministries we desire to spread our roots deeply in
                our neighborhood to love the needy and to support the spiritual
                lives of our members and their families, seeking to connect all
                to the life of Jesus Christ who came for all mankind. We commit
                to implementing an ambitious capital campaign and to developing
                our back property as funding sources. Through developing
                long-term operating projections and continuing ministries we
                will cultivate these values looking 3, 5, 10, and 20 years
                forward.
              </p>
            </div>
          </div>

          <p className="mt-12 text-sm text-gray-600">
            Updated November 13, 2025
          </p>
        </article>
      </section>
    </>
  )
}
