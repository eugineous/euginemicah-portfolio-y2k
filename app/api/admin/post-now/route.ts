import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/supabase';
import { postOne } from '@/lib/poster';

// "Post now" button — publishes a single entry immediately.
export async function POST(req: Request) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { id } = await req.json().catch(() => ({}));
  if (!Number.isInteger(id)) return NextResponse.json({ error: 'missing_id' }, { status: 400 });
  const r = await postOne(id);
  return NextResponse.json(r, { status: r.ok ? 200 : 502 });
}
