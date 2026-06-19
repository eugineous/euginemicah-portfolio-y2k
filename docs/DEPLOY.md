# DEPLOY

The site is fully static. No build step. No server runtime. Drop and serve.

---

## Option 1 — Netlify (recommended)

1. Push the project to a Git repo (GitHub / GitLab).
2. On Netlify: **Add new site → Import from Git**.
3. Build command: *(leave empty)*
4. Publish directory: `.`
5. Deploy. Add the custom domain in **Site settings → Domains**.

DNS — at your registrar, set:
- `A` record: `@` → Netlify load balancer IP
- `CNAME`: `www` → `<site>.netlify.app`

---

## Option 2 — Vercel

1. **Import Project** → select repo.
2. Framework preset: **Other**. No build command. Output directory: `.`
3. Deploy.

---

## Option 3 — Cloudflare Pages

1. Pages → **Create project** → connect Git.
2. Build command: *(leave empty)*
3. Build output directory: `/`
4. Deploy.

---

## Option 4 — Existing host (euginemicah.tech / cPanel / shared hosting)

1. SFTP or File Manager into your host's `public_html/`.
2. Upload everything *inside* the repo root — keep folder structure.
3. Visit your domain. Done.

---

## Domain notes

- The site links to **euginemicah.tech** as the canonical home.
- If using a different domain, update:
  - `<meta property="og:url">` in each HTML head
  - `sitemap.xml` (replace the example domain with the real one)
  - any absolute social URLs in the footer (currently relative-style)

---

## SEO checklist before launch

- [ ] Activate forms: submit any form once, then click the FormSubmit activation link sent to eugine.micah@outlook.com (one time only)
- [ ] Shop checkout: create a Paystack account, paste the `pk_live_...` key into `assets/em-systems.js` (until then, orders fall back to reserve-by-email)
- [ ] Verify the site in **Google Search Console**, submit `sitemap.xml`
- [ ] Set Open Graph image — `og:image` per page if you want different thumbnails
- [ ] Test on real device · mobile · desktop · slow connection
- [ ] Run Lighthouse — target 95+ on every category

---

## Performance budget

- HTML per page: 8–14 KB
- CSS (shared): 45 KB
- JS (shared): 2 KB
- Fonts (Google Fonts CDN): ~80 KB
- Images: optimise before upload — target < 250 KB per photo, < 100 KB for studio plates

Run images through TinyPNG / Squoosh before adding to `assets/`. JPEG quality 80, PNG palette-reduce where possible.

---

## After launch

- Monitor traffic in **Google Analytics 4** or **Plausible**
- Watch the Search Console for indexing errors
- Refresh press list and recent work quarterly
- Bump `MMXXVI` to `MMXXVII` etc. in masthead + footer at year change

---

© MMXXVI Eugine Micah.
