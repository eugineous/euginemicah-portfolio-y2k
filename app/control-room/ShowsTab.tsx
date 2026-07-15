'use client';

import { useCallback, useEffect, useState } from 'react';
import { Badge, Button, Card, EmptyRow, inputStyle, labelStyle, td, th } from './ui';
import type { ApiFn } from './types';

type Show = {
  id: number;
  name: string;
  tag: string;
  description: string;
  meta: string;
  image_url: string;
  cta_label: string;
  cta_href: string;
  is_flagship: boolean;
  sort_order: number;
  status: 'draft' | 'published';
};

type FormState = Omit<Show, 'id'> & { id: number | null };

const BLANK: FormState = {
  id: null, name: '', tag: '', description: '', meta: '', image_url: '', cta_label: '', cta_href: '',
  is_flagship: false, sort_order: 0, status: 'draft',
};

export function ShowsTab({ api, say }: { api: ApiFn; say: (m: string) => void }) {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    const { status, data } = await api('/api/cms/shows');
    if (status === 200) setShows(data.shows || []);
    else say('Failed to load shows: ' + (data.error || status));
    setLoading(false);
  }, [api, say]);

  useEffect(() => { reload(); }, [reload]);

  function openCreate() { setForm({ ...BLANK }); }
  function openEdit(s: Show) { setForm({ ...s }); }

  async function save(f: FormState) {
    const payload = {
      name: f.name.trim(),
      tag: f.tag.trim(),
      description: f.description.trim(),
      meta: f.meta.trim(),
      image_url: f.image_url.trim(),
      cta_label: f.cta_label.trim(),
      cta_href: f.cta_href.trim(),
      is_flagship: f.is_flagship,
      sort_order: f.sort_order,
      status: f.status,
    };
    const { status, data } = f.id
      ? await api(`/api/cms/shows/${f.id}`, { method: 'PATCH', body: JSON.stringify(payload) })
      : await api('/api/cms/shows', { method: 'POST', body: JSON.stringify(payload) });
    if (status === 200) { say('Saved.'); setForm(null); reload(); }
    else say('Save failed: ' + (data.error || status));
  }

  async function toggleStatus(s: Show) {
    const next = s.status === 'published' ? 'draft' : 'published';
    const { status, data } = await api(`/api/cms/shows/${s.id}`, { method: 'PATCH', body: JSON.stringify({ status: next }) });
    if (status === 200) { say(next === 'published' ? 'Published.' : 'Unpublished.'); reload(); }
    else say('Failed: ' + (data.error || status));
  }

  async function remove(s: Show) {
    if (!confirm(`Delete "${s.name}"? This cannot be undone.`)) return;
    const { status, data } = await api(`/api/cms/shows/${s.id}`, { method: 'DELETE' });
    if (status === 200) { say('Deleted.'); reload(); }
    else say('Delete failed: ' + (data.error || status));
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Shows</h2>
        <Button onClick={openCreate}>+ New show</Button>
      </div>
      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {['name', 'tag', 'flagship', 'order', 'status', 'actions'].map((h) => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && <EmptyRow colSpan={6}>Loading…</EmptyRow>}
              {!loading && shows.length === 0 && <EmptyRow colSpan={6}>No shows yet — create one above.</EmptyRow>}
              {shows.map((s) => (
                <tr key={s.id}>
                  <td style={{ ...td, fontWeight: 600 }}>{s.name}</td>
                  <td style={td}>{s.tag || '—'}</td>
                  <td style={td}>{s.is_flagship ? <Badge text="flagship" tone="warn" /> : '—'}</td>
                  <td style={td}>{s.sort_order}</td>
                  <td style={td}><Badge text={s.status} tone={s.status === 'published' ? 'good' : 'neutral'} /></td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>
                    <Button variant="ghost" style={{ padding: '4px 10px', marginRight: 6 }} onClick={() => openEdit(s)}>Edit</Button>
                    <Button variant="ghost" style={{ padding: '4px 10px', marginRight: 6 }} onClick={() => toggleStatus(s)}>
                      {s.status === 'published' ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button variant="danger" style={{ padding: '4px 10px' }} onClick={() => remove(s)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {form && <ShowForm form={form} onCancel={() => setForm(null)} onSave={save} />}
    </div>
  );
}

function ShowForm({ form, onCancel, onSave }: { form: FormState; onCancel: () => void; onSave: (f: FormState) => void }) {
  const [f, setF] = useState(form);
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((x) => ({ ...x, [k]: v }));
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '5vh 14px' }}
      onClick={onCancel}
    >
      <Card style={{ maxWidth: 680, width: '100%', padding: 22, background: 'var(--bg)' }}>
        <div onClick={(e) => e.stopPropagation()}>
          <h3 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 800 }}>{f.id ? `Edit show #${f.id}` : 'New show'}</h3>

          <label style={labelStyle}>Name</label>
          <input style={inputStyle} value={f.name} onChange={(e) => set('name', e.target.value)} />

          <label style={labelStyle}>Tag</label>
          <input style={inputStyle} value={f.tag} onChange={(e) => set('tag', e.target.value)} placeholder="e.g. Flagship · PPP TV" />

          <label style={labelStyle}>Description</label>
          <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={4} value={f.description} onChange={(e) => set('description', e.target.value)} />

          <label style={labelStyle}>Meta line</label>
          <input style={inputStyle} value={f.meta} onChange={(e) => set('meta', e.target.value)} placeholder="e.g. PPP TV · Live · Tue & Thu 7:30 PM" />

          <label style={labelStyle}>Image URL</label>
          <input style={inputStyle} value={f.image_url} onChange={(e) => set('image_url', e.target.value)} placeholder="/hq-assets/…" />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>CTA label</label>
              <input style={inputStyle} value={f.cta_label} onChange={(e) => set('cta_label', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>CTA href</label>
              <input style={inputStyle} value={f.cta_href} onChange={(e) => set('cta_href', e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, alignItems: 'end' }}>
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
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
              <input type="checkbox" checked={f.is_flagship} onChange={(e) => set('is_flagship', e.target.checked)} />
              Flagship
            </label>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <Button onClick={() => onSave(f)} disabled={!f.name.trim()}>Save</Button>
            <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
