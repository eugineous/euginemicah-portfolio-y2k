# Implementation Plan: THE ROYLANDZ UNIVERSE

## Overview

Complete in-place rebuild of the existing Next.js portfolio into a cinematic 9-world experience. Tasks proceed from teardown → foundation → global systems → world pages → security/testing. Each task builds on the previous and ends with all code wired together.

## Tasks

- [x] 1. Teardown legacy codebase and install dependencies
  - Delete all legacy route directories: `/about`, `/author`, `/blog`, `/career`, `/contact` (legacy), `/dragons-den`, `/flightstory`, `/gallery`, `/press`, `/shop`, `/shows`, `/thirdweb`
  - Delete legacy components: `Footer.tsx`, `HomeClient.tsx`, `Nav.tsx`, `PageHeader.tsx`
  - Delete `src/lib/blog.ts`
  - Pin Next.js to `14.2.x` in `package.json` and install all new dependencies: `gsap`, `framer-motion`, `@react-three/fiber`, `@react-three/drei`, `three`, `lenis`, `howler`, `@supabase/supabase-js`, `resend`, `isomorphic-dompurify`, `tsparticles`, `react-tsparticles`, `fast-check`, `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `@types/three`, `@types/howler`, `@types/dompurify`
  - Add `vitest.config.ts` with jsdom environment and path aliases
  - _Requirements: 1.1–1.10, 20.1–20.2_

- [x] 2. Design system foundation
  - [x] 2.1 Replace `src/app/globals.css` with Universe CSS Custom Properties (void, cosmic-navy, gold, signal-red, cyber-cyan), base resets, z-index layers, and `src/styles/animations.css` keyframes (scan lines, glitch, marquee, pulse, wax-seal)
    - _Requirements: 2.1, 2.3_
  - [x] 2.2 Create `tailwind.config.ts` extending Tailwind with Universe color tokens, font families, and responsive breakpoints (mobile/tablet/desktop)
    - _Requirements: 1.2, 18.1_
  - [x] 2.3 Create `src/lib/constants.ts` with `WORLDS` array (9 entries with slug/label/route/accentColor/description), `PARALLAX_SPEEDS`, `computeParallaxOffset()`, and `getParticleCount()`
    - _Requirements: 4.2–4.5, 17.8_
  - [ ]\* 2.4 Write property tests for `computeParallaxOffset` and `getParticleCount`
    - **Property 4: Parallax offset is zero on mobile**
    - **Property 4: Parallax offset is scrollY × speed on desktop**
    - **Property 5: Particle count is device-appropriate**
    - **Validates: Requirements 4.2, 4.3, 4.4, 4.5, 17.8, 18.2**
  - [x] 2.5 Create `src/lib/utils.ts` with `cn()`, `isTouchDevice()`, `sanitizeField()`, `formatEmailBody()`, `parseEmailBody()`
    - _Requirements: 15.3, 15.6, 15.7_
  - [ ]\* 2.6 Write property tests for `sanitizeField`, `formatEmailBody`/`parseEmailBody`
    - **Property 11: Sanitization removes all HTML tags**
    - **Property 13: Email body round-trip (format → parse)**
    - **Validates: Requirements 15.3, 15.7**

- [x] 3. Supabase client and data layer
  - [x] 3.1 Create `src/lib/supabase.ts` exporting `supabaseAnon` (anon key) and `supabaseAdmin` (service role key, server-only)
    - _Requirements: 1.7, 16.5, 16.6, 19.1_
  - [x] 3.2 Create `.env.local.example` documenting all required environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `CONTACT_EMAIL`)
    - _Requirements: 16.5_
  - [x] 3.3 Write SQL migration file `supabase/migrations/001_init.sql` creating `contact_submissions` and `page_analytics` tables with CHECK constraints and RLS policies (anon insert-only)
    - _Requirements: 19.1–19.4, 15.4_

- [x] 4. Root layout and global providers
  - [x] 4.1 Replace `src/app/layout.tsx` with Universe root layout: load all 5 fonts via `next/font/google` (Playfair Display, Space Grotesk, DM Mono, Lora, Inter), inject CSS variables, wrap children in `LenisProvider` and `CurtainTransition`
    - _Requirements: 2.2, 1.5, 20.3_
  - [x] 4.2 Create `src/components/global/LenisProvider.tsx` — client component initializing Lenis, syncing with GSAP ticker via RAF, exposing `useLenis()` hook
    - _Requirements: 1.5, 4.1_
  - [x] 4.3 Create `src/components/global/CurtainTransition.tsx` — GSAP timeline (black div sweeps left→right, gold shimmer overlay), context provider wrapping `router.push`
    - _Requirements: 2.6_
  - [x] 4.4 Create `src/components/global/GoldCursor.tsx` — fixed 20px gold circle, particle trail canvas, hover expansion, crosshair on buttons; disabled when `isTouchDevice()` returns true
    - _Requirements: 3.1–3.5, 18.3_
  - [ ]\* 4.5 Write property test for `isTouchDevice` / GoldCursor render condition
    - **Property 3: Touch device disables GoldCursor**
    - **Validates: Requirements 3.5, 18.3**
  - [x] 4.6 Create `src/components/global/ScrambleText.tsx` — GSAP ticker-based scramble algorithm (800ms, alphanumeric chars), guarantees final text equals input
    - _Requirements: 2.4_
  - [ ]\* 4.7 Write property test for ScrambleText resolution
    - **Property 1: ScrambleText always resolves to input**
    - **Validates: Requirements 2.4**
  - [x] 4.8 Create `src/components/global/MagneticButton.tsx` — tracks mouse position, applies `translate(dx * 0.3, dy * 0.3)` within 80px radius, zero offset outside
    - _Requirements: 2.5_
  - [x]\* 4.9 Write property test for MagneticButton offset bounds
    - **Property 2: MagneticButton offset is bounded by strength factor**
    - **Validates: Requirements 2.5**

- [x] 5. Navigation components
  - [x] 5.1 Create `src/components/global/Nav.tsx` — floating pill nav (desktop, `position: fixed`, `backdrop-filter: blur`), bottom bar (mobile, 5 primary world icons), gold hover underlines, links to all 9 worlds
    - _Requirements: 5.2, 5.3, 18.4_
  - [x] 5.2 Create `src/components/global/MobileNav.tsx` — full-screen overlay triggered by hamburger, `z-index: var(--z-nav)`, all 9 world links
    - _Requirements: 5.4_
  - [x] 5.3 Add safe-area inset CSS to bottom nav (`padding-bottom: env(safe-area-inset-bottom)`)
    - _Requirements: 18.5_

- [ ] 6. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Security layer
  - [x] 7.1 Create `src/middleware.ts` with in-memory sliding-window rate limiter: 100 req/min general, 3 req/min for contact routes; returns 429 JSON on excess
    - _Requirements: 16.2, 16.3_
  - [ ]\* 7.2 Write property test for rate limiting behavior
    - **Property 15: Rate limiting blocks excess requests**
    - **Validates: Requirements 16.2, 16.3**
  - [x] 7.3 Update `next.config.ts` with CSP headers (script-src, style-src, font-src, img-src, connect-src, frame-src), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`
    - _Requirements: 16.1_

- [x] 8. Contact server action and API route
  - [x] 8.1 Create `src/app/actions/contact.ts` — server action `submitContact(formData)`: re-validate all fields, check honeypot, `sanitizeField()` all strings, insert into `contact_submissions` via `supabaseAdmin`, send Resend email notification using `formatEmailBody()`
    - _Requirements: 14.3, 15.1–15.3, 15.6, 16.4, 16.5, 16.6_
  - [ ]\* 8.2 Write property test for honeypot discard behavior
    - **Property 14: Honeypot silently discards bot submissions**
    - **Validates: Requirements 14.5, 16.4**
  - [x] 8.3 Create `src/app/api/contact/route.ts` as API route fallback delegating to the same server action logic
    - _Requirements: 14.3_

- [x] 9. Portal world (`/`)
  - [x] 9.1 Create `src/components/home/Loader.tsx` — full-screen `#020005`, "INITIALIZING THE ROYLANDZ UNIVERSE" in DM Mono, radio waveform SVG animation (3 oscillating bars), GSAP counter 0→100% over 2.5s, glitch `clip-path` wipe reveal on completion
    - _Requirements: 6.1, 6.2_
  - [x] 9.2 Create `src/components/home/HeroScene.tsx` — R3F `<Canvas>` with Drei `<Stars>` (200 gold particles), Nairobi skyline SVG as `<Html>` overlay; dynamically imported with `ssr: false`
    - _Requirements: 6.3_
  - [x] 9.3 Create `src/components/home/StatsBar.tsx` — glass-morphism bar showing "2M+ Weekly Reach", "10+ Years Media", "3 Active Shows"
    - _Requirements: 6.8_
  - [x] 9.4 Create `src/components/home/HexCard.tsx` — hexagonal `clip-path` card, `backdrop-filter: blur(8px)`, 3D tilt on `onMouseMove`, links to a world
    - _Requirements: 6.10_
  - [x] 9.5 Create `src/components/home/Ticker.tsx` — CSS marquee on red background, `animation-play-state: paused` on hover
    - _Requirements: 6.11, 6.12_
  - [x] 9.6 Replace `src/app/page.tsx` with Portal world: mount Loader, HeroScene (dynamic), portrait with grayscale→color Framer Motion hover, "LIVE" badge, GSAP stagger headline, StatsBar, two MagneticButton CTAs, 6 HexCards grid, Ticker; wire Nav
    - _Requirements: 6.1–6.12, 20.5_

- [x] 10. Origin world (`/origin`)
  - [x] 10.1 Create `src/components/origin/EraSection.tsx` — 100vh sticky section, GSAP ScrollTrigger `scrub: true` background color transition; 6 era color configs (ochre → blue → green → neon → navy/gold → cyan)
    - _Requirements: 7.2–7.10_
  - [x] 10.2 Create `src/components/origin/FamilyTree.tsx` — SVG family tree component
    - _Requirements: 7.9_
  - [x] 10.3 Create `src/components/origin/TribeBadge.tsx` — badge component for "BUNYORE", "MARAGOLI", "LUHYA NATION"
    - _Requirements: 7.9_
  - [x] 10.4 Create `src/app/origin/page.tsx` — entry animation (parchment texture, wax seal crack SVG `stroke-dashoffset`, scroll unroll `clip-path`), 6 EraSection instances, FamilyTree, 3 TribeBadges, Western Kenya map; wire Nav
    - _Requirements: 7.1–7.10_

- [x] 11. Broadcast world (`/broadcast`)
  - [x] 11.1 Create `src/components/broadcast/NairobiClock.tsx` — `setInterval` every 1s, displays UTC+3 time in DM Mono
    - _Requirements: 8.3_
  - [ ]\* 11.2 Write property test for Nairobi clock UTC+3 offset
    - **Property 8: Nairobi clock offset is exactly UTC+3**
    - **Validates: Requirements 8.3**
  - [x] 11.3 Create `src/components/broadcast/VUMeter.tsx` — CSS keyframe animated bar heights with staggered `animation-delay`
    - _Requirements: 8.1_
  - [x] 11.4 Create `src/components/broadcast/BroadcastPlayer.tsx` — broadcast monitor styled video player
    - _Requirements: 8.4_
  - [x] 11.5 Create `src/components/broadcast/ShowCard.tsx` — show card component for Urban News, PPP TV Digital Desk, Nairobi Podcast, Citizen TV Legacy
    - _Requirements: 8.5_
  - [x] 11.6 Create `src/app/broadcast/page.tsx` — CSS scan lines `::after`, "ON AIR" pulsing badge, NairobiClock, BroadcastPlayer, 4 ShowCards, career stats panel, philosophy lower-third quote; wire Nav
    - _Requirements: 8.1–8.7_

- [x] 12. Empire world (`/empire`)
  - [x] 12.1 Create `src/components/empire/MatrixRain.tsx` — `<canvas>` with `requestAnimationFrame` loop, cyan `#00D4FF` characters falling at random speeds; dynamically imported `ssr: false`
    - _Requirements: 9.1_
  - [x] 12.2 Create `src/components/empire/TerminalCard.tsx` — terminal window chrome (red/yellow/green dots), monospace content, `companyName`, `description`, `status`, `metrics` props
    - _Requirements: 9.4_
  - [x] 12.3 Create `src/components/empire/DashboardPanel.tsx` — live-styled static dashboard with platform coverage "ACTIVE — POSTING" indicators
    - _Requirements: 9.5, 9.6_
  - [x] 12.4 Create `src/app/empire/page.tsx` — MatrixRain background (dynamic), "THE PROPOST EMPIRE" heading with glitch animation, 3×3 TerminalCard grid, DashboardPanel, Auto News Station 3-step explainer, ProPost X section, terminal philosophy block; wire Nav
    - _Requirements: 9.1–9.9_

- [x] 13. Word world (`/memoir`)
  - [x] 13.1 Create `src/components/memoir/BookMockup.tsx` — CSS 3D transforms (`transform-style: preserve-3d`, `perspective: 1000px`), closed state `rotateY(-30deg)`, Framer Motion animate to open on click
    - _Requirements: 10.2, 10.3_
  - [x] 13.2 Create `src/components/memoir/PullQuoteCarousel.tsx` — rotating pull-quote carousel
    - _Requirements: 10.8_
  - [x] 13.3 Create `src/components/memoir/ThemeBadge.tsx` — ink stamp styled badge for "Survival", "Identity", "Ambition", "Heritage"
    - _Requirements: 10.5_
  - [x] 13.4 Create `src/app/memoir/page.tsx` — candlelight ambiance, paper texture background, ink smudge overlays, BookMockup, 3 memoir parts, 4 ThemeBadges, excerpt teaser, "ORDER THE MEMOIR" MagneticButton CTA, Roylandz brand origin quote, PullQuoteCarousel; wire Nav
    - _Requirements: 10.1–10.8_

- [x] 14. Movement world (`/movement`)
  - [x] 14.1 Create `src/components/movement/CountyMap.tsx` — SVG map of Kenya's 47 counties, GSAP ScrollTrigger animates county fills sequentially, hover tooltip with county name
    - _Requirements: 11.2_
  - [x] 14.2 Create `src/components/movement/TestimonialCard.tsx` — social proof testimonial card
    - _Requirements: 11.7_
  - [x] 14.3 Create `src/app/movement/page.tsx` — warm reds/amber tones, crowd silhouette imagery, Urban Tour section with CountyMap, Tushinde section, Nairobi Podcast section (team profiles, episode previews, platform links), community impact stats, Hannah Arendt quote, TestimonialCards; wire Nav
    - _Requirements: 11.1–11.7_

- [x] 15. Oracle world (`/future`)
  - [x] 15.1 Create `src/components/future/CountdownTimer.tsx` — `getCountdown(target, now)` pure function, `setInterval` every 1s, target `2027-01-01T00:00:00Z`
    - _Requirements: 12.5_
  - [ ]\* 15.2 Write property test for countdown timer
    - **Property 7: Countdown timer returns positive duration before 2027**
    - **Validates: Requirements 12.5**
  - [x] 15.3 Create `src/components/future/ClassifiedCard.tsx` — classified file card for `POLITICAL_DOMINANCE.txt`, `PAN_AFRICAN_MEDIA.txt`, `NSE_PORTFOLIO.txt`, `PROPOST_SCALE.txt`
    - _Requirements: 12.3_
  - [x] 15.4 Create `src/components/future/GlobeScene.tsx` — R3F `<Canvas>`, sphere with holographic GLSL shader, Kenya pin as `<Html>`, Drei `<Line>` connecting African city coordinates; dynamically imported `ssr: false`
    - _Requirements: 12.6_
  - [x] 15.5 Create `src/app/future/page.tsx` — holographic cyan grid lines, floating R3F shapes, scanline overlays, "TRANSMISSION FROM 2027" heading with cyan glow, 4 ClassifiedCards, animated vision statement reveal, CountdownTimer, GlobeScene (dynamic); wire Nav
    - _Requirements: 12.1–12.6_

- [x] 16. Archive world (`/archive`)
  - [x] 16.1 Create `src/components/archive/GalleryFilter.tsx` — filter tabs (all/tv/podcast/digital/events), `filterItems()` pure function, updates displayed items on tab select
    - _Requirements: 13.3, 13.4_
  - [ ]\* 16.2 Write property test for gallery filter
    - **Property 6: Gallery filter returns only matching items**
    - **Validates: Requirements 13.4**
  - [x] 16.3 Create `src/components/archive/VaultCard.tsx` — industrial vault-aesthetic card for press coverage
    - _Requirements: 13.1, 13.2_
  - [x] 16.4 Create `src/components/archive/StatsCounter.tsx` — Framer Motion `useInView` triggers counter animation from 0 to target for all 7 stats (2M+ viewers, 150+ agents, 10+ years, 3 shows, 47 counties, 1 memoir, 6 platforms)
    - _Requirements: 13.7, 13.8_
  - [x] 16.5 Create `src/app/archive/page.tsx` — industrial vault aesthetic, press VaultCards, GalleryFilter with portfolio items, achievements vault (framed certificate cards with hover animation), ProPost architecture diagram, StatsCounter panel; wire Nav
    - _Requirements: 13.1–13.8_

- [x] 17. Signal world (`/contact`)
  - [x] 17.1 Create `src/components/contact/RadioWave.tsx` — SVG `<circle>` elements with `animation: pulse` keyframes, gold `#D4A017`, 3 rings with staggered `animation-delay`
    - _Requirements: 14.1_
  - [x] 17.2 Create `src/components/contact/ContactForm.tsx` — fields (Name, Email, Purpose dropdown, Message), hidden honeypot `website` field (`tabIndex={-1}`, `aria-hidden`), client-side `validateContactForm()` on submit, calls `submitContact` server action, success animation on response, inline validation errors
    - _Requirements: 14.2–14.6, 15.1, 15.2_
  - [ ]\* 17.3 Write property tests for `validateContactForm`
    - **Property 9: Contact form rejects empty/whitespace required fields**
    - **Property 10: Contact form rejects invalid email formats**
    - **Validates: Requirements 15.1, 15.2**
  - [x] 17.4 Create `src/components/contact/SocialLinks.tsx` — links for LinkedIn, Twitter/X, Instagram, Facebook, TikTok, YouTube
    - _Requirements: 14.7_
  - [x] 17.5 Create `src/app/contact/page.tsx` — RadioWave, ContactForm, "TRANSMIT" button with red pulsing animation, SocialLinks, availability section with green blinking dot; wire Nav
    - _Requirements: 14.1–14.9_

- [ ] 18. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 19. Performance and image optimization
  - [x] 19.1 Audit all world pages: wrap Three.js scenes and heavy components in `dynamic(() => ..., { ssr: false })`, ensure GSAP is imported inside `useEffect` only, wrap all Three.js scenes in React `ErrorBoundary` with static image fallback
    - _Requirements: 1.4, 17.6_
  - [x] 19.2 Replace all `<img>` tags with `next/image`: add `priority` to LCP hero portrait, `loading="lazy"` to below-fold images, `placeholder="blur"` with `blurDataURL` for all images; update `next.config.ts` `remotePatterns` for Supabase hostname
    - _Requirements: 17.7_
  - [x] 19.3 Add `will-change: transform` only to actively animating elements; verify mobile Three.js scenes fall back to static images via `useMediaQuery`
    - _Requirements: 17.1–17.5_

- [ ] 20. Unit tests
  - [ ]\* 20.1 Write unit tests in `src/__tests__/unit/utils.test.ts` for `validateContactForm`, `sanitizeField`, `formatEmailBody`, `parseEmailBody` with specific valid/invalid examples
    - _Requirements: 15.1–15.3, 15.6, 15.7_
  - [ ]\* 20.2 Write unit tests in `src/__tests__/unit/animations.test.ts` for `computeParallaxOffset`, `getParticleCount`, `getCountdown` with specific date examples
    - _Requirements: 4.2–4.5, 12.5, 17.8_
  - [ ]\* 20.3 Write unit tests in `src/__tests__/unit/gallery.test.ts` for `filterItems` with specific category examples
    - _Requirements: 13.4_
  - [ ]\* 20.4 Write component unit tests in `src/__tests__/unit/components/ContactForm.test.tsx` (renders fields, shows errors, calls server action) and `GalleryFilter.test.tsx` (renders tabs, updates items)
    - _Requirements: 14.2, 13.3, 13.4_

- [x] 21. Sitemap, robots, and metadata
  - [x] 21.1 Update `src/app/sitemap.ts` to include all 9 world routes
    - _Requirements: 5.1_
  - [x] 21.2 Update `src/app/robots.ts` to allow all routes
    - _Requirements: 5.1_
  - [x] 21.3 Update root layout metadata (title, description, OG, Twitter) to reflect the Roylandz Universe brand
    - _Requirements: 20.3_

- [x] 22. Final checkpoint — Ensure all tests pass
  - Run `npx tsc --noEmit` to confirm zero TypeScript errors.
  - Run `vitest --run` to confirm all unit and property tests pass.
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness; unit tests validate specific examples
- All Three.js / R3F scenes must be dynamically imported with `ssr: false`
- GSAP must only be imported inside `useEffect` to avoid SSR bundle inclusion
- `supabaseAdmin` (service role key) must never be imported in client components
- Existing assets in `public/images/` are preserved and available for all worlds
