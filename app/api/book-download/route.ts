import { NextRequest, NextResponse } from 'next/server';
import { supaAdmin } from '@/lib/supabase';

// Issues a fresh, short-lived signed download URL only for a reference the
// webhook already marked paid. Generated on demand (not stored) so it never
// goes stale between purchase and the buyer clicking download.
const BOOK_STORAGE_PATH = 'born-broke-built-loud.pdf';
const BUCKET = 'books';

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get('reference') || '';
  if (!reference) return NextResponse.json({ error: 'reference_required' }, { status: 400 });

  const supa = supaAdmin();
  if (!supa) return NextResponse.json({ error: 'not_configured' }, { status: 503 });

  const { data: purchase, error } = await supa
    .from('book_purchases')
    .select('status')
    .eq('reference', reference)
    .maybeSingle();

  if (error || !purchase || purchase.status !== 'paid') {
    return NextResponse.json({ error: 'not_paid' }, { status: 402 });
  }

  const { data: signed, error: signErr } = await supa.storage
    .from(BUCKET)
    .createSignedUrl(BOOK_STORAGE_PATH, 60 * 60 * 48); // 48h

  if (signErr || !signed) {
    console.error('[book-download] signed URL failed:', signErr?.message);
    return NextResponse.json({ error: 'file_unavailable' }, { status: 503 });
  }

  return NextResponse.json({ url: signed.signedUrl });
}
