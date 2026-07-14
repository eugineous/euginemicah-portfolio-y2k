import { NextResponse } from 'next/server';
import { pingIndexNow } from '@/lib/indexnow';
import sitemap from '@/app/sitemap';

export const maxDuration = 30;

// Vercel Cron hits this daily (see vercel.json). Content here changes via
// deploys, not a live admin CMS (unlike UGT's DB-backed events/products), so
// there's no single mutation point to hook a ping into — instead this
// re-pings the whole sitemap once a day, which is cheap and idempotent.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const entries = await sitemap();
  const paths = entries.map((e) => new URL(String(e.url)).pathname || '/');
  await pingIndexNow(paths);
  return NextResponse.json({ ok: true, pinged: paths.length, at: new Date().toISOString() });
}
