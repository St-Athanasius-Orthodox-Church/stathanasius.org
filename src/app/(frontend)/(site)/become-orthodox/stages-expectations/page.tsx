import type { Metadata } from 'next'

import { Hero } from '@/components/ui/hero'
export const metadata: Metadata = {
  title: 'Stages and Expectations of Orthodox Conversion',
  description:
    'Learn the expectations and stages of becoming Orthodox at St. Athanasius.',
}

export default function StagesExpectations() {
  return (
    <>
      <Hero
        size="medium"
        title="The Stages and Expectations of Orthodox Conversion"
      />

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <article className="mx-auto prose prose-lg max-w-none text-byzantine-blue">
          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              The Serious Inquirer and Catechumen is Expected to:
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <ul className="list-disc space-y-2 pl-6 leading-relaxed">
              <li>
                Attend Sunday Orthros & Liturgy, the Great Feast Days, as well
                as the Lenten services most especially the Holy Week services,
                as much as is possible.
              </li>
              <li>
                Attend all the Catechetical Lecture Sessions, and to continue
                studying Orthodoxy outside of those lectures starting with the
                required reading material.
              </li>
              <li>
                Seek out the guidance and counsel of the Pastor for their
                spiritual life.
              </li>
              <li>
                Begin to practice prayer and fasting within the Church&apos;s rhythm
                and with its words, and to support the life of the parish by
                your time, skills, and finances through giving a tithe and
                free-will offerings.
              </li>
              <li>
                Begin to personally know and build relationships with Orthodox
                people.
              </li>
            </ul>
            <p className="mt-6 leading-relaxed font-semibold">
              In addition, Catechumens will:
            </p>
            <ul className="list-disc space-y-2 pl-6 leading-relaxed">
              <li>
                Make a life confession soon after becoming a Catechumen, then
                begin regularly &apos;making a confession&apos; and seeking pastoral
                counsel.
              </li>
              <li>
                Discuss with the Pastor and receive a blessing to choose a
                Patron Saint and a Sponsor for their Baptism and Chrismation.
              </li>
              <li>
                Gather along with their Sponsor a cross necklace, black clothes,
                and white clothes or a tunic for the day you are Baptized and
                Chrismated
              </li>
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Stages of the Journey toward Being Fully Received into the Church
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />

            <div className="mb-8">
              <h3 className="mb-3 text-xl font-semibold">
                The Inquirer or Seeker
              </h3>
              <p className="mb-3 text-sm italic">(A minimum of 3 months)</p>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>Begins visiting the parish for the services.</li>
                <li>
                  Is reading and studying Orthodoxy, on their own and attending
                  the Catechetical Lecture Sessions as well as offered topical
                  spiritual lectures, and the spiritual reading studies offered
                  in the parish.
                </li>
                <li>
                  Is meeting with the Pastor and getting to know the parish&apos;s
                  members and congregants.
                </li>
                <li>
                  Begins to make the sign of the Cross; venerate icons, relics,
                  and the cross; and asking for a blessing from priest.
                </li>
                <li>
                  Is counting the cost of becoming Orthodox by looking at what
                  needs to change in their life.
                </li>
                <li>
                  Makes the knowledgeable decision to unite to the Church and
                  her way of life by asking the Pastor to enroll them as a
                  Catechumen of this parish.
                </li>
                <li>
                  After renouncing heresies before the Pastor, he will enroll
                  you as a catechumen by praying the &ldquo;Eighth Day Naming Prayer&rdquo;
                  over you before the congregation on a Sunday of his choosing.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-xl font-semibold">The Catechumen</h3>
              <p className="mb-3 text-sm italic">(Minimum time of 1 year)</p>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>
                  Makes a life confession shortly after they are enrolled as a
                  Catechumen.
                </li>
                <li>
                  Begins regularly confessing to the Pastor approximately once a
                  month, meeting with him regularly, and is implementing his
                  advice and spiritual direction.
                </li>
                <li>
                  Attends, or has already attended as an inquirer, all the
                  Catechetical Lecture Sessions.
                </li>
                <li>
                  Is assimilating to the Church&apos;s prayers, and to her fasting &
                  feasting days and seasons.
                </li>
                <li>
                  Faithfully attends the Divine Services, especially Sunday and
                  the Great Feasts.
                </li>
                <li>
                  Begins to support the parish life with their talents, skills,
                  and finances.
                </li>
                <li>Accomplishes all the required reading for Catechumens.</li>
                <li>
                  With the blessing of the Pastor chooses a Sponsor (God-parent)
                  and asks them to take on this role.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-xl font-semibold">
                The Candidate for Baptism and Chrismation
              </h3>
              <p className="mb-3 text-sm italic">
                (Within the one to two months prior to their reception)
              </p>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>Has memorized the Creed.</li>
                <li>With the blessing of the Pastor chooses a Patron Saint.</li>
                <li>
                  Obtains all the required items for Baptism and Chrismation,
                  with the help of their Sponsor (see last page).
                </li>
                <li>
                  Attends as many Lenten and Holy Week services as possible.
                </li>
                <li>
                  Stands with their Sponsor to receive the prayers of Exorcisms
                  from the priest and speaks the Renunciations and Allegiances
                  on the day of their Baptism and Chrismation or the day before.
                  All candidates will stand before the priest without any
                  adornments, jewelry, belt, anything on their feet or hands,
                  nor with additions to their natural hair on this day and at
                  their Baptism and Chrismation.
                </li>
                <li>
                  On the day you will be received, you or your Sponsor will give
                  to the priest your candle, cross necklace, and white clothes.
                  The candidates for Baptism arrive wearing very simple black or
                  very dark clothing, while those being received by Chrismation
                  arrive already wearing white clothes.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 text-xl font-semibold">
                The Newly Illumined
              </h3>
              <p className="mb-3 text-sm italic">
                (After Baptism and Chrismation, you are referred to as the Newly
                Illumined for 40 Days)
              </p>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>
                  After receiving the Sacrament of Holy Baptism you are given
                  the white clothes or Baptismal Robes.
                </li>
                <li>
                  After you have changed into the white clothes you are given a
                  cross to wear around your neck.
                </li>
                <li>
                  Then you will receive the Sacrament of Holy Chrismation, make
                  a triple-circuit around the Holy Font guided by the Priest,
                  while &ldquo;As many as have been baptized…&rdquo; is chanted.
                </li>
                <li>
                  You along with your Sponsor will come first among the Faithful
                  to receive The Sacrament of Holy Communion when it is offered.
                  You will continue to receive first among the laity for the
                  next 40 days.
                </li>
                <li>
                  After the distribution of Communion, the priest will wash off
                  the Chrism and take four small clippings of your hair as your
                  first offering to God as an Orthodox Christian– called the
                  ablution and tonsure. Welcome to the Kingdom! Welcome Home!
                </li>
              </ul>
            </div>
          </div>
        </article>
      </section>
    </>
  )
}
