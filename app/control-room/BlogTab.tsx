'use client';

import { useCallback, useEffect, useState } from 'react';
import { Badge, Button, Card, EmptyRow, inputStyle, labelStyle, td, th } from './ui';
import type { ApiFn } from './types';

type BlogPost = {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  paragraphs: string[];
  tag_chips: string[];
  read_time: string;
  status: 'draft' | 'published';
  published_at: string | null;
  created_at: string;
};

type FormState = {
  id: number | null;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  paragraphs: string; // paragraphs joined by blank lines in the textarea
  tag_chips: string; // comma-separated
  read_time: string;
  status: 'draft' | 'published';
};

const BLANK: FormState = {
  id: null, slug: '', category: '', title: '', excerpt: '', paragraphs: '', tag_chips: '', read_time: '', status: 'draft',
};

export function BlogTab({ api, say }: { api: ApiFn; say: (m: string) => void }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    const { status, data } = await api('/api/cms/blog');
    if (status === 200) setPosts(data.posts || []);
    else say('Failed to load blog posts: ' + (data.error || status));
    setLoading(false);
  }, [api, say]);

  useEffect(() => { reload(); }, [reload]);

  function openCreate() { setForm({ ...BLANK }); }
  function openEdit(p: BlogPost) {
    setForm({
      id: p.id,
      slug: p.slug,
      category: p.category,
      title: p.title,
      excerpt: p.excerpt,
      paragraphs: (p.paragraphs || []).join('\n\n'),
      tag_chips: (p.tag_chips || []).join(', '),
      read_time: p.read_time,
      status: p.status,
    });
  }

  async function save(f: FormState) {
    const payload = {
      slug: f.slug.trim(),
      category: f.category.trim(),
      title: f.title.trim(),
      excerpt: f.excerpt.trim(),
      paragraphs: f.paragraphs.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
      tag_chips: f.tag_chips.split(',').map((t) => t.trim()).filter(Boolean),
      read_time: f.read_time.trim(),
      status: f.status,
    };
    const { status, data } = f.id
      ? await api(`/api/cms/blog/${f.id}`, { method: 'PATCH', body: JSON.stringify(payload) })
      : await api('/api/cms/blog', { method: 'POST', body: JSON.stringify(payload) });
    if (status === 200) { say('Saved.'); setForm(null); reload(); }
    else say('Save failed: ' + (data.error || status));
  }

  async function toggleStatus(p: BlogPost) {
    const next = p.status === 'published' ? 'draft' : 'published';
    const { status, data } = await api(`/api/cms/blog/${p.id}`, { method: 'PATCH', body: JSON.stringify({ status: next }) });
    if (status === 200) { say(next === 'published' ? 'Published.' : 'Unpublished.'); reload(); }
    else say('Failed: ' + (data.error || status));
  }

  async function remove(p: BlogPost) {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    const { status, data } = await api(`/api/cms/blog/${p.id}`, { method: 'DELETE' });
    if (status === 200) { say('Deleted.'); reload(); }
    else say('Delete failed: ' + (data.error || status));
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Blog posts</h2>
        <Button onClick={openCreate}>+ New post</Button>
      </div>
      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                {['title', 'category', 'slug', 'status', 'published', 'actions'].map((h) => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && <EmptyRow colSpan={6}>Loading…</EmptyRow>}
              {!loading && posts.length === 0 && <EmptyRow colSpan={6}>No posts yet — create one above.</EmptyRow>}
              {posts.map((p) => (
                <tr key={p.id}>
                  <td style={{ ...td, maxWidth: 320, fontWeight: 600 }}>{p.title}</td>
                  <td style={td}>{p.category || '—'}</td>
                  <td style={{ ...td, fontFamily: 'monospace', fontSize: 12, opacity: 0.75 }}>{p.slug}</td>
                  <td style={td}><Badge text={p.status} tone={p.status === 'published' ? 'good' : 'neutral'} /></td>
                  <td style={td}>{p.published_at ? new Date(p.published_at).toLocaleDateString() : '—'}</td>
                  <td style={{ ...td, whiteSpace: 'nowrap' }}>
                    <Button variant="ghost" style={{ padding: '4px 10px', marginRight: 6 }} onClick={() => openEdit(p)}>Edit</Button>
                    <Button variant="ghost" style={{ padding: '4px 10px', marginRight: 6 }} onClick={() => toggleStatus(p)}>
                      {p.status === 'published' ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button variant="danger" style={{ padding: '4px 10px' }} onClick={() => remove(p)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {form && <BlogForm form={form} onCancel={() => setForm(null)} onSave={save} />}
    </div>
  );
}

function BlogForm({ form, onCancel, onSave }: { form: FormState; onCancel: () => void; onSave: (f: FormState) => void }) {
  const [f, setF] = useState(form);
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((x) => ({ ...x, [k]: v }));
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '5vh 14px' }}
      onClick={onCancel}
    >
      <Card style={{ maxWidth: 680, width: '100%', padding: 22, background: 'var(--bg)' }}>
        <div onClick={(e) => e.stopPropagation()}>
          <h3 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 800 }}>{f.id ? `Edit post #${f.id}` : 'New post'}</h3>

          <label style={labelStyle}>Title</label>
          <input style={inputStyle} value={f.title} onChange={(e) => set('title', e.target.value)} />

          <label style={labelStyle}>Slug (URL: /blog/…)</label>
          <input style={inputStyle} value={f.slug} onChange={(e) => set('slug', e.target.value)} placeholder="e.g. no-script" />

          <label style={labelStyle}>Category</label>
          <input style={inputStyle} value={f.category} onChange={(e) => set('category', e.target.value)} />

          <label style={labelStyle}>Excerpt</label>
          <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={f.excerpt} onChange={(e) => set('excerpt', e.target.value)} />

          <label style={labelStyle}>Paragraphs (separate each paragraph with a blank line)</label>
          <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={10} value={f.paragraphs} onChange={(e) => set('paragraphs', e.target.value)} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Tag chips (comma-separated)</label>
              <input style={inputStyle} value={f.tag_chips} onChange={(e) => set('tag_chips', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Read time</label>
              <input style={inputStyle} value={f.read_time} onChange={(e) => set('read_time', e.target.value)} placeholder="e.g. 6 min read" />
            </div>
          </div>

          <label style={labelStyle}>Status</label>
          <select style={inputStyle} value={f.status} onChange={(e) => set('status', e.target.value as 'draft' | 'published')}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <Button onClick={() => onSave(f)} disabled={!f.title.trim() || !f.slug.trim()}>Save</Button>
            <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
