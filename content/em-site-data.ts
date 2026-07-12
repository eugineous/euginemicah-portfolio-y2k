// Content for euginemicah.tech's marketing site, ported from the approved
// design source (em-site/index.html's Component class). Edit copy here —
// do not hardcode it into page components.

export const navDefs: [string, string][] = [
  ['Front Page', '/'], ['The Story', '/story'], ['The Work', '/work'], ['The Tour', '/tour'],
  ['Journal', '/journal'], ['Classifieds', '/shop'], ['Darkroom', '/gallery'], ['Mailroom', '/contact'],
];

export const chairsData = [
  { no: 'Position I', title: 'Journalist', copy: 'Co-anchor of Urban News on PPP TV, with Lucy Ogunde. Live, twice a week. The autocue is decorative.', cta: 'See the shows', href: '/work' },
  { no: 'Position II', title: 'Author', copy: 'Wrote a whole memoir about being broke. It sells. The irony is not lost on him.', cta: 'Read the book', href: '/book' },
  { no: 'Position III', title: 'Speaker', copy: 'Rooms rented by the hour, attention held for longer. English, Swahili, and whatever the crowd needs.', cta: 'Book the mouth', href: '/book-me' },
  { no: 'Position IV', title: 'Curator', copy: 'Founder, Roylandz Media. Co-founder, Urban Gang Tour. If culture happens near him, it gets organised.', cta: 'The field reports', href: '/tour' },
];

export const editionIndexData = [
  { sec: 'Section B', title: 'The many jobs of one mouth', quip: 'An occupational hazard report.', href: '/work' },
  { sec: 'Section C', title: 'The book, reviewed by its author', quip: '"Five stars." — Eugine, impartially.', href: '/book' },
  { sec: 'Section F', title: 'Field reports from the tour', quip: 'Schools keep surviving. Barely.', href: '/tour' },
  { sec: 'Section H', title: 'The classifieds', quip: 'Noise, now in wearable sizes.', href: '/shop' },
];

export const tvGuideData = [
  { slot: 'TUE & THU 7:30', name: 'Urban News', quip: 'The news, but young people actually watch it. With Lucy Ogunde, who is the reason it starts on time.', where: 'PPP TV · Live' },
  { slot: 'TOUR SEASON', name: 'Campus Xposure', quip: 'A camera walks into a campus. The campus never recovers.', where: 'YouTube · TikTok' },
  { slot: 'WEEKLY', name: 'Nairobi Podcast', quip: 'Long conversations with people building East African culture. Guests arrive confident. Some leave that way.', where: 'Spotify · Amazon' },
  { slot: 'EVERY STOP', name: 'Urban Gang Tour Live', quip: 'A school field becomes a national broadcast. Teachers are still writing the incident reports.', where: 'PPP TV · Live' },
];

export type Article = {
  slug: string; cat: string; date: string; read: number;
  title: string; deck: string; pull: string; lead: string;
  parasA: string[]; parasB: string[];
};

export const articlesData: Article[] = [
  {
    slug: 'no-script', cat: 'The Craft', date: 'Jul 2026', read: 7,
    title: 'No script, no retake, no mercy',
    deck: 'What live television teaches you about honesty that journalism school charges tuition to avoid mentioning.',
    pull: 'Preparation is what confidence looks like when the camera is close enough to count your pores.',
    lead: 'Two million people can tell when you are lying. Not because they are detectives — because live television is a polygraph with better lighting. The camera does not catch your words; it catches the half-second before them, and that half-second has never once been on my side.',
    parasA: [
      'People ask what it feels like the moment the red light comes on. Honestly? It feels like the moment before you jump into cold water, except the water is two million Kenyans and several of them are your aunties, and at least one of them will call your mother if your collar is crooked.',
      'The first time I anchored, I had rehearsed a greeting so smooth it could have run for office. The autocue died in four seconds. What came out of my mouth instead was the truth — clumsy, unrehearsed, alive — and the audience leaned in. That was the whole lesson, delivered in one broadcast: polish is forgettable. Presence is not.',
    ],
    parasB: [
      'Lucy and I do not use scripts now, which sounds brave until you understand what replaced them: preparation so heavy it should be checked luggage. We read everything. We argue about everything, off air, at volume, so that on air the argument has already been survived. The audience thinks we are winging it. We are — off a cliff we have measured very carefully.',
      'Here is what live TV teaches you that no lecture hall will: the truth is the only thing you can say at speed. Lies need drafting. Spin needs a committee. But the truth comes out at conversation pace, which is the only pace live television allows.',
      'So no — no script, no retake. But also no mercy, and I mean that gratefully. An audience that would forgive me anything would have taught me nothing.',
    ],
  },
  {
    slug: 'kerosene', cat: 'The Climb', date: 'Jun 2026', read: 6,
    title: 'The kerosene economy',
    deck: 'A financial education, administered one lamp at a time. Tuition was paid in darkness.',
    pull: 'We were not poor quietly. Even our poverty had a sound system.',
    lead: 'Before I understood money, I understood kerosene. Kerosene is honest currency: you can see exactly how much light you have left, and when the lamp starts coughing you know precisely how many pages of homework remain in the day. No banker has ever given me a statement that clear.',
    parasA: [
      'In Lugari, the lamp was our streetlight, our reading light, and — when the wick misbehaved — our fire alarm. My grandmother rationed it like a central bank governor. There were interest rates: finish your chores early and the lamp burned an extra half hour. Default on your duties and you studied by moonlight, which sounds romantic and is not.',
      'What growing up broke actually teaches you about money is this: money is time you can see. Every shilling was a unit of light, of maize flour, of the bus to Lumakanda. Nothing was abstract. When I hear economists say "liquidity," I picture a jerrican.',
    ],
    parasB: [
      'But here is what poverty lies to you about, and it lies fluently: it tells you that you are the shortage. That the empty tin is a character reference. It took me years — and one very patient grandfather, a reverend with a preaching voice that could bend weather — to learn that broke is a location, not an identity. You can be shipped out of a location.',
      'These days I get paid to talk, which my childhood self would find suspicious and my grandmother would find obvious. She always said the mouth would either bury me or build me. She lived to see it start building. We keep a lamp in the house — full tank, never lit. Some receipts you keep.',
    ],
  },
  {
    slug: 'forty-schools', cat: 'The Tour', date: 'Jun 2026', read: 6,
    title: 'Forty schools later, a field report on genius',
    deck: 'The most gifted kid in Kenya has never held a microphone. That fact should keep the whole country up at night.',
    pull: 'Talent is evenly distributed. Microphones are not.',
    lead: 'Somewhere in this country, right now, there is a girl who can silence eight hundred students with one verse — and the only stage she has ever stood on is a desk, during lunch, while a prefect took her name. I know because the Urban Gang Tour has met her, in forty different uniforms, in forty different schools.',
    parasA: [
      'Every stop runs the same experiment. We arrive with a stage, a sound system, and a national broadcast. We ask one question: who has something? The teachers point at the usual suspects — the choir kids, the ones with certificates. And then someone at the back gets pushed forward by their friends, visibly plotting revenge, and picks up the mic like it might bite.',
      'It never bites. What happens instead is the school discovers a star it has been marking absent all term.',
    ],
    parasB: [
      'People ask why a talent tour needs mentorship pods and a broadcast attached. Because applause fades by Monday. A recording does not. A kid who has seen herself on national television has evidence — and evidence, where I grew up, is worth more than encouragement.',
      'Lucy says my favourite phrase on tour is "one more time," and she is right, because the second attempt is where the shaking stops and the talent stands up straight. Forty schools later, I can report: the genius is out there, in bulk. The microphones are the bottleneck. So we keep driving.',
    ],
  },
  {
    slug: 'disagree', cat: 'The Craft', date: 'May 2026', read: 5,
    title: 'How to interview a man you disagree with',
    deck: 'A field manual for keeping your eyebrows neutral while your opinions riot quietly behind them.',
    pull: 'The point is not to win. The point is that the audience leaves knowing more than they came with.',
    lead: 'Every interviewer has a tell. Mine, according to Lucy, is that I get extremely polite — dangerously polite, the way a cat gets slow before it pounces. When a guest says something I find sincerely wrong, my "mmh" acquires an extra syllable. Viewers have started counting them.',
    parasA: [
      'Here is the discipline: your disagreement is not the story. You are not the story. The story is the gap between what the guest is saying and what the audience needs to know, and your whole job is to hold that gap open long enough for everyone to look inside.',
      'So you ask the question. Then — and this is the hard part, the part they cannot teach — you let the silence do the follow-up. Silence is the best interviewer I know. It has no ego, it cannot be flattered, and guests fill it with the exact things their press officers begged them not to say.',
    ],
    parasB: [
      'What you do not do is perform outrage. Outrage is cheap, it edits well, and it changes nobody’s mind — it just tells your side you are still on it. I did not leave Lugari and cross half of Kenya to become a mirror for people’s existing opinions.',
      'And when it ends, you shake the hand. Every time. Not because you agree — because the handshake is a message to the audience: this is what disagreement looks like when adults do it. In this country, on this continent, that might be the most useful thing my show broadcasts all week.',
    ],
  },
  {
    slug: 'valedictorian', cat: 'The Climb', date: 'May 2026', read: 5,
    title: 'Valedictorian, eventually',
    deck: 'On finishing school late, loudly, and first in the class. The timeline is not the achievement.',
    pull: 'I did not fall behind. The syllabus and I simply agreed to meet later, at a time that worked for both of us.',
    lead: 'There is a photograph from my graduation at TIBS — class of 2024, valedictorian, gown slightly too short because confidence takes up room — and every time I look at it I hear the aunties from years ago asking my mother, with surgical concern, whether the boy was "still in school."',
    parasA: [
      'The boy was intermittently in school. School costs money, and money, as covered elsewhere in this journal, was busy. I studied in bursts, worked in between — carrying cables at Citizen TV as an intern, learning television from the floor up, literally, because the floor is where the cables live.',
      'Here is what nobody tells you about a delayed education: you arrive at every class knowing exactly why you are there. The eighteen-year-olds were studying for exams. I was studying like the electricity bill depended on it, because at various points it had.',
    ],
    parasB: [
      'When they read my name first at graduation, my mother did not cry. She did something better: she looked around at the aunties. Slowly. A full panoramic sweep, like a broadcast camera. I have hosted live television for years and I have never delivered anything with that much precision.',
      'So to everyone running late by somebody else’s calendar: the timeline is not the achievement. The arrival is. And arriving loud, with receipts — that is just style points.',
    ],
  },
  {
    slug: 'fame-rental', cat: 'Unfiltered', date: 'Apr 2026', read: 5,
    title: 'Fame is a rental (mine is due Tuesday)',
    deck: 'Notes on being recognised at the supermarket while buying the cheap bread, and other celebrity experiences.',
    pull: 'The audience does not owe you tomorrow. Build something that outlives the algorithm.',
    lead: 'A boy stopped me outside a supermarket last month, phone already filming, and shouted the Urban News intro at me word for word. Then he looked into my basket, saw the budget bread, and lowered his phone out of respect for the fallen. That, right there, is fame in its natural habitat.',
    parasA: [
      'I enjoy being known. I would be lying otherwise, and as established, I am contractually incapable of lying at speed. But I keep a ledger in my head, and on that ledger fame is filed under rentals — enjoyable, useful, and absolutely not mine. The landlord is public attention, and the landlord is moody.',
      'You can always spot the celebrities who think they own the property. They stop preparing. They start explaining. Their captions get longer as their work gets thinner. I have watched it happen the way you watch a slow puncture — no drama, just a gradual loss of altitude and an eventual walk home.',
    ],
    parasB: [
      'So the rule at Roylandz is simple: feed the work, not the fame. The show gets rehearsed, the tour gets planned, the book got written at 4 a.m. — and the fame can come along if it behaves. Attention is a consequence. The moment you make it the objective, you are competing with every phone in the country, and the phones are undefeated.',
      'Because when the rental notice comes — and it comes for everyone — I intend to hand back the keys politely, walk into a room I actually built, and keep talking. Loudly, obviously. Some things are freehold.',
    ],
  },
];

export const chaptersData = [
  { tag: 'Chapter I', year: '1990s', title: 'Christmas Eve, Kisumu', copy: 'Born December 24th, promptly upstaged by the following morning for every birthday thereafter. Named after his grandfather, Rev. Micah Ob’bayi — a preacher whose whisper carried three villages. The volume, it turns out, is hereditary.', aside: 'The family has never once celebrated his birthday on time. He has forgiven approximately none of this.' },
  { tag: 'Chapter II', year: 'The Lamp Years', title: 'Lugari, Kakamega', copy: 'A childhood on a mud floor where a kerosene lamp did a streetlight’s job and homework was rationed by wick. School fees arrived late; ambition arrived early and refused to leave. Teachers filed the mouth under "problem." The mouth was taking notes.', aside: 'Full financial breakdown available in the memoir, Part One: The Kerosene Years.' },
  { tag: 'Chapter III', year: 'The Road', title: 'Kisumu → Lugari → Lumakanda → Murgusi → Thika → Nairobi', copy: 'Six addresses, one direction. Each move traded something familiar for something possible. By Thika the plan had a shape; by Nairobi it had a wardrobe. The accent collected souvenirs from every stop and still uses all of them on air.', aside: 'The route is mapped in the book, with commentary the towns did not request.' },
  { tag: 'Chapter IV', year: 'The Internships', title: 'Citizen TV — carrying cables, taking notes', copy: 'Television education from the floor up: cables, call sheets, the sacred fury of a control room at 6:59 PM. He watched anchors the way other interns watched the clock. Then PPP TV took a chance on the loud one, and the loud one did not waste it.', aside: 'To every intern currently coiling a cable: that is the syllabus. Coil it well.' },
  { tag: 'Chapter V', year: '2022 —', title: 'Urban News, with Lucy Ogunde', copy: 'A youth news desk with a radical format: two people telling the truth at conversational speed, twice a week, live. No script, no retake. Kenya tuned in and stayed. Lucy fact-checks him in real time, which he describes as "a blessing, legally speaking."', aside: 'The desk chemistry is unscripted. The preparation behind it is anything but.' },
  { tag: 'Chapter VI', year: '2024', title: 'Valedictorian, TIBS College', copy: 'Finished first in his class, years after the aunties had filed him under "still in school?" The graduation gown was slightly too short. The moment was not. Full account — including his mother’s legendary panoramic stare — lives in the Journal.', aside: 'Read "Valedictorian, eventually" in the Journal for the director’s cut.' },
  { tag: 'Chapter VII', year: '2025 —', title: 'Roylandz Media & the Urban Gang Tour', copy: 'Founded Roylandz Media; co-founded the Urban Gang Tour with Lucy. A school a week, a stage, mentorship pods, a runway, a national broadcast. Then wrote the whole climb down — seven parts, forty-five chapters — and titled it honestly: Born Broke. Built Loud.', aside: 'Current chapter. Under loud construction.' },
];

export const rulesData = [
  { no: '02', rule: 'Speak from scars, not ego.', note: 'Ego performs. Scars testify. Audiences can smell the difference through a television screen.' },
  { no: '07', rule: 'The work is the flex.', note: 'Awards are receipts. The point is the kid in row four who decides to try.' },
  { no: '11', rule: 'Prepare like a coward, deliver like a king.', note: 'Confidence is just preparation wearing good clothes.' },
  { no: '14', rule: 'Bring everybody.', note: 'Nobody climbs alone. The gang is the whole point of the name.' },
  { no: '19', rule: 'Feed the work, not the fame.', note: 'Attention is a consequence. Make it the objective and the phones will beat you.' },
  { no: '26', rule: 'Keep one lamp full and unlit.', note: 'Some receipts you keep where you can see them.' },
];

export const factsData = [
  { text: 'Born in Kisumu on December 24th; raised in Lugari, Kakamega County.' },
  { text: 'Named for his grandfather, Rev. Micah Ob’bayi, whose sermons required no microphone.' },
  { text: 'Interned at Citizen TV; joined PPP TV and now serves as Head of Digital.' },
  { text: 'Co-anchors Urban News with Lucy Ogunde — live, twice weekly, no script.' },
  { text: 'Graduated valedictorian, TIBS College, class of 2024.' },
  { text: 'Founder of Roylandz Media; co-founder of the Urban Gang Tour; author of Born Broke. Built Loud.' },
];

export const lettersData = [
  { text: 'He took our gala and turned it into the night people still talk about. The room was his from the first word.', name: 'Wanjiru K.', role: 'Events Lead, Corporate Gala', editorNote: 'Editor’s note: the room was rented. The atmosphere was not.' },
  { text: 'Booked him for a campus festival. Two thousand students, one mic, zero dead air. Worth every shilling.', name: 'Brian O.', role: 'Student Council, University', editorNote: 'Editor’s note: the shillings were counted. Twice.' },
  { text: 'On air he makes hard topics easy and easy topics matter. That balance is rare. Eugine has it.', name: 'Lucy Ogunde', role: 'Co-host, Urban News', editorNote: 'Editor’s note: source may be biased. Source is also always right.' },
];

export const workDetailData = [
  { tag: 'Flagship · PPP TV', badge: 'Live', chyron: 'TUE & THU 7:30 PM', name: 'Urban News', copy: 'The youth news desk of PPP TV, co-anchored with Lucy Ogunde. Hard topics made easy, easy topics made to matter — at conversational speed, live, with no script and no retakes. The audience is young, national, and impossible to fool.', aside: 'Lucy starts it on time. Eugine ends it memorably. The division of labour is settled law.', meta: 'PPP TV · Live · Twice weekly', img: '/hq-assets/un-desk-02.jpg' },
  { tag: 'The Roaming Show', badge: 'On Tour', chyron: 'CAMPUS SEASON', name: 'Campus Xposure', copy: 'A camera walks into a campus and the quad becomes a studio — talent, fashion, hot takes, and the occasional roast, all captured raw. Student culture without the adult supervision it probably deserves.', aside: 'No campus has ever been the same afterwards. Several have asked for it in writing.', meta: '25+ campuses · YouTube & TikTok', img: '/hq-assets/gal-dance.jpg' },
  { tag: 'The Long Form', badge: 'Weekly', chyron: 'NOW STREAMING', name: 'Nairobi Podcast', copy: 'Long conversations with the people building East African culture — artists, founders, athletes, and the occasional politician who arrived with talking points and left without them. Silence is a co-host.', aside: 'Guests arrive confident. The good ones stay that way.', meta: 'Spotify · Amazon Music', img: '/hq-assets/shoot-08.jpg' },
  { tag: 'The Live Vehicle', badge: 'Live', chyron: 'A SCHOOL A WEEK', name: 'Urban Gang Tour', copy: 'Kenya’s youth talent search, mentorship and awards concert tour, co-founded with Lucy Ogunde. Showcases, mentorship pods, a modelling runway, and a national broadcast — from a school field, weekly, at full volume.', aside: 'From potential to purpose, with a sound system.', meta: '40+ schools and counting', img: '/hq-assets/gal-festival.jpg' },
];

export const tourStopsData = [
  { day: '25', month: 'Jul', name: 'Kagumo High School', kind: 'School Edition · Live broadcast', place: 'Nyeri', status: 'Upcoming' },
  { day: '08', month: 'Aug', name: 'Technical University', kind: 'Campus Xposure Edition', place: 'Mombasa', status: 'Upcoming' },
  { day: '22', month: 'Aug', name: 'Urban Gang Mega Fest', kind: 'Awards Concert · Ticketed', place: 'Nairobi', status: 'Tickets' },
  { day: '04', month: 'Jul', name: 'Gathirimu Girls Tech', kind: 'School Edition', place: 'Kiambu', status: 'Filed' },
  { day: '01', month: 'Jun', name: 'Loreto Kiambu Girls High', kind: 'School Edition', place: 'Kiambu', status: 'Filed' },
  { day: '30', month: 'May', name: 'Senior Chief Koinange Girls', kind: 'School Edition · Live broadcast', place: 'Nairobi', status: 'Filed' },
];

export const tourGalleryData = [
  { src: '/hq-assets/gal-runway.jpg', cap: 'The runway' },
  { src: '/hq-assets/gal-crowning.jpg', cap: 'The crowning' },
  { src: '/hq-assets/eugine-05.webp', cap: 'On stage, school edition' },
  { src: '/hq-assets/gal-street.jpg', cap: 'Street style' },
  { src: '/hq-assets/gal-rave.jpg', cap: 'Campus rave' },
  { src: '/hq-assets/gal-winning.jpg', cap: 'The winners' },
  { src: '/hq-assets/gal-crew.jpg', cap: 'The crew' },
  { src: '/hq-assets/gal-koinange.jpg', cap: 'Koinange Girls' },
];

export const galleryData = [
  { src: '/hq-assets/shoot-02.png', cap: 'The gold shoot' },
  { src: '/hq-assets/eugine-01.webp', cap: 'On stage, Urban Gang Tour' },
  { src: '/hq-assets/shoot-07.jpg', cap: 'Studio, trunks, opinions' },
  { src: '/hq-assets/un-desk-02.jpg', cap: 'The Urban News desk, with Lucy' },
  { src: '/hq-assets/shoot-05.jpg', cap: 'Award season' },
  { src: '/hq-assets/shoot-13.webp', cap: 'Orange, as a stance' },
  { src: '/hq-assets/celeb-01.webp', cap: 'Night show energy' },
  { src: '/hq-assets/shoot-03.jpg', cap: 'Do not adjust your set' },
  { src: '/hq-assets/eugine-15.webp', cap: 'Behind the scenes, with Lucy' },
  { src: '/hq-assets/shoot-12.jpg', cap: 'Desk face, activated' },
  { src: '/hq-assets/celeb-02.webp', cap: 'Incognito, unsuccessfully' },
  { src: '/hq-assets/eugine-13.webp', cap: 'The gang, school edition' },
  { src: '/hq-assets/shoot-08.jpg', cap: 'Big thoughts, loading' },
  { src: '/hq-assets/celeb-03.webp', cap: 'Before he was famous' },
  { src: '/hq-assets/shoot-04.jpg', cap: 'Saint, allegedly' },
  { src: '/hq-assets/un-desk-03.jpg', cap: 'Christmas on set' },
];

export const bookingTypesData = [
  { no: 'Listing I', title: 'Keynotes', copy: 'The Lugari-to-studio story, tailored to your room and your brief. Arrives prepared. Leaves quoted.', langs: 'English · Swahili' },
  { no: 'Listing II', title: 'Hosting & MC', copy: 'Galas, launches, festivals, award nights. The run of show never slips; the crowd never sits down.', langs: 'English · Swahili' },
  { no: 'Listing III', title: 'TV & Panels', copy: 'Guest slots, moderation, and press. Camera-ready, prep-heavy, and allergic to dead air.', langs: 'Live or taped' },
  { no: 'Listing IV', title: 'Workshops', copy: 'Media training and storytelling mentorship for teams, schools, and creator programs. Homework included.', langs: 'Half or full day' },
];

export const faqsData = [
  { q: 'How far ahead should we book?', a: 'Four to six weeks for keynotes and hosting; tour season fills fast. TV and press can move in 72 hours if the desk is free and the story is good.' },
  { q: 'Does he travel outside Nairobi?', a: 'The man tours schools for a living — yes. Anywhere in Kenya and East Africa; further with notice. Travel and accommodation on the client.' },
  { q: 'English, Swahili, or both?', a: 'Both, frequently in the same sentence, occasionally in the same word. He reads the room and speaks its language.' },
  { q: 'What does it cost?', a: 'Depends on format, audience, and date. Include your budget range in the inquiry and you get a straight answer instead of a polite dance.' },
  { q: 'Can the Urban Gang Tour come to our school?', a: 'That is a bigger, louder conversation — and the answer is usually yes. Start at the Tour page, or say so in the mailroom.' },
];

export const productsData = [
  { id: 'crewneck', name: 'UGT Crewneck', price: 2400, cat: 'Apparel', img: '/hq-assets/merch-crewneck.jpg', ad: 'FOR SALE: one (1) extremely warm crewneck. Reason for sale: making more.' },
  { id: 'tee', name: 'Magenta Tee', price: 1500, cat: 'Apparel', img: '/hq-assets/merch-tee.jpg', ad: 'Visible from space and most staff rooms. Wear responsibly.' },
  { id: 'jersey', name: 'Gang Jersey', price: 2800, cat: 'Apparel', img: '/hq-assets/merch-jersey.jpg', ad: 'Breathable, unlike the competition. Number not negotiable.' },
  { id: 'snapback', name: 'Snapback', price: 1200, cat: 'Headwear', img: '/hq-assets/merch-snapback.jpg', ad: 'Structured, like the run of show. Fits most heads and all egos.' },
  { id: 'bucket', name: 'Bucket Hat', price: 1100, cat: 'Headwear', img: '/hq-assets/merch-bucket.jpg', ad: 'All-day festival protection. Rain not included but likely.' },
  { id: 'beanie', name: 'Beanie', price: 800, cat: 'Headwear', img: '/hq-assets/merch-beanie.jpg', ad: 'For July in Nairobi, which is a season and a mood.' },
  { id: 'tote', name: 'Tour Tote', price: 900, cat: 'Accessories', img: '/hq-assets/merch-tote.jpg', ad: 'Carries books, merch, and the weight of your unread emails.' },
  { id: 'bottle', name: 'Steel Bottle', price: 1300, cat: 'Accessories', img: '/hq-assets/merch-bottle.jpg', ad: 'Keeps water cold and opinions hot. Dishwasher-sceptical.' },
];

export const bookProduct = {
  id: 'book',
  name: 'Born Broke. Built Loud.',
  subtitle: 'The true story of a boy who was smuggled into the world and had to talk his way through it',
  price: 1800,
  cat: 'Books',
  cover: '/uploads/eugine-micah.png',
  status: 'preorder' as const, // not yet published — capture interest, no charge
};

export function fmtKES(n: number) {
  return 'KES ' + n.toLocaleString('en-KE');
}
