import { NextRequest, NextResponse } from 'next/server';
import { supaAdmin } from '@/lib/supabase';

// Real backend for the newsletter signup box on /blog (and /book, same
// pattern). RLS on `newsletter_subscribers` (see
// supabase/migrations/002_site_rebuild.sql) is deny-all for
// anon/authenticated -- there is deliberately no public insert policy, so
// this route uses supaAdmin() (service-role, bypasses RLS) to insert
// server-side, same reasoning as app/api/messages/route.ts.

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

type NewsletterPayload = {
  email?: string;
  source?: string;
  hp_field?: string;
};

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let payload: NewsletterPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  if ((payload.hp_field || '').trim()) {
    return NextResponse.json({ ok: true });
  }

  const email = (payload.email || '').trim().slice(0, 200).toLowerCase();
  const source = payload.source === 'book' ? 'book' : 'blog';

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'valid_email_required' }, { status: 400 });
  }

  const supa = supaAdmin();
  if (!supa) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const { error } = await supa.from('newsletter_subscribers').upsert({ email, source }, { onConflict: 'email' });

  if (error) {
    console.error('[api/newsletter] supabase insert failed:', error.message);
    return NextResponse.json({ error: 'insert_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
