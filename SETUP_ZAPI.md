# 📱 Guia Completo: Configuração da Z-API (WhatsApp)

Este guia vai te orientar passo a passo na configuração da Z-API para enviar mensagens via WhatsApp.

## O que é a Z-API?

Z-API é uma plataforma brasileira que permite integrar o WhatsApp com suas aplicações através de uma API REST. É 100% legal e segura.

**Trial gratuito:** 14 dias de teste grátis, depois R$ 89/mês por instância.

---

## Passo 1: Criar Conta na Z-API

1. Acesse: **https://z-api.io**

2. Clique em **"Criar conta grátis"** ou **"Começar agora"**

3. Preencha o cadastro:
   - Nome completo
   - Email (será usado para login)
   - Senha forte
   - Telefone

4. Aceite os termos de uso

5. Clique em **"Cadastrar"**

6. **Confirme seu email** - cheque sua caixa de entrada e spam

---

## Passo 2: Acessar o Dashboard

1. Faça login em: **https://app.z-api.io**

2. Você verá o dashboard principal

3. Se for sua primeira vez, pode haver um tutorial - siga-o ou pule

---

## Passo 3: Criar uma Instância

Uma **instância** é uma conexão única com um número de WhatsApp.

1. No dashboard, clique em **"Criar Nova Instância"** ou **"+ Nova Instância"**

2. Preencha as informações:
   - **Nome da instância:** `quiz-dr-renato` (ou o nome que preferir)
   - **Tipo:** Selecione **"WhatsApp Business"** (recomendado) ou **"WhatsApp"**
   - **Região:** Escolha **Brasil**

3. Clique em **"Criar"**

4. A instância será criada em alguns segundos

---

## Passo 4: Conectar o WhatsApp

**IMPORTANTE:** Você precisa ter acesso ao WhatsApp do Dr. Renato no momento desta etapa.

1. Na lista de instâncias, clique na instância que você acabou de criar

2. Você verá um **QR Code** grande na tela

3. **No celular do Dr. Renato:**
   - Abra o **WhatsApp**
   - Toque nos 3 pontinhos (Android) ou Configurações (iPhone)
   - Toque em **"Dispositivos conectados"** ou **"WhatsApp Web"**
   - Toque em **"Conectar um dispositivo"**
   - Aponte a câmera para o **QR Code** na tela do computador

4. Aguarde alguns segundos

5. ✅ Quando conectar, você verá: **"Conectado"** ou **"Connected"**

---

## Passo 5: Obter Credenciais da API

Após conectar o WhatsApp, você precisa das credenciais para usar na API.

1. No dashboard da instância, procure por:
   - **Instance ID** ou **ID da Instância**
   - **Token** ou **API Token**
   - **Client Token** ou **Token do Cliente**

2. **URL da Instância:**
   ```
   Formato: https://api.z-api.io/instances/SEU_INSTANCE_ID
   ```
   
   Exemplo: `https://api.z-api.io/instances/3B6D1234ABCD`

3. **Token:**
   ```
   Exemplo: 5F8A9B2C3D4E1F2G3H4I5J6K
   ```

4. **Client Token:**
   ```
   Exemplo: A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6
   ```

⚠️ **GUARDE ESSAS CREDENCIAIS COM SEGURANÇA!**

---

## Passo 6: Atualizar o Arquivo .env.local

Abra o arquivo `.env.local` na raiz do projeto e preencha:

```env
# Z-API (WhatsApp)
ZAPI_URL=https://api.z-api.io/instances/SEU_INSTANCE_ID
ZAPI_TOKEN=seu_token_aqui
ZAPI_CLIENT_TOKEN=seu_client_token_aqui

# Telefone do Dr. Renato (formato: 5511999999999)
NEXT_PUBLIC_PHONE_NUMBER_DR=5511999999999
```

**Formato do telefone:**
- Código do país: 55 (Brasil)
- DDD: 11, 21, 31, etc.
- Número: 9 dígitos para celular
- Exemplo completo: `5511987654321`

---

## Passo 7: Testar a Conexão

### Opção 1: Usar o Dashboard da Z-API

1. No dashboard da instância, vá em **"Testar API"** ou **"Playground"**

2. Escolha o endpoint **"send-text"**

3. Preencha:
   ```json
   {
     "phone": "5511999999999",
     "message": "Teste de conexão Z-API"
   }
   ```

4. Clique em **"Enviar"**

5. ✅ Você deve receber a mensagem no WhatsApp em alguns segundos

### Opção 2: Usar curl no Terminal

```bash
curl -X POST "https://api.z-api.io/instances/SEU_INSTANCE_ID/token/SEU_TOKEN/send-text" \
  -H "Content-Type: application/json" \
  -H "Client-Token: SEU_CLIENT_TOKEN" \
  -d '{
    "phone": "5511999999999",
    "message": "Teste de integração do Quiz Dr. Renato"
  }'
```

Substitua os placeholders pelas suas credenciais reais.

### Opção 3: Testar via Projeto Next.js

1. Certifique-se de que o servidor está rodando:
   ```bash
   npm run dev
   ```

2. Teste o endpoint da API (use Postman, Insomnia ou curl):
   ```bash
   curl -X POST "http://localhost:3000/api/enviar-whatsapp" \
     -H "Content-Type: application/json" \
     -d '{
       "telefone": "5511999999999",
       "nome": "Teste",
       "resultado": "Teste de integração funcionando!"
     }'
   ```

---

## Passo 8: Configurar Webhooks (Opcional)

Webhooks permitem que você receba notificações quando mensagens são entregues, lidas, etc.

1. No dashboard da Z-API, vá em **"Webhooks"**

2. Ative os webhooks que desejar:
   - ✅ **Message Status** (recomendado)
   - ✅ **Message Received** (se quiser receber respostas)

3. Configure a URL de callback (se tiver uma API pública):
   ```
   https://seu-dominio.vercel.app/api/webhook-zapi
   ```

4. Para desenvolvimento local, use **ngrok** ou similar

---

## 📋 Estrutura da Mensagem do Quiz

A mensagem que será enviada terá este formato:

```
Olá [Nome do Lead]! 👋

Aqui está o resultado do seu quiz:

[Categoria do Resultado]
[Mensagem personalizada baseada no score]

Em breve nossa equipe entrará em contato!
```

Exemplo real:
```
Olá João Silva! 👋

Aqui está o resultado do seu quiz:

Excelente
Seu resultado indica que você está no caminho certo!

Em breve nossa equipe entrará em contato!
```

---

## ⚠️ Boas Práticas e Limites

### Limites da Z-API (plano básico)
- ✅ Envios ilimitados de mensagens
- ⚠️ WhatsApp tem limite de ~1000 novas conversas por dia
- ⚠️ Evite enviar spam (pode resultar em ban do WhatsApp)

### Boas práticas:
1. **Sempre peça permissão** antes de enviar mensagens
2. **Não envie mensagens promocionais não solicitadas**
3. **Respeite o horário comercial** (8h - 20h)
4. **Tenha opt-out** (forma de cancelar recebimento)
5. **Monitore taxa de resposta** e ajuste mensagens

---

## 🔍 Monitoramento

### Ver status da instância
1. Dashboard Z-API → Instâncias
2. Status pode ser:
   - 🟢 **Conectado** - Tudo OK
   - 🟡 **Desconectado** - Precisa reconectar
   - 🔴 **Erro** - Problema na instância

### Se o WhatsApp desconectar:
1. Vá no dashboard da Z-API
2. Clique na instância
3. Escaneie o QR Code novamente
4. Conexão restabelecida

### Ver histórico de mensagens:
1. Dashboard Z-API → Mensagens
2. Filtre por data, status, etc.
3. Pode exportar relatórios

---

## ⚠️ Troubleshooting

### Erro: "Instance not found"
- Verifique se o `ZAPI_URL` está correto
- Verifique se o Instance ID está correto
- Instância pode ter sido deletada

### Erro: "Unauthorized" ou 401
- Verifique se o `ZAPI_TOKEN` está correto
- Verifique se o `ZAPI_CLIENT_TOKEN` está correto
- Tokens podem ter expirado (regenere no dashboard)

### Erro: "Phone number invalid"
- Formato deve ser: `5511999999999` (sem +, espaços, parênteses)
- DDD deve ter 2 dígitos
- Celular deve ter 9 dígitos (começa com 9)

### Mensagem não chega:
- WhatsApp deve estar conectado (check no dashboard)
- Número de telefone deve estar correto
- Pode haver delay de até 30 segundos
- WhatsApp do destinatário pode estar sem internet

### "WhatsApp foi desconectado"
- QR Code expirou ou dispositivo foi desconectado manualmente
- Reconecte escaneando o QR Code novamente
- Evite desconectar "Dispositivos conectados" no WhatsApp

---

## ✅ Checklist Final

Antes de prosseguir, certifique-se:

- [ ] Conta criada na Z-API
- [ ] Instância criada e nomeada
- [ ] WhatsApp conectado via QR Code (status: Conectado)
- [ ] 3 credenciais copiadas (URL, Token, Client Token)
- [ ] Credenciais adicionadas no `.env.local`
- [ ] Teste de envio realizado com sucesso
- [ ] Mensagem recebida no WhatsApp
- [ ] Servidor Next.js reiniciado

---

## 💰 Planos e Preços (referência)

- **Trial:** 14 dias gratuitos
- **Básico:** R$ 89/mês por instância
- **Pro:** Consulte o site para features avançadas

Você pode cancelar a qualquer momento.

---

## 🎉 Pronto!

Agora você tem:
- ✅ Supabase configurado (banco de dados)
- ✅ Z-API configurada (WhatsApp)
- ✅ Projeto Next.js estruturado

**Próximos passos:**
1. Definir as perguntas reais do quiz em `src/lib/quiz-data.ts`
2. Implementar a interface do quiz
3. Testar o fluxo completo
4. Deploy na Vercel

---

## 📚 Documentação Oficial

- [Z-API Docs](https://developer.z-api.io)
- [WhatsApp Business Policy](https://www.whatsapp.com/legal/business-policy)
- [Z-API Suporte](https://z-api.io/suporte)

---

## 🆘 Precisa de Ajuda?

- Suporte Z-API: suporte@z-api.io
- Chat no site: https://z-api.io
- WhatsApp do suporte Z-API: (11) 3230-5771

