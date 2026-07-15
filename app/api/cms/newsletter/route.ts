import { NextResponse } from 'next/server';
import { supaAdmin } from '@/lib/supabase';
import { verifyCmsAdmin } from '@/lib/cms-auth';

// GET /api/cms/newsletter -> read-only list of subscribers, newest first.
// No page writes to `newsletter_subscribers` yet (signup isn't built --
// out of scope for this phase per the rebuild plan), so this will show
// "no subscribers yet" until that ships. Read-only, no POST/PATCH/DELETE.

export async function GET(req: Request) {
  if (!(await verifyCmsAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const { data, error } = await db
    .from('newsletter_subscribers')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1000);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ subscribers: data });
}
