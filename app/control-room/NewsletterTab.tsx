'use client';

import { useCallback, useEffect, useState } from 'react';
import { Card, EmptyRow, td, th } from './ui';
import type { ApiFn } from './types';

type Subscriber = {
  id: number;
  email: string;
  source: string;
  created_at: string;
};

// Read-only view of `newsletter_subscribers`. No page writes to this table
// yet (signup form is out of scope for this phase) -- expect an empty list
// until that ships.
export function NewsletterTab({ api, say }: { api: ApiFn; say: (m: string) => void }) {
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    const { status, data } = await api('/api/cms/newsletter');
    if (status === 200) setSubs(data.subscribers || []);
    else say('Failed to load subscribers: ' + (data.error || status));
    setLoading(false);
  }, [api, say]);

  useEffect(() => { reload(); }, [reload]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Newsletter subscribers</h2>
        <span style={{ fontSize: 13, opacity: 0.7 }}>{subs.length} subscribers</span>
      </div>
      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {['email', 'source', 'subscribed'].map((h) => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && <EmptyRow colSpan={3}>Loading…</EmptyRow>}
              {!loading && subs.length === 0 && (
                <EmptyRow colSpan={3}>No subscribers yet — the signup form hasn&apos;t shipped.</EmptyRow>
              )}
              {subs.map((s) => (
                <tr key={s.id}>
                  <td style={td}>{s.email}</td>
                  <td style={td}>{s.source}</td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>{new Date(s.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
