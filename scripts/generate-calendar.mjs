// 90-DAY CONTENT PROGRAMME GENERATOR
// npm run generate-calendar
// Emits: supabase/seed.sql (full calendar as INSERTs) + content/90-day-calendar.md
//
// Strategy (Bartlett playbook, Kenyan receipts): 1 quality post/day + 2 bonus
// slots/week (Tue & Sat evenings) = data-absent DEFAULT cadence, clearly
// labelled. Five pillars rotated through named weekly series. Newsletter issue
// every Sunday built from that week's best post. Metrics review every 14 days.
// Every entry is a COMPLETE ready-to-post draft in Eugine's voice: vulnerable,
// specific, numbers over adjectives, receipts over hype.

import { writeFileSync, mkdirSync } from 'node:fs';

const START = process.env.CAL_START || nextMonday();
const DAYS = 90;
const TZ_HOUR_PRIMARY = 7;  // 07:30 EAT — commuter scroll
const TZ_HOUR_BONUS = 19;   // 19:00 EAT — evening scroll

function nextMonday() {
  const d = new Date();
  d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7));
  return d.toISOString().slice(0, 10);
}

// ───────────────────────── SERIES (habit anchors) ─────────────────────────
const SERIES = {
  1: 'Broke Chronicles Monday',   // pillar: book
  2: 'Origin Tuesday',            // pillar: origin
  3: 'Control Room Wednesday',    // pillar: media
  4: 'Ship Log Thursday',         // pillar: builder
  5: 'Tour Diary Friday',         // pillar: tour
  6: 'Receipts Saturday',         // pillar: rotates (bonus energy)
  0: 'The Sunday Signal',         // pillar: newsletter (long-form)
};
const DAY_PILLAR = { 1: 'book', 2: 'origin', 3: 'media', 4: 'builder', 5: 'tour', 6: 'rotate', 0: 'newsletter' };

// ───────────────────────── CONTENT BANK ─────────────────────────
// Story cores lifted from Born Broke, Built Loud (45 chapters), the CV and the
// Urban Gang Tour road. hook = first 2 lines (the scroll-stopper).
const BANK = {
  book: [
    { h: 'My first crime was committed from inside my mother.\nShe crossed a border pregnant with me. I was contraband before I was a person.', b: 'That is the first line of my memoir because it is the truest one. Born Broke, Built Loud is not a success story — I say that on page one. It is a field report from the middle of the climb. My mother survived on sugar water and faith. My father fainted over me before he ever held me. A stranger named Hassan Omar once handed me twenty five shillings and, without knowing it, kept me in school. Twenty five bob. That is how thin the line was between the man typing this and nobody.', c: 'The book is called Born Broke, Built Loud. Chapter one is free on my site — euginemicah.tech/book.', r: 'Newsletter: expand into the full smuggling story + why I opened the book with a confession.' },
    { h: 'We had a day at my primary school called Dung Day.\nYou brought cow dung to school. It was homework.', b: 'The School in the Bushes did not have floors. We smeared them ourselves, every term, with dung we carried from home. I write about it in the book not for pity but for calibration: when people ask why I over-prepare for every broadcast, why I treat a teleprompter like a privilege, it is because my first classroom had a floor I made with my own hands. You do not forget the smell of where you started. You just learn to build rooms that smell different.', c: 'What did your first classroom look like? Tell me below — I read everything.', r: 'Newsletter: pair with The Mathematics of Hunger chapter for a "what school really cost" issue.' },
    { h: 'I have a chapter called The Mathematics of Hunger.\nIt is the only maths I have never gotten wrong.', b: 'Hunger teaches arithmetic like no teacher can. How many days until the next meal that is not boiled maize. How many shillings between you and the school sending you home. How many kilometres you can walk before your body files a complaint — fifteen, in my case, with a cold shower waiting. I built my work ethic on those numbers. Now I count different things: 2M+ weekly viewers, 700K YouTube subscribers, 200+ stories filed. But I have never once confused the new numbers for the old ones. The old ones built me.', c: 'Born Broke, Built Loud — the full ledger is in the book. Link in my profile.', r: 'Newsletter: the "two ledgers" essay — hunger maths vs vanity metrics.' },
    { h: 'A white American Quaker sits in my family tree.\nDavid Zarembka. He built me on purpose, in the dark, without applause.', b: 'People hear "raised by an American" and imagine money. It was not money. It was structure. It was a man who treated a boy in a mud house like a project worth finishing. Between him, a pastor, and a king who named his own hill, I was assembled by a committee nobody paid. The book calls them the ones who stayed after the funerals. Every builder I know has a committee like this. We just do not thank them in public enough.', c: 'Tag someone who built you before you were worth building. Let them see it.', r: 'Newsletter: full Zarembka chapter excerpt + how to be someone\'s committee.' },
    { h: 'My brother Dante was my first audience.\nHe heard every broadcast I ever gave — years before a camera did.', b: 'Before Citizen TV, before Urban News, before 2M viewers, there was a boy performing news bulletins to his brother in a mud house in Lugari. I interviewed chickens. I reported droughts from the doorway. Dante clapped anyway. Here is what I know about audiences now that I did not know then: the size never mattered. The habit did. I practised being watchable for a decade before anyone watched. That is the part the overnight-success story always deletes.', c: 'Who was your first audience? Name them in the comments.', r: 'Newsletter: "practise in the dark" — the 10-year overnight success timeline, dated.' },
    { h: 'I scored a C at KCSE the year everything fell apart.\nThe book calls it The Year of the C. It nearly ended me.', b: 'In Kenya we treat exam grades like verdicts. Mine read: average boy, average future. Nobody grades what was happening around the exam — the funerals, the hunger, the fifteen-kilometre walks. I re-sat life instead of the exam. Radio in Thika. A show nobody heard called The Overview. Campus TV. Citizen. PPP. The C never changed. Everything it predicted did. If an exam once called you average, I need you to hear this from someone on national television weekly: verdicts expire.', c: 'Share this with one student who thinks their grade is their ceiling.', r: 'Newsletter: The Year of the C, full chapter + reader replies.' },
    { h: 'Burnout in expensive shoes is still burnout.\nI wrote that chapter from experience, not research.', b: 'The fame did not fix me. That is a whole chapter — Chapter Forty — and it is the one readers message me about at 2am. I got the screen, the recognition, the shoes, and discovered the boy from Lugari had followed me into every studio, still asking if we were safe yet. Success does not silence the old alarm system. It just gives it better acoustics. I manage it now with work as armor — another chapter — but managed is not cured, and I would rather tell you the truth than sell you an arc.', c: 'If you are winning in public and tired in private, the book was written for you.', r: 'Newsletter: mental health issue — Fame That Did Not Fix Me + Kenyan men and silence.' },
  ],
  origin: [
    { h: 'From watching CNN on a neighbour\'s TV in Lugari\nto co-hosting national television. Here is the actual path, no montage.', b: 'Around 2013 my father had one rule: before he left for the mines each morning, my brother and I watched the news. Not cartoons — CNN, Al Jazeera, France 24. I studied anchors the way other kids studied footballers. Then: village school, township years, a library that did not judge my grammar, Thika radio, campus TV, Citizen TV newsroom, and now Urban News on PPP TV — 2M+ weekly viewers on StarTimes Ch 430. Twelve years between the neighbour\'s TV and my own studio chair. The montage version skips eleven of them.', c: 'Ask me anything about the path — I answer every serious question in the comments.', r: 'Newsletter: the full timeline with photos and what each stop actually paid.' },
    { h: 'The library did not judge my grammar.\nThat is why I still write like a man who owes libraries money.', b: 'Township years. I was the boy reading borrowed books with red dust still on his ankles. My English arrived second-hand and I wore it anyway. Today I have filed 200+ bilingual stories for a national newsroom and co-host a show in the language that library lent me. When people polish their story until the struggle disappears, the algorithm may clap but nobody is helped. Rough drafts inspire more than final edits. Post yours.', c: 'What did a library, a teacher, or one free resource unlock for you?', r: 'Newsletter: "second-hand English" — language, class and Kenyan media.' },
    { h: 'I walked 15 kilometres to school and showered cold.\nNow I complain when the studio AC is too high. Growth is funny like that.', b: 'Chapter Seventeen of my book is literally titled Fifteen Kilometers and a Cold Shower. I am not romanticising it — walking that far on hunger maths is not character-building, it is a policy failure. But it built a floor under me: no day in a newsroom, no brutal edit, no 4am call time has ever been the hardest thing I have done. When your baseline is that floor, Monday cannot scare you. That is the only privilege poverty ever gave me, and I intend to spend it loudly.', c: 'Follow along — I post the unpolished version of the media career every week.', r: 'Newsletter: baseline theory — why your hardest season becomes your unfair advantage.' },
    { h: 'A teacher from Kakamega raised a TV host.\nExcept the teacher and the TV host are the same person.', b: 'Before television I stood in front of classrooms. Same job, honestly: hold attention, translate the complicated, care whether the back row got it. When people ask how I read an audience on live TV, the answer is thirty teenagers on a Friday afternoon who would rather be anywhere else. If you can teach form three double-lesson maths after lunch, a national broadcast is a warm bath. Every skill you think is beneath your dream job is secretly training for it.', c: 'What "small" job trained you for the big one? I want the specific skill.', r: 'Newsletter: the classroom-to-studio skills map, itemised.' },
  ],
  media: [
    { h: 'What 2 million weekly viewers actually looks like from inside the studio:\na countdown, a dry mouth, and a co-host who has your back.', b: 'Urban News, PPP TV, StarTimes Ch 430. People imagine glamour. Here is the real inventory: guest research files at midnight, a rundown that changes twice before air, the floor manager\'s fingers counting you in, and Lucy Ogunde beside me running the same high-wire act. Co-hosting looks like friendship to the audience and feels like trapeze work to us — you learn to catch each other mid-sentence. TV is a team sport wearing an individual\'s face. Anyone selling you the solo-genius version has never been in a control room.', c: 'Want the full behind-the-scenes? The Sunday Signal newsletter goes deeper every week — link in profile.', r: 'Newsletter: anatomy of one episode, from rundown to wrap.' },
    { h: 'I wrote 200+ stories at Citizen TV before anyone knew my face.\nThe invisible reps are the ones that count.', b: 'Walking into Royal Media Services as a young reporter felt like entering a temple. Nobody hands you an anchor chair there. They hand you deadlines — bilingual, daily, unforgiving. Two hundred plus stories taught me what no masterclass sells: how to find the human in a budget report, how to cut a script by half without losing the truth, how to file clean when the bus was late and the source lied. Every visible minute I get on PPP TV was purchased with those invisible hours. Pay for yours early.', c: 'Journalists and creators: what were your invisible reps? Normalise naming them.', r: 'Newsletter: the Citizen years — three stories that taught me the craft.' },
    { h: 'How does a guest end up on national TV?\nSomeone like me stalks their work for weeks first. Here is the pipeline.', b: 'I direct guest research and booking for Urban News. The pipeline: scan the culture (campus shows, TikTok, gigs, founders\' launches) → shortlist by story, not clout → pre-interview call where I listen for the one moment they light up → build the rundown around that moment. The guests who kill it are never the most famous. They are the ones with a specific story and receipts. If you want to be booked on any show: stop posting your wins, start posting your process. Bookers can smell a real story through the screen.', c: 'Building something in Kenyan culture, music, business or tech? Put your story in my comments. I read them as a booker.', r: 'Newsletter: "how to get booked" — the checklist producers never publish.' },
    { h: 'The teleprompter fails more often than you think.\nWhat saves you is never the script. It is the reps.', b: 'Live TV rule one: the machine will betray you on the worst possible day. Prompter dies, earpiece drops, the package refuses to roll, the guest freezes. The audience should never find out. What fills that silence is everything you did before the red light: the pre-reads, the mock bulletins I performed for my brother as a boy, the two hundred Citizen scripts, teaching Friday-afternoon classes in Kakamega. Composure is not a talent. It is compound interest on unglamorous practice. Deposit daily.', c: 'TV people — drop your best on-air save below. Let us trade war stories.', r: 'Newsletter: five on-air disasters and the exact recovery moves.' },
  ],
  tour: [
    { h: 'We built a national youth movement with a truck, a stage,\nand the radical idea that talent in a village school counts.', b: 'Urban Gang Tour takes a full broadcast-grade production INTO schools — Koinange Girls, Loreto Kiambu, Gituamba, Lari Boys next. Mentorship pods in the morning (career, digital literacy, substance abuse — the conversations adults avoid), tree planting with Delo Greens, then the stage: music, dance, spoken word, modelling, public speaking. Winners crowned. Everything feeds Urban News on PPP TV, so a girl who has never left her county performs to the whole country by Friday. That is the whole business model: dignity, plus distribution.', c: 'Schools, brands, counties — bookings are open at urbangangtour.co.ke/book.', r: 'Newsletter: the economics of one tour stop, itemised — what it costs to move culture.' },
    { h: 'A student who had never held a mic opened for 3,000 people.\nWhat building a youth movement teaches you about business:', b: 'Everything I know about product-market fit I learned watching a school field at 7am become a festival by noon. Lesson one: distribution beats talent alone — the stage matters because PPP TV cameras are on it. Lesson two: trust is the moat — teachers let us in because we run mentorship pods before the music, medics at the gate (Moyo Response), trees in the ground after. Lesson three: the crowd tells you the truth in real time; no dashboard needed. Founders pay consultants for feedback loops this honest. I get them every Friday on a school field.', c: 'Building for young Kenyans? Reply "TOUR" and I will share our playbook one-on-one.', r: 'Newsletter: the three business lessons, expanded with tour-stop photos.' },
    { h: 'Before the music: a room full of teenagers, zero phones,\ntalking about drugs, sex ed and careers. This is the part nobody films.', b: 'The mentorship pods are the tour\'s engine room. Facilitators like Hype Ola and Khloe Nyarangi run sessions on the things Kenyan classrooms whisper about — substance abuse, digital literacy, life after school. No cameras inside. The deal is honesty for privacy. Then tree planting with Delo Greens, so every school keeps a grove that outlives our visit. THEN the stage. People ask why schools keep inviting us back. It is because we deliver the boring, unfilmable value first and the festival second. Order of operations is a brand strategy.', c: 'What conversation do you wish an adult had had with you at 16? Comments open.', r: 'Newsletter: inside a pod — anonymised questions students actually asked.' },
  ],
  builder: [
    { h: 'I built an AI system with 150+ agents that posts content while I sleep.\nHere is ProPost, receipts included.', b: 'ProPost runs 150+ AI agents that draft, schedule and publish across platforms — built nights and weekends around a daily TV job, on Next.js, Supabase and Cloudflare Workers, wired into the Meta Graph API. Not a demo: it has been running my pipelines for months. The insight that unlocked it: agents fail alone but work in assembly lines — one researches, one drafts, one fact-checks, one schedules. Same as a newsroom. I did not invent a workflow; I automated the one I already lived in. Your industry knowledge IS your AI advantage. Automate what you uniquely understand.', c: 'Want the architecture breakdown? Ship Log Thursday, every week. Follow so you do not miss it.', r: 'Newsletter: ProPost architecture diagram + the three failed versions before it.' },
    { h: 'A TV host with 7 live GitHub projects.\nMedia people underestimate code. Coders underestimate media. I stopped doing both.', b: 'Auto news station. ProPost. Tawala. The Urban Gang Tour platform — multi-route Next.js, M-Pesa checkout, its own admin control room. Seven live projects, zero CS degree. My unfair advantage is not syntax; it is that ten years of broadcasting taught me exactly what content systems should DO before I wrote a line. The future of media in Africa belongs to people who can hold a mic and a terminal in the same week. Both are just distribution.', c: 'The code is public: github.com/eugineous. Star what is useful, fork what is not finished.', r: 'Newsletter: tour of all seven repos — what each one taught me.' },
    { h: 'I automated PPP TV\'s news-to-social pipeline.\nOne broadcast now becomes 20 assets before the anchors leave the building.', b: 'The problem: brilliant TV segments dying at 9pm because nobody had bandwidth to cut, caption and post them. The build: an automated pipeline that takes broadcast output and turns it into platform-native clips and posts — part of how the channel grew past 700K YouTube subscribers. The lesson for every media house on this continent: your archive is not storage, it is inventory. If a Lugari boy can wire this together with open tools, your organisation can. The gap is not budget. It is permission to try.', c: 'Media managers: DM me "PIPELINE" and I will send the plain-English architecture.', r: 'Newsletter: the pipeline post-mortem — costs, tools, what broke.' },
  ],
};

// Rotation for Saturday bonus + variation stems for regenerated angles.
const ROTATE = ['book', 'media', 'builder', 'tour', 'origin'];

// ───────────────────────── GENERATOR ─────────────────────────
const cursors = { book: 0, origin: 0, media: 0, tour: 0, builder: 0 };
function next(pillar) {
  const list = BANK[pillar];
  const item = list[cursors[pillar] % list.length];
  const cycle = Math.floor(cursors[pillar] / list.length);
  cursors[pillar]++;
  if (cycle === 0) return { ...item };
  // Later cycles: same core story, fresh angle so repeats read as series callbacks.
  const angles = [
    { pre: 'Part two of a story many of you asked about.\n', post: '\n\nIf you missed part one, it is pinned on my profile.' },
    { pre: 'I posted about this weeks ago. Here is what I left out.\n', post: '\n\nThe uncut version lives in The Sunday Signal newsletter.' },
    { pre: 'Reposting this for everyone who joined recently — updated with what changed.\n', post: '' },
  ];
  const a = angles[(cycle - 1) % angles.length];
  return { ...item, h: a.pre + item.h, b: item.b + a.post };
}

const rows = [];
const start = new Date(START + 'T00:00:00Z');
let bestOfWeekPointer = 0;

for (let d = 0; d < DAYS; d++) {
  const date = new Date(start.getTime() + d * 86400_000);
  const dow = date.getUTCDay();
  const iso = (h, m = 30) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), h - 3, m)).toISOString(); // EAT = UTC+3

  // Every 14 days: metrics loop entry (review slot, not a public post).
  if (d > 0 && d % 14 === 0) {
    rows.push({
      scheduled_at: iso(9, 0), pillar: 'review', series: 'Metrics Loop', format: 'text',
      hook: `DAY ${d} METRICS REVIEW — evaluate, kill, scale.`,
      body: `Internal review (not for posting). 1) Pull impressions/reactions/comments logged in /admin for the last 14 days. 2) Rank pillars by median engagement. 3) KILL: the weakest recurring format or hook style (lowest quartile twice running). 4) SCALE: double the winning pillar's bonus-slot share for the next 14 days. 5) Check consistency: any missed days? Fix the cause, not the calendar. 6) Newsletter CTA conversion: if <2% of post viewers subscribe, rewrite the CTA line this sprint.`,
      cta: '', repurpose: 'Feeds the next 14 days of scheduling decisions.',
    });
    continue;
  }

  if (dow === 0) {
    // Sunday: newsletter long-form issue drafted from the week's best post.
    const wk = Math.floor(d / 7) + 1;
    rows.push({
      scheduled_at: iso(10, 0), pillar: 'newsletter', series: SERIES[0], format: 'document',
      hook: `The Sunday Signal #${wk} — the week's best story, told properly.`,
      body: `NEWSLETTER ISSUE (long-form, ~800 words). Take this week's highest-engagement post (check /admin performance log) and expand it 4x: the scene, the numbers, what I got wrong, what you can steal. Structure: cold open (the moment) → context (the road here) → the lesson (one, not five) → receipts (screenshots/photos) → next week's experiment. Close with: "Forwarded this? Subscribe free at euginemicah.tech — one honest signal a week, no noise."`,
      cta: 'Subscribe free at euginemicah.tech — one honest signal a week.',
      repurpose: 'IS the newsletter. Post a 3-line teaser + subscribe link on LinkedIn at 10:00.',
    });
    continue;
  }

  const pillar = DAY_PILLAR[dow] === 'rotate' ? ROTATE[Math.floor(d / 7) % ROTATE.length] : DAY_PILLAR[dow];
  const core = next(pillar);
  const n = rows.length + 1;
  const subscribeCta = n % 3 === 0 ? `${core.c}\n\nPS — I write one longer, more honest version of these every Sunday: The Sunday Signal. Free at euginemicah.tech.` : core.c;
  rows.push({
    scheduled_at: iso(TZ_HOUR_PRIMARY), pillar, series: SERIES[dow], format: pillar === 'builder' ? 'photo' : 'text',
    hook: core.h, body: core.b, cta: subscribeCta, repurpose: core.r,
  });

  // Bonus slots: Tue & Sat 19:00 EAT.
  if (dow === 2 || dow === 6) {
    const bonusPillar = ROTATE[(d + 2) % ROTATE.length];
    const bc = next(bonusPillar);
    rows.push({
      scheduled_at: iso(TZ_HOUR_BONUS, 0), pillar: bonusPillar, series: 'Bonus Slot', format: 'text',
      hook: bc.h, body: bc.b, cta: bc.c, repurpose: bc.r,
    });
  }
}

// ───────────────────────── OUTPUTS ─────────────────────────
mkdirSync('supabase', { recursive: true });
mkdirSync('content', { recursive: true });

const esc = (s) => String(s).replace(/'/g, "''");
const sql = [
  '-- FULL 90-DAY CONTENT PROGRAMME (generated by scripts/generate-calendar.mjs)',
  `-- Start date: ${START} · cadence: 1 post/day + Tue/Sat bonus (DEFAULTS — no LinkedIn export uploaded yet)`,
  '-- Regenerate any time: npm run generate-calendar',
  'delete from posts;',
  ...rows.map((r) =>
    `insert into posts (scheduled_at, pillar, series, format, hook, body, cta, repurpose, status) values ('${r.scheduled_at}', '${r.pillar}', '${esc(r.series)}', '${r.format}', '${esc(r.hook)}', '${esc(r.body)}', '${esc(r.cta)}', '${esc(r.repurpose)}', 'draft');`
  ),
].join('\n');
writeFileSync('supabase/seed.sql', sql);

const md = [
  '# 90-Day Content Programme — Eugine Micah',
  '',
  `> **Basis:** best-practice DEFAULTS (LinkedIn export not yet uploaded — rerun the audit then \`npm run generate-calendar\` to tune).`,
  `> **Cadence:** 1 quality post/day 07:30 EAT + bonus slots Tue/Sat 19:00 EAT · newsletter every Sunday · metrics review every 14 days.`,
  `> **Series:** ${Object.values(SERIES).join(' · ')}`,
  '',
  ...rows.map((r, i) => [
    `## ${i + 1}. ${r.scheduled_at.slice(0, 16).replace('T', ' ')} EAT — ${r.series} \`${r.pillar}/${r.format}\``,
    '',
    '**Hook**', '```', r.hook, '```',
    '**Body**', '```', r.body, '```',
    r.cta ? `**CTA**\n\`\`\`\n${r.cta}\n\`\`\`` : '',
    `**Repurpose:** ${r.repurpose}`, '',
  ].join('\n')),
].join('\n');
writeFileSync('content/90-day-calendar.md', md);

console.log(`[calendar] ${rows.length} entries → supabase/seed.sql + content/90-day-calendar.md (start ${START})`);
