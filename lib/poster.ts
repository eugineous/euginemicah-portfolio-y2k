import { supaAdmin } from './supabase';
import { publishPost } from './linkedin';

const MAX_RETRIES = 3;

// Formats a calendar row into the final LinkedIn commentary text.
export function composeText(p: { hook: string; body: string; cta: string }): string {
  return [p.hook, '', p.body, '', p.cta].filter((s) => s !== null).join('\n').trim();
}

// Publishes one post row; updates status/linkedin_post_id/error/retries.
export async function postOne(id: number): Promise<{ ok: boolean; error?: string }> {
  const db = supaAdmin();
  if (!db) return { ok: false, error: 'supabase_not_configured' };
  const { data: p } = await db.from('posts').select('*').eq('id', id).single();
  if (!p) return { ok: false, error: 'not_found' };
  try {
    const liId = await publishPost(composeText(p));
    await db.from('posts').update({
      status: 'posted', linkedin_post_id: liId, error: null, updated_at: new Date().toISOString(),
    }).eq('id', id);
    return { ok: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'unknown_error';
    const retries = (p.retries || 0) + 1;
    const failed = retries >= MAX_RETRIES || msg === 'linkedin_not_connected';
    await db.from('posts').update({
      status: failed ? 'failed' : 'queued',
      error: msg.slice(0, 500),
      retries,
      updated_at: new Date().toISOString(),
    }).eq('id', id);
    console.error(`[poster] post ${id} attempt ${retries} failed: ${msg}`);
    return { ok: false, error: msg };
  }
}

// Pulls due approved/queued posts and publishes them (cron entrypoint).
export async function postDue(): Promise<{ attempted: number; posted: number; failed: number }> {
  const db = supaAdmin();
  if (!db) return { attempted: 0, posted: 0, failed: 0 };
  const now = new Date().toISOString();
  const { data: due } = await db
    .from('posts')
    .select('id')
    .in('status', ['approved', 'queued'])
    .lte('scheduled_at', now)
    .order('scheduled_at', { ascending: true })
    .limit(5); // safety: max 5 per 15-min tick
  let posted = 0, failed = 0;
  for (const row of due || []) {
    const r = await postOne(row.id);
    if (r.ok) posted++; else failed++;
  }
  return { attempted: (due || []).length, posted, failed };
}
