import type { Metadata } from 'next'

import { Hero } from '@/components/ui/hero'
export const metadata: Metadata = {
  title: 'Orthodox Prayer Postures and Movements',
  description:
    'Learn the basic postures and movements of Orthodox Christian prayer and piety.',
}

export default function PrayerPostures() {
  return (
    <>
      <Hero
        size="medium"
        title="The Basic Postures and Movements of Orthodox Christian Prayer & Piety"
      />

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <article className="mx-auto prose prose-lg max-w-none text-byzantine-blue">
          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Basic Postures and Movements of Orthodox Christian Prayer & Piety
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                Making the Sign of the Cross
              </h3>
              <p className="leading-relaxed">
                With your right hand hold your pointer finger, middle finger,
                and thumb together while folding the ring and pinky fingers into
                your palm then touch your forehead, top of your belly, right
                shoulder, then left shoulder.
              </p>
              <p className="mt-3 leading-relaxed">
                We do this at each invocation of the name of the Holy Trinity,
                when God is given glory in the hymns, a mention of the Cross, at
                the recitation of Alleluias during refrains, before venerating
                icons, when entering or exiting the church, and when making bows
                or prostrations. Everyone is also encouraged to make the sign of
                the cross over themselves and over things to ask for God&apos;s
                blessing by holding their hand in the same way as they go about
                their daily activities outside of the church services.
              </p>
              <p className="mt-3 leading-relaxed">
                However, we do not make the sign of the cross before a Bishop or
                Priest gives the blessing in the services nor when asking for
                his blessing, rather he makes the sign over you!
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                Blessings: Greeting and Taking Leave of a Bishop or Priest &
                specific blessings
              </h3>
              <p className="leading-relaxed">
                When greeting and when leaving a bishop or priest&apos;s presence
                make a bow and hold your hands out to him with the right hand on
                top of the left palms up, saying, &ldquo;Father, bless.&rdquo; But if it is
                a bishop say, &ldquo;Master, bless.&rdquo; He will then give a general
                blessing. He will most often make the sign of the cross over
                you, usually with a short blessing prayer, then place his hand
                in your outstretched palms for you to kiss. Know that you are
                kissing Christ&apos;s hand, which consecrates the sacraments, through
                the clergyman&apos;s hand! The priest may also simply make the sign
                of the cross over your bowed head to bless you without placing
                his hand on yours. This is a simple general way to seek the
                Lord&apos;s blessing through his appointed bishops and priests.
              </p>
              <p className="mt-3 leading-relaxed">
                To ask for a more specific blessing about something in your
                personal life is a normal part of the relationship with one&apos;s
                spiritual father or father confessor; this is not blind
                obedience or infantile dependence, but a relationship of trust.
                It is expected that a blessing of approval is sought from your
                Pastor/Rector/parish&apos;s head priest for all things related to the
                parish and its ministries (to begin a ministry, to schedule an
                event, recruit ministry members, etc.). Anything related to
                parish life needs to go through him and receive this kind of
                Pastoral blessing.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">Standing</h3>
              <p className="leading-relaxed">
                The basic and normative posture of prayer is to stand with
                vigilant attention in God&apos;s presence facing the altar, our
                prayer corner, or eastward. One should always be standing when
                the Gospel is being read, and when an Entrance, a Procession, or
                a censing is occurring, as well as when the Bishop or Priest is
                giving a blessing.
              </p>
              <p className="mt-3 leading-relaxed">
                It is not proper to turn your back to the altar to follow the
                censer nor when the clergy are processing around the church,
                rather simply bow toward the censer or the item being processed
                to receive the prayerful blessing and turn again to face the
                Altar or toward the center of the Church where the procession
                ends.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">A Word on Sitting</h3>
              <p className="leading-relaxed">
                Sitting is a posture of quietude, yet we should do so with
                attention. It is prescribed only in one context within the
                Divine Services, during the lengthy readings of the Kathismata
                of the Psalter. Those readings are typically not done in the
                parishes but are typically read in monasteries. Sitting in all
                other times during the services should be limited. It is
                acceptable to sit during the Old Testament and Epistle readings
                and the Homily. All other times, sit only when needed, and if
                you can stand do so out of reverence at the times mentioned
                above in the section on standing.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                Making a little metania (bow)
              </h3>
              <p className="leading-relaxed">
                To bend forward at the waist and to touch your right hand to the
                floor then rising and making the sign of the cross. It is a
                smaller penitent movement when the great metania is deemed too
                penitent or one is physically unable to make the great metania.
                This is typically done at &ldquo;Holy God…&rdquo; in the Trisagion, at
                Alleluias that conclude a reading or hymn, and at &ldquo;O come let us
                worship and fall down…&rdquo;
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                Making a great metania (full prostration)
              </h3>
              <p className="leading-relaxed">
                To bend forward placing your hands and knees on the ground then
                touching your forehead to the floor and when rising fully to
                stand to make the sign of the cross. It is a penitential
                movement often done repeatedly in succession. In services, it is
                done at certain penitential refrains or at the completion of
                penitential hymns and prayers. We do not make great metanias on
                Sundays, Great Feasts of the Lord, nor during Fast Free Weeks or
                Seasons since these are more celebratory days.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">Kneeling</h3>
              <p className="leading-relaxed">
                To bend to your knees and remain upright out of reverence and
                penitence. This posture is rare in public piety, though a common
                practice in private prayers. It is only called for during
                Kneeling Vespers on Pentecost Sunday and occasionally during
                certain important hymns or prayers at other services according
                to local custom. It is also a common posture to take when making
                a confession and especially so when receiving absolution after
                Confession.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                Venerating Icons and Relics
              </h3>
              <p className="leading-relaxed">
                We venerate icons by making three little metania then kissing
                the hands, feet, or face of the saint depicted or the relic, and
                asking for their intercessions. If you are venerating many
                icons, it is appropriate to only make the sign of the cross over
                yourself between each veneration. However, for the Cross we make
                three great metania. It is also acceptable to make two metania,
                venerate, then make the final metania. Additionally, wipe away
                any lipstick or lip balm before venerating to avoid leaving a
                smudge on the icon or the glass covering; the chemicals in these
                can damage uncovered icons.
              </p>
              <p className="mt-3 leading-relaxed">
                The Fathers of the Seventh Ecumenical Council specifically
                intended in using the word προσκυνεῖν to prescribe bowing and
                kissing as the normative practice of veneration. They carefully
                explained this in their synodal letter to the emperor and
                empress. However, one can still venerate even if an icon is out
                of reach to kiss directly with your lips, in this case you may
                kiss your fingers then touch the icon. If an icon is out of
                reach even of your hand, you may give reverence by facing it,
                making a little metania and asking for the saint&apos;s
                intercessions.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                Inclining your head or inclining from the waist
              </h3>
              <p className="leading-relaxed">
                This is done to give a greater degree of honor and respect for a
                person or a liturgical action. Commonly done when you are
                censed, during petitionary and consecratory prayers, certain
                very reverential moments of the services, and when being blessed
                in the services. Often accompanied by placing the right hand
                over your heart or crossing both arms over your chest.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">Orans</h3>
              <p className="leading-relaxed">
                To lift up both your hands at or below your shoulder as a sign
                of offering yourself to God. This posture is assigned to the
                presiding priest to do during the prayers O Heavenly King and
                The Lord&apos;s Prayer. It is acceptable for the laity to do so or
                not during those times.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">Lighting Candles</h3>
              <p className="leading-relaxed">
                The lit candle is an offering to God and stands for us as a
                longer silent prayer when we have no more words. We light
                candles in the parish temple when we pray for others who are
                very close to our heart, then we place the lit candle in the
                candlestand. Sometimes these are boxes filled with sand and
                sometimes it is a stand with many individual holders. There is
                almost always a place in a parish temple where the candles may
                be obtained through donation. It is appropriate to light one
                candle per person, family, or situation for which you are
                praying. You may place lit candles in the stands at the front of
                the Nave anytime the priest or deacon is not standing on the
                Solea. It is also a pious custom to keep a candle or vigil lamp
                lit in your icon corner for a length of time when you are
                fervently praying for a certain difficult situation.
              </p>
            </div>
          </div>
        </article>
      </section>
    </>
  )
}
