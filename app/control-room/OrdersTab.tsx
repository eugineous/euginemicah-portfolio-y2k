'use client';

import { useCallback, useEffect, useState } from 'react';
import { Badge, Card, EmptyRow, td, th } from './ui';
import type { ApiFn } from './types';

type Purchase = {
  id: number;
  reference: string;
  email: string;
  name: string;
  amount_kes: number;
  status: string;
  paid_at: string | null;
  created_at: string;
};

// Read-only view of `book_purchases` -- belongs to the live Paystack
// checkout flow (app/api/checkout, app/api/paystack-webhook). This tab
// never writes to it, only displays it (GET /api/cms/book-purchases).
export function OrdersTab({ api, say }: { api: ApiFn; say: (m: string) => void }) {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    const { status, data } = await api('/api/cms/book-purchases');
    if (status === 200) setPurchases(data.purchases || []);
    else say('Failed to load orders: ' + (data.error || status));
    setLoading(false);
  }, [api, say]);

  useEffect(() => { reload(); }, [reload]);

  const totalPaid = purchases.filter((p) => p.status === 'success' || p.status === 'paid').reduce((sum, p) => sum + (p.amount_kes || 0), 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Book orders</h2>
        <span style={{ fontSize: 13, opacity: 0.7 }}>{purchases.length} orders · KES {totalPaid.toLocaleString()} confirmed</span>
      </div>
      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {['reference', 'name', 'email', 'amount (KES)', 'status', 'paid', 'created'].map((h) => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && <EmptyRow colSpan={7}>Loading…</EmptyRow>}
              {!loading && purchases.length === 0 && <EmptyRow colSpan={7}>No orders yet.</EmptyRow>}
              {purchases.map((p) => (
                <tr key={p.id}>
                  <td style={{ ...td, fontFamily: 'monospace', fontSize: 12 }}>{p.reference}</td>
                  <td style={td}>{p.name || '—'}</td>
                  <td style={td}>{p.email}</td>
                  <td style={td}>{p.amount_kes?.toLocaleString() ?? '—'}</td>
                  <td style={td}><Badge text={p.status} tone={p.status === 'success' || p.status === 'paid' ? 'good' : p.status === 'pending' ? 'warn' : 'bad'} /></td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>{p.paid_at ? new Date(p.paid_at).toLocaleString() : '—'}</td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>{new Date(p.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
