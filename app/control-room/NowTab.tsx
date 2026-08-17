'use client';

import { useCallback, useEffect, useState } from 'react';
import { Badge, Button, Card, EmptyRow, inputStyle, labelStyle, td, th } from './ui';
import type { ApiFn } from './types';

type NowItem = {
  id: number;
  label: string;
  text: string;
  sort_order: number;
  status: 'draft' | 'published';
  updated_at: string;
};

type FormState = Omit<NowItem, 'id' | 'updated_at'> & { id: number | null };

const BLANK: FormState = { id: null, label: '', text: '', sort_order: 0, status: 'draft' };

export function NowTab({ api, say }: { api: ApiFn; say: (m: string) => void }) {
  const [items, setItems] = useState<NowItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    const { status, data } = await api('/api/cms/now');
    if (status === 200) setItems(data.items || []);
    else say('Failed to load now items: ' + (data.error || status));
    setLoading(false);
  }, [api, say]);

  useEffect(() => { reload(); }, [reload]);

  function openCreate() { setForm({ ...BLANK }); }
  function openEdit(it: NowItem) { setForm({ id: it.id, label: it.label, text: it.text, sort_order: it.sort_order, status: it.status }); }

  async function save(f: FormState) {
    const payload = { label: f.label.trim(), text: f.text.trim(), sort_order: f.sort_order, status: f.status };
    const { status, data } = f.id
      ? await api(`/api/cms/now/${f.id}`, { method: 'PATCH', body: JSON.stringify(payload) })
      : await api('/api/cms/now', { method: 'POST', body: JSON.stringify(payload) });
    if (status === 200) { say('Saved.'); setForm(null); reload(); }
    else say('Save failed: ' + (data.error || status));
  }

  async function toggleStatus(it: NowItem) {
    const next = it.status === 'published' ? 'draft' : 'published';
    const { status, data } = await api(`/api/cms/now/${it.id}`, { method: 'PATCH', body: JSON.stringify({ status: next }) });
    if (status === 200) { say(next === 'published' ? 'Published.' : 'Unpublished.'); reload(); }
    else say('Failed: ' + (data.error || status));
  }

  async function remove(it: NowItem) {
    if (!confirm(`Delete "${it.label}"? This cannot be undone.`)) return;
    const { status, data } = await api(`/api/cms/now/${it.id}`, { method: 'DELETE' });
    if (status === 200) { say('Deleted.'); reload(); }
    else say('Delete failed: ' + (data.error || status));
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Now page</h2>
        <Button onClick={openCreate}>+ New item</Button>
      </div>
      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {['label', 'text', 'order', 'status', 'actions'].map((h) => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && <EmptyRow colSpan={5}>Loading…</EmptyRow>}
              {!loading && items.length === 0 && <EmptyRow colSpan={5}>No items yet — create one above.</EmptyRow>}
              {items.map((it) => (
                <tr key={it.id}>
                  <td style={{ ...td, fontWeight: 600 }}>{it.label}</td>
                  <td style={{ ...td, maxWidth: 360 }}>{it.text}</td>
                  <td style={td}>{it.sort_order}</td>
                  <td style={td}><Badge text={it.status} tone={it.status === 'published' ? 'good' : 'neutral'} /></td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>
                    <Button variant="ghost" style={{ padding: '4px 10px', marginRight: 6 }} onClick={() => openEdit(it)}>Edit</Button>
                    <Button variant="ghost" style={{ padding: '4px 10px', marginRight: 6 }} onClick={() => toggleStatus(it)}>
                      {it.status === 'published' ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button variant="danger" style={{ padding: '4px 10px' }} onClick={() => remove(it)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {form && <NowForm form={form} onCancel={() => setForm(null)} onSave={save} />}
    </div>
  );
}

function NowForm({ form, onCancel, onSave }: { form: FormState; onCancel: () => void; onSave: (f: FormState) => void }) {
  const [f, setF] = useState(form);
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((x) => ({ ...x, [k]: v }));
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '5vh 14px' }}
      onClick={onCancel}
    >
      <Card style={{ maxWidth: 520, width: '100%', padding: 22, background: 'var(--bg)' }}>
        <div onClick={(e) => e.stopPropagation()}>
          <h3 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 800 }}>{f.id ? `Edit item #${f.id}` : 'New item'}</h3>

          <label style={labelStyle}>Label</label>
          <input style={inputStyle} value={f.label} onChange={(e) => set('label', e.target.value)} placeholder="e.g. On air" />

          <label style={labelStyle}>Text</label>
          <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3} value={f.text} onChange={(e) => set('text', e.target.value)} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Sort order</label>
              <input style={inputStyle} type="number" value={f.sort_order} onChange={(e) => set('sort_order', Number(e.target.value) || 0)} />
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select style={inputStyle} value={f.status} onChange={(e) => set('status', e.target.value as 'draft' | 'published')}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <Button onClick={() => onSave(f)} disabled={!f.label.trim()}>Save</Button>
            <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
