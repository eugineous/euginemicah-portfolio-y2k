import { NextResponse } from 'next/server';
import { supaAdmin } from '@/lib/supabase';
import { verifyCmsAdmin } from '@/lib/cms-auth';

// GET   /api/cms/messages          -> list all messages, newest first.
// PATCH /api/cms/messages {id, status} -> update status only
//   (new/read/replied/archived).
// Reads/writes the `messages` table, which a parallel public-facing
// /messages page + its own POST /api/messages route also write to (separate
// path, no file conflict -- see supabase/migrations/002_site_rebuild.sql for
// the shared schema). This route never writes body/name/email/etc., only
// status, to avoid stepping on that surface.

export async function GET(req: Request) {
  if (!(await verifyCmsAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const { data, error } = await db.from('messages').select('*').order('created_at', { ascending: false }).limit(500);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ messages: data });
}

const ALLOWED_STATUS = new Set(['new', 'read', 'replied', 'archived']);

export async function PATCH(req: Request) {
  if (!(await verifyCmsAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const body = await req.json().catch(() => ({}));
  const { id, status } = body;
  if (!id) return NextResponse.json({ error: 'missing_id' }, { status: 400 });
  if (!ALLOWED_STATUS.has(status)) return NextResponse.json({ error: 'invalid_status' }, { status: 400 });

  const { error } = await db.from('messages').update({ status }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
