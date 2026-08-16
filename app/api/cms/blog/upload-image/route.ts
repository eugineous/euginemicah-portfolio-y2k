import { NextResponse } from 'next/server';
import { supaAdmin } from '@/lib/supabase';
import { verifyCmsAdmin } from '@/lib/cms-auth';

// POST /api/cms/blog/upload-image -> uploads a blog hero image to the
// public 'blog-images' Storage bucket (see supabase/migrations/
// 004_blog_seo_and_hero_image.sql), returns its public URL. Same
// CMS_ADMIN_EMAILS-gated, service-role pattern as the rest of
// app/api/cms/blog/** -- the bucket is publicly *readable* (images need to
// render on /blog and /news) but only ever written to from here, behind
// the admin allowlist.

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

export async function POST(req: Request) {
  if (!(await verifyCmsAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });

  const form = await req.formData().catch(() => null);
  const file = form?.get('file');
  if (!file || !(file instanceof File)) return NextResponse.json({ error: 'file_required' }, { status: 400 });
  if (!ALLOWED_TYPES.has(file.type)) return NextResponse.json({ error: 'unsupported_file_type' }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ error: 'file_too_large' }, { status: 400 });

  const ext = file.type.split('/')[1];
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await db.storage.from('blog-images').upload(path, file, {
    contentType: file.type,
    cacheControl: '31536000',
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 502 });

  const { data } = db.storage.from('blog-images').getPublicUrl(path);
  return NextResponse.json({ ok: true, url: data.publicUrl });
}
