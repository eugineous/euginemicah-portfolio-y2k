import { supaPublic } from './supabase-public';

// Shape mirrors the `now_items` table (supabase/migrations/006_now_items.sql).
export type NowItem = {
  id: number;
  label: string;
  text: string;
  sort_order: number;
  status: 'draft' | 'published';
  updated_at: string;
};

// Fails soft, same reasoning as lib/blog.ts / lib/shows.ts.
export async function getPublishedNowItems(): Promise<NowItem[]> {
  const client = supaPublic();
  if (!client) return [];
  try {
    const { data, error } = await client
      .from('now_items')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true });
    if (error || !data) return [];
    return data as NowItem[];
  } catch {
    return [];
  }
}

export function formatUpdatedLabel(items: NowItem[]): string {
  const latest = items.reduce<string | null>((max, it) => {
    if (!it.updated_at) return max;
    return !max || it.updated_at > max ? it.updated_at : max;
  }, null);
  if (!latest) return '';
  return `Updated ${new Date(latest).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
}
