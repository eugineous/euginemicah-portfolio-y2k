import { supaPublic } from './supabase-public';

// Shape mirrors the `blog_posts` table (supabase/migrations/002_site_rebuild.sql).
export type BlogPost = {
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
  updated_at: string;
};

// Both helpers fail soft: if env vars aren't configured yet, the anon client
// query errors, or the table is simply empty (all real possibilities before
// this migration + its seed data have actually been run against the live
// DB), they return an empty result instead of throwing -- so the pages that
// call them can render a graceful "nothing published yet" state rather than
// a 500 or a failed build.

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const client = supaPublic();
  if (!client) return [];
  try {
    const { data, error } = await client
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    if (error || !data) return [];
    return data as BlogPost[];
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const client = supaPublic();
  if (!client) return null;
  try {
    const { data, error } = await client
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();
    if (error || !data) return null;
    return data as BlogPost;
  } catch {
    return null;
  }
}

// Deterministic category -> {bg, text} color assignment, reused by the list
// grid, category pills and the detail page's badge so the same category
// always renders in the same accent across both. Cycles the three brand
// accents (--a/--b/--c) via a simple string hash -- no per-category config
// to maintain as categories are added/renamed in the CMS.
const CATEGORY_PALETTE: { bg: string; color: string }[] = [
  { bg: 'var(--a)', color: '#FAF4EA' },
  { bg: 'var(--b)', color: '#FAF4EA' },
  { bg: 'var(--c)', color: '#1B1714' },
];

export function categoryStyle(category: string): { bg: string; color: string } {
  let hash = 0;
  for (let i = 0; i < category.length; i++) hash = (hash * 31 + category.charCodeAt(i)) >>> 0;
  return CATEGORY_PALETTE[hash % CATEGORY_PALETTE.length];
}

export function formatPostDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}
