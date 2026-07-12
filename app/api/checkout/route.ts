import { NextRequest, NextResponse } from 'next/server';

// Initializes a Paystack transaction for the book purchase. Server-side only
// — the price is set here, never trusted from the client. Requires
// PAYSTACK_SECRET_KEY (see FINAL/README notes for setup).
const BOOK_PRICE_KES = 1800;

export async function POST(req: NextRequest) {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: 'checkout_not_configured' }, { status: 503 });
  }

  let body: { name?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const name = (body.name || '').trim().slice(0, 200);
  const email = (body.email || '').trim().slice(0, 200);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'name_and_valid_email_required' }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://euginemicah.tech';

  const res = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount: BOOK_PRICE_KES * 100, // Paystack expects the smallest currency unit
      currency: 'KES',
      callback_url: `${siteUrl}/book/success`,
      metadata: { product: 'book', name },
    }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.status) {
    console.error('[checkout] paystack initialize failed:', data);
    return NextResponse.json({ error: 'payment_init_failed' }, { status: 502 });
  }

  return NextResponse.json({
    authorization_url: data.data.authorization_url,
    reference: data.data.reference,
  });
}
