import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supaAdmin } from '@/lib/supabase';
import { verifyCmsAdmin } from '@/lib/cms-auth';

// GET  /api/cms/shows  -> list ALL shows (incl. drafts), by sort_order.
// POST /api/cms/shows  -> create a new show.
// Same CMS_ADMIN_EMAILS-gated, service-role-write pattern as
// app/api/cms/blog/route.ts.

export async function GET(req: Request) {
  if (!(await verifyCmsAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const { data, error } = await db.from('shows').select('*').order('sort_order', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ shows: data });
}

export async function POST(req: Request) {
  if (!(await verifyCmsAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const b = await req.json().catch(() => ({}));
  if (!b.name) return NextResponse.json({ error: 'name_required' }, { status: 400 });

  const row = {
    name: String(b.name).trim(),
    tag: b.tag || '',
    description: b.description || '',
    meta: b.meta || '',
    image_url: b.image_url || '',
    cta_label: b.cta_label || '',
    cta_href: b.cta_href || '',
    is_flagship: !!b.is_flagship,
    sort_order: Number.isFinite(b.sort_order) ? b.sort_order : 0,
    status: b.status === 'published' ? 'published' : 'draft',
  };
  const { data, error } = await db.from('shows').insert(row).select('id').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath('/shows');
  return NextResponse.json({ ok: true, id: data.id });
}
