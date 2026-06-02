'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FaqItem {
  question: string
  answer: React.ReactNode
}

const faqs: FaqItem[] = [
  {
    question: 'What do Orthodox Christians believe about liturgy?',
    answer: (
      <>
        <p>
          Biblically and historically true worship has consistently been
          liturgical. &ldquo;Spontaneous&rdquo; worship is an innovation of the last century
          or so.
        </p>
        <p>
          Liturgical worship, written Prayers (the Psalms) and feast days were
          the norm throughout the history of Israel (see Exod. 23:14-19;
          24:1-8; etc.).
        </p>
        <p>
          The worship of heaven is liturgical (Isa. 6:1-8; Heb. 8:1-3; Rev. 4).
        </p>
        <p>
          The foundations of liturgical worship in the Church are apparent in
          the New Testament. The most oft-repeated prayer of the Church is there
          (Matt. 6:9-13). The words we say at baptism are there (Matt. 28:19).
          The words spoken at Holy Communion are there, with St. Paul repeating
          Jesus&apos; words (I Cor. 11:23-26). Further, the believers in Acts 13:2,
          about 49 A.D., were seen in a liturgical service to the Lord: &ldquo;As they
          ministered (Gk: leitourgouaton, our root word for liturgy!) to the
          Lord and fasted, the Holy Spirit said....&rdquo; Note, too, in this passage
          that the Holy Spirit speaks to us during liturgical worship. Thus
          praise to God must never become dead form, but rather living worship,
          &ldquo;in spirit and truth&rdquo; (Jn. 4:23, 24).
        </p>
        <p>
          Documents like the Didache (70 A.D.), the writings of St. Justin
          Martyr (150 A.D.) and Hipploytus (early 200s) all show the worship of
          the early Church was, without exception, liturgical.
        </p>
        <p>
          Because of their disdain for Rome, some Protestant groups have reacted
          by dismissing liturgical worship (though everyone has patterned
          worship, &ldquo;spontaneous&rdquo; or not!) But the Bible and Church history are
          clear; liturgical worship is the norm for the people of God.
        </p>
      </>
    ),
  },
  {
    question: 'Why do Orthodox Christians honor the saints?',
    answer: (
      <>
        <p>
          The Scriptures themselves call us to honor other Christians, both the
          living and departed.
        </p>
        <p>
          In Acts 28:10, St. Luke writes, &ldquo;they honored us (the Apostolic band)
          in many ways.&rdquo; The biblical injunction concerning Mary, &ldquo;All
          generations will call me blessed&rdquo; (Luke 1:48), is an example of how we
          are to honor the saints for all time (see also Heb. 11:4-40).
        </p>
        <p>
          We are to honor all believers and true authorities, not just departed
          ones. This is why Saint Paul exhorts us to honor one another (1
          Timothy 5:17), and why Saint Peter tells husbands to honor their wives
          (1 Peter 3:7). May we gain back true honor, both in the Church and in
          the culture.
        </p>
        <p>
          In Orthodox Christian worship, we see pictures or icons of the
          believers of history all around us. This is, in part, how we honor our
          forerunners in the faith. In Hebrews 12:22-24 we read that in worship
          we join with the heavenly throng to praise and worship God. We come to
          join &ldquo;an innumerable company of angels,&rdquo; &ldquo;the general assembly and
          church of the first-born who are registered in heaven&rdquo; and &ldquo;the
          spirits of just men made perfect.&rdquo; And as &ldquo;in spirit and in truth&rdquo; we
          join these angelic and redeemed heroes of the faith, we do give them
          proper honor as the Scripture teaches.
        </p>
        <p>
          Some modern believers tend to give notice primarily to living
          Christian heroes unfortunately, often newly-believing athletes, beauty
          queens and political figures. But throughout Church history, honor
          went to those who finished the race (I Corinthians 9:24-27), not to
          those who have merely begun or who are still on the earthly track
          (Galatians 5:7). These saints of old are not dead, but alive in Christ
          forever!
        </p>
      </>
    ),
  },
  {
    question: 'Do the Icons of Orthodoxy border on idolatry?',
    answer: (
      <>
        <p>
          In Orthodox Christianity, icons are never worshipped, but they are
          honored or venerated.
        </p>
        <p>
          The Second Commandment says, &ldquo;You shall not make for yourself any
          carved image, or any likeness of anything that is in heaven above, or
          that is in the earth beneath, or that is in the water under the earth&rdquo;
          (Exod. 20: 4, 5). The warning here is that we are not to image things
          which are limited to heaven and therefore unseen, and we never bow
          down to or worship created, earthly things such as the golden calf.
          Does this condemn all imagery in worship? The Bible speaks for itself,
          and the answer is no.
        </p>
        <p>
          Just five chapters later, in Exodus 25, God gives His divine
          blueprint, if you will, for the tabernacle. Specifically in verses 19
          and 20, he commands images of cherubim above the mercy seat. So true
          imagery is not condemned in Scripture, but false imagery. Also, God
          promises to meet and speak with us through this imagery! (Exod.
          25:22).
        </p>
        <p>
          In Exodus 26:1, Israel was commanded in no uncertain terms to sew
          &ldquo;artistic designs of cherubim&rdquo; in the tabernacle curtains. Are these
          images? Absolutely! In fact, they are Old Testaments icons. And they
          are images God commanded.
        </p>
        <p>
          From the beginning the Church imaged heavenly things brought to earth:
          Christ Himself, the cross (Gal. 6:14), and the saints of God (Heb. 11
          and 12). Worship is reserved for the Holy Trinity alone. But we honor
          the great men and women of the faith by remembering them in the Church
          via visual aids, called icons or windows to heaven.
        </p>
      </>
    ),
  },
  {
    question:
      'Do Orthodox Christians place tradition above or equal to Scripture?',
    answer: (
      <>
        <p>
          The Church sees the Scriptures as inspired and authoritative Holy
          Tradition: the Word of God. The key here is to see how the word
          &ldquo;tradition&rdquo; is used in the New Testament, which condemns the tradition
          of men but calls us to follow apostolic or holy tradition.
        </p>
        <h3>Tradition of Men</h3>
        <p>
          First of all, Jesus warned against holding to the &ldquo;tradition of men&rdquo;
          and &ldquo;your tradition&rdquo; in the strongest possible terms (see Mark
          7:6-16). All Christians agree: The Bible says no to the tradition of
          men.
        </p>
        <p>
          Secondly, Saint Paul warns in Colossians 2:8: &ldquo;Beware lest anyone
          cheat you through philosophy and empty deceit, according to the
          tradition of men, according to the basic principles of the world, and
          not according to Christ.&rdquo; Here again, the phrase &ldquo;tradition of men&rdquo;
          stands out, which the Church condemns.
        </p>
        <h3>Holy Tradition</h3>
        <p>
          In distinction to the tradition of men, the Bible calls us to obey
          tradition which has God as its source. In II Thessalonians 2:15, Saint
          Paul writes, &ldquo;Therefore, brethren, stand fast and hold the traditions
          which you were taught, whether by word or our epistle.&rdquo; In contrast to
          man&apos;s tradition, apostolic tradition is our foundation in the Church.
        </p>
        <p>
          Further, in II Thessalonians 3:6 we read, &ldquo;But we command you,
          brethren, in the name of our Lord Jesus Christ, that you withdraw from
          every brother who walks disorderly and not according to the tradition
          which he received from us.&rdquo; Here again, we are dealing with Apostolic
          tradition, the tradition which God planted in the Church. Thus the
          Church is &ldquo;the pillar and ground (or support) of the truth&rdquo; (I Timothy
          3:15).
        </p>
        <p>
          All true tradition comes from the same source: the Holy Spirit in the
          Church. The same One who inspired holy Scripture prompted the
          on-location teaching of the Apostles, whether written or oral (II
          Thes. 2:15). Further, it was on the basis of Church tradition that the
          Biblical canon was determined.
        </p>
        <p>
          <strong>Definition.</strong> Tradition is giving our ancestors a vote.
          It is walking in the &ldquo;path of righteousness for His name&apos;s sake&rdquo;
          (Psalm 23:3). Or, as Jeremiah writes, living by holy tradition is a
          call from God Himself. &ldquo;Stand in the ways and see, and ask for the old
          paths, where the good way is, and walk in it; then you will find rest
          for your souls&rdquo; (Jer. 6:16).
        </p>
        <p>
          Thus, there are two kinds of tradition: that of God and that of men.
          It is to the former that the Church is singularly committed.
        </p>
      </>
    ),
  },
  {
    question: 'Why does the Orthodox Faith emphasize the role of Mary?',
    answer: (
      <>
        <p>
          Let us turn to the New Testament and see what God says about Mary. A
          key passage is Luke 1:26-49.
        </p>
        <p>
          The Archangel Gabriel calls the Virgin Mary &ldquo;highly favored&rdquo; with God
          (see also Luke 1:30) and the most &ldquo;blessed&rdquo; of all women (Luke 1:28).
          We must never do less.
        </p>
        <p>
          In Luke 1:42, 43, Elizabeth, the mother of John the Baptist, also
          calls Mary &ldquo;blessed,&rdquo; and &ldquo;the mother of my Lord.&rdquo; Can we make the
          same confession? For centuries, the Church with one voice has called
          Mary the mother of God. If God was not in her womb, we are dead in our
          sins. By &ldquo;mother of God&rdquo; we do not mean, of course, that she is mother
          of the Holy Trinity. She is mother of the eternal Son of God, the
          Theotokos or God-bearer.
        </p>
        <p>
          Not only does Elizabeth call her blessed, Mary herself, inspired by
          the Holy Spirit, predicts, &ldquo;All generations will call me blessed&rdquo;
          (Luke 1:48). This biblical prophecy explains the Orthodox hymn, &ldquo;It is
          truly right to bless you, O Theotokos, the Mother of our God.&rdquo; Tragically, our generation has forgotten to call her blessed. Orthodox
          Christians bless her in obedience to God, fulfilling His holy words.
        </p>
        <p>
          It is important to secure Mary&apos;s identity as the mother of God to
          protect the identity of her holy Son, &ldquo;the Son of the Highest&rdquo; (Luke
          1:32), God in the flesh. If we cannot face up to Mary, we will miss
          the incarnation of the Son of God.
        </p>
        <p>
          The Old Testament Prophet Ezekiel writes, &ldquo;This gate shall be shut; it
          shall not be opened, and no man shall enter by it, because the Lord
          God of Israel has entered by it; therefore it shall be shut&rdquo; (Ezekiel
          44:2). The early Church Fathers consistently saw this gate as a
          picture of the womb of Mary, shut after Jesus&apos; birth. We do not
          worship Mary. Worship is reserved only for God the Father, Son and
          Holy Spirit. We honor or venerate her, as the Scriptures teach.
        </p>
      </>
    ),
  },
  {
    question:
      'What does the Orthodox faith teach concerning the Sacraments of the Church, specifically communion?',
    answer: (
      <>
        <p>
          Some Protestant groups teach communion or the Lord&apos;s Supper is only
          sign or symbol. Most all of Christendom, however, believes it is far
          more. The Church has always believed that we, in a Mystery, receive
          the body and blood of Christ. Let us look at Holy Scripture concerning
          Communion.
        </p>
        <p>
          Jesus said at the Last Supper: &ldquo;This is my body&rdquo; and &ldquo;This cup is
          ...my blood&rdquo; (Luke 22: 19 and 20, italics added). The Lord is clear
          that His gifts to us are more than just sign or a mere memorial.
        </p>
        <p>
          In I Corinthians 11:29, 30, we read of people who became sick and even
          died for receiving communion hypocritically. People do not die over
          something merely &ldquo;symbolic.&rdquo; The bread and wine is, in mystery, the
          body and blood of the Lord.
        </p>
        <p>
          In I Corinthians 10, Saint Paul is comparing the manna and water in
          the wilderness with the true bread and drink of the New Covenant. In I
          Corinthians 10:4 he writes, &ldquo;And all drank the same spiritual drink.
          For they drank of that spiritual Rock that followed them, and that
          Rock was Christ.&rdquo; The question is, was the Rock Christ? Under
          laboratory observation, the rock was still most likely granite. But
          the word of God says, &ldquo;The Rock was Christ.&rdquo; We do not subject the
          gifts to the table of chemical valence, but to the word of God. It&apos;s
          mystery, but never magic. Christ was present in the Rock as He is
          present in the Holy Gifts.
        </p>
        <p>
          In John 6:53 we read, &ldquo;Then Jesus said to them, &apos;Most assuredly, I say
          to you, unless you eat the flesh of the Son of Man and drink His
          blood, you have no life in you.&apos;&rdquo; The Church receives this passage at
          face value - nothing added, nothing taken away. In communion we become
          partakers of the body and blood of Christ. Just as the new birth (John
          3) gives us life through water and the Holy Spirit, so the body and
          blood of Christ sustains His life in us.
        </p>
        <p>
          There is also the fact (Hebrews 9:11, 12) that Christ our High Priest
          enters the Heavenly Sanctuary with His own blood, and that it is in
          this Heavenly Sanctuary that we worship (Hebrews 10:19-25). There is
          only one Eucharist, the one in heaven, and we join in that one feast.
        </p>
        <p>
          We must neither add to nor subtract from the word of God. Therefore we
          confess with holy Scripture that the consecrated bread and wine is the
          body and blood of Christ. It is a mystery: we do not pretend to know
          how or why. As always, we come to Christ in childlike faith, receive
          His gifts, and offer Him praise that He has called us to His heavenly
          banquet.
        </p>
      </>
    ),
  },
]

export function FaqsAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-byzantine-blue/20"
        >
          <AccordionTrigger className="text-lg font-semibold text-byzantine-blue hover:text-orthodox-gold hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="prose prose-lg max-w-none text-byzantine-blue/80 [&>p]:mb-4 [&>p:last-child]:mb-0">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
