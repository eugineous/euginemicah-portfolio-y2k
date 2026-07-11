import { supaAdmin } from './supabase';

// LinkedIn OAuth 2.0 (3-legged, w_member_social) + Posts API.
// Env: LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRET, NEXT_PUBLIC_SITE_URL.
// Docs: https://learn.microsoft.com/linkedin/marketing/community-management/shares/posts-api

const API_VERSION = '202405';

export function linkedinConfigured(): boolean {
  return !!(process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET);
}

export function redirectUri(): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://euginemicah.tech';
  return `${base}/api/linkedin/callback`;
}

export function authUrl(state: string): string {
  const p = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.LINKEDIN_CLIENT_ID!,
    redirect_uri: redirectUri(),
    state,
    scope: 'openid profile w_member_social',
  });
  return `https://www.linkedin.com/oauth/v2/authorization?${p}`;
}

export async function exchangeCode(code: string) {
  const r = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: process.env.LINKEDIN_CLIENT_ID!,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
      redirect_uri: redirectUri(),
    }),
  });
  if (!r.ok) throw new Error(`token exchange failed: ${r.status} ${await r.text()}`);
  // { access_token, expires_in, refresh_token?, refresh_token_expires_in? }
  return r.json();
}

export async function refreshToken(refresh_token: string) {
  const r = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
      client_id: process.env.LINKEDIN_CLIENT_ID!,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  });
  if (!r.ok) throw new Error(`token refresh failed: ${r.status}`);
  return r.json();
}

// Fetch the member URN (sub) via OpenID userinfo.
export async function fetchMemberUrn(accessToken: string): Promise<string> {
  const r = await fetch('https://api.linkedin.com/v2/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!r.ok) throw new Error(`userinfo failed: ${r.status}`);
  const j = await r.json();
  return `urn:li:person:${j.sub}`;
}

// Load a valid token from Supabase, refreshing if it expires within 10 min.
export async function getValidToken(): Promise<{ token: string; urn: string } | null> {
  const db = supaAdmin();
  if (!db) return null;
  const { data } = await db.from('linkedin_tokens').select('*').eq('id', 1).maybeSingle();
  if (!data?.access_token) return null;
  const soon = Date.now() + 10 * 60_000;
  if (new Date(data.expires_at).getTime() > soon) {
    return { token: data.access_token, urn: data.member_urn };
  }
  if (!data.refresh_token) return null; // token expired, no refresh — reconnect needed
  const fresh = await refreshToken(data.refresh_token);
  const expires_at = new Date(Date.now() + (fresh.expires_in || 3600) * 1000).toISOString();
  await db.from('linkedin_tokens').update({
    access_token: fresh.access_token,
    refresh_token: fresh.refresh_token || data.refresh_token,
    expires_at,
    updated_at: new Date().toISOString(),
  }).eq('id', 1);
  return { token: fresh.access_token, urn: data.member_urn };
}

// Publish a text post as the member. Returns the LinkedIn post id (URN).
export async function publishPost(text: string): Promise<string> {
  const auth = await getValidToken();
  if (!auth) throw new Error('linkedin_not_connected');
  const r = await fetch('https://api.linkedin.com/rest/posts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth.token}`,
      'Content-Type': 'application/json',
      'LinkedIn-Version': API_VERSION,
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify({
      author: auth.urn,
      commentary: text,
      visibility: 'PUBLIC',
      distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false,
    }),
  });
  if (r.status === 201) {
    return r.headers.get('x-restli-id') || r.headers.get('x-linkedin-id') || 'unknown';
  }
  throw new Error(`linkedin_post_failed:${r.status}:${(await r.text()).slice(0, 300)}`);
}
