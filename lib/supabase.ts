import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Server-side client (service role — full access, NEVER exposed to the browser).
export function supaAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

// Verifies a Supabase user JWT (sent by the admin UI as a Bearer token) and
// enforces the ADMIN_EMAIL allowlist. Returns the email when authorized.
export async function verifyAdmin(req: Request): Promise<string | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const allow = (process.env.ADMIN_EMAIL || '').toLowerCase();
  if (!url || !anon || !allow) return null;
  const token = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  if (!token) return null;
  const client = createClient(url, anon, { auth: { persistSession: false } });
  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user?.email) return null;
  return data.user.email.toLowerCase() === allow ? data.user.email : null;
}
