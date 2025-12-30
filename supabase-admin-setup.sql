-- ==========================================
-- SETUP ADMIN DASHBOARD - SUPABASE
-- Execute este SQL no Supabase SQL Editor
-- ==========================================

-- 1. Criar tabela de usuários admin (separada do auth.users)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Criar view para analytics agregados
CREATE OR REPLACE VIEW quiz_analytics AS
SELECT 
  l.id as lead_id,
  l.created_at,
  l.total_score,
  l.risk_level,
  CASE 
    WHEN l.total_score >= 5 THEN false
    ELSE true
  END as qualified,
  COUNT(qr.id) as questions_completed,
  CASE 
    WHEN l.total_score >= 5 THEN 'resultado_baixo'
    WHEN l.email IS NOT NULL THEN 'formulario_completo'
    ELSE 'saiu_no_quiz'
  END as exit_point
FROM leads l
LEFT JOIN quiz_responses qr ON qr.lead_id = l.id
GROUP BY l.id;

-- 3. Criar tabela de sessões do quiz para tracking de funil
CREATE TABLE IF NOT EXISTS quiz_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(255) UNIQUE NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_question INT DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  lead_id UUID REFERENCES leads(id),
  user_agent TEXT,
  ip_address INET,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_sessions_session_id ON quiz_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_started_at ON quiz_sessions(started_at DESC);

-- 4. Habilitar RLS em admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 5. Policy: apenas usuários autenticados admin podem ler admin_users
DROP POLICY IF EXISTS "Admins can read admin_users" ON admin_users;
CREATE POLICY "Admins can read admin_users" ON admin_users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

-- 6. Habilitar RLS em quiz_sessions (apenas service_role pode escrever)
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage quiz_sessions" ON quiz_sessions;
CREATE POLICY "Service role can manage quiz_sessions" ON quiz_sessions
  FOR ALL TO service_role
  USING (true);

-- ==========================================
-- ✅ SETUP INICIAL COMPLETO!
-- ==========================================
-- 
-- Agora você precisa criar o usuário admin.
-- NÃO EXECUTE MAIS NADA AQUI!
-- 
-- Siga os próximos passos:
--
-- ==========================================
-- PRÓXIMO PASSO: CRIAR USUÁRIO ADMIN
-- ==========================================
-- 
-- 1. Acesse: Authentication → Users
-- 2. Clique em "Add user" → "Create new user"
-- 3. Preencha:
--    - Email: email do Dr. Renato
--    - Password: senha forte
--    - Auto Confirm User: ✅ MARQUE ESTA OPÇÃO
-- 4. Clique em "Create user"
-- 5. VOLTE AQUI e execute o INSERT abaixo substituindo o email
--
-- ==========================================

-- ⚠️ SÓ EXECUTE ISSO DEPOIS DE CRIAR O USUÁRIO NO PASSO ACIMA!
-- Descomente e substitua o email:
--
-- INSERT INTO admin_users (id, email, full_name)
-- VALUES (
--   (SELECT id FROM auth.users WHERE email = 'SEU_EMAIL_AQUI@example.com'),
--   'SEU_EMAIL_AQUI@example.com',
--   'Dr. Renato Silveira'
-- );

-- ==========================================
-- Para verificar se funcionou:
-- SELECT * FROM admin_users;
-- SELECT * FROM auth.users;
-- ==========================================

