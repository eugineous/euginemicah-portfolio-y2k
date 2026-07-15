import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supaAdmin } from '@/lib/supabase';
import { verifyCmsAdmin } from '@/lib/cms-auth';

// GET  /api/cms/blog  -> list ALL posts (incl. drafts), newest first.
// POST /api/cms/blog  -> create a new post.
// Every call requires a Supabase user JWT whose email is on the
// CMS_ADMIN_EMAILS allowlist (env or cms_admin_emails table) -- see
// lib/cms-auth.ts. Writes go through supaAdmin() (service role), bypassing
// RLS after the allowlist check -- same pattern as the LinkedIn tool's
// /api/admin/posts.

export async function GET(req: Request) {
  if (!(await verifyCmsAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const { data, error } = await db.from('blog_posts').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ posts: data });
}

export async function POST(req: Request) {
  if (!(await verifyCmsAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const b = await req.json().catch(() => ({}));
  if (!b.slug || !b.title) return NextResponse.json({ error: 'slug_and_title_required' }, { status: 400 });

  const status = b.status === 'published' ? 'published' : 'draft';
  const row = {
    slug: String(b.slug).trim(),
    category: b.category || '',
    title: b.title,
    excerpt: b.excerpt || '',
    paragraphs: Array.isArray(b.paragraphs) ? b.paragraphs : [],
    tag_chips: Array.isArray(b.tag_chips) ? b.tag_chips : [],
    read_time: b.read_time || '',
    status,
    published_at: status === 'published' ? b.published_at || new Date().toISOString() : b.published_at || null,
  };
  const { data, error } = await db.from('blog_posts').insert(row).select('id').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath('/blog');
  if (status === 'published') revalidatePath(`/blog/${row.slug}`);
  return NextResponse.json({ ok: true, id: data.id });
}
