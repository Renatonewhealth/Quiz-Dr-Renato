-- ============================================
-- MIGRAÇÃO: Processo Seletivo de Copywriters
-- Rodar no Supabase SQL Editor
-- ============================================

create extension if not exists "pgcrypto";

-- Tabela principal de aplicações
create table if not exists copy_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- Step 1 - Identificação
  full_name text not null,
  instagram text not null,
  whatsapp text not null,

  -- Step 2 - Perfil profissional
  years_experience text not null check (years_experience in ('<1', '1-2', '3-5', '+5')),
  seniority text not null check (seniority in ('junior', 'pleno-novo', 'pleno-senior', 'senior')),
  operations_worked text not null,
  niches text not null,
  specialty text not null,

  -- Step 3 - Resultados e referências
  results_brought text not null,
  books_read text not null,
  top_copywriters text not null,

  -- Step 4 - Respostas técnicas
  answer_unique_mechanism text not null,
  answer_superstructure text not null,
  answer_offer_block text not null,

  -- Step 5 - Portfólio
  portfolio_url text not null,
  free_space text,

  -- Meta / triagem interna
  status text not null default 'new' check (status in ('new', 'reviewing', 'shortlist', 'test-sent', 'rejected', 'hired')),
  internal_rating smallint check (internal_rating between 1 and 5),
  internal_notes text,
  reviewed_by uuid,
  reviewed_at timestamptz,

  -- Tracking
  ip_address inet,
  user_agent text,
  completion_time_seconds integer
);

-- Index para queries comuns
create index if not exists copy_applications_status_idx on copy_applications(status);
create index if not exists copy_applications_created_at_idx on copy_applications(created_at desc);
create index if not exists copy_applications_seniority_idx on copy_applications(seniority);

-- Trigger de updated_at
create or replace function update_copy_applications_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists copy_applications_updated_at on copy_applications;
create trigger copy_applications_updated_at
  before update on copy_applications
  for each row execute function update_copy_applications_updated_at();

-- Row Level Security
alter table copy_applications enable row level security;

-- Público pode inserir (formulário de aplicação)
drop policy if exists "public can insert copy applications" on copy_applications;
create policy "public can insert copy applications"
  on copy_applications for insert
  to anon
  with check (true);

-- Service role tem acesso total (APIs internas usam supabaseAdmin)
-- Admin queries serão feitas via service role key (supabaseAdmin)
