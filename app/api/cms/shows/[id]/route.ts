import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supaAdmin } from '@/lib/supabase';
import { verifyCmsAdmin } from '@/lib/cms-auth';

// PATCH  /api/cms/shows/:id  -> edit fields / publish / unpublish.
// DELETE /api/cms/shows/:id  -> delete.
// Same CMS_ADMIN_EMAILS-gated, service-role-write pattern as
// app/api/cms/blog/[id]/route.ts.

const EDITABLE = new Set([
  'name', 'tag', 'description', 'meta', 'image_url', 'cta_label', 'cta_href', 'is_flagship', 'sort_order', 'status',
]);

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifyCmsAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const { id } = await params;

  const body = await req.json().catch(() => ({}));
  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const [k, v] of Object.entries(body)) {
    if (!EDITABLE.has(k)) return NextResponse.json({ error: `unexpected_field:${k}` }, { status: 400 });
    patch[k] = v;
  }

  const { error } = await db.from('shows').update(patch).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath('/shows');
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifyCmsAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const { id } = await params;

  const { error } = await db.from('shows').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath('/shows');
  return NextResponse.json({ ok: true });
}
