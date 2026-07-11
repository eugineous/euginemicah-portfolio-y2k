// Cloudflare Worker — Cron Trigger every 15 minutes.
// Vercel Hobby only allows daily cron jobs, so the actual 15-min scheduling
// lives here instead: this Worker just pings the Next.js API route, which
// does the real work (pull due approved posts, publish via LinkedIn API).
export default {
  async scheduled(event, env, ctx) {
    const res = await fetch(`${env.SITE_URL}/api/cron/post-due`, {
      headers: { Authorization: `Bearer ${env.CRON_SECRET}` },
    });
    const body = await res.text();
    console.log(`[poster-cron] ${res.status} ${body.slice(0, 300)}`);
    if (!res.ok) throw new Error(`post-due returned ${res.status}`);
  },

  // Manual trigger for testing: GET this Worker's URL directly.
  async fetch(req, env, ctx) {
    const res = await fetch(`${env.SITE_URL}/api/cron/post-due`, {
      headers: { Authorization: `Bearer ${env.CRON_SECRET}` },
    });
    return new Response(await res.text(), { status: res.status });
  },
};
