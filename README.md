# Quiz Dr. Renato Silveira - Detector de Parasitas

Aplicação web desenvolvida para análise de risco parasitário através de questionário interativo.

## 🎯 Sobre o Projeto

Quiz interativo que identifica a probabilidade de infestação parasitária com base em sintomas e hábitos do usuário. Desenvolvido pelo Dr. Renato Silveira Reis, especialista em nutriendocrinologia.

## ✨ Funcionalidades

- ✅ Quiz interativo com 6 perguntas
- ✅ Sistema de pontuação personalizado
- ✅ Redirecionamento baseado no score:
  - **5-6 pontos**: Página de baixo risco (sem lead capture)
  - **≤4 pontos**: Formulário de captação de lead
- ✅ Integração com Supabase para armazenamento de leads
- ✅ Design responsivo (mobile-first)
- ✅ Animações e transições suaves
- ✅ Página de loading com barra de progresso
- 🚧 Integração com WhatsApp Business API (em desenvolvimento)

## 🛠️ Tecnologias

- **Framework**: Next.js 16.1.1 (App Router + Turbopack)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Banco de Dados**: Supabase (PostgreSQL)
- **Fonte**: Plus Jakarta Sans
- **Ícones**: Lucide React

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/Renatonewhealth/Quiz-Dr-Renato.git

# Entre na pasta
cd Quiz-Dr-Renato

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais

# Rode o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui

# WhatsApp Business API (Meta) - Opcional
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
WHATSAPP_PHONE_NUMBER_ID=seu_phone_number_id
WHATSAPP_ACCESS_TOKEN=seu_access_token
WHATSAPP_TEMPLATE_NAME=nome_do_template
```

## 📊 Estrutura do Banco de Dados

### Tabela: `leads`
```sql
- id (UUID, PK)
- name (VARCHAR)
- whatsapp (VARCHAR)
- email (VARCHAR)
- total_score (INTEGER)
- risk_level (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tabela: `quiz_responses`
```sql
- id (UUID, PK)
- lead_id (UUID, FK)
- question_id (INTEGER)
- question_text (TEXT)
- selected_option (TEXT)
- option_score (INTEGER)
- created_at (TIMESTAMP)
```

## 🎨 Design System

- **Cor primária**: `#667eea` (Roxo)
- **Cor secundária**: `#764ba2` (Roxo escuro)
- **Cor sucesso**: `#10b981` (Verde)
- **Cor WhatsApp**: `#25D366`
- **Background**: Branco (`#ffffff`)
- **Mobile-first**: Breakpoints em 640px, 768px, 1024px

## 📱 Páginas

- `/` - Landing page com CTA
- `/quiz` - Questionário interativo
- `/resultado` - Confirmação de envio (WhatsApp)
- `/resultado-baixo` - Página de baixo risco

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Deploy
vercel
```

Não esqueça de configurar as variáveis de ambiente no painel da Vercel!

## 📄 Licença

Desenvolvido por Dr. Renato Silveira Reis - Todos os direitos reservados.

## 👨‍⚕️ Sobre o Dr. Renato

Especialista em nutriendocrinologia, medicina naturalista e farmacêutico.

---

**Versão**: 1.0.0  
**Última atualização**: Dezembro 2024
