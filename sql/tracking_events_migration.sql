-- ============================================
-- MIGRAÇÃO: Tracking Events (event log unificado)
-- Rodar no Supabase SQL Editor
-- ============================================

create extension if not exists "pgcrypto";

create table if not exists tracking_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Identificação
  session_id text not null,       -- TTL 24h (localStorage)
  visitor_id text,                -- perene (localStorage)

  -- Evento
  event_type text not null,       -- page_view, quiz_start, quiz_question_answered, quiz_completed, lead_captured, cta_click
  page_slug text,                 -- ex: '/', '/page-google', '/detectordeinvasores'
  variant text,                   -- para A/B test (ex: 'A', 'B', 'C')

  -- Específicos
  question_id integer,            -- só pra eventos de pergunta (1-indexed)
  metadata jsonb default '{}'::jsonb,

  -- Atribuição
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,

  -- Diagnóstico
  ip_address inet,
  user_agent text,
  referrer text,
  is_bot boolean default false
);

-- Indices pra queries comuns do dashboard
create index if not exists tracking_events_created_at_idx on tracking_events(created_at desc);
create index if not exists tracking_events_session_id_idx on tracking_events(session_id);
create index if not exists tracking_events_visitor_id_idx on tracking_events(visitor_id);
create index if not exists tracking_events_event_type_idx on tracking_events(event_type);
create index if not exists tracking_events_page_slug_idx on tracking_events(page_slug);
create index if not exists tracking_events_variant_idx on tracking_events(variant);
create index if not exists tracking_events_type_created_idx on tracking_events(event_type, created_at desc);

-- RLS: só service role escreve (via supabaseAdmin no track endpoint).
-- Leitura via supabaseAdmin no analytics endpoint (já passa por auth no Next).
alter table tracking_events enable row level security;

drop policy if exists "service role full access" on tracking_events;
create policy "service role full access" on tracking_events
  for all to service_role using (true) with check (true);
