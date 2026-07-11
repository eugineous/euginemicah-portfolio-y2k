import { NextResponse } from 'next/server';
import { verifyAdmin, supaAdmin } from '@/lib/supabase';
import { linkedinConfigured } from '@/lib/linkedin';

// Connection/config status for the admin header chips.
export async function GET(req: Request) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const db = supaAdmin();
  let linkedinConnected = false;
  let tokenExpires: string | null = null;
  if (db) {
    const { data } = await db.from('linkedin_tokens').select('expires_at,member_urn').eq('id', 1).maybeSingle();
    linkedinConnected = !!data?.member_urn;
    tokenExpires = data?.expires_at || null;
  }
  return NextResponse.json({
    supabase: !!db,
    linkedin_app: linkedinConfigured(),
    linkedin_connected: linkedinConnected,
    token_expires: tokenExpires,
  });
}
