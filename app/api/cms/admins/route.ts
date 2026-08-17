import { NextResponse } from 'next/server';
import { supaAdmin } from '@/lib/supabase';
import { verifyCmsAdmin } from '@/lib/cms-auth';

// GET    /api/cms/admins        -> list the DB-side allowlist (cms_admin_emails).
// POST   /api/cms/admins        -> add an email.
// DELETE /api/cms/admins?email= -> remove an email.
//
// This only manages the DB table half of the allowlist -- see
// lib/cms-auth.ts's verifyCmsAdmin(): access is CMS_ADMIN_EMAILS (env)
// UNIONED WITH this table. Emails set via the env var don't show up here
// and can't be removed from this UI -- that's intentional, so this page
// can never accidentally lock out the one email guaranteed to always work.

export async function GET(req: Request) {
  if (!(await verifyCmsAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const { data, error } = await db.from('cms_admin_emails').select('*').order('added_at', { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ admins: data });
}

export async function POST(req: Request) {
  if (!(await verifyCmsAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const b = await req.json().catch(() => ({}));
  const email = String(b.email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'valid_email_required' }, { status: 400 });

  const { error } = await db.from('cms_admin_emails').insert({ email });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  if (!(await verifyCmsAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const email = new URL(req.url).searchParams.get('email')?.trim().toLowerCase();
  if (!email) return NextResponse.json({ error: 'email_required' }, { status: 400 });

  const { error } = await db.from('cms_admin_emails').delete().eq('email', email);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
