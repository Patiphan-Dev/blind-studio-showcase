-- ============================================================
-- ม่านสตูดิโอ — schema + RLS  (final state)
-- ============================================================
create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- tables ----------
create table public.categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  description text not null default '',
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

create table public.products (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  name         text not null,
  category_id  uuid references public.categories(id) on delete set null,
  summary      text not null default '',
  description  text not null default '',
  features     text[] not null default '{}',
  price_range  text not null default '',
  cover_image  text not null default '',
  gallery      text[] not null default '{}',
  is_featured  boolean not null default false,
  is_published boolean not null default true,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index products_category_id_idx on public.products (category_id);
create index products_published_idx on public.products (is_published);
create trigger products_set_updated_at before update on public.products
  for each row execute function public.set_updated_at();

create table public.projects (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  location      text not null default '',
  summary       text not null default '',
  description   text not null default '',
  cover_image   text not null default '',
  gallery       text[] not null default '{}',
  product_types text[] not null default '{}',
  completed_on  date,
  is_featured   boolean not null default false,
  is_published  boolean not null default true,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now()
);
create index projects_published_idx on public.projects (is_published);

create table public.contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text not null default '',
  email      text not null default '',
  message    text not null,
  is_handled boolean not null default false,
  created_at timestamptz not null default now()
);
create index contact_messages_created_at_idx on public.contact_messages (created_at desc);

create table public.site_settings (
  key        text primary key,
  value      text not null default '',
  updated_at timestamptz not null default now()
);
create trigger site_settings_set_updated_at before update on public.site_settings
  for each row execute function public.set_updated_at();

create table public.admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text not null default '',
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = ''
as $$
  select exists (select 1 from public.admins a where a.user_id = auth.uid());
$$;

-- ---------- RLS ----------
alter table public.categories       enable row level security;
alter table public.products         enable row level security;
alter table public.projects         enable row level security;
alter table public.contact_messages enable row level security;
alter table public.site_settings    enable row level security;
alter table public.admins           enable row level security;

create policy "admins_self_read" on public.admins
  for select to authenticated using (user_id = auth.uid());

create policy "categories_read_all" on public.categories
  for select using (true);
create policy "categories_write_admin" on public.categories
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "products_read" on public.products
  for select using (is_published = true or public.is_admin());
create policy "products_write_admin" on public.products
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "projects_read" on public.projects
  for select using (is_published = true or public.is_admin());
create policy "projects_write_admin" on public.projects
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy "contact_messages_insert_public" on public.contact_messages
  for insert to anon, authenticated with check (true);
create policy "contact_messages_select_admin" on public.contact_messages
  for select to authenticated using (public.is_admin());
create policy "contact_messages_update_admin" on public.contact_messages
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "contact_messages_delete_admin" on public.contact_messages
  for delete to authenticated using (public.is_admin());

create policy "site_settings_read_all" on public.site_settings
  for select using (true);
create policy "site_settings_write_admin" on public.site_settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
