'use client';

// euginemicah.tech /control-room -- light admin CMS, separate from /admin
// (the pre-existing LinkedIn tool). Auth is Google OAuth via Supabase
// (supabase.auth.signInWithOAuth({ provider: 'google' }), full-page
// redirect -- no popup, no extra CSP entries needed for sign-in). The
// server-side allowlist check (CMS_ADMIN_EMAILS env + cms_admin_emails
// table, see lib/cms-auth.ts) is the real gate -- every /api/cms/* route
// re-verifies it independently. The client-side "authorized" check below is
// UX only (avoid flashing the dashboard at a signed-in-but-not-allowlisted
// user); it is never trusted alone.
import { useCallback, useEffect, useState } from 'react';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { Button, Card, Toast } from './ui';
import { BlogTab } from './BlogTab';
import { ShowsTab } from './ShowsTab';
import { MessagesTab } from './MessagesTab';
import { OrdersTab } from './OrdersTab';
import { NewsletterTab } from './NewsletterTab';

type Tab = 'blog' | 'shows' | 'messages' | 'orders' | 'newsletter';
const TABS: { id: Tab; label: string }[] = [
  { id: 'blog', label: 'Blog' },
  { id: 'shows', label: 'Shows' },
  { id: 'messages', label: 'Messages' },
  { id: 'orders', label: 'Book Orders' },
  { id: 'newsletter', label: 'Newsletter' },
];

let supa: SupabaseClient | null = null;
function browserSupa(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!supa) supa = createClient(url, key);
  return supa;
}

export default function ControlRoomClient() {
  const sb = browserSupa();
  const [checking, setChecking] = useState(true);
  const [session, setSession] = useState<{ token: string; email: string } | null>(null);
  const [authorized, setAuthorized] = useState<boolean | null>(null); // null = still checking server-side
  const [tab, setTab] = useState<Tab>('blog');
  const [toast, setToast] = useState('');
  const say = useCallback((m: string) => { setToast(m); setTimeout(() => setToast(''), 3500); }, []);

  // Initial session pickup (covers both a returning session and the
  // redirect back from Google, since supabase-js parses the auth fragment
  // in the URL on init) plus live updates via onAuthStateChange.
  useEffect(() => {
    if (!sb) { setChecking(false); return; }
    sb.auth.getSession().then(({ data }) => {
      if (data.session) setSession({ token: data.session.access_token, email: data.session.user.email || '' });
      setChecking(false);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_event, sess) => {
      setSession(sess ? { token: sess.access_token, email: sess.user.email || '' } : null);
    });
    return () => sub.subscription.unsubscribe();
  }, [sb]);

  const api = useCallback(async (path: string, opts: RequestInit = {}) => {
    const r = await fetch(path, {
      ...opts,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.token}`, ...(opts.headers || {}) },
    });
    return { status: r.status, data: await r.json().catch(() => ({})) };
  }, [session]);

  // Server-side allowlist check -- fires once a session exists. Any cheap
  // GET works as the probe; blog list is as good as any.
  useEffect(() => {
    if (!session) { setAuthorized(null); return; }
    let cancelled = false;
    setAuthorized(null);
    (async () => {
      const { status } = await api('/api/cms/blog');
      if (cancelled) return;
      setAuthorized(status !== 401);
    })();
    return () => { cancelled = true; };
  }, [session, api]);

  async function signIn() {
    if (!sb) return;
    await sb.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/control-room` },
    });
  }
  async function signOut() {
    await sb?.auth.signOut();
    setSession(null);
    setAuthorized(null);
  }

  if (checking) {
    return <Shell><Centered><span style={{ opacity: 0.6 }}>Loading…</span></Centered></Shell>;
  }

  if (!session) {
    return (
      <Shell>
        <Centered>
          <Card style={{ maxWidth: 400, width: '100%', padding: 28, textAlign: 'center' }}>
            <div style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--a)', marginBottom: 6 }}>
              control room
            </div>
            <h1 style={{ margin: '0 0 16px', fontSize: 24, fontWeight: 800 }}>Sign in</h1>
            {!sb ? (
              <p style={{ fontSize: 13, opacity: 0.7 }}>Supabase env vars aren&apos;t configured.</p>
            ) : (
              <Button onClick={signIn} style={{ width: '100%', padding: '10px 16px' }}>Sign in with Google</Button>
            )}
            <p style={{ fontSize: 12, opacity: 0.55, marginTop: 16 }}>
              Access is limited to allow-listed emails. Signing in doesn&apos;t grant access by itself.
            </p>
          </Card>
        </Centered>
      </Shell>
    );
  }

  if (authorized === null) {
    return <Shell><Centered><span style={{ opacity: 0.6 }}>Checking access…</span></Centered></Shell>;
  }

  if (authorized === false) {
    return (
      <Shell>
        <Centered>
          <Card style={{ maxWidth: 420, width: '100%', padding: 28, textAlign: 'center' }}>
            <h1 style={{ margin: '0 0 10px', fontSize: 22, fontWeight: 800 }}>Access denied</h1>
            <p style={{ fontSize: 14, opacity: 0.75, margin: '0 0 20px' }}>
              {session.email} is signed in but isn&apos;t on the control-room allowlist.
            </p>
            <Button variant="ghost" onClick={signOut}>Sign out</Button>
          </Card>
        </Centered>
      </Shell>
    );
  }

  return (
    <Shell>
      <header style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>Control Room</h1>
        <span style={{ fontSize: 12, opacity: 0.6 }}>{session.email}</span>
        <div style={{ flex: 1 }} />
        <Button variant="ghost" onClick={signOut}>Sign out</Button>
      </header>

      <nav style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {TABS.map((t) => (
          <Button key={t.id} variant={tab === t.id ? 'primary' : 'ghost'} onClick={() => setTab(t.id)}>{t.label}</Button>
        ))}
      </nav>

      <Toast message={toast} />

      {tab === 'blog' && <BlogTab api={api} say={say} />}
      {tab === 'shows' && <ShowsTab api={api} say={say} />}
      {tab === 'messages' && <MessagesTab api={api} say={say} />}
      {tab === 'orders' && <OrdersTab api={api} say={say} />}
      {tab === 'newsletter' && <NewsletterTab api={api} say={say} />}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font-bricolage), sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 20px 80px' }}>{children}</div>
    </div>
  );
}
function Centered({ children }: { children: React.ReactNode }) {
  return <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>;
}
