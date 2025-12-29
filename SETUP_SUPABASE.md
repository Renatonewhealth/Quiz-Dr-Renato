# 🗄️ Guia Completo: Configuração do Supabase

Este guia vai te orientar passo a passo na configuração do Supabase para o projeto.

## O que é o Supabase?

Supabase é uma plataforma open-source que fornece:
- Banco de dados PostgreSQL
- APIs automáticas
- Autenticação (não usaremos neste projeto)
- Storage (não usaremos neste projeto)

**Plano gratuito:** Até 500MB de banco de dados, 50.000 usuários ativos mensais.

---

## Passo 1: Criar Conta no Supabase

1. Acesse: **https://supabase.com**
2. Clique em **"Start your project"**
3. Escolha uma das opções:
   - Login com GitHub (recomendado)
   - Login com Google
   - Email/senha
4. Confirme seu email se necessário

---

## Passo 2: Criar Novo Projeto

1. No dashboard do Supabase, clique em **"New project"**

2. Preencha as informações:
   - **Organization:** Crie uma nova ou use existente
   - **Project Name:** `quiz-dr-renato` (ou o nome que preferir)
   - **Database Password:** Crie uma senha forte e **GUARDE-A** em local seguro
   - **Region:** Escolha **South America (São Paulo)** se disponível, ou o mais próximo
   - **Pricing Plan:** Free (gratuito)

3. Clique em **"Create new project"**

4. **Aguarde 2-3 minutos** enquanto o Supabase provisiona seu banco de dados

---

## Passo 3: Obter Credenciais da API

1. Quando o projeto estiver pronto, vá em **Settings** (ícone de engrenagem) no menu lateral

2. Clique em **API** no submenu

3. Você verá 3 informações importantes:

   **A. Project URL**
   ```
   Exemplo: https://xyzabc123.supabase.co
   ```
   → Copie e cole no `.env.local` como `NEXT_PUBLIC_SUPABASE_URL`

   **B. anon/public key**
   ```
   Exemplo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   → Copie e cole no `.env.local` como `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   **C. service_role key** (role especial com privilégios completos)
   ```
   Clique em "Reveal" para ver a chave
   ```
   → Copie e cole no `.env.local` como `SUPABASE_SERVICE_ROLE_KEY`

   ⚠️ **ATENÇÃO:** A `service_role key` é SECRETA. Nunca exponha no código cliente!

---

## Passo 4: Criar Tabela de Leads

1. No menu lateral, vá em **SQL Editor**

2. Clique em **"New query"**

3. Cole o seguinte SQL:

```sql
-- ========================================
-- Tabela de Leads do Quiz
-- ========================================

-- Criar tabela principal
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  score INTEGER NOT NULL,
  resultado TEXT NOT NULL,
  respostas JSONB NOT NULL,
  whatsapp_enviado BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_telefone ON leads(telefone);

-- Ativar Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir inserção via service role
CREATE POLICY "Enable insert for service role" ON leads
  FOR INSERT TO service_role WITH CHECK (true);

-- Criar política para permitir leitura via service role
CREATE POLICY "Enable read for service role" ON leads
  FOR SELECT TO service_role USING (true);

-- Criar política para permitir atualização via service role
CREATE POLICY "Enable update for service role" ON leads
  FOR UPDATE TO service_role USING (true);

-- Comentários para documentação
COMMENT ON TABLE leads IS 'Armazena leads capturados pelo quiz médico';
COMMENT ON COLUMN leads.id IS 'ID único do lead (UUID)';
COMMENT ON COLUMN leads.nome IS 'Nome completo do lead';
COMMENT ON COLUMN leads.email IS 'Email do lead';
COMMENT ON COLUMN leads.telefone IS 'Telefone no formato brasileiro';
COMMENT ON COLUMN leads.score IS 'Pontuação total obtida no quiz';
COMMENT ON COLUMN leads.resultado IS 'Categoria de resultado (ex: Excelente, Bom, Regular)';
COMMENT ON COLUMN leads.respostas IS 'JSON com todas as respostas do quiz';
COMMENT ON COLUMN leads.whatsapp_enviado IS 'Flag indicando se o WhatsApp foi enviado com sucesso';
COMMENT ON COLUMN leads.created_at IS 'Data/hora de criação do registro';
```

4. Clique em **"Run"** (ou pressione Ctrl+Enter / Cmd+Enter)

5. Você deve ver a mensagem: **"Success. No rows returned"**

---

## Passo 5: Verificar a Tabela

1. No menu lateral, vá em **Table Editor**

2. Você deve ver a tabela **leads** listada

3. Clique nela para ver a estrutura:
   - ✅ 9 colunas (id, nome, email, telefone, score, resultado, respostas, whatsapp_enviado, created_at)
   - ✅ RLS habilitado (ícone de cadeado)

---

## Passo 6: Atualizar o Arquivo .env.local

Abra o arquivo `.env.local` na raiz do projeto e preencha as credenciais:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xyzabc123.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Passo 7: Testar a Conexão

1. Certifique-se de que o servidor Next.js está rodando:
   ```bash
   npm run dev
   ```

2. A conexão será testada automaticamente quando você fizer uma requisição para salvar um lead.

---

## 🔍 Como Visualizar os Leads Salvos

1. Vá em **Table Editor** no Supabase
2. Clique na tabela **leads**
3. Você verá todos os leads capturados
4. Pode filtrar, ordenar e exportar os dados

---

## 📊 Query Úteis

### Ver todos os leads dos últimos 7 dias
```sql
SELECT * FROM leads 
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

### Contar leads por resultado
```sql
SELECT resultado, COUNT(*) as total
FROM leads
GROUP BY resultado
ORDER BY total DESC;
```

### Ver leads que não receberam WhatsApp
```sql
SELECT * FROM leads 
WHERE whatsapp_enviado = false
ORDER BY created_at DESC;
```

---

## ⚠️ Troubleshooting

### Erro: "Failed to create resource"
- Verifique se escolheu uma região disponível
- Tente criar o projeto novamente
- Pode haver limite de projetos no plano gratuito (máximo 2)

### Erro: "relation 'leads' does not exist"
- Execute o SQL novamente no SQL Editor
- Verifique se não há erros de sintaxe
- Recarregue a página

### Erro: "JWT expired" ou "Invalid API key"
- Verifique se copiou as chaves corretamente
- Verifique se não há espaços extras no `.env.local`
- Reinicie o servidor Next.js (`npm run dev`)

---

## ✅ Checklist Final

Antes de prosseguir, certifique-se:

- [ ] Conta criada no Supabase
- [ ] Projeto criado e provisionado
- [ ] 3 credenciais copiadas para `.env.local`
- [ ] Tabela `leads` criada com sucesso
- [ ] RLS habilitado na tabela
- [ ] Servidor Next.js reiniciado

---

## 🎉 Próximo Passo

Agora configure a Z-API seguindo o arquivo **SETUP_ZAPI.md**!

## 📚 Documentação Oficial

- [Supabase Docs](https://supabase.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

