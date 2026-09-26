-- Highlight Creations — Supabase schema (full)
-- Free tier targets:
--   • Database ≤ 500 MB
--   • File Storage ≤ 1 GB (shared bucket: media)
--   • Egress ≤ 5 GB / month
-- Run in Supabase SQL Editor. No Cloudflare / R2 required.

-- =============================================================================
-- EXTENSIONS
-- =============================================================================
create extension if not exists "pgcrypto";

-- =============================================================================
-- TABLES (keep lean for 500 MB DB)
-- =============================================================================

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz default now()
);

create table if not exists site_stats (
  id uuid primary key default gen_random_uuid(),
  weddings_done text not null default '1,043+',
  google_rating text not null default '4.8/5',
  venue_partners text not null default '28,363+',
  updated_at timestamptz default now()
);

create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  site_name text not null default 'Highlight Creations',
  cta_text text not null default 'Start my wedding planning',
  venue_cta_text text not null default 'Check availability',
  nav_items jsonb not null default '[]'::jsonb,
  phone text,
  whatsapp text,
  email text,
  address text,
  updated_at timestamptz default now()
);

create table if not exists banners (
  id uuid primary key default gen_random_uuid(),
  media_url text not null,
  media_type text not null default 'image' check (media_type in ('image', 'video')),
  couple_name text not null default '',
  location text not null default '',
  date_label text not null default '',
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists reels (
  id uuid primary key default gen_random_uuid(),
  instagram_url text not null,
  couple_name text not null,
  location text not null default '',
  view_count int not null default 0,
  thumbnail_url text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  reviewer_name text not null,
  handle text not null default '',
  timeframe text not null default '',
  rating int not null default 5 check (rating between 1 and 5),
  review_text text not null,
  avatar_color text not null default '#72011b',
  source text not null default 'google',
  sort_order int not null default 0,
  is_featured boolean not null default true,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  cover_image text,
  excerpt text not null default '',
  body text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tracks files in Storage (blog covers + banner videos/images)
-- App enforces: blog images ≤ 5 MB, banner images ≤ 5 MB, banner videos ≤ 80 MB
create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket text not null default 'media',
  path text not null,
  public_url text not null,
  file_name text not null,
  mime_type text not null,
  size_bytes int not null check (size_bytes > 0 and size_bytes <= 83886080), -- 80 MB hard cap
  purpose text not null default 'blog_cover'
    check (purpose in ('blog_cover', 'blog_inline', 'venue', 'portfolio', 'banner', 'other')),
  blog_post_id uuid references blog_posts(id) on delete set null,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz default now(),
  unique (bucket, path)
);

create index if not exists media_assets_blog_post_id_idx on media_assets (blog_post_id);
create index if not exists media_assets_purpose_idx on media_assets (purpose);

create table if not exists venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  city text not null,
  city_id uuid,
  state text not null default '',
  cover_image text not null,
  gallery jsonb not null default '[]'::jsonb,
  capacity_min int not null default 50,
  capacity_max int not null default 500,
  price_min int not null default 0,
  price_max int not null default 0,
  amenities jsonb not null default '[]'::jsonb,
  description text not null default '',
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

create table if not exists venue_cities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  heading text not null,
  subheading text not null default '',
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now()
);

-- Link venues.city_id → venue_cities (added after both tables exist)
do $$ begin
  alter table venues
    add constraint venues_city_id_fkey
    foreign key (city_id) references venue_cities(id) on delete set null;
exception when duplicate_object then null;
end $$;

create index if not exists venues_city_id_idx on venues (city_id);

create table if not exists cta_banners (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text not null default 'Book your venue',
  subtitle text not null default 'Pick your date. Set your budget. Choose your venue.',
  media_url text not null,
  media_type text not null default 'image' check (media_type in ('image', 'video')),
  button_text text not null default 'Check availability',
  is_active boolean not null default true,
  updated_at timestamptz default now()
);

create table if not exists portfolio (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  couple_name text not null,
  location text not null,
  date_label text not null default '',
  cover_image text not null,
  gallery jsonb not null default '[]'::jsonb,
  description text not null default '',
  is_featured boolean not null default false,
  created_at timestamptz default now()
);

create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  wedding_date date,
  city text,
  budget text,
  message text,
  source text not null default 'cta',
  venue_id uuid references venues(id) on delete set null,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz default now()
);

create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int not null default 0
);

-- Lightweight ping log (optional; keep-alive cron can write here)
create table if not exists keep_alive_pings (
  id bigserial primary key,
  pinged_at timestamptz not null default now(),
  source text not null default 'cron'
);

-- =============================================================================
-- RLS
-- =============================================================================

alter table profiles enable row level security;
alter table site_stats enable row level security;
alter table site_settings enable row level security;
alter table banners enable row level security;
alter table reels enable row level security;
alter table reviews enable row level security;
alter table blog_posts enable row level security;
alter table media_assets enable row level security;
alter table venues enable row level security;
alter table venue_cities enable row level security;
alter table cta_banners enable row level security;
alter table portfolio enable row level security;
alter table enquiries enable row level security;
alter table faqs enable row level security;
alter table keep_alive_pings enable row level security;

do $$
begin
  drop policy if exists "Admin read profiles" on profiles;
  drop policy if exists "Public read banners" on banners;
  drop policy if exists "Public read reels" on reels;
  drop policy if exists "Public read reviews" on reviews;
  drop policy if exists "Public read published posts" on blog_posts;
  drop policy if exists "Public read venues" on venues;
  drop policy if exists "Public read venue_cities" on venue_cities;
  drop policy if exists "Public read cta_banners" on cta_banners;
  drop policy if exists "Public read portfolio" on portfolio;
  drop policy if exists "Public read stats" on site_stats;
  drop policy if exists "Public read settings" on site_settings;
  drop policy if exists "Public read faqs" on faqs;
  drop policy if exists "Public insert enquiries" on enquiries;
  drop policy if exists "Public read media assets" on media_assets;
  drop policy if exists "Public insert keep alive" on keep_alive_pings;
  drop policy if exists "Admin all banners" on banners;
  drop policy if exists "Admin all reels" on reels;
  drop policy if exists "Admin all reviews" on reviews;
  drop policy if exists "Admin all posts" on blog_posts;
  drop policy if exists "Admin all media assets" on media_assets;
  drop policy if exists "Admin all venues" on venues;
  drop policy if exists "Admin all venue_cities" on venue_cities;
  drop policy if exists "Admin all cta_banners" on cta_banners;
  drop policy if exists "Admin all portfolio" on portfolio;
  drop policy if exists "Admin all stats" on site_stats;
  drop policy if exists "Admin all settings" on site_settings;
  drop policy if exists "Admin all enquiries" on enquiries;
  drop policy if exists "Admin all faqs" on faqs;
  drop policy if exists "Admin all keep alive" on keep_alive_pings;
end $$;

create policy "Public read banners" on banners for select using (is_active = true);
create policy "Public read reels" on reels for select using (is_active = true);
create policy "Public read reviews" on reviews for select using (is_active = true);
create policy "Public read published posts" on blog_posts for select using (status = 'published');
create policy "Public read venues" on venues for select using (is_active = true);
create policy "Public read venue_cities" on venue_cities for select using (is_active = true);
create policy "Public read cta_banners" on cta_banners for select using (is_active = true);
create policy "Public read portfolio" on portfolio for select using (true);
create policy "Public read stats" on site_stats for select using (true);
create policy "Public read settings" on site_settings for select using (true);
create policy "Public read faqs" on faqs for select using (true);
create policy "Public insert enquiries" on enquiries for insert with check (true);
create policy "Public read media assets" on media_assets for select using (true);
-- Anon keep-alive inserts (cron uses anon key)
create policy "Public insert keep alive" on keep_alive_pings for insert with check (true);

create policy "Admin all banners" on banners for all to authenticated using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "Admin all reels" on reels for all to authenticated using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "Admin all reviews" on reviews for all to authenticated using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "Admin all posts" on blog_posts for all to authenticated using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "Admin all media assets" on media_assets for all to authenticated using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "Admin all venues" on venues for all to authenticated using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "Admin all venue_cities" on venue_cities for all to authenticated using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "Admin all cta_banners" on cta_banners for all to authenticated using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "Admin all portfolio" on portfolio for all to authenticated using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "Admin all stats" on site_stats for all to authenticated using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "Admin all settings" on site_settings for all to authenticated using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "Admin all enquiries" on enquiries for all to authenticated using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "Admin all faqs" on faqs for all to authenticated using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "Admin all keep alive" on keep_alive_pings for all to authenticated using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);
create policy "Admin read profiles" on profiles for select using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'admin')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blog_posts_set_updated_at on blog_posts;
create trigger blog_posts_set_updated_at
  before update on blog_posts
  for each row execute function public.set_updated_at();

-- =============================================================================
-- STORAGE — single public bucket "media" (fits Free 1 GB file storage)
-- Paths:
--   blog/covers/...   blog cover images (app: ≤ 5 MB)
--   blog/inline/...   inline blog images (app: ≤ 5 MB)
--   banners/...       hero images/videos (app: images ≤ 5 MB, videos ≤ 80 MB)
-- Compress banner videos with ffmpeg before upload.
-- =============================================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  83886080, -- 80 MB per-object max (banner videos); total project storage still 1 GB
  array[
    'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
    'video/mp4', 'video/webm', 'video/quicktime'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Remove legacy blog-images bucket policies if present (optional cleanup)
drop policy if exists "Public read blog images" on storage.objects;
drop policy if exists "Authenticated upload blog images" on storage.objects;
drop policy if exists "Authenticated update blog images" on storage.objects;
drop policy if exists "Authenticated delete blog images" on storage.objects;

drop policy if exists "Public read media" on storage.objects;
drop policy if exists "Authenticated upload media" on storage.objects;
drop policy if exists "Authenticated update media" on storage.objects;
drop policy if exists "Authenticated delete media" on storage.objects;

create policy "Public read media"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "Authenticated upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and (select auth.uid()) is not null);

create policy "Authenticated update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and (select auth.uid()) is not null)
  with check (bucket_id = 'media' and (select auth.uid()) is not null);

create policy "Authenticated delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and (select auth.uid()) is not null);

-- Table grants (PostgREST roles need explicit privileges)
grant usage on schema public to postgres, anon, authenticated, service_role;
grant all on all tables in schema public to postgres, service_role;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant select on all tables in schema public to anon;
grant usage, select on all sequences in schema public to postgres, service_role, authenticated;

-- =============================================================================
-- SEEDS
-- =============================================================================

insert into site_stats (weddings_done, google_rating, venue_partners)
select '1112+', '4.7/5', '105+'
where not exists (select 1 from site_stats limit 1);

insert into site_settings (site_name, cta_text, venue_cta_text, nav_items, phone, whatsapp, email, address)
select
  'Highlight Creations',
  'Start my wedding planning',
  'Check availability',
  '[
    {"label":"Wedding Venues","href":"/venues"},
    {"label":"Packages","href":"/destination-wedding-packages"},
    {"label":"Price Beat Challenge","href":"/price-beat-challenge"},
    {"label":"More","href":"#","children":[
      {"label":"Agra weddings","href":"/agra-wedding-planner"},
      {"label":"Goa weddings","href":"/goa-wedding-planner"},
      {"label":"Jaipur weddings","href":"/jaipur-wedding-planner"},
      {"label":"Udaipur weddings","href":"/udaipur-wedding-planner"},
      {"label":"Bharatpur weddings","href":"/bharatpur-wedding-planner"},
      {"label":"Destination Weddings","href":"/destination-weddings"},
      {"label":"Artist Management","href":"/artist-management"},
      {"label":"Awards","href":"/awards"},
      {"label":"Real Weddings","href":"/real-weddings"},
      {"label":"Services","href":"/services"},
      {"label":"About Us","href":"/about"},
      {"label":"Blog","href":"/blog"},
      {"label":"FAQ","href":"/faq"},
      {"label":"Contact","href":"/contact"}
    ]}
  ]'::jsonb,
  '+91-7037401415',
  '+917037401415',
  'contact.hcep@gmail.com',
  'Panchwati Plaza, Kaveri Vihar Phase II, Shamsabad, Agra, Basai, Uttar Pradesh 282004'
where not exists (select 1 from site_settings limit 1);

insert into cta_banners (key, title, subtitle, media_url, media_type, button_text)
select
  'home_venue',
  'Book your venue',
  'Pick your date. Set your budget. Choose your venue.',
  'https://videos.pexels.com/video-files/3773486/3773486-uhd_2560_1440_25fps.mp4',
  'video',
  'Check availability'
where not exists (select 1 from cta_banners where key = 'home_venue');
