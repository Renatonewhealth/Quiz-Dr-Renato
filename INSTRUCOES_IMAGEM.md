# 📸 Instruções para Adicionar a Foto do Dr. Renato

## Passo a Passo

### 1. Salvar a Imagem

A imagem do Dr. Renato que você enviou precisa ser salva em:

```
quiz-dr-renato/public/images/dr-renato.jpg
```

### 2. Como Fazer

**Opção A: Via Terminal (Recomendado)**

Se você tiver a imagem salva em algum lugar do seu computador, use:

```bash
# Navegue até a pasta do projeto
cd "/Users/heitorfreitas/Documents/Quizz Dr Renato Silveira/quiz-dr-renato"

# Copie a imagem para o local correto
# Substitua /caminho/para/sua/imagem.jpg pelo caminho real da imagem
cp /caminho/para/sua/imagem.jpg public/images/dr-renato.jpg
```

**Opção B: Via Finder (Mac)**

1. Abra o Finder
2. Navegue até: `/Users/heitorfreitas/Documents/Quizz Dr Renato Silveira/quiz-dr-renato/public/images/`
3. Arraste a foto do Dr. Renato para essa pasta
4. Renomeie para: `dr-renato.jpg`

**Opção C: Criar a pasta e adicionar manualmente**

```bash
# Garantir que a pasta existe
mkdir -p "/Users/heitorfreitas/Documents/Quizz Dr Renato Silveira/quiz-dr-renato/public/images"

# Depois arraste a imagem para lá via Finder
```

### 3. Formato da Imagem

- **Nome do arquivo:** `dr-renato.jpg`
- **Formato:** JPG ou PNG
- **Tamanho recomendado:** A imagem que você enviou já está em ótimo tamanho
- **Qualidade:** A imagem será otimizada automaticamente pelo Next.js

### 4. Verificar se Funcionou

Após salvar a imagem, o site deve carregar automaticamente. Se não funcionar:

```bash
# Reinicie o servidor de desenvolvimento
npm run dev
```

## ✅ Checklist

- [ ] Pasta `public/images/` existe
- [ ] Imagem salva como `dr-renato.jpg`
- [ ] Servidor rodando (`npm run dev`)
- [ ] Abrir http://localhost:3000 e verificar

---

## 🎨 O que Mudou no Design

### Layout Melhorado

✅ **Espaçamento consistente:** Margens e paddings bem definidos  
✅ **Hierarquia visual:** Tamanhos de fonte progressivos e claros  
✅ **Container centralizado:** Max-width de 4xl (1024px) para leitura confortável  
✅ **Responsivo:** Design perfeito em mobile, tablet e desktop  

### Tamanhos de Fonte Ajustados

- **Headline:** 2xl → 3xl → 4xl → 5xl (mobile → desktop)
- **Sub-headline:** base → lg → xl
- **Credenciais:** sm → base → lg
- **Botão:** base → lg → xl

### Imagem do Doutor

- **Proporção mantida:** Aspect ratio preservado
- **Sombra sutil:** shadow-lg para profundidade
- **Borda clean:** border-gray-200
- **Centralizada:** max-w-sm com mx-auto
- **Otimizada:** Next.js Image component (lazy loading, otimização automática)

### Background

- **Mais sutil:** Opacity reduzida para 30%
- **Gradientes suaves:** Blur maior, cores mais discretas
- **Não distrai:** Foco no conteúdo

---

## 🚨 Problemas Comuns

### Imagem não aparece?

1. Verifique o caminho: `public/images/dr-renato.jpg`
2. Nome do arquivo deve ser exatamente `dr-renato.jpg` (minúsculas)
3. Reinicie o servidor: `Ctrl+C` e depois `npm run dev`

### Erro 404 na imagem?

- A pasta `public` deve estar na raiz do projeto
- Caminho completo: `/Users/heitorfreitas/Documents/Quizz Dr Renato Silveira/quiz-dr-renato/public/images/dr-renato.jpg`

### Imagem muito grande?

- Next.js otimiza automaticamente
- Mas se quiser, pode redimensionar para 800x1020px

---

*Após adicionar a imagem, o design estará completo e profissional!* 🎉

