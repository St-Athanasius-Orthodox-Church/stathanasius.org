export interface ClergyMember {
  name: string
  title: string
  role: string
  image: string | null
  slug: string | null
}

export interface ClergyBio {
  name: string
  title: string
  image: string | null
  bio: string[]
}

const frSymeonUrl = '/assets/fr-symeon.jpg'
const frNicholasUrl = '/assets/fr-nicholas.jpg'
const frJohnFinleyUrl = '/assets/fr-john-finley.jpg'
const frJonBraunUrl = '/assets/fr-jon-braun.jpg'
const frJohnCarrilloUrl = '/assets/fr-john-carillo.jpg'
const dnGaryUrl = '/assets/dn-gary.jpg'

export const clergyGroupUrl = '/assets/clergy.jpg'

export const priests: ClergyMember[] = [
  {
    name: 'Rev. Fr. Symeon Halsell',
    title: 'Senior Pastor',
    role: '',
    image: frSymeonUrl,
    slug: 'fr-symeon',
  },
  {
    name: 'Very Rev. Fr. Nicholas Speier',
    title: 'Pastor Emeritus',
    role: '',
    image: frNicholasUrl,
    slug: 'fr-nicholas',
  },
  {
    name: 'Very Rev. Fr. John Finley',
    title: 'Attached Priest',
    role: 'Chairman, Antiochian Archdiocese Dept. of Missions & Evangelism',
    image: frJohnFinleyUrl,
    slug: 'fr-john-finley',
  },
  {
    name: 'Very Rev. Fr. Jon Braun',
    title: 'Attached Priest',
    role: 'Retired',
    image: frJonBraunUrl,
    slug: null,
  },
  {
    name: 'Rev. Fr. John Carrillo',
    title: 'Attached Priest',
    role: 'Retired',
    image: frJohnCarrilloUrl,
    slug: 'fr-john-carrillo',
  },
]

export const deacons: ClergyMember[] = [
  {
    name: 'Rev. Dn. Gary Braun',
    title: 'Deacon',
    role: '',
    image: dnGaryUrl,
    slug: 'dn-gary',
  },
  {
    name: 'Rev. Dn. Scott Jacobs',
    title: 'Deacon',
    role: 'Retired',
    image: null,
    slug: 'dn-scott',
  },
  {
    name: 'Rev. Dn. John Young',
    title: 'Deacon',
    role: 'Retired',
    image: null,
    slug: 'dn-john',
  },
]

export const clergyBios: Record<string, ClergyBio> = {
  'fr-symeon': {
    name: 'Rev. Fr. Symeon Halsell',
    title: 'Senior Pastor',
    image: frSymeonUrl,
    bio: [
      "Fr. Symeon Halsell was raised in Southern California and has been a Christian all his life. He was introduced to the Orthodox faith through a forum of people interested in 'ancient christianity' on myspace.com. After a few years of studying and preparation he was baptized into the Faith on April 26, 2008.",
      'Soon after, he met his wife, Kh. Cayce-Marie at Camp St. Nicholas. Khouria is the daughter of Fr. David and Kh. Caryn Kruse. She is an iconographer and therapeutic horsemanship instructor. In 2014 their son Nikolai was placed with them at eight days old and their adoption process was finalized in 2016.',
      'After serving as a subdeacon for several years at St. Peter in Pomona, CA, Fr. Symeon was given the blessing to attend St. Vladimir\'s Seminary in 2017. While at seminary Kh. Cayce-Marie had the honor and joy of singing in the St. Vladimir Seminary Chorale.',
      "Fr. Symeon was ordained to the Diaconate in 2018 then to the Holy Priesthood on August 11, 2019 by His Eminence Metropolitan Joseph. In 2020 Fr. Symeon graduated with a Masters of Divinity from St. Vladimir's Orthodox Theological Seminary in Yonkers, NY.",
      'From March-July of 2020, he served as the interim-pastor at St. Peter Antiochian Orthodox Church in Pomona, CA. He, Khouria Cayce, and Niko moved to Santa Barbara in August of 2020, when Fr. Symeon began his ministry as Assistant Pastor at St. Athanasius. He became Senior Pastor on January 1, 2022, upon the retirement of Fr. Nicholas Speier.',
    ],
  },
  'fr-nicholas': {
    name: 'Very Rev. Fr. Nicholas Speier',
    title: 'Pastor Emeritus',
    image: frNicholasUrl,
    bio: [
      'Very Reverend Father Nicholas Speier was born and raised in Alameda, California. He has been active in the church and in church ministry since 1971, was ordained a priest at St. Athanasius Church in 1987 and was Senior Pastor at St. Athanasius from 1991 until his retirement on December 31, 2021.',
      "Fr. Nicholas began his work in ministry after his graduation from the University of California at Santa Barbara. As a credentialed teacher and trained administrator, Youth Ministry and Education were always close to his heart. He has a Masters of Orthodox Theology from St. Athanasius Academy and continued his studies through clergy seminars. Over the years, Fr. Nicholas has become more and more involved in the parish's ministry to the unsheltered community, and intends to continue to participate in that ministry. It is with a thankful heart that he continues to work alongside Fr. Symeon as a support to him at St. Athanasius parish.",
      'Fr. Nicholas is a member of the Board of Directors of St. Barbara Monastery and it has been his joy to help and support the work of Mother Victoria and the sisterhood. He also serves locally on the Board of The Showers of Blessing, a non-profit organization that provides showers five days per week in different locations throughout Santa Barbara. One of the host locations is St. Athanasius Church.',
      'Father Nicholas is married to Khouria Jan Speier, and is blessed to be the father of four children, grandfather of twelve, and great grandfather of five. In his spare time, he enjoys golf, exercising, baseball, gardening, and spending time with his family.',
    ],
  },
  'fr-john-carrillo': {
    name: 'Rev. Fr. John Carrillo',
    title: 'Attached Priest (Retired)',
    image: frJohnCarrilloUrl,
    bio: [
      'Very Reverend Father John Carrillo is originally from San Bernardino, CA. He came to Isla Vista in 1970, and was ordained to the priesthood in the Orthodox Church in 1987. He is a printer by trade, but has also studied marriage counseling, an area of service he offered to the church free of charge for many years.',
      'He is married to Khouria Diane Carrillo, with whom he raised two daughters, and is the proud grandfather of six. His main hobby is bicycling, which he enjoys on extended trips to Northern California and back.',
    ],
  },
  'fr-john-finley': {
    name: 'Very Rev. Fr. John Finley',
    title:
      'Attached Priest (Chairman, Antiochian Archdiocese Dept. of Missions & Evangelism)',
    image: frJohnFinleyUrl,
    bio: [
      'Very Reverend Father John Finley (attached) was born in McAlester, Oklahoma and moved to Goleta in 1977. He earned a Bachelor of Music degree from Oklahoma Baptist University; an S.T.M. from St. Athanasius Academy of Orthodox Theology; and a Master of Arts in musicology from the University of California, Santa Barbara.',
      'Fr. John is attached to the altar of St. Athanasius Orthodox Church. Ordained to the priesthood in 1997, and elevated to the rank of archpriest in 2004, he has been an active field staff member of the Department of Missions and Evangelism for the Antiochian Archdiocese of North America since 1996, establishing numerous mission churches in the US and Canada. His career includes music performance, conducting, and composition; piano tuning; academic lecturing, teaching, and administration; published writings; and parish leadership.',
      'Fr. John is a staff member of the Antiochian Orthodox Christian Archdiocese, serving as Chairman of the Department of Missions and Evangelism since 2016.',
      'Fr. John is married to Khouria Jan Finley, the father of three grown children, and a grandfather. His hobbies include fishing, golf, and cooking.',
    ],
  },
  'dn-gary': {
    name: 'Rev. Dn. Gary Braun',
    title: 'Deacon',
    image: dnGaryUrl,
    bio: [
      'Deacon Gary Braun was born in Chicago, Illinois, and came to the Santa Barbara area in 1970. He earned a Bachelor of Arts degree in education, and was ordained to the diaconate in 1987. In the past, he has been actively involved in youth ministry and teaching Bible study, and has been invited to present homilies on a regular basis. He serves the Santa Barbara community as a real estate property manager.',
      'Deacon Gary is married to Melissa Braun, a nurse; they have 7 children and 5 grandchildren. Spending time with them is his favorite hobby, and he also enjoys reading.',
    ],
  },
  'dn-scott': {
    name: 'Rev. Dn. Scott Jacobs',
    title: 'Deacon',
    image: null,
    bio: [
      'Deacon Scott Jacobs is a third-generation Californian, and moved to the Santa Barbara area to attend UCSB. A well-seasoned tradesman, he established his credentials in the time honored training of Union apprenticeship to Journeyman Carpenter, Foreman, and Superintendent, and founded his first construction firm in 1981. He has been employed as Construction Manager for several large companies in Santa Barbara, and has worked since 2019 as a free-lance construction consultant.',
      'Ordained to the diaconate in 1987, Dn. Scott has been active in the parish in education and leadership, and shares his expertise in all areas of construction as a member of our Building Committee. He served as General Contractor for the construction of the first building on our new campus in 2013-2014.',
      'Fr. Deacon Scott is married to Karen Jacobs, a counselor at nearby Westmont College, and together they raised three sons and a daughter. He has a great love for the sport of baseball.',
    ],
  },
  'dn-john': {
    name: 'Rev. Dn. John Young',
    title: 'Deacon',
    image: null,
    bio: [
      'Deacon John Young was born in Ohio, and grew up in Colorado, where he studied chemistry at Mesa University. He went on to the University of Colorado, Boulder and Oregon State University, and completed a Master of Science in Chemistry. He moved to Isla Vista in 1970, and continued his education in computer science. His career included computer design and construction; networking; software testing, and research.',
      'Ordained to the diaconate of the Orthodox Church in 1987, he served diligently in the area of youth religious education.',
      'Fr. Deacon John is married to Fay Young, with whom he raised three daughters and one son; he is the proud grandfather of thirteen. His hobbies include fishing, hunting, and writing. In his retirement, he has written a 3-book memoir under the pen name Dan Neiser.',
    ],
  },
}

export const clergySlugs = Object.keys(clergyBios)

export function getClergyBio(slug: string): ClergyBio | undefined {
  return clergyBios[slug]
}
