import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supaAdmin } from '@/lib/supabase';
import { verifyCmsAdmin } from '@/lib/cms-auth';

// PATCH  /api/cms/blog/:id  -> edit fields / publish / unpublish.
// DELETE /api/cms/blog/:id  -> delete.
// Same CMS_ADMIN_EMAILS-gated, service-role-write pattern as
// app/api/cms/blog/route.ts.

const EDITABLE = new Set([
  'slug', 'category', 'title', 'excerpt', 'paragraphs', 'tag_chips', 'read_time', 'status', 'published_at',
]);

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifyCmsAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const { id } = await params;

  const { data: existing } = await db.from('blog_posts').select('slug').eq('id', id).maybeSingle();

  const body = await req.json().catch(() => ({}));
  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const [k, v] of Object.entries(body)) {
    if (!EDITABLE.has(k)) return NextResponse.json({ error: `unexpected_field:${k}` }, { status: 400 });
    patch[k] = v;
  }
  // Publishing for the first time with no explicit published_at -> stamp now.
  if (patch.status === 'published' && !('published_at' in patch)) {
    patch.published_at = new Date().toISOString();
  }

  const { data, error } = await db.from('blog_posts').update(patch).eq('id', id).select('slug').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath('/blog');
  revalidatePath(`/blog/${data.slug}`);
  if (existing?.slug && existing.slug !== data.slug) revalidatePath(`/blog/${existing.slug}`);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifyCmsAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const { id } = await params;

  const { data: existing } = await db.from('blog_posts').select('slug').eq('id', id).maybeSingle();
  const { error } = await db.from('blog_posts').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath('/blog');
  if (existing?.slug) revalidatePath(`/blog/${existing.slug}`);
  return NextResponse.json({ ok: true });
}
