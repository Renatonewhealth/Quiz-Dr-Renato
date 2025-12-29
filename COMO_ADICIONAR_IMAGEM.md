# 📸 Como Adicionar a Foto do Dr. Renato

## ⚠️ IMPORTANTE

Infelizmente, não consigo baixar/salvar a imagem que você anexou diretamente. 
Mas é super fácil você fazer isso!

---

## 🎯 Passo a Passo (SUPER RÁPIDO)

### Opção 1: Arrastar e Soltar (Mais Fácil)

1. **Clique com botão direito** na imagem que você anexou aqui no chat
2. **"Salvar imagem como..."** ou **"Save image as..."**
3. **Nome do arquivo:** `dr-renato.jpg`
4. **Salvar em:** 
   ```
   /Users/heitorfreitas/Documents/Quizz Dr Renato Silveira/quiz-dr-renato/public/images/
   ```
5. **Pronto!** A imagem vai aparecer automaticamente no site

### Opção 2: Via Finder

1. **Abra o Finder**
2. **Navegue até:** 
   ```
   /Users/heitorfreitas/Documents/Quizz Dr Renato Silveira/quiz-dr-renato/public/images/
   ```
3. **Arraste a foto** do Dr. Renato para essa pasta
4. **Renomeie para:** `dr-renato.jpg`

---

## ✅ O Que Já Está Pronto

✅ **Layout:** Imagem colada no fundo da página  
✅ **Sem bordas:** Zero stroke, zero padding  
✅ **Sem espaços:** A imagem fica grudada embaixo  
✅ **Responsivo:** Se ajusta em qualquer tela  
✅ **Otimizado:** Next.js vai carregar super rápido  

---

## 🎨 Como Vai Ficar

```
┌─────────────────────────────────┐
│     Headline sobre parasitas    │
│     Sub-headline (90 seg)       │
│     [BOTÃO: INICIAR ANÁLISE]    │
│     Credenciais do Dr. Renato   │
└─────────────────────────────────┘
│                                 │
│   FOTO DO DR. RENATO AQUI       │
│   (sem bordas, colada embaixo)  │
│                                 │
└─────────────────────────────────┘
        (fim da página)
```

A imagem vai ficar **perfeitamente colada** na parte de baixo, sem nenhum espaço!

---

## 🔍 Verificar se Funcionou

1. Salve a imagem em `public/images/dr-renato.jpg`
2. Abra: http://localhost:3000
3. Role até o final da página
4. A foto do Dr. Renato deve estar lá, colada embaixo!

---

## 🚨 Não Está Aparecendo?

**Possíveis problemas:**

1. **Nome errado:** Deve ser exatamente `dr-renato.jpg` (minúsculas)
2. **Pasta errada:** Deve estar em `public/images/`
3. **Servidor parado:** Rode `npm run dev` novamente

**Solução rápida:**
```bash
# Reinicie o servidor
cd "/Users/heitorfreitas/Documents/Quizz Dr Renato Silveira/quiz-dr-renato"
npm run dev
```

---

## 💡 Dica

Se você salvou a imagem com outro nome (como `foto-doutor.jpg`), pode:

**Renomear via Terminal:**
```bash
cd "/Users/heitorfreitas/Documents/Quizz Dr Renato Silveira/quiz-dr-renato/public/images"
mv sua-foto.jpg dr-renato.jpg
```

**Ou via Finder:**
- Clique com botão direito na foto
- "Renomear" → `dr-renato.jpg`

---

*Assim que você salvar a imagem, ela vai aparecer automaticamente colada no fundo da página!* 🎉

