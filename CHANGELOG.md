# CHANGELOG

## v1.3.1 — MMXXVI · Face-first crops

- All people-photo crops were centring on torsos and cutting faces off. em.css now biases every cover crop toward where faces live: page heroes anchor to the top of the photo; work tiles, gallery tiles, feed tiles, feature shots, reels and avatars anchor at 20–25% from the top. Verified on Story, Press and Dates heroes.

## v1.3.0 — MMXXVI · The deep audit

**User-facing fixes**
- Footer "Connect" had two YouTube links on every page (one was the old WhatsApp slot) → second is now TikTok.
- Dates: past events were stuck under "Upcoming" → em.js now auto-marks any [data-cal] date before today as past, swaps its CTA to "Past", and sinks it to the bottom of its list.
- Dates: Koinange Girls listed as Nairobi → Kiambu; TIBS valedictorian address listed as Nairobi → Thika; dead "Listen" (#) link → YouTube channel.
- Book page had no h1 → hero headline is now the h1 (CSS updated to match).

**Developer/SEO fixes**
- sitemap.xml was missing dates.html → added.
- index.html: JSON-LD Person structured data added (no phone, per privacy rules).
- All pages: canonical link, theme-color, apple-touch-icon, and a noscript fallback so reveal-animated content is visible without JS.
- 404.html: noindex.
- Hero images: loading="lazy" removed from the LCP page-hero image, fetchpriority="high" added.
- em.css: prefers-reduced-motion support — reveal animations and smooth scroll disabled for users who ask for less motion.

## v1.2.0 — MMXXVI · The full record

- Story: new "The Full Record" section (#record) — all 16 CV roles 2020–2026 with dates, detail and locations, extracted from Eugine_Micah_CV.docx.
- Story: new "The Builds" section (#builds) — Auto News Station, ProPost, Tawala, PPP TV newsroom site — plus full skills chips (broadcast / digital / AI & code / business).
- Story dossier: education in full (Mahemas → Murgusi KCSE → TIBS), certifications, awards, publications, full languages incl. Luhya and Sheng.

## v1.1.0 — MMXXVI · The data drop

- Phone number scrubbed site-wide (visible cells, wa.me links, tel: links, JS action bar, config). WhatsApp footer links → YouTube; mobile chat action → email. No financial details on site per Eugine's privacy instructions.
- Urban News reach corrected everywhere to 2M+ weekly (was inconsistently 3M daily).
- Work: new Twende Tusaidie section (#twende) — charity show, Saturdays 10PM on PPP TV · NTV · KBC. Roylandz copy now covers the AI/autonomous publishing systems. UGT copy now names the 2026 Kiambu schools tour + "from potential to purpose".
- Story dossier: new "Where did he train?" entry (Mahemas Primary → Murgusi SDA → TIBS valedictorian → Citizen TV).
- docs/FACTS.md added — single source of truth extracted from Eugine's data export, incl. privacy rules.

## v1.0.0 — MMXXVI · Launch

- Initial release. Seven pages. Don Julio-inspired premium vintage aesthetic.
- Bodoni Moda + EB Garamond editorial type system.
- Warm noir / champagne gold / oxblood / parchment colour palette.
- Studio photography from the Urban News set. Formal portrait. Graduation milestone.
- Back link and back-to-top across all subpages.
- 404 page · sitemap · robots · supporting docs.
