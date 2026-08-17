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
  hero_image_url: string | null;
  focus_keyword: string;
  seo_title: string;
  seo_description: string;
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
  hero_image_url: string;
  focus_keyword: string;
  seo_title: string;
  seo_description: string;
};

const BLANK: FormState = {
  id: null, slug: '', category: '', title: '', excerpt: '', paragraphs: '', tag_chips: '', read_time: '', status: 'draft',
  hero_image_url: '', focus_keyword: '', seo_title: '', seo_description: '',
};

export function BlogTab({ api, say, authToken }: { api: ApiFn; say: (m: string) => void; authToken: string }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState | null>(null);
  const [query, setQuery] = useState('');

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
      hero_image_url: p.hero_image_url || '',
      focus_keyword: p.focus_keyword || '',
      seo_title: p.seo_title || '',
      seo_description: p.seo_description || '',
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
      hero_image_url: f.hero_image_url.trim() || null,
      focus_keyword: f.focus_keyword.trim(),
      seo_title: f.seo_title.trim(),
      seo_description: f.seo_description.trim(),
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

  const shown = posts.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Blog posts</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input
            style={{ ...inputStyle, width: 200 }}
            placeholder="Search title, slug, category…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={openCreate}>+ New post</Button>
        </div>
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
              {!loading && shown.length === 0 && (
                <EmptyRow colSpan={6}>{query ? 'No posts match your search.' : 'No posts yet — create one above.'}</EmptyRow>
              )}
              {shown.map((p) => (
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

      {form && <BlogForm form={form} onCancel={() => setForm(null)} onSave={save} authToken={authToken} say={say} />}
    </div>
  );
}

// SEO checklist rules, ported from Admin.dc.html: title 30-60 chars, meta
// description 120-160 chars, focus keyword present in the title, focus
// keyword present in the body.
function seoChecklist(f: FormState) {
  const title = (f.seo_title || f.title).trim();
  const desc = f.seo_description.trim();
  const keyword = f.focus_keyword.trim().toLowerCase();
  const body = f.paragraphs.toLowerCase();
  return [
    { label: 'SEO title length (30–60 chars)', ok: title.length >= 30 && title.length <= 60 },
    { label: 'Meta description length (120–160 chars)', ok: desc.length >= 120 && desc.length <= 160 },
    { label: 'Focus keyword in title', ok: !!keyword && title.toLowerCase().includes(keyword) },
    { label: 'Focus keyword in body', ok: !!keyword && body.includes(keyword) },
  ];
}

function SeoDot({ ok }: { ok: boolean }) {
  return (
    <span
      aria-hidden
      style={{ display: 'inline-block', width: 9, height: 9, borderRadius: '50%', background: ok ? '#1a7f37' : '#D1272C', flexShrink: 0 }}
    />
  );
}

function BlogForm({
  form,
  onCancel,
  onSave,
  authToken,
  say,
}: {
  form: FormState;
  onCancel: () => void;
  onSave: (f: FormState) => void;
  authToken: string;
  say: (m: string) => void;
}) {
  const [f, setF] = useState(form);
  const [uploading, setUploading] = useState(false);
  const [library, setLibrary] = useState<{ name: string; url: string }[] | null>(null);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((x) => ({ ...x, [k]: v }));

  async function openLibrary() {
    if (library) { setLibrary(null); return; } // toggle closed if already open
    setLibraryLoading(true);
    try {
      const res = await fetch('/api/cms/blog/upload-image', { headers: { Authorization: `Bearer ${authToken}` } });
      const data = await res.json().catch(() => ({}));
      setLibrary(res.ok ? data.images || [] : []);
      if (!res.ok) say('Failed to load media library: ' + (data.error || res.status));
    } catch {
      say('Failed to load media library: network error');
      setLibrary([]);
    } finally {
      setLibraryLoading(false);
    }
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/cms/blog/upload-image', {
        method: 'POST',
        headers: { Authorization: `Bearer ${authToken}` },
        body,
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        set('hero_image_url', data.url);
      } else {
        say('Image upload failed: ' + (data.error || res.status));
      }
    } catch {
      say('Image upload failed: network error');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  const checklist = seoChecklist(f);

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '5vh 14px' }}
      onClick={onCancel}
    >
      <Card style={{ maxWidth: 680, width: '100%', padding: 22, background: 'var(--bg)' }}>
        <div onClick={(e) => e.stopPropagation()}>
          <h3 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 800 }}>{f.id ? `Edit post #${f.id}` : 'New post'}</h3>

          <label style={labelStyle}>Hero image</label>
          {f.hero_image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={f.hero_image_url}
              alt=""
              style={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
            />
          )}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={onFileChange} disabled={uploading} />
            <Button type="button" variant="ghost" style={{ padding: '4px 10px', fontSize: 12 }} onClick={openLibrary}>
              {library ? 'Hide library' : 'Choose from library'}
            </Button>
          </div>
          {uploading && <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 4 }}>Uploading…</div>}
          {library && (
            <div style={{ marginBottom: 8 }}>
              {libraryLoading ? (
                <div style={{ fontSize: 12, opacity: 0.6 }}>Loading…</div>
              ) : library.length === 0 ? (
                <div style={{ fontSize: 12, opacity: 0.6 }}>No previously uploaded images yet.</div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(64px, 1fr))', gap: 6, maxHeight: 160, overflowY: 'auto', padding: 6, border: '1px solid color-mix(in srgb, var(--text) 15%, transparent)', borderRadius: 8 }}>
                  {library.map((img) => (
                    <button
                      key={img.name}
                      type="button"
                      onClick={() => { set('hero_image_url', img.url); setLibrary(null); }}
                      style={{ all: 'unset', cursor: 'pointer', border: img.url === f.hero_image_url ? '2px solid var(--a)' : '2px solid transparent', borderRadius: 6, overflow: 'hidden', lineHeight: 0 }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt="" style={{ width: '100%', height: 60, objectFit: 'cover', display: 'block' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

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

          <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid rgba(0,0,0,.1)' }}>
            <div style={{ fontSize: 13, fontWeight: 800, marginBottom: 8 }}>SEO</div>

            <label style={labelStyle}>Focus keyword</label>
            <input style={inputStyle} value={f.focus_keyword} onChange={(e) => set('focus_keyword', e.target.value)} />

            <label style={labelStyle}>SEO title (defaults to Title)</label>
            <input style={inputStyle} value={f.seo_title} onChange={(e) => set('seo_title', e.target.value)} placeholder={f.title} />

            <label style={labelStyle}>Meta description</label>
            <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={2} value={f.seo_description} onChange={(e) => set('seo_description', e.target.value)} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
              {checklist.map((c) => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, opacity: 0.85 }}>
                  <SeoDot ok={c.ok} />
                  {c.label}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <Button onClick={() => onSave(f)} disabled={!f.title.trim() || !f.slug.trim()}>Save</Button>
            <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
