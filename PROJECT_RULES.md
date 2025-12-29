# Regras do Projeto - Quiz Dr. Renato Silveira

## Convenções de Código

### TypeScript
- SEMPRE usar TypeScript, nunca usar `any`
- Criar tipos explícitos em `/src/types`
- Usar interfaces para objetos complexos
- Preferir tipos discriminados para diferentes estados

### React/Next.js
- Componentes SEMPRE em PascalCase
- Usar "use client" apenas quando necessário (forms, hooks de estado, event handlers)
- Server Components por padrão
- Hooks customizados com prefixo "use"
- Async components para Server Components que fazem fetch de dados

### Estilização
- Mobile-first: começar com design mobile (min-width)
- Usar Tailwind classes utilitárias
- Evitar CSS customizado quando possível
- Paleta de cores consistente (definida no globals.css)
- Classes responsivas: sm: md: lg: xl: 2xl:

### Formulários
- React Hook Form + Zod para validação
- Mensagens de erro em português BR
- Feedback visual imediato
- Validação no cliente E no servidor
- Disabled state durante submit

### API Routes
- Sempre validar entrada com Zod
- Usar try/catch para tratamento de erros
- Retornar status codes apropriados (200, 400, 500)
- Nunca expor chaves secretas no cliente
- Logs adequados para debugging

## Segurança

- Nunca commitar `.env.local`
- Usar SUPABASE_SERVICE_ROLE_KEY apenas no servidor (API routes)
- Validar telefone no formato brasileiro (+55)
- Sanitizar inputs antes de enviar para WhatsApp
- Rate limiting em APIs públicas (considerar implementar)

## Performance

- Lazy loading para componentes pesados
- Otimizar imagens com next/image
- Cache de respostas quando apropriado
- Minimizar re-renders com useMemo/useCallback
- Suspense boundaries para loading states

## Estrutura de Commits

Use conventional commits:

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `style:` mudanças de estilo/formatação
- `refactor:` refatoração de código
- `docs:` documentação
- `test:` testes
- `chore:` tarefas de manutenção

Exemplos:
```
feat: adicionar validação de telefone brasileiro
fix: corrigir cálculo de score do quiz
docs: atualizar README com instruções de deploy
```

## Quiz Específico

### Estrutura das Perguntas
- Perguntas em ordem lógica
- Mínimo 5, máximo 15 perguntas
- Cada resposta tem peso (1-5 pontos)
- Resultado baseado em faixas de score (percentual)

### Fluxo de Dados
1. Usuário responde todas as perguntas
2. Sistema calcula score total
3. Usuário preenche formulário de lead
4. Sistema salva no Supabase
5. Sistema envia resultado via WhatsApp
6. Mostra página de resultado

### Tratamento de Erros
- Se falhar salvar no Supabase: retry 1x, depois mostrar erro
- Se falhar enviar WhatsApp: ainda assim salvar no banco
- Sempre logar erros para análise posterior
- Mensagens de erro amigáveis para o usuário

## Testes

### Checklist antes de commitar
- [ ] Código compila sem erros TypeScript
- [ ] Sem warnings do ESLint
- [ ] Build passa (`npm run build`)
- [ ] Testado no mobile (Chrome DevTools)
- [ ] Formulários validam corretamente
- [ ] Todas as rotas funcionam

### Testes manuais importantes
- [ ] Quiz completo do início ao fim
- [ ] Validação de formulário com dados inválidos
- [ ] Responsividade em mobile (375px, 414px)
- [ ] Envio de WhatsApp (sandbox)
- [ ] Salvamento no Supabase

## Deploy

### Antes do deploy
1. Atualizar variáveis de ambiente na Vercel
2. Verificar conexão Supabase em produção
3. Testar Z-API com número real
4. Verificar se RLS está configurado corretamente

### Após deploy
1. Testar fluxo completo em produção
2. Verificar logs no Vercel
3. Testar recebimento de WhatsApp
4. Verificar dados salvos no Supabase

## Manutenção

### Logs importantes
- Erros de API (salvar-lead, enviar-whatsapp)
- Tentativas de envio falhadas
- Validações que falham frequentemente

### Métricas a acompanhar
- Taxa de conclusão do quiz
- Taxa de conversão (preenchimento do formulário)
- Erros de API
- Tempo médio de conclusão

## Boas Práticas

1. **Sempre testar no mobile primeiro** - é o dispositivo principal
2. **Commits pequenos e frequentes** - facilita review e rollback
3. **Comentar código complexo** - especialmente lógica de scoring
4. **Usar TODO comments** - para melhorias futuras
5. **Documentar mudanças importantes** - atualizar este arquivo

## Contatos e Recursos

- Documentação Next.js: https://nextjs.org/docs
- Documentação Supabase: https://supabase.com/docs
- Documentação Z-API: https://developer.z-api.io
- Tailwind CSS: https://tailwindcss.com/docs

