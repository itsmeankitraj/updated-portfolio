-- Run in Supabase SQL Editor. One owner account only: ankitraj10386@gmail.com.
-- Public visitors can read portfolio data/assets; only this owner can write.
create table if not exists public.portfolio_content (
  id integer primary key check (id = 1),
  content jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.portfolio_content enable row level security;
grant usage on schema public to anon, authenticated;
grant select on public.portfolio_content to anon, authenticated;
grant insert, update, delete on public.portfolio_content to authenticated;

drop policy if exists "Public can read portfolio" on public.portfolio_content;
create policy "Public can read portfolio" on public.portfolio_content for select using (true);
drop policy if exists "Authenticated owner can update portfolio" on public.portfolio_content;
drop policy if exists "Only Ankit can manage portfolio" on public.portfolio_content;
create policy "Only Ankit can manage portfolio" on public.portfolio_content
for all to authenticated
using ((auth.jwt() ->> 'email') = 'ankitraj10386@gmail.com')
with check ((auth.jwt() ->> 'email') = 'ankitraj10386@gmail.com');

insert into storage.buckets (id,name,public) values ('portfolio-assets','portfolio-assets',true)
on conflict (id) do update set public=true;
drop policy if exists "Public read portfolio assets" on storage.objects;
create policy "Public read portfolio assets" on storage.objects for select using (bucket_id='portfolio-assets');
drop policy if exists "Owner upload portfolio assets" on storage.objects;
create policy "Owner upload portfolio assets" on storage.objects for insert to authenticated
with check (bucket_id='portfolio-assets' and (auth.jwt() ->> 'email') = 'ankitraj10386@gmail.com');
drop policy if exists "Owner update portfolio assets" on storage.objects;
create policy "Owner update portfolio assets" on storage.objects for update to authenticated
using (bucket_id='portfolio-assets' and (auth.jwt() ->> 'email') = 'ankitraj10386@gmail.com')
with check (bucket_id='portfolio-assets' and (auth.jwt() ->> 'email') = 'ankitraj10386@gmail.com');
drop policy if exists "Owner delete portfolio assets" on storage.objects;
create policy "Owner delete portfolio assets" on storage.objects for delete to authenticated
using (bucket_id='portfolio-assets' and (auth.jwt() ->> 'email') = 'ankitraj10386@gmail.com');
