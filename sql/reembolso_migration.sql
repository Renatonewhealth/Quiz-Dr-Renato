-- ============================================
-- MIGRAÇÃO: Sistema de Reembolso
-- Rodar no Supabase SQL Editor
-- ============================================

-- Tabela de usuários admin para reembolsos
CREATE TABLE IF NOT EXISTS usuarios_admin (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  ativo BOOLEAN DEFAULT true,
  criado_em TIMESTAMPTZ DEFAULT now(),
  ultimo_acesso TIMESTAMPTZ
);

-- Tabela de solicitações de reembolso
CREATE TABLE IF NOT EXISTS solicitacoes_reembolso (
  id SERIAL PRIMARY KEY,
  protocolo VARCHAR(20) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovado', 'reprovado')),
  criado_em TIMESTAMPTZ DEFAULT now(),
  atualizado_em TIMESTAMPTZ DEFAULT now(),
  numero_pedido VARCHAR(255) NOT NULL,
  email_cliente VARCHAR(255) NOT NULL,
  cpf VARCHAR(20) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  codigo_rastreio VARCHAR(255) NOT NULL,
  data_recebimento DATE NOT NULL,
  foto_produtos TEXT,
  foto_rastreio TEXT,
  foto_embalagens TEXT,
  foto_selfie TEXT,
  dias_uso INTEGER NOT NULL,
  capsulas_dia VARCHAR(100),
  horario VARCHAR(100),
  tomava_com VARCHAR(100),
  mudanca_alimentacao VARCHAR(200),
  efeitos_sentidos JSONB DEFAULT '[]',
  motivo_insatisfacao TEXT,
  aprovado_por INTEGER REFERENCES usuarios_admin(id),
  aprovado_em TIMESTAMPTZ,
  observacoes_aprovacao TEXT,
  reprovado_por INTEGER REFERENCES usuarios_admin(id),
  reprovado_em TIMESTAMPTZ,
  motivo_reprovacao TEXT
);

-- Tabela de log de ações
CREATE TABLE IF NOT EXISTS log_acoes (
  id SERIAL PRIMARY KEY,
  solicitacao_id INTEGER REFERENCES solicitacoes_reembolso(id) ON DELETE CASCADE,
  usuario_id INTEGER REFERENCES usuarios_admin(id),
  acao VARCHAR(50) NOT NULL,
  detalhes TEXT,
  criado_em TIMESTAMPTZ DEFAULT now()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_solicitacoes_status ON solicitacoes_reembolso(status);
CREATE INDEX IF NOT EXISTS idx_solicitacoes_protocolo ON solicitacoes_reembolso(protocolo);
CREATE INDEX IF NOT EXISTS idx_solicitacoes_email ON solicitacoes_reembolso(email_cliente);
CREATE INDEX IF NOT EXISTS idx_log_solicitacao ON log_acoes(solicitacao_id);

-- ============================================
-- STORAGE: Criar bucket para imagens
-- Vá em Storage > New Bucket > Nome: "reembolsos" > Public: false
-- ============================================

-- ============================================
-- ADMIN INICIAL: A senha será criada via API /api/admin/setup
-- Acesse /api/admin/setup após o deploy para criar o admin
-- ============================================
