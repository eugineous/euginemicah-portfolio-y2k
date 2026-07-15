'use client';

import { useCallback, useEffect, useState } from 'react';
import { Badge, Button, Card, EmptyRow, td, th } from './ui';
import type { ApiFn } from './types';

type Message = {
  id: number;
  source: 'contact' | 'booking' | 'roylandz' | 'deletion_request';
  name: string;
  email: string;
  phone: string;
  body: string;
  meta: Record<string, unknown>;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
};

const STATUS_TONE: Record<Message['status'], 'neutral' | 'good' | 'warn' | 'bad'> = {
  new: 'warn', read: 'neutral', replied: 'good', archived: 'neutral',
};

export function MessagesTab({ api, say }: { api: ApiFn; say: (m: string) => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Message['status'] | 'all'>('all');
  const [open, setOpen] = useState<Message | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    const { status, data } = await api('/api/cms/messages');
    if (status === 200) setMessages(data.messages || []);
    else say('Failed to load messages: ' + (data.error || status));
    setLoading(false);
  }, [api, say]);

  useEffect(() => { reload(); }, [reload]);

  async function setStatus(m: Message, next: Message['status']) {
    const { status, data } = await api('/api/cms/messages', { method: 'PATCH', body: JSON.stringify({ id: m.id, status: next }) });
    if (status === 200) { say('Updated.'); reload(); if (open?.id === m.id) setOpen({ ...m, status: next }); }
    else say('Failed: ' + (data.error || status));
  }

  const shown = filter === 'all' ? messages : messages.filter((m) => m.status === filter);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Messages</h2>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {(['all', 'new', 'read', 'replied', 'archived'] as const).map((s) => (
            <Button key={s} variant={filter === s ? 'primary' : 'ghost'} style={{ padding: '5px 12px' }} onClick={() => setFilter(s)}>
              {s} {s !== 'all' ? `(${messages.filter((m) => m.status === s).length})` : `(${messages.length})`}
            </Button>
          ))}
        </div>
      </div>
      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {['received', 'source', 'name', 'email', 'message', 'status', 'actions'].map((h) => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && <EmptyRow colSpan={7}>Loading…</EmptyRow>}
              {!loading && shown.length === 0 && <EmptyRow colSpan={7}>No messages here.</EmptyRow>}
              {shown.map((m) => (
                <tr key={m.id}>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>{new Date(m.created_at).toLocaleString()}</td>
                  <td style={td}><Badge text={m.source} /></td>
                  <td style={td}>{m.name}</td>
                  <td style={td}>{m.email}</td>
                  <td style={{ ...td, maxWidth: 320, cursor: 'pointer' }} onClick={() => setOpen(m)}>
                    {m.body.slice(0, 90)}{m.body.length > 90 ? '…' : ''}
                  </td>
                  <td style={td}><Badge text={m.status} tone={STATUS_TONE[m.status]} /></td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>
                    <Button variant="ghost" style={{ padding: '4px 10px', marginRight: 6 }} onClick={() => setOpen(m)}>View</Button>
                    {m.status !== 'read' && m.status !== 'replied' && (
                      <Button variant="ghost" style={{ padding: '4px 10px', marginRight: 6 }} onClick={() => setStatus(m, 'read')}>Mark read</Button>
                    )}
                    {m.status !== 'replied' && (
                      <Button variant="ghost" style={{ padding: '4px 10px', marginRight: 6 }} onClick={() => setStatus(m, 'replied')}>Mark replied</Button>
                    )}
                    {m.status !== 'archived' && (
                      <Button variant="ghost" style={{ padding: '4px 10px' }} onClick={() => setStatus(m, 'archived')}>Archive</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {open && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '5vh 14px' }}
          onClick={() => setOpen(null)}
        >
          <Card style={{ maxWidth: 640, width: '100%', padding: 22, background: 'var(--bg)' }}>
            <div onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
                <Badge text={open.source} />
                <Badge text={open.status} tone={STATUS_TONE[open.status]} />
                <span style={{ opacity: 0.6, fontSize: 12 }}>{new Date(open.created_at).toLocaleString()}</span>
              </div>
              <h3 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 800 }}>{open.name}</h3>
              <p style={{ margin: '0 0 12px', fontSize: 13, opacity: 0.75 }}>{open.email}{open.phone ? ` · ${open.phone}` : ''}</p>
              <p style={{ whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: 1.6 }}>{open.body}</p>
              {open.meta && Object.keys(open.meta).length > 0 && (
                <pre style={{ fontSize: 12, opacity: 0.7, background: 'color-mix(in srgb, var(--text) 6%, transparent)', padding: 10, borderRadius: 8, overflowX: 'auto' }}>
                  {JSON.stringify(open.meta, null, 2)}
                </pre>
              )}
              <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
                {open.status !== 'read' && open.status !== 'replied' && <Button variant="ghost" onClick={() => setStatus(open, 'read')}>Mark read</Button>}
                {open.status !== 'replied' && <Button onClick={() => setStatus(open, 'replied')}>Mark replied</Button>}
                {open.status !== 'archived' && <Button variant="ghost" onClick={() => setStatus(open, 'archived')}>Archive</Button>}
                <Button variant="ghost" onClick={() => setOpen(null)}>Close</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
