'use client';

// euginemicah.tech Control Room — Supabase auth (ADMIN_EMAIL allowlist server-side),
// 90-day calendar, editor, LinkedIn connect, queue, performance charts.
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

type Post = {
  id: number; scheduled_at: string; pillar: string; series: string; format: string;
  hook: string; body: string; cta: string; repurpose: string; status: string;
  linkedin_post_id: string | null; error: string | null; retries: number;
  performance: { impressions?: number; reactions?: number; comments?: number };
};

const PILLAR_COLORS: Record<string, string> = {
  book: '#ff15a6', origin: '#ffd60a', media: '#2b3bff', tour: '#00c9b7',
  builder: '#a31fff', newsletter: '#fff6e9', review: '#8d879c',
};
const STATUS_COLORS: Record<string, string> = {
  draft: '#8d879c', approved: '#00c9b7', queued: '#ffd60a', posted: '#2b3bff', failed: '#ff4d4d', skipped: '#555',
};

let supa: SupabaseClient | null = null;
function browserSupa(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!supa) supa = createClient(url, key);
  return supa;
}

export default function AdminClient() {
  const sb = browserSupa();
  const [session, setSession] = useState<{ token: string; email: string } | null>(null);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [tab, setTab] = useState<'calendar' | 'queue' | 'performance'>('calendar');
  const [posts, setPosts] = useState<Post[]>([]);
  const [status, setStatus] = useState<Record<string, unknown> | null>(null);
  const [edit, setEdit] = useState<Post | null>(null);
  const [toast, setToast] = useState('');
  const say = (m: string) => { setToast(m); setTimeout(() => setToast(''), 3500); };

  const api = useCallback(async (path: string, opts: RequestInit = {}) => {
    const r = await fetch(path, {
      ...opts,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.token}`, ...(opts.headers || {}) },
    });
    return { status: r.status, data: await r.json().catch(() => ({})) };
  }, [session]);

  useEffect(() => {
    sb?.auth.getSession().then(({ data }) => {
      if (data.session) setSession({ token: data.session.access_token, email: data.session.user.email || '' });
    });
  }, [sb]);

  const reload = useCallback(async () => {
    const { status: s, data } = await api('/api/admin/posts');
    if (s === 200) setPosts(data.posts || []);
    else if (s === 401) { setSession(null); setErr('Not authorized for this control room.'); }
    else say('⚠ ' + (data.error || 'load failed'));
    const st = await api('/api/admin/status');
    if (st.status === 200) setStatus(st.data);
  }, [api]);

  useEffect(() => { if (session) reload(); }, [session, reload]);

  async function login() {
    setErr('');
    if (!sb) { setErr('Supabase env vars missing — set NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY.'); return; }
    const { data, error } = await sb.auth.signInWithPassword({ email, password: pw });
    if (error || !data.session) { setErr(error?.message || 'login failed'); return; }
    setSession({ token: data.session.access_token, email: data.session.user.email || '' });
  }

  async function save(p: Partial<Post> & { id: number }) {
    const { status: s, data } = await api('/api/admin/posts', { method: 'PATCH', body: JSON.stringify(p) });
    if (s === 200) { say('✓ saved'); reload(); } else say('⚠ ' + (data.error || 'save failed'));
  }
  async function postNow(id: number) {
    say('Posting…');
    const { status: s, data } = await api('/api/admin/post-now', { method: 'POST', body: JSON.stringify({ id }) });
    say(s === 200 ? '✓ posted to LinkedIn' : '⚠ ' + (data.error || 'post failed'));
    reload();
  }

  const upcoming = useMemo(() => posts.filter((p) => new Date(p.scheduled_at) > new Date() && ['approved', 'queued', 'draft'].includes(p.status)).slice(0, 40), [posts]);
  const next7 = useMemo(() => upcoming.filter((p) => new Date(p.scheduled_at).getTime() < Date.now() + 7 * 86400_000), [upcoming]);

  if (!session) {
    return (
      <Shell>
        <div className="em-card" style={{ maxWidth: 420, margin: '12vh auto', padding: 28 }}>
          <div className="em-mark" style={{ color: 'var(--pink)', fontSize: 22 }}>on air · admin</div>
          <h1 className="em-smash" style={{ fontSize: 34, margin: '4px 0 18px' }}>Control Room</h1>
          <input className="em-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="em-input" style={{ marginTop: 10 }} type="password" placeholder="Password" value={pw}
            onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && login()} />
          {err && <div style={{ color: '#ff6b6b', fontSize: 13, marginTop: 10 }}>{err}</div>}
          <button className="em-btn" style={{ width: '100%', marginTop: 16 }} onClick={login}>Sign in</button>
          <p style={{ color: '#8d879c', fontSize: 12, marginTop: 14 }}>
            Supabase email+password. Only the allow-listed admin email gets past the API.
          </p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 18 }}>
        <h1 className="em-smash" style={{ fontSize: 30, margin: 0 }}>Control Room</h1>
        <Chip ok={!!status?.supabase} label="Supabase" />
        <Chip ok={!!status?.linkedin_app} label="LinkedIn app" />
        <Chip ok={!!status?.linkedin_connected} label="LinkedIn connected" />
        <div style={{ flex: 1 }} />
        <a className="em-btn-ghost" href="/admin/linkedin-audit">LinkedIn Audit →</a>
        {!status?.linkedin_connected && (
          <a className="em-btn" href={`/api/linkedin/auth?token=${session.token}`}>Connect LinkedIn</a>
        )}
        <button className="em-btn-ghost" onClick={() => { sb?.auth.signOut(); setSession(null); }}>Sign out</button>
      </header>

      <nav style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {(['calendar', 'queue', 'performance'] as const).map((t) => (
          <button key={t} className={tab === t ? 'em-btn' : 'em-btn-ghost'} onClick={() => setTab(t)}>
            {t === 'calendar' ? '90-Day Calendar' : t === 'queue' ? 'Queue (7 days)' : 'Performance'}
          </button>
        ))}
      </nav>

      {toast && <div className="em-card" style={{ position: 'fixed', top: 14, right: 14, zIndex: 60, padding: '10px 16px', background: 'var(--pink)', color: '#fff', fontWeight: 800 }}>{toast}</div>}

      {tab === 'calendar' && <CalendarTab posts={posts} onEdit={setEdit} onSave={save} onPostNow={postNow} />}
      {tab === 'queue' && <QueueTab posts={next7} onEdit={setEdit} onPostNow={postNow} />}
      {tab === 'performance' && <PerformanceTab posts={posts} />}

      {edit && <Editor post={edit} onClose={() => setEdit(null)} onSave={(p) => { save(p); setEdit(null); }} />}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div style={{ minHeight: '100vh', padding: '28px 18px 80px', maxWidth: 1200, margin: '0 auto' }}>{children}</div>;
}
function Chip({ ok, label }: { ok: boolean; label: string }) {
  return <span className="em-chip" style={{ background: ok ? 'var(--cyan)' : '#332e3e', color: ok ? '#04211d' : '#8d879c' }}>{label}{ok ? ' ✓' : ''}</span>;
}
function Pill({ text, color }: { text: string; color: string }) {
  return <span className="em-chip" style={{ background: color, color: '#0c0a10' }}>{text}</span>;
}

function CalendarTab({ posts, onEdit, onSave, onPostNow }: {
  posts: Post[]; onEdit: (p: Post) => void; onSave: (p: Partial<Post> & { id: number }) => void; onPostNow: (id: number) => void;
}) {
  const [filter, setFilter] = useState('');
  const shown = posts.filter((p) => !filter || p.pillar === filter);
  const pillars = Array.from(new Set(posts.map((p) => p.pillar)));
  return (
    <div className="em-card" style={{ padding: 16 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <button className={!filter ? 'em-btn' : 'em-btn-ghost'} onClick={() => setFilter('')}>All ({posts.length})</button>
        {pillars.map((pl) => (
          <button key={pl} className={filter === pl ? 'em-btn' : 'em-btn-ghost'} onClick={() => setFilter(pl)}>{pl}</button>
        ))}
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead><tr>{['when (EAT)', 'series', 'pillar', 'hook', 'status', 'actions'].map((h) => <th key={h} className="em-th">{h}</th>)}</tr></thead>
          <tbody>
            {shown.map((p) => (
              <tr key={p.id} style={{ cursor: 'pointer' }}>
                <td className="em-td" style={{ whiteSpace: 'nowrap' }}>{new Date(p.scheduled_at).toLocaleString('en-KE', { timeZone: 'Africa/Nairobi', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                <td className="em-td">{p.series}</td>
                <td className="em-td"><Pill text={p.pillar} color={PILLAR_COLORS[p.pillar] || '#888'} /></td>
                <td className="em-td" style={{ maxWidth: 380 }} onClick={() => onEdit(p)}>{p.hook.split('\n')[0].slice(0, 90)}{p.error && <div style={{ color: '#ff6b6b', fontSize: 11 }}>⚠ {p.error.slice(0, 80)}</div>}</td>
                <td className="em-td"><Pill text={p.status} color={STATUS_COLORS[p.status] || '#888'} /></td>
                <td className="em-td" style={{ whiteSpace: 'nowrap' }}>
                  <button className="em-btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => onEdit(p)}>Edit</button>{' '}
                  {p.status === 'draft' && <button className="em-btn-ghost" style={{ padding: '4px 10px', fontSize: 12, color: 'var(--cyan)' }} onClick={() => onSave({ id: p.id, status: 'approved' })}>Approve</button>}{' '}
                  {['approved', 'queued', 'failed', 'draft'].includes(p.status) && p.pillar !== 'review' &&
                    <button className="em-btn-ghost" style={{ padding: '4px 10px', fontSize: 12, color: 'var(--pink)' }} onClick={() => { if (confirm('Post to LinkedIn right now?')) onPostNow(p.id); }}>Post now</button>}
                </td>
              </tr>
            ))}
            {!shown.length && <tr><td className="em-td" colSpan={6}>No posts — run the Supabase migration + seed (see FINAL_CHECKLIST.md).</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QueueTab({ posts, onEdit, onPostNow }: { posts: Post[]; onEdit: (p: Post) => void; onPostNow: (id: number) => void }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div className="em-card" style={{ padding: 12, fontSize: 13, color: '#b7b1c4' }}>
        The cron runs every 15 minutes and publishes anything <b style={{ color: 'var(--cyan)' }}>approved</b> whose time has passed. Drafts are skipped until you approve them.
      </div>
      {posts.map((p) => (
        <div key={p.id} className="em-card" style={{ padding: 16 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <Pill text={p.pillar} color={PILLAR_COLORS[p.pillar] || '#888'} />
            <Pill text={p.status} color={STATUS_COLORS[p.status] || '#888'} />
            <span style={{ color: '#8d879c', fontSize: 13 }}>{new Date(p.scheduled_at).toLocaleString('en-KE', { timeZone: 'Africa/Nairobi', weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })} EAT · {p.series}</span>
            <div style={{ flex: 1 }} />
            <button className="em-btn-ghost" onClick={() => onEdit(p)}>Edit</button>
            {p.pillar !== 'review' && <button className="em-btn" onClick={() => { if (confirm('Post now?')) onPostNow(p.id); }}>Post now</button>}
          </div>
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--f-body)', fontSize: 14, marginTop: 12, color: 'var(--cream)' }}>{p.hook}{'\n\n'}{p.body.slice(0, 400)}{p.body.length > 400 ? '…' : ''}</pre>
        </div>
      ))}
      {!posts.length && <div className="em-card" style={{ padding: 16 }}>Nothing due in the next 7 days.</div>}
    </div>
  );
}

function PerformanceTab({ posts }: { posts: Post[] }) {
  const posted = posts.filter((p) => p.status === 'posted');
  const byPillar: Record<string, { n: number; imp: number; rea: number; com: number }> = {};
  for (const p of posted) {
    const k = p.pillar; const perf = p.performance || {};
    byPillar[k] ||= { n: 0, imp: 0, rea: 0, com: 0 };
    byPillar[k].n++; byPillar[k].imp += perf.impressions || 0; byPillar[k].rea += perf.reactions || 0; byPillar[k].com += perf.comments || 0;
  }
  const entries = Object.entries(byPillar);
  const max = Math.max(1, ...entries.map(([, v]) => v.imp));
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div className="em-card" style={{ padding: 16 }}>
        <h3 className="em-smash" style={{ margin: '0 0 12px', fontSize: 18 }}>Pillar performance (logged impressions)</h3>
        {entries.length === 0 && <div style={{ color: '#8d879c', fontSize: 13 }}>Nothing posted yet. After each post goes live, open it in the calendar and log impressions/reactions/comments — LinkedIn does not expose personal analytics via API, so this manual loop is how the 90-day plan gets tuned.</div>}
        {entries.map(([k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ width: 90, fontSize: 12, fontWeight: 800, textTransform: 'uppercase' }}>{k}</span>
            <div style={{ flex: 1, background: '#17141d', borderRadius: 6, height: 22 }}>
              <div style={{ width: `${(v.imp / max) * 100}%`, minWidth: 4, height: '100%', borderRadius: 6, background: PILLAR_COLORS[k] || '#888' }} />
            </div>
            <span style={{ fontSize: 12, color: '#b7b1c4', width: 210 }}>{v.n} posts · {v.imp.toLocaleString()} imp · {v.rea} rea · {v.com} com</span>
          </div>
        ))}
      </div>
      <div className="em-card" style={{ padding: 16 }}>
        <h3 className="em-smash" style={{ margin: '0 0 10px', fontSize: 18 }}>Posted log</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead><tr>{['date', 'pillar', 'hook', 'linkedin id', 'impressions', 'reactions', 'comments'].map((h) => <th key={h} className="em-th">{h}</th>)}</tr></thead>
            <tbody>
              {posted.map((p) => (
                <tr key={p.id}>
                  <td className="em-td">{p.scheduled_at.slice(0, 10)}</td>
                  <td className="em-td">{p.pillar}</td>
                  <td className="em-td" style={{ maxWidth: 300 }}>{p.hook.split('\n')[0].slice(0, 70)}</td>
                  <td className="em-td" style={{ fontSize: 11, color: '#8d879c' }}>{p.linkedin_post_id || '—'}</td>
                  <td className="em-td">{p.performance?.impressions ?? '—'}</td>
                  <td className="em-td">{p.performance?.reactions ?? '—'}</td>
                  <td className="em-td">{p.performance?.comments ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Editor({ post, onClose, onSave }: { post: Post; onClose: () => void; onSave: (p: Partial<Post> & { id: number }) => void }) {
  const [p, setP] = useState({ ...post, performance: post.performance || {} });
  const set = (k: string, v: unknown) => setP((x) => ({ ...x, [k]: v }));
  const setPerf = (k: string, v: string) => setP((x) => ({ ...x, performance: { ...x.performance, [k]: v === '' ? undefined : +v } }));
  const localDt = new Date(p.scheduled_at);
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.72)', zIndex: 50, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '5vh 14px' }} onClick={onClose}>
      <div className="em-card" style={{ maxWidth: 720, width: '100%', padding: 22 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
          <h3 className="em-smash" style={{ margin: 0, fontSize: 20 }}>Edit #{p.id}</h3>
          <Pill text={p.pillar} color={PILLAR_COLORS[p.pillar] || '#888'} />
          <div style={{ flex: 1 }} />
          <button className="em-btn-ghost" onClick={onClose}>Close</button>
        </div>
        <label style={lbl}>Scheduled (your local time)</label>
        <input className="em-input" type="datetime-local"
          value={new Date(localDt.getTime() - localDt.getTimezoneOffset() * 60000).toISOString().slice(0, 16)}
          onChange={(e) => set('scheduled_at', new Date(e.target.value).toISOString())} />
        <label style={lbl}>Hook (first 2 lines — the scroll-stopper)</label>
        <textarea className="em-input" rows={2} value={p.hook} onChange={(e) => set('hook', e.target.value)} />
        <label style={lbl}>Body</label>
        <textarea className="em-input" rows={9} value={p.body} onChange={(e) => set('body', e.target.value)} />
        <label style={lbl}>CTA</label>
        <textarea className="em-input" rows={2} value={p.cta} onChange={(e) => set('cta', e.target.value)} />
        <label style={lbl}>Repurpose note (newsletter)</label>
        <input className="em-input" value={p.repurpose} onChange={(e) => set('repurpose', e.target.value)} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 12 }}>
          <div><label style={lbl}>Impressions</label><input className="em-input" type="number" value={p.performance.impressions ?? ''} onChange={(e) => setPerf('impressions', e.target.value)} /></div>
          <div><label style={lbl}>Reactions</label><input className="em-input" type="number" value={p.performance.reactions ?? ''} onChange={(e) => setPerf('reactions', e.target.value)} /></div>
          <div><label style={lbl}>Comments</label><input className="em-input" type="number" value={p.performance.comments ?? ''} onChange={(e) => setPerf('comments', e.target.value)} /></div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
          <button className="em-btn" onClick={() => onSave({ id: p.id, scheduled_at: p.scheduled_at, hook: p.hook, body: p.body, cta: p.cta, repurpose: p.repurpose, performance: p.performance })}>Save</button>
          {p.status === 'draft' && <button className="em-btn-ghost" style={{ color: 'var(--cyan)' }} onClick={() => onSave({ id: p.id, status: 'approved', hook: p.hook, body: p.body, cta: p.cta })}>Save & Approve</button>}
          {p.status !== 'draft' && <button className="em-btn-ghost" onClick={() => onSave({ id: p.id, status: 'draft' })}>Back to draft</button>}
          <button className="em-btn-ghost" style={{ color: '#ff6b6b' }} onClick={() => onSave({ id: p.id, status: 'skipped' })}>Skip</button>
        </div>
      </div>
    </div>
  );
}
const lbl: React.CSSProperties = { display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.07em', color: '#8d879c', margin: '12px 0 5px', fontWeight: 700 };
