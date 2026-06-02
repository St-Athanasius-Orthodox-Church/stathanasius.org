import type { Metadata } from 'next'

import { Hero } from '@/components/ui/hero'
export const metadata: Metadata = {
  title: 'Beginning to Fast with the Church',
  description: 'Guidance on beginning to fast with the Orthodox Church.',
}

export default function BeginningToFast() {
  return (
    <>
      <Hero
        size="medium"
        title="Beginning to Fast with the Church"
        subtitle="Learning the rhythm of fasting and feasting"
      />

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <article className="mx-auto prose prose-lg max-w-none text-byzantine-blue">
          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Beginning to Fast with the Church
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                Why we fast and how
              </h3>
              <p className="leading-relaxed">
                We seek to honor God by adjusting our eating to follow the
                rhythms of fasting and feasting seasons within the Liturgical
                year. We grow spiritually by taking up the ascesis of abstaining
                from certain foods to prepare ourselves for feasts and to honor
                certain commemorations. There are tiers of how strictly to fast:
                Lent is the strictest for the longest season while other fasting
                seasons are less strict or last a shorter amount of time.
              </p>
              <p className="mt-3 leading-relaxed">
                During the Great Fast of Holy Lent, the fasting abstinence rule
                is this: on all weekdays we abstain from eating meat and animal
                products (cheese, milk, butter, eggs, lard, meat drippings),
                fish (i.e., water creatures with backbones), oil (i.e. fried or
                very oily foods), as well as wine and liquors (alcohol). As a
                shorthand, we call this level of fasting lenten. However, even
                on the weekends of Holy Lent, we bring back in oil and wine to
                our eating and on the Annunciation to the Mother of God on March
                25th we eat fish to celebrate that great event of our salvation!
              </p>
              <p className="mt-3 leading-relaxed">
                Very few people follow the full lenten fast for the entirety of
                the seven weeks that make up the Great Fast. We strive to
                accomplish it, but usually land somewhere less than the
                strictest fasting discipline. The point is not to claim success,
                nor to torture yourself, nor to become a gourmet vegan but to
                realize your weakness and to rely on God&apos;s grace as you struggle
                to keep the fasts. Make a real effort out of obedience to the
                Church and within the Church&apos;s guidance so that you gain
                humility, some self-control over the desires of the body, become
                simpler in your relation to food, and realize that no ascesis is
                beneficial nor spiritual growth possible without the grace of
                God.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                Learning to Fast with the Church
              </h3>
              <p className="leading-relaxed">
                A helpful way for those learning to fast with the Church is to
                think of this as levels of growth. We learn to honor the
                liturgical cycle of fasting and feasting, even while struggling
                and failing to keep strictly the called for fasting discipline.
                Everyone should begin by keeping the lenten fast called for on
                most Wednesdays and Fridays which honor the events of the Lord&apos;s
                betrayal and crucifixion, and to not eat at all starting from
                the midnight before partaking of Holy Communion, which is called
                the Eucharistic fast. Exceptions are made after talking to your
                Pastor and Spiritual Father if you are ill or have a medical
                condition. That may sound hard to accomplish, but that is
                because growing spiritually is no easy task! If you apply
                yourself and seek to honor God with your fasting, you will
                spiritually grow and when you fail to keep it well, you will be
                benefitted by gaining humility.
              </p>
              <p className="mt-3 leading-relaxed font-semibold">
                Below is a suggested way to discern and begin a consistent fasting
                discipline. Talk with the Pastor to get a blessing to start at
                one of the levels below.
              </p>
              <ul className="mt-3 list-disc space-y-3 pl-6 leading-relaxed">
                <li>
                  <strong>Level One:</strong> Strictly abstain from meat, fish,
                  dairy and egg products, oily foods, and wine (alcohol)– that
                  is keep a fully Lenten fast– on all Wednesdays and Fridays
                  that aren&apos;t in a &ldquo;fast free week.&rdquo; Also, maintain the
                  Eucharist fast before partaking of Holy Communion, catechumens
                  should consider fasting when attending the Divine Liturgy to
                  adapt themselves to this.
                </li>
                <li>
                  <strong>Level Two:</strong> Start to abstain from meat– that
                  is keep a pescatarian diet– for the entirety of Lent and Holy
                  Week, as well as the Apostles, Dormition, and Nativity fasts.
                </li>
                <li>
                  <strong>Level Three:</strong> Start to abstain from meat and
                  fish– that is keep a vegetarian diet but with shellfish– for
                  the entirety of Lent and Holy Week as well as the Apostles and
                  Dormition fasts. One could start to learn the full fast by
                  eliminating dairy or eggs before removing both from your
                  meals.
                </li>
                <li>
                  <strong>Level Four (Lenten Fasting):</strong> Start to abstain
                  from meat, fish, dairy and egg products– that is keep a vegan
                  diet but with shellfish– for the entirety of Lent and Holy
                  Week as well as the Apostles and Dormition fasts.
                </li>
                <li>
                  <strong>Level Five:</strong> Start to limit your mealtimes
                  while keeping the full Lenten fast, for the entirety of Holy
                  Lent and Holy Week as well as the Apostles and Dormition
                  fasts; this is typically how monastics keep their fasting
                  discipline.
                </li>
              </ul>
              <p className="mt-3 leading-relaxed">
                In general, most people can reach &ldquo;Level Three&rdquo; quickly with
                some effort. Those diligent strugglers striving to keep strictly
                to the fasting discipline of the Church can get to &ldquo;Level Four&rdquo;
                after some seasons. Lastly, two bits of spiritual counsel; do
                not read the ingredient labels and don&apos;t compare your plate to
                others! If you can&apos;t tell it has an animal product in it by
                looking at it or it is a dish not made to be a meat, fish,
                dairy, or egg based, then eat it. Don&apos;t become pharisaical about
                fasting and place yourself in a straitjacket by obsessing over
                minutiae!
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                The Liturgical Cycles of Fasting and Feasting
              </h3>
              <div className="mb-4">
                <h4 className="mb-2 font-semibold">Fasting Seasons</h4>
                <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                  <li>
                    <strong>Cheesefare Week</strong> (abstain from meat) – From
                    the Monday through the Sunday before the Holy Lent
                  </li>
                  <li>
                    <strong>Holy Lent & Holy Week</strong> (strict Lenten) – The
                    first Monday of Holy Lent through Holy Saturday
                  </li>
                  <li>
                    <strong>Apostles Fast</strong> (strict Lenten) – Monday
                    after All-Saints Sunday through June 28th
                  </li>
                  <li>
                    <strong>Dormition Fast</strong> (strict Lenten) – August 1st
                    through August 14th
                  </li>
                  <li>
                    <strong>Nativity Fast</strong> – November 15th through
                    December 24th
                  </li>
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="mb-2 font-semibold">
                  Lenten Fast Days Through the Year
                </h4>
                <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                  <li>
                    All Wednesdays and Fridays, except during Fast-Free Weeks
                  </li>
                  <li>The Eve of Theophany – January 5th</li>
                  <li>The Beheading of St. John the Baptist – August 29th</li>
                  <li>The Elevation of the Cross – September 14th</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">
                  Fasting-Free Festal Weeks
                </h4>
                <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                  <li>
                    Afterfeast of the Nativity of Christ to Theophany Eve –
                    December 25th through January 4th
                  </li>
                  <li>
                    The week following the Sunday of the Publican & Pharisee –
                    2nd Week of the Lenten Triodion
                  </li>
                  <li>
                    Bright Week – The week after Pascha; note that the
                    Antiochian Patriarchate uniquely lengthens this time by not
                    calling its faithful to keep any fast until after Ascension
                    since our Resurrected Lord, Bridegroom, and God is present
                    with us.
                  </li>
                  <li>Trinity Week – The week after Pentecost</li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  )
}
