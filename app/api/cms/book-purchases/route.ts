import { NextResponse } from 'next/server';
import { supaAdmin } from '@/lib/supabase';
import { verifyCmsAdmin } from '@/lib/cms-auth';

// GET /api/cms/book-purchases -> read-only list, newest first.
// `book_purchases` belongs to the live Paystack checkout flow
// (app/api/checkout, app/api/paystack-webhook) -- this route only ever
// reads it, never writes. No POST/PATCH/DELETE exported, deliberately.

export async function GET(req: Request) {
  if (!(await verifyCmsAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  if (!db) return NextResponse.json({ error: 'supabase_not_configured' }, { status: 503 });
  const { data, error } = await db
    .from('book_purchases')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1000);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ purchases: data });
}
