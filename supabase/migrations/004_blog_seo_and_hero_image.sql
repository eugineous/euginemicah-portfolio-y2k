-- 2026-08 rebrand: SEO checklist + real hero-image upload for the
-- /control-room blog editor, per design_handoff_full_site_backend's CMS
-- spec (Admin.dc.html's checklist rules: title 30-60 chars, meta
-- description 120-160 chars, focus keyword in title, focus keyword in
-- body). Additive only -- no existing column is altered or dropped.

alter table blog_posts
  add column if not exists hero_image_url text,
  add column if not exists focus_keyword text not null default '',
  add column if not exists seo_title text not null default '',
  add column if not exists seo_description text not null default '';

-- Public bucket for blog hero images: content is meant to be publicly
-- servable (it's rendered on /blog and /news), same reasoning as any CDN
-- image host. Uploads only ever happen server-side via the service-role
-- client in app/api/cms/blog/upload-image/route.ts, gated by the same
-- CMS_ADMIN_EMAILS allowlist as the rest of /control-room -- so a public
-- bucket does not mean a publicly writable one.
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'public can read blog images'
  ) then
    create policy "public can read blog images"
      on storage.objects for select
      using (bucket_id = 'blog-images');
  end if;
end $$;
