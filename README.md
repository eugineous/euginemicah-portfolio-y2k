# Eugine Micah — The Official Estate

A premium vintage personal-brand website for **Eugine Micah** — Kenyan broadcast journalist, author, speaker, and curator of culture. Head of Digital at PPP TV. Founder of Roylandz Media. Co-founder of Urban Gang Tour.

> **Build it · Brand it · Believe it.**

---

## What this is

A seven-page static website built to read like a private maison — warm noir base, parchment cream, champagne gold, oxblood accents. Editorial typography (Bodoni Moda + EB Garamond), Roman-numeral chapters, gold rules, and slow cinematic reveals. The aesthetic reference is Don Julio's official site; the voice is funny-but-serious, never corporate, never filler.

No build step. No frameworks. Open `index.html` and the site runs.

---

## Pages

| File             | Chapter | Purpose                                                              |
|------------------|---------|----------------------------------------------------------------------|
| `index.html`     | Home    | Hero, four chairs, metrics, story teaser, selected work, memoir CTA  |
| `story.html`     | II      | Long-form magazine profile · drop caps · pull quotes · dossier       |
| `work.html`      | III     | The four chairs in detail · Urban News · Tour · Roylandz · Speaker   |
| `book.html`      | IV      | *Born Broke. Built Loud.* · 3D book mockup · chapters · prologue     |
| `press.html`     | V       | Press recognition list · press-kit request                           |
| `booking.html`   | VI      | Services · rates · inquiry form                                      |
| `contact.html`   | VII     | The line. Email, phone, socials.                                     |

Plus `404.html` for missing routes.

---

## Project structure

```
.
├── index.html
├── story.html
├── work.html
├── book.html
├── press.html
├── booking.html
├── contact.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── em.css                  ← design system + all page styles
│   ├── em.js                   ← masthead, reveal, back-to-top
│   ├── em-monogram.png         ← black EM crown
│   ├── em-wordmark.png         ← red crown + EUGINE MICAH wordmark
│   ├── em-graduation.jpg       ← milestone photograph
│   ├── em-portrait-suit.png    ← formal portrait
│   ├── em-headshot-circle.png  ← press headshot
│   ├── em-blue-knit.png        ← editorial portrait
│   ├── em-varsity-a / b.png    ← varsity portraits
│   ├── studio-*.jpeg           ← Urban News studio plates
│   └── logo-*.png              ← brand partner logos
└── docs/
    ├── BRAND.md                ← voice, type, color, photography
    ├── SITEMAP.md              ← page hierarchy
    ├── CONTENT.md              ← copy inventory & source citations
    └── DEPLOY.md               ← deployment instructions
```

---

## Deploy

This is a static site. Drop it on any static host.

- **Netlify / Vercel / Cloudflare Pages** — connect the repo, point the build at root, no build command needed. Publish directory is `.`
- **GitHub Pages** — enable Pages on the main branch, root folder.
- **Custom host (euginemicah.tech)** — upload contents of the repo root to `public_html/`. No server-side anything required.

See `docs/DEPLOY.md` for fuller notes.

---

## Local preview

```bash
# any tiny static server works
python3 -m http.server 8080
# then open http://localhost:8080
```

Or just double-click `index.html`.

---

## Editing content

All text lives inline in the HTML files. There is no CMS by design — the site is small, the voice is precise, and a CMS would dilute both.

When you need to update copy, follow the **voice and tone guide** in `docs/BRAND.md`. The most important rule: no em-dashes anywhere. Use commas, periods, or start a new sentence.

---

## Credits

- **Subject** — Eugine Micah · Nairobi, Kenya
- **Design system** — bespoke premium vintage editorial
- **Type** — Bodoni Moda, EB Garamond, Pinyon Script (Google Fonts)
- **Build** — handwritten static HTML/CSS/JS · zero dependencies

© MMXXVI Eugine Micah. All rights reserved.
