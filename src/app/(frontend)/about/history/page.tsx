import type { Metadata } from 'next'

import { Hero } from '@/components/ui/hero'
import { MainLayout } from '@/layouts/main-layout'

export const metadata: Metadata = {
  title: 'Our History',
  description:
    'The history of St. Athanasius Orthodox Church in Santa Barbara from its founding to today.',
}

export default function OurHistory() {
  return (
    <MainLayout>
      <Hero
        size="medium"
        title="Our History"
        subtitle="A journey from Campus Crusade to Orthodox Christianity"
      />

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <article className="mx-auto prose prose-lg max-w-none text-byzantine-blue">
          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Early Beginnings: the Campus Crusade Years
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              Take a bunch of zealous kids who want to convert the world, put
              them in one place - the University of California, Santa Barbara
              (UCSB) - and you have the makings of something really exciting.
              That&apos;s what existed here in the fall of 1966.
            </p>
            <p className="leading-relaxed">
              A small group of UCSB students went to hear a man who was speaking
              at Westmont College about evangelism. It turns out he was a
              representative of Campus Crusade for Christ who thoroughly wowed
              those students into thinking that they had the capacity to convert
              the entire country in no time flat. That inaugurated the first
              Campus Crusade group on the UCSB campus. There was no resident
              staff member, but the enthusiasm of what was called a Student
              Mobilization Group was sufficient to make it a movin&apos; unit!
            </p>
            <p className="leading-relaxed">
              The initial major event was a trip to Balboa Beach in the spring
              of &apos;67 to blitz the vacationing college students who flocked there
              every spring break. That was an amazing experience for this little
              up-start group of people who had nothing on their minds but
              spreading the Gospel of Jesus Christ.
            </p>
            <p className="leading-relaxed">
              That summer was the group&apos;s first experience at Arrowhead Springs,
              a resort and conference facility Campus Crusade operated in the
              San Bernardino mountains. It also was there that the UCSB students
              met Jon Braun for the first time. He was the featured speaker of
              the week-long event. His topic was, &ldquo;It Ain&apos;t Gonna Reign No
              More,&rdquo; a series from the Book of Romans on forgiveness and victory
              over sin.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Jon Braun at UCSB
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              By the time classes started the next fall, Campus Crusade was
              going full steam with weekly College Life meetings that had a
              surprisingly large following. They started with groups of 20 to 30
              people in 1967, and graduated into groups of 100 to 200 by spring.
              Jon Braun came to campus and gave his famous series on &ldquo;Love, Sex,
              and Marriage,&rdquo; scheduled for the first weekend in January right
              after the Christmas break.
            </p>
            <p className="leading-relaxed">
              That event had the Crusade students scared to death. They worried
              that they would not be able to get the word out because of the
              Christmas break, and that no one would come.
            </p>
            <p className="leading-relaxed">
              Well, all fears were smashed the first night. Steve Thomas
              recalls, &ldquo;We had arranged for the meeting to be in Campbell Hall
              which held 900 people. By starting time, we were forced to turn
              away several hundred. The hall was already packed to standing room
              only! The opening talk was such a success, campus security called
              to see if we wanted to move to Robertson Gym for the next two
              sessions! We did, and the next night the gym was filled. Pretty
              exciting for a small group of upstart kids!&rdquo;
            </p>
            <p className="leading-relaxed">
              The result of this series was the early formation of the people
              who became the founding core of the Church as we know it today.
              These students organized into small groups of 6 to 10 students and
              met regularly to read the Bible, pray, and to encourage each other
              to talk to more students about Christ. The groups experienced a
              good measure of success, witnessed by the increase in the size of
              the College Life meetings. They tried everything. Jack Sparks came
              down for a visit from his activities in Berkeley to participate in
              the UCSB &ldquo;Free Speech&rdquo; movement. Student leader Steve Thomas stood
              up on a table in the center of the UCEN and yelled out an
              introduction of Dr. Sparks to the students for his noon hour
              message about Jesus Christ.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Changes
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              The next summer Jon Braun resigned from Crusade staff, as did Dick
              Ballew, Pete Gillquist (as we called them then) and scores of
              others within the next few months. This startled the UCSB group.
              At the Crusade conferences held in Arrowhead Springs that summer,
              several students drove up the mountain to Blue Jay each evening to
              meet with Jon at his home. There they heard about the grace of God
              and Jon&apos;s concept of house churches, based on the model of
              communities in the New Testament. This was the passion of those
              who had resigned from Campus Crusade.
            </p>
            <p className="leading-relaxed">
              It was 1968. There was a sense of rebellion in the air; these
              changes were unfolding concurrently with the reaction against the
              Vietnam war and the prospect of putting a man on the moon.
              Students were ready and eager for something new and revolutionary
              in the religious arena.
            </p>
            <p className="leading-relaxed">
              Fall approached and a new sense of purpose filled those who led
              the Campus Crusade group at UCSB. Things went smoothly first
              quarter. Then, there was word of a conference at UCLA to be held
              over Christmas break. At this gathering students and ex-Crusade
              staff from all over the West Coast came to hear Jon Braun, Dick
              Ballew and Pete Gillquist and others who remain with us today.
              Speaker after speaker urged a return to the life and practices of
              the New Testament Church. They promised exciting new alternatives
              to the &ldquo;establishment&rdquo; and boring denominational order of
              Christendom.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Our New Dream: to Find the New Testament Church
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              From that day forward, it seemed we saw ourselves as a community
              within a movement. In this period, we also continued our militancy
              in making the name of Christ known. We began the process of
              examining our purposes, our motives and our goals. We became
              enthralled with the writings of Watchman Nee who had fomented an
              alternate-church movement in China. We tried to copy the methods
              he and his followers espoused.
            </p>
            <p className="leading-relaxed">
              Eager to be involved, others on this same journey moved to Santa
              Barbara. Jon and Mary Ellen Braun, Dick and Sylvia Ballew, and
              many other families arrived along with numerous single people.
              Christians came from as far away as Atlanta, but mostly from
              various points in California. The goal was to experience together
              what we thought to be the New Testament Church. It was based on a
              model of free expression along with strong leadership. But sadly,
              our doctrines wandered sporadically in and out of biblical
              orthodoxy.
            </p>
            <p className="leading-relaxed">
              Then in 1973, Jon and Dick announced a meeting at the home of one
              of our members. There, these men, who saw the need for a more
              historically based approach to finding what we were looking for,
              announced that we were going to be a full fledged Church that
              would provide, &ldquo;green pastures, cool waters, and a place for our
              children to raise their children.&rdquo;
            </p>
            <p className="leading-relaxed">
              &ldquo;This is really where we stopped being a `fellowship,&apos; and began
              to be a Church,&rdquo; Fr. Jon recalls. For a time he and Dick Ballew
              were co-pastors; ultimately Fr. Richard was placed in charge, and
              in short order, our leaders along with Peter Gillquist, Jack
              Sparks, Gordon Walker, Ken Berven and Ray Nethery, pulled together
              to become the New Covenant Apostolic Order (NCAO).
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Transition: Spontaneity to Liturgy
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              In 1973 we moved into the old Logos Bookstore in downtown Isla
              Vista, which even earlier had been a branch office of the Bank of
              America. We called it the Family Center, and it had orange
              carpeting and lime green walls! We stayed in this building until
              March of 2011 as a church community.
            </p>
            <p className="leading-relaxed">
              &ldquo;We took turns facing every wall in the church as our focal point.
              We began by facing the wall of the room where the choir&apos;s books
              are kept now. We had our chairs in a semi-circle,&rdquo; Penny Brunner
              recalls.
            </p>
            <p className="leading-relaxed">
              The worship resembled that of today&apos;s non-denominational churches,
              and it was always evolving.
            </p>
            <p className="leading-relaxed">
              In 1974 we divided into two home churches, and by 1979 we had
              grown to five. We began to adapt to our understanding of early
              Church liturgical worship. Our synaxis or public worship started
              at 9:00 a.m. on Sunday and we met for the Eucharist in the houses
              after that at 10:30 a.m. You could bring guests for the synaxis,
              but it was just our church family at the Eucharist.
            </p>
            <p className="leading-relaxed">
              These were wonderful times. We had a kiss of peace and everybody
              hugged everybody. After communion there would be a time of singing
              and giving thanks to God. It was very significant. There were two
              priests for each house church: Frs. Jim King and Pat Wallace at
              St. Mark, Frs. John Carrillo and David Washburn at St. James, Frs.
              Bill Hartung and Steve Thomas at St. John, Frs. Jon-Stephen Hedges
              and Dean Brunner at St. Peter and Frs. Nicholas Speier and John
              Sommer at St. Luke.
            </p>
            <p className="leading-relaxed">
              One of our early encouragers, alack and alas, was our dear
              Professor of English friend from Gordon College, Dr. Thomas
              Howard. On more of a Western track to the ancient faith, his
              friendship and lectures helped buttress us early on in our
              pilgrimage to Orthodoxy.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Meeting the Orthodox
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              By 1977 our bishops began to interact with various Orthodox
              clergy. OCA (Orthodox Church in America) priest Fr. Ted Wojcik
              visited us that year, and in 1978 Bishops Jack Sparks and Peter
              Gillquist traveled to New York to meet with the faculty at St.
              Vladimir Seminary. The Gillquists moved to Santa Barbara in the
              summer of 1979 and Bishop (now Archbishop) DMITRI visited and
              taught here that December. Frs. Alexander Schmemann and John
              Meyendorff also came and taught at St. Athanasius Academy during
              this era. Fr. Schmemann insisted we meet people of the other
              Orthodox jurisdictions.
            </p>
            <p className="leading-relaxed">
              Also in the late 1970s, as we were discovering historic Orthodoxy,
              Doug King and John Finley were putting to music the things our
              clergy were learning about the Church. A favorite was:
            </p>
            <div className="my-6 rounded-lg bg-gray-50 p-6 leading-relaxed italic">
              <p className="mb-2">
                <strong>Within These Walls</strong>
              </p>
              <p className="mb-2">
                Within these walls,
                <br />
                His priests lift up their hands.
                <br />
                Within these walls,
                <br />
                His children learn to stand.
                <br />
                Within these walls,
                <br />
                you hear the Angels sing.
                <br />
                Within these walls,
                <br />
                we have an offering.
              </p>
              <p className="mb-2">
                Within these walls,
                <br />
                His Spirit teaches us.
                <br />
                Within these walls,
                <br />
                His wisdom reaches us.
                <br />
                Within these walls,
                <br />
                the injured receive care.
                <br />
                Within these walls,
                <br />
                there is effective prayer.
              </p>
              <p className="mb-2">
                Within these walls,
                <br />
                His sheep He safely feeds.
                <br />
                Within these walls,
                <br />
                His government He leads.
                <br />
                Within these walls,
                <br />
                you grow to love His friends.
                <br />
                Within these walls,
                <br />
                you know release from sins.
              </p>
            </div>
            <p className="leading-relaxed">
              &ldquo;These songs were just the best,&rdquo; Penny Brunner remembers. &ldquo;These
              men had such an incredible gift for music. Everyone would be
              teary-eyed when we sang because these pieces were such a personal
              part of our history. The hymns incorporated the things Doug and
              John saw, but they touched everybody.&rdquo;
            </p>
            <p className="leading-relaxed">
              Fr. Jack Sparks and John Finley were responsible for examining,
              incorporating, and adapting when necessary the hymnography of the
              Orthodox Church. &ldquo;I remember Fr. Jack ordered a bunch of
              liturgical music from St. Vladimir Seminary Press,&rdquo; Fr. John says
              with a smile. &ldquo;I went to his house one day, and knocked. Fr. Jack
              came to the door with a stack of books about two feet high,
              dropped them into my outstretched arms and said, `Here -- figure
              it out!&apos;&rdquo;
            </p>
            <p className="leading-relaxed">
              By 1979, being part of an &ldquo;Order&rdquo; was not working. The Church
              raised up orders, not visa versa. We swallowed hard and became a
              denomination in February, 1979: the Evangelical Orthodox Church
              (EOC). This bold move received wide newspaper coverage, including
              a piece in The New York Times. The NCAO days were over.
            </p>
            <p className="leading-relaxed">
              In 1980 a delegation from our Santa Barbara parish was invited to
              the OCA convention in Detroit. Deliberations between the OCA and
              the EOC leaders took place in the East-West room of the Cadillac
              Hotel. How appropriate!
            </p>
            <p className="leading-relaxed">
              The Greek Orthodox Seminary in Boston, Holy Cross, scheduled two
              dialogs between Bishop MAXIMOS and the faculty and our leaders in
              1982 and 1983. Bishop Peter also met with Bishop (now
              Metropolitan) CHRISTOPHER of the Serbian Orthodox Church, and
              attempted on numerous occasions to visit Metropolitan PHILIP.
              Somehow their schedules would never mesh.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              A New Door is Opened
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              Numerous times between 1980 and 1985, the EOC Council of Bishops
              met in Santa Barbara. Almost always the agenda revolved around
              whether or not we should enter the Orthodox Church, and if so how
              and through which jurisdiction.
            </p>
            <p className="leading-relaxed">
              At the January 1985 Council, the decision was made to approach
              Constantinople. Bishop MAXIMOS offered to accompany us, and
              Archbishop IAKOVOS approved the trip for late May, 1985. Our
              entire Council prepared to make the journey to Istanbul. At the
              last moment, Archbishop IAKOVOS changed his mind and the day after
              our men flew overseas, his telegram arrived at Bishop Peter&apos;s
              house on Pasado Road asking that the trip be postponed. The EOC
              bishops were turned away in Constantinople.
            </p>
            <p className="leading-relaxed">
              God closed that door but opened another. Bishops Jon, Richard and
              Peter met Patriarch IGNATIUS IV of Antioch and Metropolitan PHILIP
              just two weeks later, in June, 1985, in Los Angeles. &ldquo;We will do
              everything we can to help you,&rdquo; the Patriarch assured his new EOC
              friends. Metropolitan PHILIP became our advocate from that moment
              on.
            </p>
            <p className="leading-relaxed">
              The climax to this dialog came in September of 1986 when the EOC
              Council together with a number of our clergy and laity presented
              themselves to Metropolitan PHILIP at his Englewood, New Jersey
              residence. &ldquo;After three days of dialogue we asked him to receive
              us,&rdquo; Fr. Richard Ballew told us when he returned. &ldquo;He said YES!&rdquo;
            </p>
            <p className="leading-relaxed">
              The Santa Barbara diocese of the EOC labored night and day to
              incorporate the revisions to our St. John Chrysostom Liturgy -- as
              did the other sixteen EOC parishes. Chrismations and ordinations
              would start for us at St. Michael&apos;s, Van Nuys, California, on
              February 8, 1987.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              A New Life as Orthodox Christians
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              From February to April, 1987, the seventeen parishes and about
              2,000 people of the Evangelical Orthodox Church were received into
              the Antiochian Archdiocese by Metropolitan PHILIP and Bishop
              ANTOUN. In his keynote address at the Archdiocesean Convention in
              Detroit that summer, the Metropolitan welcomed us into the Church
              and challenged us to bring America to the Orthodox faith. Fr. Jon
              Braun was asked to direct the Department of Campus Ministry and
              Fr. Peter Gillquist was named head of the Department of Missions
              and Evangelism for the Archdiocese.
            </p>
            <p className="leading-relaxed">
              When our parish became Orthodox, Metropolitan PHILIP granted our
              request to be named St. Athanasius Orthodox Church, giving us as
              our patron the great hero of the Council of Nicea.
            </p>
            <p className="leading-relaxed">
              In the years both before and since entering the Archdiocese, St.
              Athanasius Church has been a center for Orthodox activity on
              several fronts.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Maturity in Worship
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              Once we were Orthodox, we used the text of the services as
              prescribed by the Archdiocese, the same as any other Orthodox
              Church. But how would we learn all the traditional music? To help
              us make the transition, the Metropolitan permitted us to use known
              Protestant hymn melodies sung with rhymed and metered words from
              Orthodox hymns. Fr. Jack Sparks and Dn. John Finley worked endless
              hours to bring this music together. During communion and at the
              veneration of the Cross, we were permitted to retain use of some
              of the original pre-Orthodox hymns we had written. This gave us
              the time we needed to learn the traditional Orthodox music.
            </p>
            <p className="leading-relaxed">
              Today, we still use some of our transition music, but we have also
              incorporated music from the many Orthodox musical traditions,
              including Byzantine Chant, Russian Chant, and four-part music from
              around the world, as well as newly composed hymns by American
              composers. Each year we feel more and more at home with the music
              of the Church. Hymns from the major feast days, the wedding
              service, baptisms and the hierarchical liturgy are like good
              friends that we have finally gotten to know.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              A Birthplace of Books
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              In large part because St. Athanasius Academy and the Academic
              Community were here for so many years, many landmark Orthodox
              books were born in our parish. Immediately after entering the
              Church, Fr. Peter Gillquist wrote the story of our journey from
              evangelicalism to Orthodoxy entitled Becoming Orthodox which has
              gone through several printings. Later, he wrote the biography of
              our primate, Metropolitan PHILIP: His Life and His Dreams.
            </p>
            <p className="leading-relaxed">
              Fr. Jack Sparks wrote a number of his books while a part of our
              parish including the best-selling Mindbenders: A Look at Current
              Cults and his newer series of three volumes based onUnseen
              Warfare. Fr. Jon Braun&apos;s outstanding book on the Trinity, the
              Incarnation and our salvation called Divine Energy was written
              here.
            </p>
            <p className="leading-relaxed">
              But the best known volume of them all, The Orthodox Study Bible:
              New Testament and Psalms was put together in our nave and Church
              office through the efforts of the Academic Community. It has sold
              over 100,000 copies, and has brought many new people to the Church
              and strengthened the faith and knowledge of countless Orthodox
              believers.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              A Center for Outreach
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              The word is out in the Protestant community that if you&apos;re
              interested in Orthodoxy, a good place to visit is St. Athanasius,
              Santa Barbara. For several years, we were the host parish for the
              Pan-Orthodox Missions and Evangelism Conference held at nearby
              Francisco Torres. About one-fourth of the attendees were
              non-Orthodox seekers.
            </p>
            <p className="leading-relaxed">
              Many non-Orthodox pastors and laity come to visit as well. Many
              have become Orthodox and joined our parish, while others have gone
              on to start new missions across the country - the most recent
              being Fr. Joseph Corrigan and his parish, St. Peter, in San Dimas,
              California. One year after establishing St. Luke&apos;s Mission in
              Santa Barbara, Fr. Josiah Trenham, a former Episcopal priest, and
              his flock merged with St. Athanasius in December, 1994. Fr. Josiah
              is now the senior pastor of St. Andrew Orthodox Church in
              Riverside, California, a large and vital community that
              consecrated its new temple in 2013.
            </p>
            <p className="leading-relaxed">
              In addition, we have had the joy of welcoming to the faith
              students and faculty from adjacent UCSB and from nearby Westmont
              and Santa Barbara City College, and this with little formal
              outreach. Perhaps the day will come when we will have on our
              parish staff a person who does full-time campus ministry.
            </p>
            <p className="leading-relaxed">
              The Food Distribution Program, St. Brigid Fellowship (ministry to
              the homeless and needy) and Council of Christmas Cheer have played
              important parts in our community outreach, along with involvement
              in work to protect the lives of unborn children. Many of our
              members support needy children in the Middle East, others assist
              in International Orthodox Christian Charities (IOCC) and Project
              Mexico/St. Innocent Orphanage.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              A Commitment to Orthodox Unity
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              A vital ingredient in the spirit of the Antiochian Patriarchate
              over the centuries has been a commitment to unity among Orthodox
              Christians. Fr. Nicholas and our parish clergy have worked
              together to build strong relationships with other Orthodox in the
              area.
            </p>
            <p className="leading-relaxed">
              The Central Coast Clergy Association has been one result of this
              effort, bringing together Orthodox priests and parishes from Santa
              Maria to Camarillo. We share a deepening friendship with the first
              Orthodox parish in Santa Barbara, St. Barbara Greek Orthodox
              Church, and its pastor. A strong relationship exists with Mother
              Victoria at St. Barbara Monastery (OCA) in Ojai. The monastery
              began in Santa Barbara with the strong and loyal support of our
              parish. Fr. Nicholas also works with neighboring non-Orthodox
              Christian leaders in areas of mutual concern.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              Our Social Register
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              Through the years, many local parish traditions have already come
              into being. A favorite is the annual St. Nicholas Night on or
              about December 6. Open to the public, this event features music,
              story-telling, gifts for children, and a visit from St. Nicholas.
            </p>
            <p className="leading-relaxed">
              Every now and then we host a Family Night, when everyone gets out
              their musical instruments for a wonderful trip down memory lane.
              Often on these occasions the faithful from our sister church in
              Lompoc, St. Timothy, will join us for the evening. For an hour or
              two we sing together many of the songs which brought us through
              the expanded 30 years of our history.
            </p>
            <p className="leading-relaxed">
              Our ladies look forward to the annual Annunciation Tea and the
              Women&apos;s Retreat, while the men would gather each month for Men&apos;s
              Fellowship. Summertime means summer school and Magic Mountain for
              the kids, and at least a few Church picnics at Goleta Beach or
              Stow Park.
            </p>
            <p className="leading-relaxed">
              And, as we continue on our Orthodox journey, we are developing
              local traditions for celebrating the major feasts of the Church,
              such as when we all head to the ocean for the Great Blessing of
              the Waters at Epiphany, the Meatfare Sunday picnic and lots of
              potlucks to celebrate feast days. As Fr. Nicholas says, feasting
              is one of the things we do best!
            </p>
            <p className="leading-relaxed">
              But Pascha - Easter Sunday - must rank as the pinnacle of our
              worship and social experience. Very early in the morning we gather
              at the church to proclaim in one voice, one heart, and one mind,
              &ldquo;Christ is Risen! He is Risen Indeed!&rdquo; Parishioners work for days
              to prepare the food and special entertainment which follows at the
              agape feast. We have adopted many traditionally Orthodox Pascha
              customs, as well as some of our own. It seems that on that
              morning, more than any other day of the year, we are at peace . .
              . and we are truly one. On that day we celebrate the greatest
              miracle of them all, the Resurrection of our Lord and Savior Jesus
              Christ, as well as the love God has given us for one another -
              past, present, and future.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="heading-orthodox mb-4 text-2xl font-semibold md:text-3xl">
              A Place for You
            </h2>
            <div
              className="mb-6 h-0.5 w-12"
              style={{ background: 'var(--orthodox-gold)' }}
            />
            <p className="leading-relaxed">
              St. Athanasius Church means not only a place for us, but a place
              for you. As a visitor, we invite you to join us as often as you
              can to worship and glorify the Father, Son and Holy Spirit. Don&apos;t
              hesitate to ask about the Inquirers Group, and when the next one
              will begin. We urge you to consider becoming an Orthodox
              Christian, and invite you to make this Church your home.
            </p>
            <p className="leading-relaxed">
              Through good and lean years, God has been wonderfully faithful to
              us. You will notice the joy of Christ in our clergy, our families,
              the singles, the children and the grandparents. But most of all,
              we hope you will find the spirit of worship here.
            </p>
            <p className="leading-relaxed">
              Two thousand years ago, our Lord Jesus Christ revealed to the
              woman of Samaria that God the Father seeks people who will worship
              Him in Spirit and in truth. The parish of St. Athanasius desires
              to be true to that call. The first decade in the Orthodox Church
              has far exceeded our expectations and we believe that the years
              ahead - from now until the return of Christ - will be even richer
              in their rewards.
            </p>
            <p className="leading-relaxed">
              Just as Metropolitan PHILIP, of thrice blessed memory, did for us
              a decade ago, may we also have the matchless opportunity to extend
              to you a welcome home!
            </p>
          </div>
        </article>
      </section>
    </MainLayout>
  )
}
