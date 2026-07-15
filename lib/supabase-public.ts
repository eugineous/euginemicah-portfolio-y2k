import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Public anon client for read-only marketing-site pages (e.g. /blog).
// RLS policies on the relevant tables (see supabase/migrations/002_site_rebuild.sql)
// already scope anon reads to `status = 'published'` rows, so no auth/allowlist
// check is needed here -- unlike lib/supabase.ts's supaAdmin()/verifyAdmin(),
// which are service-role + auth-gated and power /admin. This client never sees
// the service-role key and has zero write/admin capability. Kept as a
// separate file rather than added to lib/supabase.ts, which stays untouched
// per the rebuild's do-not-touch list.
export function supaPublic(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createClient(url, anon, { auth: { persistSession: false } });
}
