-- euginemicah.tech: full blog archive
-- Run in Supabase SQL editor (or `supabase db push`), after 002_site_rebuild.sql.
-- These 16 posts are Eugine Micah's own real writing (journalism, Roylandz
-- Media, the memoir, personal history) -- published for real, not the
-- placeholder/reference use the earlier migration's comments describe for
-- this same source file. `on conflict (slug) do nothing` makes this safe to
-- re-run without duplicating or clobbering anything edited since via
-- /control-room.

insert into blog_posts (slug, category, title, excerpt, paragraphs, tag_chips, read_time, status, published_at)
values
  (
    'newsroom-teaches-no-classroom',
    'Journalism',
    'What the newsroom teaches you that no classroom can',
    'Deadlines, doubt and the discipline of getting the story right, on air, every single day.',
    to_jsonb(array[
      'Every newsroom runs on the same currency: time. You can have the best story in Kenya and it means nothing if it airs a minute late. That pressure is the best teacher I''ve ever had, and I did not learn it in a lecture hall. I learned it standing over a script with four minutes to air and a fact I was not yet sure of.',
      'When I started writing bilingual news, the job was simple on paper: translate the truth, fast, without losing it in the process. In practice, it rewired how I think. You learn to find the one sentence that carries the whole story, because that is often all the time you get. English and Swahili do not carry weight the same way, so you learn to hear a story twice before you trust either version of it.',
      'There is a discipline to that kind of writing that never leaves you. Even now, hosting live, I am still doing the same job I did at a desk at 5 a.m.: finding the sentence that will not survive being wrong, and making sure it is right before it leaves my mouth.',
      'None of that discipline came from a classroom. It came from filing on deadline, getting notes back, sometimes harsh ones, and doing it again the next day. Teachers can tell you the rules of a story. Only a newsroom can teach you what it costs to break them under pressure.',
      'That is still the job now, just with a bigger microphone. The stakes changed. The habit of getting the fact right before the feeling did not.'
    ]::text[]),
    to_jsonb(array['Newsroom', 'Bilingual Reporting', 'Discipline']::text[]),
    '6 min read', 'published', timestamptz '2026-06-18T00:00:00Z'
  ),
  (
    'why-i-built-roylandz-media',
    'Roylandz Media',
    'Why I built Roylandz Media instead of waiting for a bigger platform',
    'Brands do not need louder content. They need a strategy that respects the audience.',
    to_jsonb(array[
      'I founded Roylandz Media because I kept seeing the same mistake from brands with real budgets: mistaking noise for strategy. More posts is not a plan. A point of view is a plan. I watched companies spend serious money shouting into a feed that had already learned to scroll past them.',
      'Every project we take starts with the same question: who is actually on the other end of this content, and what do they need from us today? Not what does the brand want to say. What does the person on the other end of the phone actually need, in the fifteen seconds before they swipe away? That question shapes the strategy before a single asset gets made.',
      'It means we sometimes tell a client to post less, not more. That is not the advice most agencies give, because it does not look like productivity. But a single piece of content that respects its audience will outlast a week of noise that does not.',
      'We built the studio around production too, not just strategy, because I have seen too many good ideas die in bad execution. A great script shot badly is still a bad video. So Roylandz Media does the thinking and the making, under one roof, so nothing gets lost in the handoff between the two.',
      'It is slower than just posting more. It is also the only way I have seen it actually work, for a brand or for a person building an audience from nothing.'
    ]::text[]),
    to_jsonb(array['Brand Strategy', 'Content', 'Founder Notes']::text[]),
    '7 min read', 'published', timestamptz '2026-05-27T00:00:00Z'
  ),
  (
    'writing-born-broke-built-loud-lugari',
    'The Book',
    'Writing Born Broke, Built Loud meant going back to Lugari',
    'You cannot write honestly about where you are from a distance.',
    to_jsonb(array[
      'I thought the book would be about the climb: newsroom to national TV, the version of the story that fits neatly into an interview answer. It kept pulling me back to Manyonyi instead, to the mud house, the three-stone fire, the cow-dung floor we replastered every Friday, and my father''s evening news quiz, long before there was any climb to speak of.',
      'Writing it honestly meant admitting how much of the presenter I am now was built at that kitchen table, long before any camera was involved. My father was not training a journalist on purpose. He was just a man who loved the news and wanted his sons to understand the world. But the habit he built in me, of watching closely and being ready to answer for what I had seen, is the exact habit the job now depends on.',
      'There were parts of the manuscript I rewrote three or four times, not because the sentences were wrong, but because I kept softening things that needed to stay hard. Poverty does not read well when it is smoothed over for comfort. I had to let the red dust and the hunger and the loss stay as sharp on the page as they were in the house.',
      'The hardest chapters were not about the presenter. They were about the boy before him, the one who did not know yet that any of this would lead anywhere. Writing those honestly meant sitting with a version of myself I do not get to perform on screen.',
      'Born Broke, Built Loud is that whole arc, not just the part people see on screen. If it only told the television story, it would be a highlight reel. I wanted it to be a report, the kind you would trust from a journalist, on a life still being lived.'
    ]::text[]),
    to_jsonb(array['Memoir', 'Lugari', 'Writing Process']::text[]),
    '6 min read', 'published', timestamptz '2026-04-09T00:00:00Z'
  ),
  (
    'automation-behind-urban-news',
    'Journalism',
    'The automation that runs quietly behind every Urban News post',
    'I taught myself to code so the newsroom could spend more time on the story.',
    to_jsonb(array[
      'Somewhere between writing scripts and hosting live, I got tired of watching good stories die in the gap between broadcast and social. A segment would air, land well, and then sit there while someone tried to remember to clip it, caption it and post it hours later, once the moment had already passed.',
      'So I taught myself to build the pipeline that closes that gap. Not because I set out to become a developer, but because nobody else was going to fix the specific problem I kept watching happen in our own newsroom. I learned it the way I learn most things: by needing it to work by a deadline.',
      'Now, when a story airs on Urban News, it moves to social automatically, formatted for the platform, with nobody re-typing a caption at midnight. The system watches for what just aired, pulls the right clip, and pushes it out while the story is still the story people are talking about.',
      'It is a small piece of engineering, but it buys the newsroom back hours every week to spend on the parts of the job that actually need a human: the interview, the follow-up question, the editorial judgment about what matters. A machine can move a file. It cannot decide what is true.',
      'I do not think of myself as a developer. I think of myself as a journalist who got tired of a broken workflow and refused to wait for someone else to fix it.'
    ]::text[]),
    to_jsonb(array['Newsroom Tech', 'Automation', 'Urban News']::text[]),
    '5 min read', 'published', timestamptz '2026-03-22T00:00:00Z'
  ),
  (
    'campus-xposure-youth-ambition',
    'Culture',
    'What Campus Xposure taught me about Kenyan youth ambition',
    'Every university we visit has a founder nobody outside campus has heard of yet.',
    to_jsonb(array[
      'Campus Xposure started as a simple idea: take the cameras to where the students are, instead of waiting for their stories to trickle into the mainstream news cycle years later, if at all. What we found on every campus was the same thing, businesses being built in dorm rooms with almost no capital and no shortage of ambition.',
      'I have sat across from students running delivery services out of a single room, tailoring businesses built on one machine, tutoring networks organized entirely over WhatsApp. None of it looks like a headline. All of it is real commerce, run by people who are also studying for exams the next morning.',
      'The show is not really about campus life. It is about proving that the next generation of Kenyan entrepreneurs is already working, they just have not been given the platform yet. Every episode is an argument against the idea that ambition has an age minimum.',
      'What surprises me most, city to city, is how little these students ask for. Not funding pitches, not shortcuts. Mostly they want someone to take the work seriously enough to point a camera at it. That is a low bar, and it is one very few people bother to clear.',
      'That is the gap Campus Xposure exists to close, one campus, one founder, one dorm-room business at a time.'
    ]::text[]),
    to_jsonb(array['Campus Xposure', 'Youth Culture', 'Entrepreneurship']::text[]),
    '6 min read', 'published', timestamptz '2026-02-14T00:00:00Z'
  ),
  (
    'cofounding-urban-gang-tour',
    'Roylandz Media',
    'Co-founding the Urban Gang Tour: culture events done properly',
    'A live crowd tells you the truth about your content faster than any metric does.',
    to_jsonb(array[
      'Digital metrics can be generous liars. A view is not attention. A like is not a memory. A live room cannot fake any of that. Co-founding the Urban Gang Tour was about testing everything Roylandz Media believes about culture and content in front of a crowd that will tell you immediately, and honestly, if it is working.',
      'The first time you watch a segment that performed well online fall flat in a live room, it changes how you build everything else. The internet forgives a slow start. A crowd on a Friday night does not wait for you to find your rhythm.',
      'It changed how we build content everywhere else too. If a segment would not hold a room in Nairobi on a Friday night, it is not good enough for a feed either. That has become close to a house rule at the studio.',
      'Running the tour also taught me things no content calendar could: how a crowd reads energy before you have said a word, how a city''s mood on a Friday is never quite the same as the last one, how much of hosting is actually listening. Those are lessons a screen cannot teach you.',
      'That standard is now built into everything the studio makes, on stage and off it.'
    ]::text[]),
    to_jsonb(array['Live Events', 'Urban Gang Tour', 'Culture']::text[]),
    '6 min read', 'published', timestamptz '2026-01-30T00:00:00Z'
  ),
  (
    'what-my-father-taught-me',
    'Personal',
    'What my father actually taught me at the breakfast table',
    'He was not raising a journalist on purpose. He just loved the news.',
    to_jsonb(array[
      'People assume I grew up wanting to be on television. I did not. I grew up in Manyonyi, Lugari, with a father, Joab, whom the village nicknamed the Lion, a man who loved the news the way some men love football, and who could not understand why his sons would not want to talk about it too.',
      'Every evening, without fail, he would ask what had happened in the world that day, and he expected an answer with detail in it, not a shrug. If you had watched the bulletin and could only tell him the headline, he would push further. Where. Who said what. Why it mattered.',
      'I did not understand until much later that this was training. At the time it just felt like a man who cared deeply about being informed, and who wanted the same for his sons, whether or not the electricity, the signal, or the kerosene lamp we read by cooperated that night.',
      'That habit, of not accepting the surface version of a story, is the exact habit that keeps me useful in a newsroom today. I have interviewed people twice my age and caught the gap in their answer because a man in a mud house in Lugari once refused to accept ''nothing much happened'' as a real answer.',
      'I do not know if my father ever imagined I would end up doing this for a living. I know he built the instinct for it without trying to.'
    ]::text[]),
    to_jsonb(array['Family', 'Lugari', 'Origins']::text[]),
    '5 min read', 'published', timestamptz '2025-12-11T00:00:00Z'
  ),
  (
    'kakamega-classroom-to-thika-newsroom',
    'Journalism',
    'From Kakamega classroom to Thika newsroom: what teaching gave me',
    'Explaining a difficult idea to a room of teenagers is its own kind of broadcast training.',
    to_jsonb(array[
      'Before any of this, I taught English Literature and History to secondary school students in Kakamega. It is a job that looks nothing like broadcasting from the outside. From the inside, it is nearly the same skill.',
      'A classroom does not care how well you understand something. It only cares whether you can make it clear to someone who does not yet. Teenagers, in particular, have no patience for a teacher who is performing knowledge instead of sharing it. They will tell you, one way or another, the moment you lose them.',
      'That is the exact discipline live television demands. An audience does not care how complex the story is behind the scenes. They care whether you can make it clear in the two minutes you have, without losing the truth of it along the way.',
      'When I moved into radio and TV hosting in Thika, shows like Rhumba Jouissance and The Overview Show, I was surprised how much of my teaching instinct carried over directly: read the room, adjust the pace, never assume the last thing you said landed the way you meant it to.',
      'I left the classroom, but I never stopped teaching. I just changed the size of the room.'
    ]::text[]),
    to_jsonb(array['Teaching', 'Kakamega', 'Thika']::text[]),
    '5 min read', 'published', timestamptz '2025-11-05T00:00:00Z'
  ),
  (
    'nairobi-podcast-in-a-matatu',
    'Culture',
    'Recording The Nairobi Podcast in the back of a matatu',
    'Some interviews you cannot get in a studio. You have to go get them in the moment.',
    to_jsonb(array[
      'The Nairobi Podcast exists because some of the best conversations in this city happen in places no studio can recreate. One of our episodes was recorded live in the back of a matatu crossing Nairobi, because that is genuinely where a certain kind of honest, unfiltered Kenyan conversation happens.',
      'A matatu ride has its own culture: the music the conductor picks, the way strangers negotiate space and fare and opinions in the same five minutes, the small dramas that unfold and resolve before your stop even arrives. You cannot script that. You can only be there with a microphone when it happens.',
      'Recording in that environment means giving up control. The engine noise does not care about your audio levels. A sudden stop does not care that someone was mid-sentence. But what you gain is a texture no studio can fake: real Nairobi, at real volume, saying what it actually thinks.',
      'That is the whole premise of the podcast: Nairobi''s creative economy, its hustle, its mental health conversations, its digital culture, captured as close to where it actually lives as we can get the microphone.',
      'Some of our most listened-to episodes came from exactly this kind of chaos. The city does the writing. I just have to be present enough to catch it.'
    ]::text[]),
    to_jsonb(array['The Nairobi Podcast', 'Matatu Culture', 'Field Recording']::text[]),
    '6 min read', 'published', timestamptz '2025-10-19T00:00:00Z'
  ),
  (
    'fronting-campaigns-brand-trust',
    'Roylandz Media',
    'What fronting campaigns for L''Oreal, Tecno and Infinix taught me about brand trust',
    'A youth audience can tell the difference between an endorsement and an opinion.',
    to_jsonb(array[
      'Fronting youth campaigns for brands like L''Oreal, Tecno and Infinix taught me something most influencer marketing gets backwards: audiences are not fooled by enthusiasm. They can tell, almost instantly, whether you actually use and believe in what you are promoting.',
      'I turn down more brand conversations than I take. Not because the money is not good, it usually is, but because the moment an audience senses a mismatch between who you are and what you are selling, the trust does not just dip for that campaign. It dips for every future one too.',
      'The campaigns that worked best were the ones where the brand let me talk about the product the way I would talk about it off camera, flaws included. Young audiences do not want a polished commercial. They want a person they already trust telling them something useful.',
      'That principle now runs through everything Roylandz Media does for clients: we would rather turn down a brief that requires dishonesty than deliver a campaign that burns the trust it took years to build.',
      'It is a harder way to run a media business. It is also the only version of it I am interested in running.'
    ]::text[]),
    to_jsonb(array['Brand Campaigns', 'Youth Marketing', 'Trust']::text[]),
    '5 min read', 'published', timestamptz '2025-09-08T00:00:00Z'
  ),
  (
    'peoples-choice-awards-nomination',
    'Personal',
    'Being nominated for the People''s Choice Awards did not feel like arriving',
    'A nomination is a nice sentence in a bio. It is not the finish line.',
    to_jsonb(array[
      'When the nomination for Male TikToker of the Year came through for the People''s Choice Awards Kenya, the messages started before I had even fully processed it myself. Congratulations, screenshots, the whole performance of a milestone.',
      'I appreciated every one of them. I also did not feel, in the moment, like I had arrived anywhere. A nomination is a nice sentence to put in a bio. It does not change what Monday''s editorial meeting looks like, or whether the next story is any good.',
      'I think that is the healthiest way I know to hold recognition: grateful, genuinely, and unmoved enough to keep working the next morning like nothing happened. The moment you let a nomination convince you the work is done, it usually is, in every sense that matters.',
      'What actually stayed with me was smaller: a message from someone in Lugari, from near where I grew up, saying they had seen the nomination and it made the idea of leaving home for something bigger feel less impossible.',
      'That is the version of the recognition I actually keep.'
    ]::text[]),
    to_jsonb(array['People''s Choice Awards', 'Recognition', 'Reflection']::text[]),
    '5 min read', 'published', timestamptz '2025-08-23T00:00:00Z'
  ),
  (
    'journalist-safety-global-cyber-alliance',
    'Journalism',
    'Why I co-authored a report on journalist safety with the Global Cyber Alliance',
    'The threats to African journalists moved online long before our safety training did.',
    to_jsonb(array[
      'Contributing to the Global Cyber Alliance''s work on protecting the online safety of journalists in Africa came out of a simple, uncomfortable observation: the threats journalists on this continent face moved online years before most of our safety training caught up.',
      'Young reporters, especially those building an audience on social platforms the way I have, are exposed in ways a traditional newsroom safety briefing never anticipated. Doxxing, coordinated harassment, targeted misinformation about you personally, these are now part of the job description whether anyone prepared you for them or not.',
      'Writing that contribution meant being honest about mistakes I had made myself early on: oversharing details that made me easy to locate, underestimating how quickly a coordinated pile-on can escalate, assuming good faith from people who had none.',
      'The goal was not to scare young journalists away from digital platforms. It was the opposite: to make sure the next generation of African reporters could use these tools with their eyes open, instead of learning the hard lessons the way I did.',
      'Safety is not separate from the reporting. If a journalist cannot work without fear, the reporting suffers first.'
    ]::text[]),
    to_jsonb(array['Journalist Safety', 'Global Cyber Alliance', 'Digital Rights']::text[]),
    '6 min read', 'published', timestamptz '2025-07-14T00:00:00Z'
  ),
  (
    'two-coffins-seven-days-apart',
    'The Book',
    'The two coffins, seven days apart',
    'Some chapters of Born Broke, Built Loud took the longest to be able to write.',
    to_jsonb(array[
      'There is a chapter in Born Broke, Built Loud that took longer to write than any other, not because the words were hard to find, but because I kept finding reasons to work on other chapters first. It is about losing two people I loved within seven days of each other.',
      'Grief does not organize itself into tidy paragraphs. It arrives out of order, returns when you think you have moved past it, and refuses to be summarized neatly for a reader. I had to accept that the chapter would not feel resolved by the end of it, because that loss has never fully resolved itself in me either.',
      'What made it into the book is not a tidy lesson about resilience. It is closer to an honest account of what it costs to keep showing up, on air, in a newsroom, in front of a camera, while carrying something that heavy.',
      'I almost cut it. It felt too private for a memoir that is otherwise about ambition and climbing. But a book that only shows the climb and none of what it cost is not honest, and I did not want to publish something dishonest with my name on the cover.',
      'So it stayed in, seven days and two coffins, exactly as hard to read as it was to write.'
    ]::text[]),
    to_jsonb(array['Memoir', 'Grief', 'Writing Process']::text[]),
    '5 min read', 'published', timestamptz '2025-06-02T00:00:00Z'
  ),
  (
    'working-across-three-languages',
    'Culture',
    'Working across three languages, and what gets lost between them',
    'English, Swahili and a stubborn but improving French all carry different truths.',
    to_jsonb(array[
      'Working across English, Swahili and French, however imperfect the French still is some days, has taught me that translation is never neutral. A phrase that lands with warmth in Swahili can sound clinical in English. A joke that works in one language dies flat in the other.',
      'In the newsroom, this matters more than people outside it realize. A bilingual story is not just the same facts said twice. It is two different relationships with the audience, and getting both right means understanding what each language is actually good at saying.',
      'Swahili, in my experience, carries emotion and communal weight better than English does. English is often sharper for precision, for numbers, for the exact wording of a policy. Knowing which language to lead with, for which story, is its own kind of editorial judgment.',
      'French is still the language I am least fluent in, and I say that publicly on purpose. Presenting yourself as more fluent than you are is a disservice to any audience who trusts you to be exact with language for a living.',
      'Every language you work in is a different lens on the same truth. Losing any one of them means losing part of how a story can be told.'
    ]::text[]),
    to_jsonb(array['Language', 'Bilingual Reporting', 'Culture']::text[]),
    '6 min read', 'published', timestamptz '2025-05-17T00:00:00Z'
  ),
  (
    'madame-zipporah-worth-feeding',
    'Personal',
    'What a woman named Madame Zipporah taught me about being worth feeding',
    'Tea, bread and a quiet hour with a book, from a deputy headmistress who has no idea she is in this story.',
    to_jsonb(array[
      'At Mahemas Primary School, the library was really just the deputy headmistress''s office, a cramped room where the few worn books we owned sat on the same shelves as her paperwork. Her name was Madame Zipporah, and for reasons I still do not fully understand, she decided a barefoot boy from Manyonyi was worth calling into that room.',
      'She would give me tea and bread while I read, actual hot tea and soft bread, which was not a small thing in a house where a full pot on the table was never guaranteed. She praised my work openly, in front of the other pupils, and a poor child who is visibly liked by a teacher will follow that teacher into almost anything. What she led me into was reading.',
      'I did not understand at the time that this was an intervention. It felt like kindness, which it was, but it was also the first door anyone had held open for me that did not have a cane waiting on the other side of it. In a school where a wrong answer cost you strokes at the board, her office was the one room where being curious was never punished.',
      'I do not know if Madame Zipporah remembers any of this. I suspect she does not, because to her it was probably one small kindness among thousands she has shown children over a long career. To me it bent the whole curve of my life. I have spent every year since looking for more rooms like that one, and trying, when I get the chance, to be the adult holding the door for somebody else''s version of that boy.',
      'A classmate named Hassan Omar once paid a 25-shilling exam fee out of his own pocket so I would not be turned away from a test my family could not afford for me to sit. He has probably forgotten it completely. I never will. The biggest debts of a life are so often the smallest amounts, paid by exactly the right person at exactly the moment you could not pay them yourself.'
    ]::text[]),
    to_jsonb(array['Mahemas Primary', 'Teachers', 'Reading']::text[]),
    '5 min read', 'published', timestamptz '2025-04-03T00:00:00Z'
  ),
  (
    'dung-day-cow-dung-floor',
    'Culture',
    'Dung Day: what a cow-dung floor taught me about finding value in what everyone else calls waste',
    'The world had decided cow dung was worthless. My village looked at the same substance and saw a floor.',
    to_jsonb(array[
      'Every Friday at Mahemas Primary, the whole school arrived carrying a bag of cow dung and a jerrican of water. It was not punishment. It was maintenance. Mixed with water into a paste and smoothed across the floor by hand, dung dries into a clean, hard, cool surface that keeps the dust and the ants down, a piece of practical engineering my community had been using for generations, long before anyone in a boardroom invented a word like ''circular economy'' for the same idea.',
      'The world had decided that cow dung was the lowest, most worthless substance imaginable. My village looked at that exact same material and saw a building resource, a floor, a renewable, self-repairing surface that cost nothing but labor. The matter did not change between those two views. Only the eye looking at it, and the need driving the looking, changed.',
      'I have carried that lesson into everything since. I have spent my career treating things other people considered worthless, a poor kid''s story, a cheap phone and a bedsheet as a cinema screen, an audience nobody else wanted, as raw material, as floor, as the substance of something worth building.',
      'We plastered our homes with it too, not just the school. A freshly sealed dung floor at home was a point of pride for a mother, read by a visitor the way a city guest reads polished tile: as a sign that the people here cared for their home and kept it well.',
      'Worth, I learned kneeling on that floor as a child, is not a property of the thing itself. It is a property of the relationship between the thing and the person who needs it. Nothing is truly waste to someone resourceful and hungry enough to look at it properly.'
    ]::text[]),
    to_jsonb(array['Manyonyi', 'Resourcefulness', 'Philosophy']::text[]),
    '5 min read', 'published', timestamptz '2025-03-11T00:00:00Z'
  )
on conflict (slug) do nothing;
