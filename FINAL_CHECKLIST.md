# FINAL CHECKLIST — the only manual steps

Everything else is built, seeded and deployed. These four need your hands.

## 1. Supabase (once, ~5 min)
1. supabase.com → your project (or **New project**, free tier).
2. **SQL Editor** → paste `supabase/migrations/001_init.sql` → Run.
3. **SQL Editor** → paste `supabase/seed.sql` → Run (loads the full 90-day calendar, 100+ drafts).
4. **Authentication → Users → Add user** → email `micaheugine603@gmail.com` + a strong password (this is your /admin login).
5. **Project Settings → API** → copy 3 values into Vercel → Project → Settings → Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - also add `ADMIN_EMAIL=micaheugine603@gmail.com`, `NEXT_PUBLIC_SITE_URL=https://euginemicah.tech`, and `CRON_SECRET=` any long random string.
6. Vercel → Deployments → ⋯ → Redeploy. Log in at **euginemicah.tech/admin**.

## 2. LinkedIn developer app (once, ~5 min)
1. developer.linkedin.com → **Create app** → name "EM Control Room", associate your LinkedIn page (create a free company page if asked), submit.
2. App → **Auth** tab → add Authorized redirect URL: `https://euginemicah.tech/api/linkedin/callback`
3. App → **Products** tab → request **"Share on LinkedIn"** and **"Sign In with LinkedIn using OpenID Connect"** (both instant-approve).
4. Auth tab → copy **Client ID** and **Client Secret** → Vercel env vars `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET` → Redeploy.
5. euginemicah.tech/admin → click **Connect LinkedIn** → approve. Done — the 15-min cron now auto-posts anything you approve.

## 3. LinkedIn data export (for the audit, ~2 min + LinkedIn's wait)
1. LinkedIn → **Settings & Privacy → Data privacy → Get a copy of your data** → select the full archive → Request.
2. When the email arrives, download the ZIP and drop it into `./linkedin-export/` in this repo.
3. Run `npm run analyze-linkedin`, then commit + push. The full report appears at **euginemicah.tech/admin/linkedin-audit** (top/bottom 20, decay flags, 10 mistakes, 10 double-downs), and you can rerun `npm run generate-calendar` to retune the 90 days with real data.

## 4. First week of operation (~10 min)
1. /admin → Calendar → read the first 7 drafts → edit anything that doesn't sound like you → **Approve**.
2. After each goes live, open the post on LinkedIn, then log impressions/reactions/comments in the editor — the Performance tab charts pillars from these numbers, and the Day-14 review entry tells you what to kill/scale.
