# euginemicah.tech

Eugine Micah's personal-brand website — Kenyan broadcast journalist, author, speaker, and Head of Digital at PPP TV. The site covers his profile, work, shows, blog, and a real e-commerce checkout for his memoir, *Born Broke, Built Loud*.

Live at **[euginemicah.tech](https://euginemicah.tech)**.

---

## Tech stack

- **[Next.js 15](https://nextjs.org/)** (App Router) + **React 19** + **TypeScript**
- **[Tailwind CSS 4](https://tailwindcss.com/)**
- **[Supabase](https://supabase.com/)** — Postgres database, auth, and storage (blog posts, shows, "now" updates, book purchases, LinkedIn tokens)
- **[Paystack](https://paystack.com/)** — real checkout for the memoir (`app/api/checkout`, `app/api/paystack-webhook`, `app/api/book-download`)
- **[pdf-lib](https://pdf-lib.js.org/)** — server-side PDF handling for the book download flow
- Deployed on **[Vercel](https://vercel.com/)**, with a Vercel Cron job hitting `/api/cron/reindex` daily and a separate poster-cron piece under `cloudflare/poster-cron`

## Project structure

```
app/
  (site)/            Public marketing routes: profile, work, shows, blog, book,
                      press, messages, now, ideas, roylandz, work-with-eugine, etc.
  admin/              Pre-existing LinkedIn tool (linkedin-audit) — separate surface
  control-room/       Site CMS / content control room
  api/
    checkout/         Creates a Paystack transaction for the book
    paystack-webhook/ Verifies and processes charge.success events
    book-download/    Issues signed download links after a verified purchase
    cms/               Content endpoints backing the control room
    cron/              Vercel Cron handlers (reindex, post-due)
    linkedin/          LinkedIn integration endpoints
    media-kit/         Press kit generation
    messages/          Contact/enquiry form handling
    newsletter/        Newsletter signup
    admin/             Admin-only API routes
  feed.xml            Blog RSS feed
lib/                  Supabase clients, blog/shows/now data access, LinkedIn helpers,
                      IndexNow submission, CMS auth
supabase/
  migrations/          Schema migrations (run in order against the Supabase project)
  seed.sql             Sample/seed content
cloudflare/
  poster-cron/          Cloudflare Worker piece for scheduled social posting
scripts/
  analyze-linkedin.mjs   `npm run analyze-linkedin`
  generate-calendar.mjs  `npm run generate-calendar`
docs/                  Brand voice guide, content inventory, deploy notes, sitemap
```

## Running locally

Requirements: Node 20+ and npm.

```bash
npm install
cp .env.example .env.local   # fill in real values, see below
npm run dev
```

The dev server runs at `http://localhost:3000`.

### Environment variables

Copy `.env.example` to `.env.local` and fill in real values. At minimum for local development you'll want a Supabase project (URL + anon key). The rest — Paystack keys, the LinkedIn app, `CRON_SECRET` — are only needed to exercise those specific flows (checkout, the LinkedIn admin tool, cron endpoints).

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase client config |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only Supabase access (never exposed to the client) |
| `ADMIN_EMAIL` | Sole email allowed into `/admin` |
| `CMS_ADMIN_EMAILS` | Comma-separated emails allowed into `/control-room` |
| `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET` | LinkedIn developer app credentials |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, used in metadata/redirects |
| `CRON_SECRET` | Shared secret Vercel Cron sends to `/api/cron/*` |
| `PAYSTACK_SECRET_KEY` | Live secret key for the book checkout |

### Database

Apply the migrations in `supabase/migrations/` in order (via the Supabase SQL editor, CLI, or MCP) against your Supabase project, then optionally load `supabase/seed.sql` for sample content.

## Scripts

```bash
npm run dev               # start the Next.js dev server
npm run build              # production build
npm run start               # run the production build
npm run analyze-linkedin    # scripts/analyze-linkedin.mjs
npm run generate-calendar   # scripts/generate-calendar.mjs
```

## Deploying

The project is deployed on **Vercel** (`vercel.json` sets security headers and the daily cron). Connect the repo, set the environment variables above in the Vercel project settings, and deploy — no custom build command needed, framework preset is Next.js.

Before the book checkout goes fully live, three things need owner action: `PAYSTACK_SECRET_KEY` set in Vercel, the `charge.success` webhook registered in the Paystack dashboard pointing at `/api/paystack-webhook`, and the manuscript PDF uploaded to a private Supabase Storage bucket. See `docs/DEPLOY.md` for fuller notes (some content there predates the Next.js rebuild and should be read alongside this README).

## Docs

- `docs/BRAND.md` — voice, type, color, photography guidelines
- `docs/CONTENT.md` — copy inventory and source citations
- `docs/SITEMAP.md` — page hierarchy
- `docs/FACTS.md` — factual reference notes
- `docs/DEPLOY.md` — deployment notes (partially predates the current Next.js stack)

## License

MIT, see `LICENSE`. Note that the site's written content (memoir text, blog posts, personal photography) belongs to Eugine Micah and is not covered by the code license.

© Eugine Micah.
