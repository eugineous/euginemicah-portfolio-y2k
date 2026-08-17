import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supaAdmin } from '@/lib/supabase';
import { verifyCmsAdmin } from '@/lib/cms-auth';

// GET  /api/cms/now  -> list ALL now_items (incl. drafts), by sort_order.
// POST /api/cms/now  -> create a new item.
// Same CMS_ADMIN_EMAILS-gated, service-role-write pattern as
// app/api/cms/shows/route.ts.

export async function GET(req: Request) {
  if (!(await verifyCmsAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const { data, error } = await db.from('now_items').select('*').order('sort_order', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data });
}

export async function POST(req: Request) {
  if (!(await verifyCmsAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const b = await req.json().catch(() => ({}));
  if (!b.label) return NextResponse.json({ error: 'label_required' }, { status: 400 });

  const row = {
    label: String(b.label).trim(),
    text: b.text || '',
    sort_order: Number.isFinite(b.sort_order) ? b.sort_order : 0,
    status: b.status === 'published' ? 'published' : 'draft',
  };
  const { data, error } = await db.from('now_items').insert(row).select('id').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath('/now');
  return NextResponse.json({ ok: true, id: data.id });
}
