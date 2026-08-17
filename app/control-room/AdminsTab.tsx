'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button, Card, EmptyRow, inputStyle, td, th } from './ui';
import type { ApiFn } from './types';

type Admin = { email: string; added_at: string };

// Manages the DB half of the CMS admin allowlist (cms_admin_emails table).
// See app/api/cms/admins/route.ts's comment: emails granted via the
// CMS_ADMIN_EMAILS env var don't appear here and can't be removed from
// this UI -- there is always at least one admin email that this page can't
// lock out.
export function AdminsTab({ api, say, currentEmail }: { api: ApiFn; say: (m: string) => void; currentEmail: string }) {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [adding, setAdding] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    const { status, data } = await api('/api/cms/admins');
    if (status === 200) setAdmins(data.admins || []);
    else say('Failed to load admins: ' + (data.error || status));
    setLoading(false);
  }, [api, say]);

  useEffect(() => { reload(); }, [reload]);

  async function add() {
    const email = newEmail.trim().toLowerCase();
    if (!email) return;
    setAdding(true);
    const { status, data } = await api('/api/cms/admins', { method: 'POST', body: JSON.stringify({ email }) });
    setAdding(false);
    if (status === 200) { say('Added.'); setNewEmail(''); reload(); }
    else say('Add failed: ' + (data.error || status));
  }

  async function remove(email: string) {
    if (!confirm(`Remove ${email} from the admin allowlist?`)) return;
    const { status, data } = await api(`/api/cms/admins?email=${encodeURIComponent(email)}`, { method: 'DELETE' });
    if (status === 200) { say('Removed.'); reload(); }
    else say('Remove failed: ' + (data.error || status));
  }

  return (
    <div>
      <h2 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 800 }}>Admin access</h2>
      <p style={{ fontSize: 13, opacity: 0.65, margin: '0 0 16px', maxWidth: 560 }}>
        Emails added here can sign in to Control Room with Google. This list is in addition to whatever&apos;s set in
        the <code>CMS_ADMIN_EMAILS</code> environment variable, which can&apos;t be edited from this page.
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, maxWidth: 420 }}>
        <input
          style={inputStyle}
          type="email"
          placeholder="new-admin@example.com"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
        />
        <Button onClick={add} disabled={adding || !newEmail.trim()}>Add</Button>
      </div>

      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {['email', 'added', 'actions'].map((h) => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && <EmptyRow colSpan={3}>Loading…</EmptyRow>}
              {!loading && admins.length === 0 && <EmptyRow colSpan={3}>No emails in the DB allowlist yet.</EmptyRow>}
              {admins.map((a) => (
                <tr key={a.email}>
                  <td style={td}>
                    {a.email}
                    {a.email === currentEmail.toLowerCase() && (
                      <span style={{ marginLeft: 8, fontSize: 11, opacity: 0.55 }}>(you)</span>
                    )}
                  </td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>{new Date(a.added_at).toLocaleDateString()}</td>
                  <td style={td}>
                    <Button variant="danger" style={{ padding: '4px 10px' }} onClick={() => remove(a.email)}>Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
