# Requirements Document

## Introduction

THE ROYLANDZ UNIVERSE is a complete rebuild of euginemicah.com — transforming the existing Next.js portfolio into an immersive, cinematic, multi-dimensional web experience for Eugine Micah (Roylandz), a 24-year-old Media Entrepreneur & Storytelling Strategist based in Nairobi, Kenya. The site replaces all existing pages and components with 9 thematic "worlds," each with distinct visual identities, advanced animations, and narrative depth. The target emotion is jaw-dropping awe → inspiration → obsession.

## Glossary

- **Universe**: The complete euginemicah.com web experience comprising all 9 worlds
- **Portal**: The homepage at `/` — the cinematic entry point to the Universe
- **World**: A distinct page/section with its own visual identity and narrative purpose
- **Loader**: The full-screen initialization screen shown before the Portal renders
- **Ticker**: The scrolling breaking-news marquee displayed on the Portal
- **HexCard**: A hexagonal glass-morphism card used in the Portal world preview grid
- **ScrambleText**: The text-scramble animation applied to all page titles (800ms, alphanumeric chars)
- **MagneticButton**: A CTA button that follows the cursor at 0.3× within an 80px radius
- **GoldCursor**: The custom 20px gold circle cursor with hover expansion and trailing particles
- **CurtainTransition**: The GSAP black sweep left→right with gold shimmer used between page navigations
- **LenisScroll**: The Lenis smooth-scroll instance active throughout the Universe
- **ScrollTrigger**: GSAP ScrollTrigger plugin used for scroll-driven animations
- **Era**: A 100vh timeline section on the Origin world representing a life period
- **VaultCard**: An industrial-styled card used in the Archive world
- **TerminalCard**: A terminal-window-styled company card used in the Empire world
- **BroadcastPlayer**: The custom broadcast-monitor-styled video player on the Broadcast world
- **Oracle**: The Future world at `/future` — holographic vision board
- **Signal**: The Contact world at `/contact` — radio-wave contact interface
- **Supabase**: The backend service used for contact form submissions and analytics
- **RLS**: Row-Level Security policies on Supabase tables
- **CSP**: Content Security Policy headers configured in next.config
- **ProPost**: Eugine's AI media empire — 150+ agents, 9 companies, 6 platforms
- **Urban_News**: The TV show co-hosted by Eugine Micah on StarTimes Channel 430 with 2M+ weekly reach
- **Memoir**: "Born Broke, Built Loud" — Eugine's published memoir
- **DM_Mono**: The monospace font used for broadcast/UI/terminal text
- **Playfair**: Playfair Display font used for display headings
- **Space_Grotesk**: Font used for headlines
- **Lora**: Serif font used for body text
- **WebGL_Shader**: Custom GLSL shader programs used for particle and background effects
- **Three_Scene**: A React Three Fiber canvas scene used for 3D/WebGL rendering
- **Particle_System**: tsParticles or custom WebGL particle emitter
- **GSAP**: GreenSock Animation Platform used for timeline and scroll animations
- **Framer_Motion**: React animation library used for component-level transitions
- **Howler**: Howler.js audio library for optional ambient sound
- **Resend**: Email delivery API used for contact form notifications
- **Vercel_Analytics**: Privacy-first analytics embedded in the Universe

---

## Requirements

### Requirement 1: Project Foundation & Technology Stack

**User Story:** As a developer, I want the Universe built on a well-defined, modern stack, so that the codebase is maintainable, performant, and deployable to Vercel.

#### Acceptance Criteria

1. THE Universe SHALL be built with Next.js 14 App Router using TypeScript.
2. THE Universe SHALL use Tailwind CSS v3 with CSS Custom Properties for the design system.
3. THE Universe SHALL integrate GSAP 3 with ScrollTrigger and Framer Motion 11 for animations.
4. THE Universe SHALL integrate Three.js r165 via React Three Fiber and Drei for 3D/WebGL scenes.
5. THE Universe SHALL use Lenis for smooth scrolling throughout all worlds.
6. THE Universe SHALL use Howler.js for optional ambient audio.
7. THE Universe SHALL use Supabase for contact form submissions and page analytics.
8. THE Universe SHALL use the Resend API for contact form email notifications.
9. THE Universe SHALL include Vercel Analytics.
10. WHEN the Universe is built, THE build system SHALL produce a deployable Vercel artifact with no TypeScript errors.

---

### Requirement 2: Design System

**User Story:** As a visitor, I want a consistent visual language across all worlds, so that the experience feels cohesive and intentional.

#### Acceptance Criteria

1. THE Universe SHALL define CSS Custom Properties for the color palette: void black (`#020005`), cosmic navy (`#0A0F2E`), gold (`#D4A017`, `#F5C842`), signal red (`#C0392B`), and cyber cyan (`#00D4FF`).
2. THE Universe SHALL load and apply Playfair Display for display headings, Space Grotesk for headlines, DM_Mono for broadcast/UI text, Lora for body text, and Inter for UI elements.
3. THE Universe SHALL apply a medieval-meets-futuristic, broadcast TV aesthetic with African regal energy across all worlds.
4. WHEN a page title renders, THE ScrambleText animation SHALL run for 800ms using alphanumeric characters before resolving to the final text.
5. WHEN a user hovers over a MagneticButton, THE MagneticButton SHALL follow the cursor at 0.3× offset within an 80px radius.
6. WHEN a user navigates between worlds, THE CurtainTransition SHALL execute a black sweep from left to right with a gold shimmer overlay using GSAP.

---

### Requirement 3: Global Custom Cursor

**User Story:** As a visitor on a desktop device, I want a custom gold cursor, so that the experience feels premium and immersive from the first interaction.

#### Acceptance Criteria

1. WHILE a user is on a non-touch desktop device, THE GoldCursor SHALL render as a 20px gold circle replacing the default OS cursor.
2. WHEN the GoldCursor moves, THE GoldCursor SHALL emit trailing particles along its path.
3. WHEN the GoldCursor hovers over an interactive element, THE GoldCursor SHALL expand in size.
4. WHEN the GoldCursor hovers over a button, THE GoldCursor SHALL change to a crosshair style.
5. WHILE a user is on a touch device, THE Universe SHALL disable the GoldCursor and use the default touch interaction model.

---

### Requirement 4: Smooth Scroll & Parallax

**User Story:** As a visitor, I want buttery-smooth scrolling and parallax depth, so that the experience feels cinematic and alive.

#### Acceptance Criteria

1. THE LenisScroll instance SHALL be active on all worlds throughout the Universe.
2. WHILE a user scrolls on a desktop device, THE hero layer SHALL move at 0.3× scroll speed (parallax).
3. WHILE a user scrolls on a desktop device, THE background layer SHALL move at 0.1× scroll speed.
4. WHILE a user scrolls on a desktop device, THE foreground layer SHALL move at 1× scroll speed.
5. WHILE a user is on a mobile device, THE Universe SHALL disable parallax effects.

---

### Requirement 5: Site Architecture — 9 Worlds

**User Story:** As a visitor, I want to navigate between 9 distinct thematic worlds, so that I can explore every dimension of Eugine Micah's story.

#### Acceptance Criteria

1. THE Universe SHALL expose the following routes: `/` (Portal), `/origin` (Origin), `/broadcast` (Broadcast), `/empire` (Empire), `/memoir` (Word), `/movement` (Movement), `/future` (Oracle), `/archive` (Archive), `/contact` (Signal).
2. THE Universe SHALL render a floating pill navigation bar on desktop with gold hover underlines linking to all 9 worlds.
3. WHEN a user is on a mobile device, THE Universe SHALL render a bottom navigation bar instead of the floating pill nav.
4. WHEN a user taps the hamburger icon on mobile, THE Universe SHALL display a full-screen overlay navigation menu.
5. THE Universe SHALL replace all existing pages, components, and routes from the prior codebase.

---

### Requirement 6: THE PORTAL — Homepage (`/`)

**User Story:** As a first-time visitor, I want a jaw-dropping cinematic entry experience, so that I immediately understand the scale and ambition of the Roylandz Universe.

#### Acceptance Criteria

1. WHEN the Portal first loads, THE Loader SHALL display "INITIALIZING THE ROYLANDZ UNIVERSE" with a radio waveform animation and a 0–100% counter.
2. WHEN the Loader counter reaches 100%, THE Loader SHALL execute a glitch wipe reveal to expose the Portal hero.
3. THE Portal hero SHALL render a Three_Scene star field with 200 gold Particle_System particles and a Nairobi skyline SVG.
4. THE Portal hero SHALL display Eugine Micah's portrait photo in black-and-white with a gold grain overlay and a glitching gold border.
5. WHEN a user hovers over the portrait photo, THE portrait SHALL reveal full color.
6. THE Portal hero SHALL display a "LIVE" badge overlaid on the portrait.
7. THE Portal hero SHALL display the headline "EUGINE MICAH" in Playfair Display at 7rem with a gold gradient, animated letter-by-letter using GSAP stagger.
8. THE Portal SHALL display a glass-morphism stats bar showing: "2M+ Weekly Reach", "10+ Years Media", "3 Active Shows".
9. THE Portal SHALL display a "WATCH URBAN NEWS" CTA button styled in signal red and a "READ MY MEMOIR" CTA button styled as a gold outline, both as MagneticButtons.
10. THE Portal SHALL display 6 HexCards in a grid, each linking to one of the 6 non-Portal worlds with a 3D tilt hover effect.
11. THE Portal SHALL display a breaking-news Ticker on a red background using CSS marquee, pauseable on hover.
12. WHEN a user hovers over the Ticker, THE Ticker SHALL pause its scrolling animation.

---

### Requirement 7: THE ORIGIN — Timeline (`/origin`)

**User Story:** As a visitor, I want to scroll through Eugine's life story as an immersive timeline, so that I understand the journey from birth to empire.

#### Acceptance Criteria

1. WHEN the Origin world loads, THE entry animation SHALL display a parchment texture with a wax seal crack SVG animation followed by a scroll unroll effect.
2. THE Origin world SHALL contain 6 Eras, each occupying 100vh of scroll height.
3. WHEN a user scrolls through Era 1 (Birth 2000, Kakamega), THE background SHALL render in warm ochre tones.
4. WHEN a user scrolls through Era 2 (Primary School 2009–2015), THE background SHALL render in childhood blue tones.
5. WHEN a user scrolls through Era 3 (Secondary School 2015–2019, Mua Hills), THE background SHALL render in green tones.
6. WHEN a user scrolls through Era 4 (The Rise 2019–2022), THE background SHALL render in Nairobi neon tones.
7. WHEN a user scrolls through Era 5 (The Empire 2022–Present), THE background SHALL render in navy and gold tones.
8. WHEN a user scrolls through Era 6 (The Future 2025–2027+), THE background SHALL render in electric cyan with holographic overlays.
9. THE Origin world SHALL display a heritage section with a family tree SVG, tribe badges labeled "BUNYORE", "MARAGOLI", and "LUHYA NATION", and a Western Kenya map.
10. WHILE a user scrolls from Era 1 to Era 6, THE background color scheme SHALL transition progressively from sepia → black-and-white → full color → neon.

---

### Requirement 8: THE BROADCAST — Media Empire (`/broadcast`)

**User Story:** As a visitor, I want to explore Eugine's broadcast career in a studio-authentic environment, so that I feel the weight of his media presence.

#### Acceptance Criteria

1. THE Broadcast world SHALL render with a studio aesthetic including CSS scan lines and VU meter animations.
2. THE Broadcast world SHALL display a pulsing "ON AIR" badge.
3. THE Broadcast world SHALL display a live Nairobi clock showing the current time in UTC+3.
4. THE Broadcast world SHALL display a BroadcastPlayer styled as a broadcast monitor.
5. THE Broadcast world SHALL display show cards for: Urban News, PPP TV Digital Desk, The Nairobi Podcast, and Citizen TV Legacy.
6. THE Broadcast world SHALL display a career stats panel showing: "10+ Years", "3 Shows", "2M+ Viewers", "4 Networks".
7. THE Broadcast world SHALL display a philosophy quote styled as a broadcast lower-third graphic.

---

### Requirement 9: THE EMPIRE — ProPost AI (`/empire`)

**User Story:** As a visitor, I want to understand the scale of Eugine's AI media empire, so that I grasp the technological ambition behind ProPost.

#### Acceptance Criteria

1. THE Empire world SHALL render a cyan matrix data-rain canvas animation as the background.
2. THE Empire world SHALL display the heading "THE PROPOST EMPIRE" in DM_Mono with a glitch animation.
3. THE Empire world SHALL describe ProPost as comprising 150+ AI agents, 9 companies, and 6 platforms.
4. THE Empire world SHALL display a 3×3 grid of TerminalCards, each representing a ProPost company with a terminal-window aesthetic.
5. THE Empire world SHALL display platform coverage indicators labeled "ACTIVE — POSTING".
6. THE Empire world SHALL display a live-styled dashboard with static data.
7. THE Empire world SHALL include an Auto News Station section with a 3-step animated explainer.
8. THE Empire world SHALL include a ProPost X section.
9. THE Empire world SHALL display a terminal-styled philosophy output block.

---

### Requirement 10: THE WORD — Memoir (`/memoir`)

**User Story:** As a visitor, I want to experience the memoir "Born Broke, Built Loud" as an immersive literary world, so that I feel compelled to read it.

#### Acceptance Criteria

1. THE Word world SHALL render with a candlelight ambiance, paper texture background, and ink smudge overlays.
2. THE Word world SHALL display a 3D book mockup using CSS 3D transforms or a Three_Scene.
3. WHEN a user clicks the 3D book mockup, THE book SHALL animate open.
4. THE Word world SHALL present three parts of the memoir: "Foundation", "Primary School", and "Secondary School".
5. THE Word world SHALL display key theme badges labeled: "Survival", "Identity", "Ambition", and "Heritage" styled as ink stamps.
6. THE Word world SHALL display an excerpt teaser and an "ORDER THE MEMOIR" CTA button.
7. THE Word world SHALL display the Roylandz brand origin quote.
8. THE Word world SHALL display a rotating pull-quote carousel.

---

### Requirement 11: THE MOVEMENT — Community (`/movement`)

**User Story:** As a visitor, I want to see Eugine's community impact and live events, so that I understand the movement he is building beyond media.

#### Acceptance Criteria

1. THE Movement world SHALL render with warm reds and amber tones with crowd silhouette imagery.
2. THE Movement world SHALL include an Urban Tour section describing the Kenya high school talent search with an animated county map.
3. THE Movement world SHALL include a Tushinde section describing the 47-county charity show with a MrBeast-style viral strategy narrative.
4. THE Movement world SHALL include a Nairobi Podcast section with team profiles, episode previews, and platform links.
5. THE Movement world SHALL display community impact statistics.
6. THE Movement world SHALL display a full-width Hannah Arendt quote.
7. THE Movement world SHALL display social proof testimonials.

---

### Requirement 12: THE ORACLE — Future Vision (`/future`)

**User Story:** As a visitor, I want to see Eugine's 2027 vision presented as a classified transmission, so that I feel the ambition and inevitability of his trajectory.

#### Acceptance Criteria

1. THE Oracle world SHALL render holographic cyan grid lines, floating Three_Scene shapes, and scanline overlays.
2. THE Oracle world SHALL display the heading "TRANSMISSION FROM 2027" in DM_Mono with a cyan glow effect.
3. THE Oracle world SHALL display classified file cards labeled: "POLITICAL_DOMINANCE.txt", "PAN_AFRICAN_MEDIA.txt", "NSE_PORTFOLIO.txt", and "PROPOST_SCALE.txt".
4. THE Oracle world SHALL display an animated vision statement reveal.
5. THE Oracle world SHALL display a NASA-style countdown timer targeting a 2027 date.
6. THE Oracle world SHALL display a Three_Scene rotating globe with a Kenya pin and animated lines connecting African cities.

---

### Requirement 13: THE ARCHIVE — Portfolio & Press (`/archive`)

**User Story:** As a visitor or collaborator, I want to browse Eugine's press coverage, portfolio, and achievements in one place, so that I can verify his credentials and track record.

#### Acceptance Criteria

1. THE Archive world SHALL render with an industrial vault aesthetic.
2. THE Archive world SHALL display press coverage VaultCards.
3. THE Archive world SHALL display a portfolio gallery with filter tabs for: TV, Podcast, Digital, and Events.
4. WHEN a user selects a filter tab, THE gallery SHALL display only items matching the selected category.
5. THE Archive world SHALL display an achievements vault section with framed certificate cards that animate on hover.
6. THE Archive world SHALL display a tech stack showcase including a ProPost architecture diagram.
7. THE Archive world SHALL display an animated stats panel showing: 2M+ viewers, 150+ agents, 10+ years, 3 shows, 47 counties, 1 memoir, 6 platforms.
8. WHEN the stats panel enters the viewport, THE stat counters SHALL animate from zero to their target values.

---

### Requirement 14: THE SIGNAL — Contact (`/contact`)

**User Story:** As a collaborator or journalist, I want to contact Eugine through a thematic, branded interface, so that the act of reaching out feels intentional and memorable.

#### Acceptance Criteria

1. THE Signal world SHALL render a radio wave visualization using SVG or Canvas with gold pulse rings expanding outward.
2. THE Signal world SHALL display a contact form with fields: Name, Email, Purpose (dropdown), and Message.
3. WHEN a user submits the contact form, THE Signal world SHALL submit the data to Supabase via a server action or API route.
4. WHEN a form submission succeeds, THE Signal world SHALL display a success animation.
5. THE Signal world SHALL include a honeypot field to reject bot submissions without user interaction.
6. THE Signal world SHALL display a "TRANSMIT" submit button styled with a red pulsing animation.
7. THE Signal world SHALL display social links for: LinkedIn, Twitter/X, Instagram, Facebook, TikTok, and YouTube.
8. THE Signal world SHALL display an availability section with a green blinking dot indicator.
9. WHEN a form submission is received, THE Resend API SHALL send an email notification to euginemicah@gmail.com.

---

### Requirement 15: Contact Form — Parser & Data Integrity

**User Story:** As a developer, I want contact form data to be validated, sanitized, and stored reliably, so that submissions are clean and the system is protected from abuse.

#### Acceptance Criteria

1. WHEN a contact form is submitted, THE Signal world SHALL validate that Name, Email, and Message fields are non-empty before submission.
2. WHEN an invalid email address is provided, THE Signal world SHALL display an inline validation error without submitting the form.
3. WHEN form input is received by the server, THE server action SHALL sanitize all string fields using DOMPurify before writing to Supabase.
4. THE Supabase `contact_submissions` table SHALL enforce RLS policies allowing anonymous insert-only access.
5. FOR ALL valid contact form submissions, storing then retrieving the record SHALL return an equivalent object (round-trip property).
6. THE Pretty_Printer SHALL format contact submission data into a readable email body for the Resend notification.
7. FOR ALL valid email body strings, formatting then parsing the structured fields SHALL produce an equivalent record (round-trip property).

---

### Requirement 16: Security

**User Story:** As a site owner, I want the Universe protected against common web attacks, so that user data and site integrity are preserved.

#### Acceptance Criteria

1. THE Universe SHALL configure CSP headers in `next.config` restricting script, style, and media sources to trusted origins.
2. THE Universe SHALL implement rate limiting in `middleware.ts` allowing a maximum of 100 requests per minute per IP address.
3. THE Universe SHALL implement rate limiting in `middleware.ts` allowing a maximum of 3 contact form submissions per minute per IP address.
4. THE Signal world SHALL include a honeypot field that, WHEN populated by a bot, SHALL cause the server action to silently discard the submission.
5. THE Universe SHALL store all API keys and secrets in environment variables and SHALL NOT expose them in client-side code.
6. THE Supabase client used in server actions SHALL use the service role key only in server-side contexts.

---

### Requirement 17: Performance

**User Story:** As a visitor on any device or connection, I want the Universe to load fast and feel responsive, so that the experience is not gated by performance.

#### Acceptance Criteria

1. THE Universe SHALL achieve a Lighthouse performance score above 90 on desktop.
2. THE Universe SHALL achieve a Largest Contentful Paint (LCP) below 1.8 seconds.
3. THE Universe SHALL achieve a First Input Delay (FID) below 50 milliseconds.
4. THE Universe SHALL achieve a Cumulative Layout Shift (CLS) below 0.05.
5. THE Universe SHALL achieve a Time to Interactive (TTI) below 3.5 seconds.
6. THE Universe SHALL use dynamic imports for Three.js, GSAP, and other heavy libraries to reduce initial bundle size.
7. THE Universe SHALL serve all images in WebP or AVIF format with blur placeholders and lazy loading.
8. WHILE a user is on a mobile device, THE Particle_System SHALL render 50 particles instead of 200.

---

### Requirement 18: Mobile Responsiveness

**User Story:** As a visitor on a mobile device, I want the Universe to be fully usable and visually impressive, so that the experience is not degraded on smaller screens.

#### Acceptance Criteria

1. THE Universe SHALL define responsive breakpoints: mobile below 640px, tablet 640–1024px, desktop above 1024px.
2. WHILE a user is on a mobile device, THE Universe SHALL disable parallax effects.
3. WHILE a user is on a touch device, THE Universe SHALL disable the GoldCursor.
4. WHILE a user is on a mobile device, THE Universe SHALL display a bottom navigation bar.
5. THE Universe SHALL respect safe area insets on mobile devices with notches or home indicators.

---

### Requirement 19: Supabase Schema

**User Story:** As a developer, I want a well-defined database schema, so that contact submissions and analytics are stored reliably with proper access controls.

#### Acceptance Criteria

1. THE Supabase database SHALL contain a `contact_submissions` table with columns: id, name, email, purpose, message, created_at.
2. THE `contact_submissions` table SHALL enforce RLS policies permitting anonymous users to insert rows only.
3. THE Supabase database SHALL contain a `page_analytics` table storing page view events without any Personally Identifiable Information.
4. THE `page_analytics` table SHALL enforce RLS policies permitting anonymous users to insert rows only.

---

### Requirement 20: Existing Codebase Replacement

**User Story:** As a developer, I want the existing portfolio pages and components fully replaced, so that no legacy code conflicts with the new Universe architecture.

#### Acceptance Criteria

1. THE Universe SHALL remove all existing route directories: `/about`, `/author`, `/blog`, `/career`, `/contact` (legacy), `/dragons-den`, `/flightstory`, `/gallery`, `/press`, `/shop`, `/shows`, `/thirdweb`.
2. THE Universe SHALL remove the existing components: `Footer.tsx`, `HomeClient.tsx`, `Nav.tsx`, `PageHeader.tsx`.
3. THE Universe SHALL replace `src/app/layout.tsx` with a new root layout implementing the Universe design system, global fonts, GoldCursor, LenisScroll, and CurtainTransition.
4. THE Universe SHALL replace `src/app/globals.css` with the Universe CSS Custom Properties and base styles.
5. THE Universe SHALL replace `src/app/page.tsx` with the Portal world implementation.
6. THE Universe SHALL preserve all existing assets in `public/images/` for use in the new worlds.
