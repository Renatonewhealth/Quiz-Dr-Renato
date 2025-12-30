# 🖼️ Como Adicionar Imagem no Formulário de Resultado

## 📋 Passo a Passo

### 1. Prepare a Imagem

**Especificações recomendadas:**
- Formato: PNG ou JPG
- Dimensões: 800x800px (quadrada) ou 1200x1200px
- Tamanho do arquivo: < 500KB (otimizar se necessário)
- Nome do arquivo: `resultado-lead.png` ou `resultado-lead.jpg`

### 2. Adicione a Imagem na Pasta

Coloque a imagem em:
```
/public/images/resultado-lead.png
```

### 3. Atualize o Código

Abra o arquivo: `src/app/quiz/page.tsx`

**Localize esta parte** (por volta da linha 310):

```tsx
{/* Placeholder para imagem */}
<div className="w-full max-w-md mx-auto mb-4">
  <div className="aspect-square bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center">
    <div className="text-center p-6">
      <span className="text-4xl mb-2 block">🖼️</span>
      <p className="text-sm text-gray-500 font-medium">
        Adicione a imagem em:
      </p>
      <p className="text-xs text-gray-400 mt-1 font-mono">
        public/images/resultado-lead.png
      </p>
    </div>
  </div>
</div>
```

**Substitua por:**

```tsx
{/* Imagem do resultado */}
<div className="w-full max-w-md mx-auto mb-4">
  <Image
    src="/images/resultado-lead.png"
    alt="Resultado da Análise"
    width={800}
    height={800}
    className="w-full h-auto rounded-2xl shadow-lg"
    priority
  />
</div>
```

### 4. Adicione o Import do Image (se ainda não tiver)

No topo do arquivo `src/app/quiz/page.tsx`, adicione:

```tsx
import Image from 'next/image';
```

Procure a linha que tem outros imports e adicione junto deles.

### 5. Reinicie o Servidor

```bash
# Pressione Ctrl+C no terminal
# E rode novamente:
npm run dev
```

---

## 🎨 Customizações Opcionais

### Mudar o tamanho da imagem:

```tsx
<div className="w-full max-w-lg mx-auto mb-4"> {/* max-w-lg ao invés de max-w-md */}
```

### Adicionar borda colorida:

```tsx
<Image
  src="/images/resultado-lead.png"
  alt="Resultado da Análise"
  width={800}
  height={800}
  className="w-full h-auto rounded-2xl shadow-lg border-4 border-[#10b981]"
  priority
/>
```

### Fazer imagem circular:

```tsx
<Image
  src="/images/resultado-lead.png"
  alt="Resultado da Análise"
  width={800}
  height={800}
  className="w-full h-auto rounded-full shadow-lg"
  priority
/>
```

---

## ✅ Checklist

- [ ] Imagem está em `public/images/resultado-lead.png`
- [ ] Código foi atualizado no `src/app/quiz/page.tsx`
- [ ] Import do `Image` foi adicionado
- [ ] Servidor foi reiniciado
- [ ] Testou acessando o quiz e vendo o formulário

---

## 🐛 Problemas Comuns

### Imagem não aparece
- Verifique se o nome do arquivo está correto
- Verifique se a imagem está na pasta `public/images/`
- Limpe o cache: delete a pasta `.next` e reinicie o servidor

### Imagem muito grande
- Otimize a imagem antes de adicionar
- Use um compressor online como TinyPNG

### Erro de build
- Verifique se adicionou o import do `Image`
- Verifique se fechou todas as tags corretamente

