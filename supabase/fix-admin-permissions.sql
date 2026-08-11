-- Run once in Supabase SQL Editor if admin shows "permission denied for table …"
-- Safe to re-run.

-- 1) Table-level grants (required for PostgREST / Supabase client roles)
grant usage on schema public to postgres, anon, authenticated, service_role;

grant all on all tables in schema public to postgres, service_role;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant select on all tables in schema public to anon;

grant usage, select on all sequences in schema public to postgres, service_role, authenticated;

alter default privileges in schema public
  grant all on tables to postgres, service_role;
alter default privileges in schema public
  grant select, insert, update, delete on tables to authenticated;
alter default privileges in schema public
  grant select on tables to anon;

-- 2) Replace auth.role() policies with auth.uid() checks (more reliable)
do $$
declare
  t text;
begin
  foreach t in array array[
    'banners','reels','reviews','blog_posts','media_assets',
    'venues','portfolio','site_stats','site_settings','enquiries','faqs','keep_alive_pings'
  ] loop
    execute format('drop policy if exists "Admin all %s" on %I', t, t);
    execute format(
      'create policy "Admin all %1$s" on %1$I for all to authenticated using ((select auth.uid()) is not null) with check ((select auth.uid()) is not null)',
      t
    );
  end loop;
end $$;
