import { supaPublic } from './supabase-public';

// Shape mirrors the `shows` table (supabase/migrations/002_site_rebuild.sql,
// details/logo_url added in 005_shows_details_and_logo.sql).
export type Show = {
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
  details: string[];
  logo_url: string;
};

// Fails soft, same reasoning as lib/blog.ts's getPublishedPosts: an
// unconfigured client or an empty table should render a graceful empty
// state on /work, not a 500 or a failed build.
export async function getPublishedShows(): Promise<Show[]> {
  const client = supaPublic();
  if (!client) return [];
  try {
    const { data, error } = await client
      .from('shows')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true });
    if (error || !data) return [];
    return data as Show[];
  } catch {
    return [];
  }
}
