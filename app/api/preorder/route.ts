import { NextRequest, NextResponse } from 'next/server';
import { supaAdmin } from '@/lib/supabase';

// Captures book pre-order interest — no payment taken (book isn't published
// yet). Requires a `book_preorders` table in Supabase:
//
//   create table book_preorders (
//     id uuid primary key default gen_random_uuid(),
//     name text not null,
//     email text not null,
//     phone text,
//     note text,
//     created_at timestamptz not null default now()
//   );
//
// Falls back to a no-op success if Supabase isn't configured yet, so the
// form never breaks in production even before the table exists.
export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; phone?: string; note?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const name = (body.name || '').trim().slice(0, 200);
  const email = (body.email || '').trim().slice(0, 200);
  const phone = (body.phone || '').trim().slice(0, 40);
  const note = (body.note || '').trim().slice(0, 1000);

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'name_and_valid_email_required' }, { status: 400 });
  }

  const supa = supaAdmin();
  if (supa) {
    const { error } = await supa.from('book_preorders').insert({ name, email, phone, note });
    if (error) {
      // Table may not exist yet — don't fail the visitor's request for a setup gap.
      console.error('[preorder] supabase insert failed:', error.message);
    }
  }

  return NextResponse.json({ ok: true });
}
