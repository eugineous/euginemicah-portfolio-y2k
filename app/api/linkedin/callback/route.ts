import { NextResponse } from 'next/server';
import { exchangeCode, fetchMemberUrn } from '@/lib/linkedin';
import { supaAdmin } from '@/lib/supabase';

// OAuth redirect target. Exchanges the code, stores tokens + member URN in
// Supabase (single-row linkedin_tokens), then bounces back to /admin.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state') || '';
  const cookieState = req.headers.get('cookie')?.match(/li_state=([a-f0-9]+)/)?.[1] || '';
  if (!code || !state || state !== cookieState) {
    return NextResponse.redirect(new URL('/admin?linkedin=state_mismatch', url.origin));
  }
  try {
    const tok = await exchangeCode(code);
    const urn = await fetchMemberUrn(tok.access_token);
    const db = supaAdmin();
    if (!db) throw new Error('supabase_not_configured');
    await db.from('linkedin_tokens').upsert({
      id: 1,
      access_token: tok.access_token,
      refresh_token: tok.refresh_token || null,
      member_urn: urn,
      expires_at: new Date(Date.now() + (tok.expires_in || 3600) * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    });
    return NextResponse.redirect(new URL('/admin?linkedin=connected', url.origin));
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'error';
    return NextResponse.redirect(new URL(`/admin?linkedin=failed&why=${encodeURIComponent(msg.slice(0, 120))}`, url.origin));
  }
}
