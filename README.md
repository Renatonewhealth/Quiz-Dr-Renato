# Quiz Dr. Renato Silveira

Quiz mobile-friendly para captura de leads médicos com integração WhatsApp via Z-API.

## 🎯 Objetivo

Criar um funil de conversão completo:
**Conteúdo Orgânico** → **Automação ManyChat** → **Quiz no Site** → **Captura de Lead** → **Resultado via WhatsApp**

## 🛠️ Stack Tecnológica

- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4
- **Banco de Dados:** Supabase (PostgreSQL)
- **WhatsApp:** Z-API
- **Validação:** Zod + React Hook Form
- **Deploy:** Vercel

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase (gratuita)
- Conta na Z-API com WhatsApp conectado
- Git instalado

## 🚀 Setup Local

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e preencha com suas credenciais:

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais reais:

```env
# Supabase (obter em: https://supabase.com/dashboard/project/_/settings/api)
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_publica_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_chave_privada_aqui

# Z-API (obter em: https://developer.z-api.io)
ZAPI_URL=https://api.z-api.io/instances/SUA_INSTANCIA
ZAPI_TOKEN=seu_token_aqui
ZAPI_CLIENT_TOKEN=seu_client_token_aqui

# Configurações do App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_PHONE_NUMBER_DR=5511999999999
```

### 3. Configurar Banco de Dados Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta (se não tiver)
3. Crie um novo projeto
4. Vá em **SQL Editor** e execute:

```sql
-- Tabela de leads
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

-- Índices para performance
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso
CREATE POLICY "Enable insert for service role" ON leads
  FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Enable read for service role" ON leads
  FOR SELECT TO service_role USING (true);
```

5. Copie as credenciais em **Settings → API**

### 4. Configurar Z-API (WhatsApp)

1. Acesse [z-api.io](https://z-api.io)
2. Crie uma conta (trial gratuito de 14 dias)
3. Crie uma nova instância
4. Escaneie o QR Code com o WhatsApp do Dr. Renato
5. Copie as credenciais para o `.env.local`

### 5. Rodar o Projeto

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura do Projeto

```
quiz-dr-renato/
├── src/
│   ├── app/                    # Páginas e rotas (App Router)
│   │   ├── page.tsx           # Landing page
│   │   ├── quiz/              # Interface do quiz
│   │   ├── resultado/         # Página de resultado
│   │   └── api/               # API Routes (backend)
│   │       ├── enviar-whatsapp/
│   │       └── salvar-lead/
│   ├── components/            # Componentes React
│   │   ├── quiz/             # Componentes do quiz
│   │   ├── forms/            # Formulários
│   │   └── ui/               # Componentes reutilizáveis
│   ├── lib/                  # Utilitários e clientes
│   │   ├── supabase.ts       # Cliente Supabase
│   │   ├── zapi.ts           # Cliente Z-API
│   │   ├── quiz-data.ts      # Perguntas do quiz
│   │   └── scoring.ts        # Lógica de pontuação
│   ├── types/                # Definições TypeScript
│   └── utils/                # Funções utilitárias
├── .env.local                # Variáveis de ambiente (NÃO commitar)
├── .env.example              # Template de variáveis
├── PROJECT_RULES.md          # Regras e convenções do projeto
└── package.json
```

## 🔄 Fluxo de Dados

1. **Usuário acessa** a landing page
2. **Clica para iniciar** o quiz
3. **Responde as perguntas** (score calculado automaticamente)
4. **Preenche o formulário** com nome, email e telefone
5. **Sistema salva** os dados no Supabase
6. **Sistema envia** o resultado via WhatsApp (Z-API)
7. **Usuário visualiza** a página de resultado

## 🧪 Testes

### Build de Produção

```bash
npm run build
```

### Linter

```bash
npm run lint
```

## 📱 Mobile-First

Este projeto foi desenvolvido com abordagem mobile-first. Sempre teste em:
- Mobile (375px, 414px)
- Tablet (768px, 1024px)
- Desktop (1280px+)

Use Chrome DevTools para testar responsividade.

## 🚀 Deploy na Vercel

### 1. Conectar Repositório

1. Faça push para GitHub/GitLab/Bitbucket
2. Acesse [vercel.com](https://vercel.com)
3. Importe seu repositório
4. A Vercel detecta Next.js automaticamente

### 2. Configurar Variáveis de Ambiente

No painel da Vercel, vá em **Settings → Environment Variables** e adicione:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ZAPI_URL`
- `ZAPI_TOKEN`
- `ZAPI_CLIENT_TOKEN`
- `NEXT_PUBLIC_APP_URL` (URL de produção)
- `NEXT_PUBLIC_PHONE_NUMBER_DR`

### 3. Deploy

```bash
git push origin main
```

A Vercel fará deploy automaticamente a cada push.

## 📝 Próximos Passos

Após o setup inicial, você precisa:

1. ✅ Configurar Supabase e executar SQL
2. ✅ Configurar Z-API e conectar WhatsApp
3. 📝 Criar as perguntas reais do quiz em `src/lib/quiz-data.ts`
4. 🎨 Implementar componentes da UI
5. 🧮 Ajustar lógica de scoring conforme necessário
6. 🧪 Testar fluxo completo
7. 🚀 Deploy na Vercel

## 📚 Documentação Adicional

- [Regras do Projeto](./PROJECT_RULES.md) - Convenções e boas práticas
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Z-API Docs](https://developer.z-api.io)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Suporte

Para dúvidas ou problemas:
1. Consulte o `PROJECT_RULES.md`
2. Verifique logs no Vercel (produção)
3. Verifique console do navegador (desenvolvimento)
4. Verifique logs do Supabase

## 📄 Licença

Este projeto é privado e confidencial.
