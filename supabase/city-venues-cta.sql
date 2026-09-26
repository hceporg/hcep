-- Migration: city-wise venues + CTA banners
-- Run in Supabase SQL Editor after schema.sql

-- =============================================================================
-- VENUE CITIES (city pages managed from admin Venue Manager)
-- =============================================================================
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

alter table venues
  add column if not exists city_id uuid references venue_cities(id) on delete set null;

create index if not exists venues_city_id_idx on venues (city_id);

-- =============================================================================
-- PAGE CTA BANNERS (e.g. homepage "Book your venue")
-- =============================================================================
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

-- =============================================================================
-- RLS
-- =============================================================================
alter table venue_cities enable row level security;
alter table cta_banners enable row level security;

drop policy if exists "Public read venue_cities" on venue_cities;
drop policy if exists "Admin all venue_cities" on venue_cities;
drop policy if exists "Public read cta_banners" on cta_banners;
drop policy if exists "Admin all cta_banners" on cta_banners;

create policy "Public read venue_cities" on venue_cities for select using (is_active = true);
create policy "Admin all venue_cities" on venue_cities for all to authenticated
  using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);

create policy "Public read cta_banners" on cta_banners for select using (is_active = true);
create policy "Admin all cta_banners" on cta_banners for all to authenticated
  using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null);

grant select on venue_cities to anon;
grant select, insert, update, delete on venue_cities to authenticated;
grant all on venue_cities to service_role;

grant select on cta_banners to anon;
grant select, insert, update, delete on cta_banners to authenticated;
grant all on cta_banners to service_role;

-- Seed default CTA (home venue booking) if empty
insert into cta_banners (key, title, subtitle, media_url, media_type, button_text)
select
  'home_venue',
  'Book your venue',
  'Pick your date. Set your budget. Choose your venue.',
  'https://videos.pexels.com/video-files/3773486/3773486-uhd_2560_1440_25fps.mp4',
  'video',
  'Check availability'
where not exists (select 1 from cta_banners where key = 'home_venue');

-- Seed cities from existing venue city names (optional convenience)
insert into venue_cities (name, slug, heading, subheading, sort_order)
select distinct
  v.city,
  lower(regexp_replace(trim(v.city), '[^a-zA-Z0-9]+', '-', 'g')),
  'Wedding Venues in ' || v.city,
  'Handpicked venues for your celebration in ' || v.city || '.',
  0
from venues v
where v.city is not null and trim(v.city) <> ''
  and not exists (
    select 1 from venue_cities vc
    where lower(vc.name) = lower(v.city)
  );

update venues v
set city_id = vc.id
from venue_cities vc
where v.city_id is null and lower(v.city) = lower(vc.name);
