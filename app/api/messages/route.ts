import { NextRequest, NextResponse } from 'next/server';
import { supaAdmin } from '@/lib/supabase';

// Real backend for /messages (and, by extension, any future caller that
// wants to write into the same `messages` table — e.g. a /privacy
// deletion-request flow, which is why `deletion_request` stays a valid
// `source` here even though no UI on /messages triggers it today).
//
// RLS on `messages` (see supabase/migrations/002_site_rebuild.sql) is
// deny-all for anon/authenticated — there is deliberately no public insert
// policy. A client-side Supabase insert with the anon key would be blocked;
// this route uses supaAdmin() (service-role, bypasses RLS) to insert
// server-side instead. That is the whole reason this route exists.

const VALID_SOURCES = ['contact', 'booking', 'roylandz', 'deletion_request'] as const;
type Source = (typeof VALID_SOURCES)[number];

function isValidSource(value: unknown): value is Source {
  return typeof value === 'string' && (VALID_SOURCES as readonly string[]).includes(value);
}

// Best-effort in-memory rate limit: 5 requests / 10 minutes per IP. This
// codebase has no shared rate-limit utility to reuse, and Redis/an external
// store is overkill for a low-traffic lead-capture form — resetting on
// redeploy/serverless cold start is an acceptable tradeoff for this scope.
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

type MessagePayload = {
  source?: string;
  name?: string;
  email?: string;
  phone?: string;
  body?: string;
  meta?: Record<string, unknown>;
  // Honeypot — a hidden field real visitors never fill in. Populated only
  // by bots that blindly fill every form field. Silently accepted (200 OK,
  // no insert) rather than a 4xx so the bot doesn't learn to adapt.
  hp_field?: string;
};

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let payload: MessagePayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  if ((payload.hp_field || '').trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = (payload.name || '').trim().slice(0, 200);
  const email = (payload.email || '').trim().slice(0, 200);
  const phone = (payload.phone || '').trim().slice(0, 40);
  const body = (payload.body || '').trim().slice(0, 4000);
  const source: Source = isValidSource(payload.source) ? payload.source : 'contact';
  const meta = payload.meta && typeof payload.meta === 'object' && !Array.isArray(payload.meta) ? payload.meta : {};

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !body) {
    return NextResponse.json({ error: 'name_email_and_message_required' }, { status: 400 });
  }

  const supa = supaAdmin();
  if (!supa) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const { error } = await supa.from('messages').insert({
    source,
    name,
    email,
    phone,
    body,
    meta,
  });

  if (error) {
    console.error('[api/messages] supabase insert failed:', error.message);
    return NextResponse.json({ error: 'insert_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
