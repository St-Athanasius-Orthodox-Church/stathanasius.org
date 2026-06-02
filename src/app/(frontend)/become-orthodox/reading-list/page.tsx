import type { Metadata } from 'next'

import { Hero } from '@/components/ui/hero'
import { MainLayout } from '@/layouts/main-layout'

export const metadata: Metadata = {
  title: 'Recommended Reading for Inquirers and Catechumens',
  description:
    'A recommended Orthodox reading list for inquirers and catechumens.',
}

export default function ReadingList() {
  return (
    <MainLayout>
      <Hero
        size="medium"
        title="A Recommended Reading List for Inquirers and Catechumens"
      />

      <section className="container mx-auto max-w-4xl px-4 py-16">
        <article className="mx-auto prose prose-lg max-w-none text-byzantine-blue">
          <div className="mb-12">
            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                Further Catechetical Reading
              </h3>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>
                  <em>The Orthodox Faith, Worship, and Life</em> by Hieromonk
                  Gregorios of Koutloumousiou
                </li>
                <li>
                  <em>The Truth of our Faith: Volumes 1 & 2</em> by Elder
                  Cleopas of Siharistia, a great resource which offers the
                  biblical defense and patristic understanding of the dogma,
                  doctrine, and sacraments of the Orthodox Faith.
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                Recommended Dogmatic Resources
              </h3>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>
                  <em>On the Exact Exposition of the Orthodox Faith</em> by St.
                  John of Damascus
                </li>
                <li>
                  <em>Dogmatic Theology</em> by Fr. Michael Pomazansky
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                On the History of the Church
              </h3>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>
                  <em>The Orthodox Church</em> by Met. Kallistos (Timothy) Ware
                </li>
                <li>
                  <em>The Orthodox Faith: Volume 3</em> by Fr. Thomas Hopko,
                  found here:{' '}
                  <a
                    href="https://www.oca.org/orthodoxy/the-orthodox-faith/church-history"
                    className="text-orthodox-gold underline hover:text-orthodox-gold/80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.oca.org/orthodoxy/the-orthodox-faith/church-history
                  </a>
                </li>
                <li>
                  <em>The Way to Nicea: Vol. 1 & 2</em> by Fr. John Behr
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                Guidance toward the Orthodox Way of Life and Acquiring an
                Orthodox Mind
              </h3>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>
                  <em>The Spiritual Life and How to Attune to it</em> by St.
                  Theophan the Recluse
                </li>
                <li>
                  <em>For the Life of the World</em> by Fr. Alexander Schmemann
                </li>
                <li>
                  <em>Acquiring the Mind of Christ</em> by Hieromonk Sergius
                  Bowyer
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                For Understanding Orthodox Liturgical Life
              </h3>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>
                  <em>Come, Let us Worship</em> by Fr. Patrick O&apos;Grady
                </li>
                <li>
                  <em>
                    The Divine Liturgy: A Commentary in the Light of the Fathers
                  </em>{' '}
                  by Hieromonk Gregorios of Koutloumousiou
                </li>
                <li>
                  <em>Great Lent</em> by Fr. Alexander Schmemann, the spiritual
                  meaning of the Great Fast
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">The Holy Fathers</h3>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>
                  <em>The Catechetical Homilies of St. Cyril of Jerusalem</em>
                </li>
                <li>
                  <em>Instructions to Catechumen</em> by St. John Chrysostom
                </li>
                <li>
                  <em>On the Incarnation</em> by St. Athanasius of Alexandria
                </li>
                <li>
                  <em>The Letters of St. Ignatius of Antioch</em>
                </li>
                <li>
                  <em>On the Holy Spirit</em> by St. Basil the Great
                </li>
                <li>
                  <em>Three Treatises on Divine Images</em> by St. John of
                  Damascus
                </li>
                <li>
                  <em>On the Priesthood</em> by St. John Chrysostom
                </li>
                <li>
                  <em>On Marriage</em> by St. John Chrysostom
                </li>
                <li>
                  <em>The Sayings of the Desert Fathers</em>
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                On Particular Theological Questions
              </h3>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>
                  <em>On the Orthodox Veneration of the Mother of God</em> by
                  St. John Maximovitch
                </li>
                <li>
                  <em>On the Christian Mysteries</em> by Elder Cleopa of
                  Sihastria, this is volume 2 of the{' '}
                  <em>The Truth of our Faith</em> mentioned above that
                  specifically addresses the seven main sacraments of the
                  Church.
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-xl font-semibold">
                Books Addressing Particular Religious Backgrounds
              </h3>
              <ul className="list-disc space-y-2 pl-6 leading-relaxed">
                <li>
                  <em>Thirsting for God in a Land of Shallow Wells</em> by
                  Matthew Gallatin, particularly relevant to those coming from
                  Evangelical, Baptist, or non-denominational Christian
                  backgrounds.
                </li>
                <li>
                  <em>
                    Rock and Sand: An Orthodox Appraisal of the Protestant
                    Reformers and Their Teachings
                  </em>{' '}
                  by Fr. Josiah Trenham, particularly relevant to those coming
                  from mainline Protestant Christian backgrounds.
                </li>
                <li>
                  <em>
                    In Peace Let Us Pray: An Orthodox Interpretation of the
                    Gifts of the Spirit
                  </em>{' '}
                  by Fr. Alexis Trader, particularly relevant to those from
                  Pentecostal or Charismatic Christian backgrounds.
                </li>
                <li>
                  <em>Christ the Eternal Tao</em> by Hmk. Damascene,
                  particularly relevant to those coming from an East Asian
                  religious background.
                </li>
                <li>
                  <em>The Gurus, the Young Man, and Elder Paisios</em> by
                  Dionysios Farasiotis, particularly relevant for people coming
                  from Hindu, Yogic, Eastern Meditation, and New Age
                  backgrounds.
                </li>
              </ul>
            </div>
          </div>
        </article>
      </section>
    </MainLayout>
  )
}
