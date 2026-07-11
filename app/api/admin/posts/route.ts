import { NextResponse } from 'next/server';
import { supaAdmin, verifyAdmin } from '@/lib/supabase';

// GET  /api/admin/posts?from=&to=        -> list (default: next 120 days + past 30)
// PATCH /api/admin/posts {id, ...fields} -> edit/approve/reschedule/log performance
// POST /api/admin/posts {…}              -> create a new entry
// All calls require a Supabase user JWT whose email === ADMIN_EMAIL.

export async function GET(req: Request) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const { data, error } = await db.from('posts').select('*').order('scheduled_at', { ascending: true }).limit(500);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data });
}

const EDITABLE = new Set(['scheduled_at', 'pillar', 'series', 'format', 'hook', 'body', 'cta', 'repurpose', 'status', 'performance']);

export async function PATCH(req: Request) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const body = await req.json().catch(() => ({}));
  const { id, ...rest } = body;
  if (!id) return NextResponse.json({ error: 'missing_id' }, { status: 400 });
  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const [k, v] of Object.entries(rest)) {
    if (!EDITABLE.has(k)) return NextResponse.json({ error: `unexpected_field:${k}` }, { status: 400 });
    patch[k] = v;
  }
  const { error } = await db.from('posts').update(patch).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const b = await req.json().catch(() => ({}));
  const row = {
    scheduled_at: b.scheduled_at || new Date(Date.now() + 86400_000).toISOString(),
    pillar: b.pillar || 'book',
    series: b.series || '',
    format: b.format || 'text',
    hook: b.hook || 'New hook…',
    body: b.body || '',
    cta: b.cta || '',
    repurpose: b.repurpose || '',
    status: 'draft',
  };
  const { data, error } = await db.from('posts').insert(row).select('id').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, id: data.id });
}
