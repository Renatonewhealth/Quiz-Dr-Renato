-- ============================================
-- MIGRAÇÃO: Tabela de experimentos A/B
-- Rodar no Supabase SQL Editor
-- ============================================

create extension if not exists "pgcrypto";

create table if not exists experiments (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,                 -- 'landing-test-2026-05'
  entry text not null,                       -- '/quiz' (URL que dispara o split)
  enabled boolean not null default false,
  variants jsonb not null,                   -- [{ id, path, weight }]
  cookie_max_age_seconds integer not null default 2592000, -- 30 dias
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid
);

create index if not exists experiments_entry_idx on experiments(entry);
create index if not exists experiments_enabled_idx on experiments(enabled);

alter table experiments enable row level security;

-- Anon pode ler só experimentos ativos (middleware usa anon key)
drop policy if exists "anon can read enabled experiments" on experiments;
create policy "anon can read enabled experiments" on experiments
  for select to anon using (enabled = true);

-- Service role faz tudo (APIs admin usam supabaseAdmin)
drop policy if exists "service role full access" on experiments;
create policy "service role full access" on experiments
  for all to service_role using (true) with check (true);

create or replace function update_experiments_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists experiments_updated_at on experiments;
create trigger experiments_updated_at
  before update on experiments
  for each row execute function update_experiments_updated_at();
