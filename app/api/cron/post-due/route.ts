import { NextResponse } from 'next/server';
import { postDue } from '@/lib/poster';

export const maxDuration = 60;

// Vercel Cron hits this every 15 minutes (see vercel.json). Vercel sends
// `Authorization: Bearer ${CRON_SECRET}` automatically when CRON_SECRET is set.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const result = await postDue();
  if (result.failed > 0) console.error('[cron] failures this tick:', result);
  return NextResponse.json({ ok: true, ...result, at: new Date().toISOString() });
}
