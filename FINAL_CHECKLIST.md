# FINAL CHECKLIST — the only manual steps

Everything else is built, seeded, and **live in production** at euginemicah.tech.
Your admin login: **euginemicah@gmail.com** — password is in the message where
this was handed to you (also never committed to the repo). Change it after
your first login (Supabase → Authentication → Users → your user → reset).

## ✅ Already done for you
- Supabase project `euginemicah-tech` created, schema + RLS applied, 116-post
  90-day calendar seeded, admin auth user created.
- All Supabase + site env vars set in Vercel (production/preview/dev).
- Code merged to `main` and deployed — **euginemicah.tech/admin** is live now.
- LinkedIn's official "Download my data" (full archive, includes Shares/
  Comments/Reactions) was requested from your LinkedIn account. It'll land
  under LinkedIn → Settings & Privacy → Data privacy → your archive is ready
  to download from there (LinkedIn does not always email a link — check the
  same page you requested it from).

## ⚠️ Security note — read this first
The CV file I was given listed `micaheugine603@gmail.com` as your contact
email, and I initially used it as the ADMIN_EMAIL / admin login. You told me
that account was hacked and abandoned — **I've already fixed this**: deleted
that admin user, created a fresh one on `euginemicah@gmail.com` (your LinkedIn
account's live email), and updated `ADMIN_EMAIL` in Vercel + `.env.example`.
Nothing in the deployed app now references the old address. If that CV or
any other public-facing page/document still lists the hacked email, replace
it — that's outside what I touched.

## 1. LinkedIn developer app — 2 manual clicks (~2 min)
I filled in everything I could: app name "EM Control Room", linked to your
existing "Eugine Micah" LinkedIn Page. Two things need your hands because
they need a real file picker / your judgment, which I can't drive blindly:
1. developer.linkedin.com → **My apps** → the app I started (or start fresh
   with **Create app** if it didn't save) → upload a square logo (100px+;
   `assets/em-monogram.png` from this repo works) → tick "I agree to the API
   Terms of Use" → **Create app**.
2. App → **Auth** tab → add Authorized redirect URL:
   `https://euginemicah.tech/api/linkedin/callback`
3. App → **Products** tab → request **"Share on LinkedIn"** and **"Sign In
   with LinkedIn using OpenID Connect"** (both instant-approve, no review wait).
4. Auth tab → copy **Client ID** and **Client Secret** → Vercel → Project
   Settings → Environment Variables → `LINKEDIN_CLIENT_ID`,
   `LINKEDIN_CLIENT_SECRET` → Redeploy.
5. euginemicah.tech/admin → **Connect LinkedIn** → approve.

*(Optional, LinkedIn didn't require it to create the app: a Privacy Policy
URL. Your site doesn't have one yet — worth adding at some point, not
blocking.)*

## 2. Cloudflare Worker for the 15-minute auto-poster (~3 min)
Vercel's Hobby plan only allows daily cron jobs, so the every-15-minutes
schedule lives in a Cloudflare Worker instead (code is ready in
`cloudflare/poster-cron/`). From that folder:
```
npx wrangler login
npx wrangler secret put CRON_SECRET     # paste the same value as Vercel's CRON_SECRET env var
npx wrangler deploy
```
That's it — the Worker pings `/api/cron/post-due` every 15 min, which does
the actual publishing. Until this is deployed, use the **Post now** button
in /admin to publish anything manually.

## 3. LinkedIn data export → real audit (~2 min once the archive is ready)
1. Go back to LinkedIn → Settings & Privacy → Data privacy → Download my
   data, and download the ZIP once it's ready (usually within 24h).
2. Drop it into `./linkedin-export/` in this repo (gitignored — never committed).
3. Run `npm run analyze-linkedin`, commit `reports/` + rerun
   `npm run generate-calendar` to retune the 90-day plan with your real
   posting history, then push. The report appears at
   **euginemicah.tech/admin/linkedin-audit**.

## 4. First week of operation (~10 min)
1. /admin → 90-Day Calendar → read the first 7 drafts → edit anything that
   doesn't sound like you → **Approve**.
2. After each post goes live, open it in the editor and log
   impressions/reactions/comments (LinkedIn's API doesn't expose personal
   analytics) — the Performance tab charts pillars from these numbers, and
   every 14th calendar entry is a review checkpoint telling you what to
   kill/scale.
