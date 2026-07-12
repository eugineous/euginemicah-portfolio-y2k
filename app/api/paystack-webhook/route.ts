import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { supaAdmin } from '@/lib/supabase';

// Paystack sends the authoritative payment confirmation here (not the
// client-side callback_url redirect, which anyone could hit manually).
// Register this URL in the Paystack dashboard: Settings -> API Keys & Webhooks.
export async function POST(req: NextRequest) {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) return NextResponse.json({ error: 'not_configured' }, { status: 503 });

  const rawBody = await req.text();
  const signature = req.headers.get('x-paystack-signature') || '';
  const expected = crypto.createHmac('sha512', key).update(rawBody).digest('hex');
  if (signature !== expected) {
    return NextResponse.json({ error: 'invalid_signature' }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  if (event.event === 'charge.success') {
    const data = event.data;
    const supa = supaAdmin();
    if (supa) {
      const { error } = await supa.from('book_purchases').upsert(
        {
          reference: data.reference,
          email: data.customer?.email || '',
          name: data.metadata?.name || '',
          amount_kes: (data.amount || 0) / 100,
          status: 'paid',
          paid_at: new Date().toISOString(),
        },
        { onConflict: 'reference' },
      );
      if (error) console.error('[paystack-webhook] supabase upsert failed:', error.message);
    }
  }

  return NextResponse.json({ received: true });
}
