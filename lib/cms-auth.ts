import { createClient } from '@supabase/supabase-js';
import { supaAdmin } from './supabase';

// ---------------------------------------------------------------------------
// Owner-only setup required before /control-room actually works:
//   1. Supabase dashboard -> Authentication -> Providers -> enable "Google",
//      with a real Google Cloud OAuth client ID/secret (Claude will not and
//      cannot create these -- new third-party accounts/credentials are an
//      owner-only step).
//   2. Set CMS_ADMIN_EMAILS in Vercel env vars -- a comma-separated list of
//      the emails allowed into /control-room, e.g.
//      CMS_ADMIN_EMAILS=eugine@example.com,someoneelse@example.com
// Until both are done, Google sign-in will fail at the Supabase OAuth step,
// and even a successful Google sign-in will 401 out of every /api/cms/*
// route below (no allowlist = nobody let in, fails closed).
//
// This is a deliberately separate admin surface from the pre-existing
// /admin LinkedIn tool: separate env var (CMS_ADMIN_EMAILS, not ADMIN_EMAIL),
// separate allowlist table (cms_admin_emails, not any LinkedIn table), and
// this file never imports/touches lib/supabase.ts's verifyAdmin(). The only
// thing reused from lib/supabase.ts is supaAdmin() (the service-role
// client), which is generic infrastructure, not admin-specific.
// ---------------------------------------------------------------------------

// Verifies a Supabase user JWT (sent by the /control-room UI as a Bearer
// token) and checks the verified email against CMS_ADMIN_EMAILS (env,
// comma-separated) unioned with the cms_admin_emails table (so admins can be
// added/removed without a redeploy). Returns the verified email when
// authorized, otherwise null. Fails closed: any missing config, bad token,
// or unlisted email returns null.
export async function verifyCmsAdmin(req: Request): Promise<string | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;

  const token = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (!token) return null;

  const client = createClient(url, anon, { auth: { persistSession: false } });
  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user?.email) return null;
  const email = data.user.email.toLowerCase();

  const envAllow = (process.env.CMS_ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (envAllow.includes(email)) return data.user.email;

  // Fall back to the DB allowlist -- lets the owner add/remove CMS admins
  // via a row insert/delete, no redeploy needed.
  const db = supaAdmin();
  if (db) {
    const { data: row } = await db
      .from('cms_admin_emails')
      .select('email')
      .eq('email', email)
      .maybeSingle();
    if (row) return data.user.email;
  }

  return null;
}
