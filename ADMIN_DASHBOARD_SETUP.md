# 🎯 Guia Completo: Setup do Admin Dashboard

Este guia contém todas as instruções para configurar e testar o Admin Dashboard com sistema de autenticação seguro.

---

## 📋 Pré-requisitos

- ✅ Projeto Next.js rodando
- ✅ Supabase configurado (URL e chaves no `.env.local`)
- ✅ Dependências instaladas (`npm install`)

---

## 🗄️ Passo 1: Configurar Banco de Dados

### 1.1. Executar SQL no Supabase

1. Acesse o **Supabase Dashboard**: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **"SQL Editor"** no menu lateral
4. Copie todo o conteúdo do arquivo **`supabase-admin-setup.sql`** (na raiz do projeto)
5. Cole no editor SQL e clique em **"Run"**

Isso criará:
- ✅ Tabela `admin_users`
- ✅ Tabela `quiz_sessions` (para tracking)
- ✅ View `quiz_analytics`
- ✅ Políticas de segurança (RLS)

---

## 👤 Passo 2: Criar Usuário Admin

### 2.1. Criar usuário no Supabase Auth

1. No Supabase Dashboard, vá em **"Authentication"** → **"Users"**
2. Clique em **"Add user"** → **"Create new user"**
3. Preencha:
   - **Email**: email do Dr. Renato (ex: `renato@example.com`)
   - **Password**: senha forte (ex: `Admin@2024!Renato`)
   - **Auto Confirm User**: ✅ **Marque esta opção**
4. Clique em **"Create user"**
5. **Copie o ID do usuário criado** (formato: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### 2.2. Vincular usuário à tabela admin_users

1. Volte ao **"SQL Editor"**
2. Execute este SQL (substitua o email):

```sql
INSERT INTO admin_users (id, email, full_name)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'renato@example.com'),
  'renato@example.com',
  'Dr. Renato Silveira'
);
```

3. Verifique se funcionou:

```sql
SELECT * FROM admin_users;
```

Você deve ver o usuário criado.

---

## 🧪 Passo 3: Testar Autenticação

### 3.1. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

### 3.2. Acessar página de login

1. Abra o navegador em: **http://localhost:3000/admin**
2. Você deve ser **redirecionado automaticamente** para `/admin/login`

### 3.3. Fazer login

1. Digite o **email** e **senha** que você criou
2. Clique em **"Entrar"**
3. Você deve ser redirecionado para `/admin/dashboard`

### 3.4. Verificar dashboard

Você deve ver:
- ✅ Sidebar roxa à esquerda com seu email
- ✅ 4 KPI cards no topo
- ✅ Gráficos de funil e drop-off
- ✅ Tabela de leads

---

## 🔐 Passo 4: Testar Segurança

### 4.1. Testar proteção de rotas

1. Faça **logout** (botão "Sair" na sidebar)
2. Tente acessar diretamente: **http://localhost:3000/admin/dashboard**
3. ✅ Você deve ser **redirecionado para `/admin/login`**

### 4.2. Testar sessão persistente

1. Faça login novamente
2. **Feche e reabra o navegador**
3. Acesse: **http://localhost:3000/admin/dashboard**
4. ✅ Você deve **continuar logado** (sessão mantida)

### 4.3. Testar usuário não-admin

1. No Supabase, crie outro usuário **SEM** adicionar na tabela `admin_users`
2. Tente fazer login com esse usuário
3. ✅ Você deve ver erro: **"Você não tem permissão para acessar esta área"**

---

## 📊 Passo 5: Testar Analytics

### 5.1. Gerar dados de teste

1. Acesse o quiz público: **http://localhost:3000**
2. **Responda o quiz completo** e envie o formulário
3. Faça isso **2-3 vezes** com dados diferentes

### 5.2. Verificar dados no dashboard

1. Acesse o dashboard: **http://localhost:3000/admin/dashboard**
2. Clique no botão **"Atualizar"** no topo
3. Verifique se os dados aparecem:
   - ✅ Total de leads aumentou
   - ✅ Gráfico de funil mostra as etapas
   - ✅ Tabela de leads mostra os registros
   - ✅ Clique na seta para **expandir** e ver as respostas

---

## 🎨 Funcionalidades do Dashboard

### KPI Cards
- **Total de Leads**: Quantidade total de pessoas que preencheram o formulário
- **Qualificados**: Pessoas com score ≤ 4 (alto risco)
- **Baixo Risco**: Pessoas com score ≥ 5 (redirecionadas para página especial)
- **Taxa de Qualificação**: Porcentagem de qualificados

### Gráfico de Funil
Mostra a conversão em cada etapa:
1. Sessões Iniciadas
2. Quiz Completado
3. Viram Formulário
4. Enviaram Formulário

### Gráfico de Drop-off
Mostra quantas pessoas completaram cada pergunta do quiz.
- **Verde**: ≥ 80% completaram
- **Laranja**: 60-79% completaram
- **Vermelho**: < 60% completaram (ponto crítico de abandono)

### Tabela de Leads
- **Paginação**: 10 leads por página
- **Expandir**: Clique na seta para ver as respostas detalhadas
- **Badge de Status**: Verde (Qualificado) ou Cinza (Baixo Risco)

---

## 🔧 Solução de Problemas

### ❌ Erro: "Não autenticado"
- Verifique se o usuário foi criado no Supabase Auth
- Verifique se o usuário foi adicionado na tabela `admin_users`
- Limpe o cache do navegador e tente novamente

### ❌ Dashboard não carrega dados
- Verifique se executou todo o SQL do `supabase-admin-setup.sql`
- Verifique se o `.env.local` tem as chaves corretas do Supabase
- Veja os logs do console do navegador (F12)
- Veja os logs do terminal onde o `npm run dev` está rodando

### ❌ Middleware não redireciona
- Verifique se o arquivo `src/middleware.ts` existe
- Reinicie o servidor (`Ctrl+C` e `npm run dev` novamente)
- Limpe a pasta `.next` e reinicie

### ❌ Gráficos não aparecem
- Verifique se instalou as dependências: `npm install recharts date-fns`
- Gere alguns leads de teste no quiz público

---

## 🚀 Próximos Passos

1. **Adicionar mais usuários admin**:
   - Crie no Supabase Auth
   - Insira na tabela `admin_users`

2. **Personalizar métricas**:
   - Edite `/src/app/api/admin/analytics/route.ts`
   - Adicione novas queries SQL

3. **Exportar dados**:
   - Adicione botão de "Exportar CSV" na tabela de leads
   - Use biblioteca como `papaparse`

4. **Notificações**:
   - Configure webhook do Supabase para enviar notificação quando novo lead entrar
   - Integre com Slack/Discord/Telegram

---

## 📝 Checklist de Segurança

- [x] Middleware protege rotas `/admin/*`
- [x] API routes verificam autenticação
- [x] RLS (Row Level Security) habilitado no Supabase
- [x] Policies criadas para admin_users e quiz_sessions
- [x] Senhas nunca expostas no código (apenas em variáveis de ambiente)
- [x] JWT armazenado em cookies httpOnly (gerenciado pelo Supabase)
- [x] HTTPS obrigatório em produção (Vercel/Netlify fazem automaticamente)

---

## 🎉 Pronto!

O Admin Dashboard está configurado e funcionando. Agora você pode:
- 📊 Monitorar leads em tempo real
- 📈 Analisar taxas de conversão
- 🔍 Identificar pontos de abandono no quiz
- 👥 Gerenciar qualificados vs não-qualificados

**Qualquer dúvida, consulte este guia ou os comentários no código!**


