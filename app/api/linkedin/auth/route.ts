import { NextResponse } from 'next/server';
import { linkedinConfigured, authUrl } from '@/lib/linkedin';
import { verifyAdmin } from '@/lib/supabase';
import { randomBytes } from 'node:crypto';

// Starts the LinkedIn OAuth flow ("Connect LinkedIn" button).
// Admin-gated via ?token= (the UI appends the Supabase JWT since this is a redirect).
export async function GET(req: Request) {
  const url = new URL(req.url);
  const jwt = url.searchParams.get('token') || '';
  const proxied = new Request(req.url, { headers: { authorization: `Bearer ${jwt}` } });
  if (!(await verifyAdmin(proxied))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  if (!linkedinConfigured()) {
    return NextResponse.json({ error: 'linkedin_not_configured', hint: 'Set LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET (see FINAL_CHECKLIST.md).' }, { status: 503 });
  }
  const state = randomBytes(16).toString('hex');
  const res = NextResponse.redirect(authUrl(state));
  res.cookies.set('li_state', state, { httpOnly: true, secure: true, maxAge: 600, path: '/' });
  return res;
}
