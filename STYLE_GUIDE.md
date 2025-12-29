# 🎨 Style Guide - Quiz Dr. Renato Silveira

> **Inspirado na plataforma inlead.digital** - Referência brasileira em funis de quiz interativos

---

## 🚨 IMPORTANTE: ESTE PROJETO É MOBILE-FIRST

**Todo o código, CSS e componentes são escritos PRIMEIRO para mobile e depois adaptados para telas maiores.**

### O que isso significa na prática?

```
MOBILE-FIRST (CORRETO) ✅
┌─────────────────────────────────────────────────────────────┐
│ Estilos BASE = Mobile (320px - 639px)                       │
│ sm: prefixo = Celulares grandes (640px+)                    │
│ md: prefixo = Tablets (768px+)                              │
│ lg: prefixo = Desktops (1024px+)                            │
│ xl: prefixo = Telas grandes (1280px+)                       │
└─────────────────────────────────────────────────────────────┘

DESKTOP-FIRST (ERRADO) ❌
Estilos BASE = Desktop → depois reduz para mobile
```

### Exemplos de código Mobile-First

```tsx
// ✅ CORRETO: texto pequeno no mobile, maior em desktop
<h1 className="text-2xl md:text-4xl lg:text-5xl">
  Título
</h1>

// ✅ CORRETO: padding menor no mobile, maior em desktop
<div className="p-4 md:p-6 lg:p-8">
  Conteúdo
</div>

// ✅ CORRETO: coluna no mobile, linha em desktop
<div className="flex flex-col md:flex-row">
  Itens
</div>

// ❌ ERRADO: nunca comece pelo maior
<h1 className="text-5xl md:text-4xl sm:text-2xl">
  Título
</h1>
```

### Dispositivos Alvo

| Dispositivo | Largura | Prioridade |
|-------------|---------|------------|
| iPhone SE | 375px | Alta |
| iPhone 12/13/14 | 390px | Alta |
| iPhone Pro Max | 428px | Alta |
| Android Médio | 360px | Alta |
| Samsung Galaxy | 412px | Alta |
| iPad | 768px | Média |
| Desktop | 1024px+ | Baixa |

### Checklist Mobile-First

Antes de cada commit, verifique:
- [ ] Testou no Chrome DevTools em 375px?
- [ ] Botões têm mínimo 44px de altura (touch-friendly)?
- [ ] Texto é legível sem zoom?
- [ ] Formulários são fáceis de preencher?
- [ ] Animações são suaves (60fps)?

---

## 📐 Filosofia de Design

### Princípios Core
1. **📱 Mobile-First**: Otimizado para celular (90%+ dos acessos)
2. **🌙 Dark Mode Elegante**: Fundo escuro com elementos vibrantes
3. **🎮 Gamificação Visual**: Progresso, feedback e recompensas visuais
4. **✨ Fluidez**: Transições suaves entre telas
5. **🎯 Conversão**: Design focado em manter engajamento

---

## 🎨 Paleta de Cores

### Cores Primárias (Gradientes)

```css
/* Gradiente Principal - Roxo/Azul */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Gradiente Secundário - Cyan/Azul */
--gradient-secondary: linear-gradient(135deg, #00d4ff 0%, #5b5ee1 100%);

/* Gradiente de Destaque - Rosa/Roxo */
--gradient-accent: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

/* Gradiente Sucesso - Verde/Cyan */
--gradient-success: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
```

### Background (Dark Mode)

```css
/* Fundo Principal */
--bg-primary: #0f0f1a;      /* Preto profundo com tom azulado */
--bg-secondary: #1a1a2e;    /* Cards e elementos elevados */
--bg-tertiary: #252542;     /* Hover states */
--bg-card: #16162a;         /* Cards destacados */

/* Overlay para modais */
--bg-overlay: rgba(0, 0, 0, 0.8);
```

### Cores de Texto

```css
/* Textos */
--text-primary: #ffffff;    /* Títulos e texto principal */
--text-secondary: #a0a0b8;  /* Texto secundário/descrições */
--text-muted: #6b6b80;      /* Texto desabilitado */
--text-accent: #667eea;     /* Links e destaques */
```

### Cores de Estado

```css
/* Estados */
--color-success: #38ef7d;   /* Sucesso/Correto */
--color-warning: #ffc107;   /* Alerta */
--color-error: #f5576c;     /* Erro */
--color-info: #00d4ff;      /* Informação */
```

### Cores de Opções do Quiz

```css
/* Botões de opção (não selecionado) */
--option-bg: rgba(102, 126, 234, 0.1);
--option-border: rgba(102, 126, 234, 0.3);
--option-text: #ffffff;

/* Botões de opção (hover) */
--option-hover-bg: rgba(102, 126, 234, 0.2);
--option-hover-border: rgba(102, 126, 234, 0.6);

/* Botões de opção (selecionado) */
--option-selected-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--option-selected-border: transparent;
--option-selected-text: #ffffff;
```

---

## ✏️ Tipografia

### Font Stack

```css
/* Fonte Principal - Inter (Google Fonts) */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Fonte para Números/Dados */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Tamanhos de Fonte

```css
/* Mobile-First (base: 16px) */
--text-xs: 0.75rem;     /* 12px - Labels pequenos */
--text-sm: 0.875rem;    /* 14px - Texto secundário */
--text-base: 1rem;      /* 16px - Texto padrão */
--text-lg: 1.125rem;    /* 18px - Destaque */
--text-xl: 1.25rem;     /* 20px - Subtítulos */
--text-2xl: 1.5rem;     /* 24px - Títulos de seção */
--text-3xl: 1.875rem;   /* 30px - Títulos principais mobile */
--text-4xl: 2.25rem;    /* 36px - Hero text mobile */
--text-5xl: 3rem;       /* 48px - Hero text desktop */
```

### Font Weights

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights

```css
--leading-tight: 1.2;   /* Títulos */
--leading-normal: 1.5;  /* Texto corrido */
--leading-relaxed: 1.75; /* Leitura longa */
```

---

## 📐 Espaçamentos

### Sistema de Spacing (8px base)

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Padding de Containers

```css
/* Mobile */
--container-padding-mobile: 1rem;        /* 16px */

/* Tablet+ */
--container-padding-tablet: 1.5rem;      /* 24px */

/* Desktop */
--container-padding-desktop: 2rem;       /* 32px */

/* Max-width do quiz container */
--quiz-max-width: 480px;
--result-max-width: 600px;
```

---

## 🔘 Componentes

### 1. Cards

```css
.card {
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid rgba(102, 126, 234, 0.1);
  padding: 24px;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.3),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.card:hover {
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.4),
    0 4px 6px -2px rgba(0, 0, 0, 0.3);
}
```

### 2. Botões de Opção do Quiz

```css
.quiz-option {
  width: 100%;
  padding: 16px 20px;
  border-radius: 12px;
  border: 2px solid var(--option-border);
  background: var(--option-bg);
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 12px;
}

.quiz-option:hover {
  background: var(--option-hover-bg);
  border-color: var(--option-hover-border);
  transform: translateX(4px);
}

.quiz-option.selected {
  background: var(--option-selected-bg);
  border-color: transparent;
  transform: scale(1.02);
}

.quiz-option-letter {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
}

.quiz-option.selected .quiz-option-letter {
  background: rgba(255, 255, 255, 0.2);
}
```

### 3. Botão Principal (CTA)

```css
.btn-primary {
  width: 100%;
  padding: 16px 32px;
  border-radius: 12px;
  border: none;
  background: var(--gradient-primary);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Efeito de brilho no hover */
.btn-primary::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: rotate(45deg);
  transition: all 0.5s ease;
}

.btn-primary:hover::after {
  left: 100%;
}
```

### 4. Botão Secundário

```css
.btn-secondary {
  width: 100%;
  padding: 16px 32px;
  border-radius: 12px;
  border: 2px solid rgba(102, 126, 234, 0.5);
  background: transparent;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.8);
}
```

### 5. Progress Bar

```css
.progress-container {
  width: 100%;
  height: 8px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 999px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-top: 8px;
}
```

### 6. Input Fields

```css
.input-field {
  width: 100%;
  padding: 16px 20px;
  border-radius: 12px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.2s ease;
}

.input-field::placeholder {
  color: var(--text-muted);
}

.input-field:focus {
  outline: none;
  border-color: var(--text-accent);
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.input-field.error {
  border-color: var(--color-error);
}

.input-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.input-error {
  font-size: 0.75rem;
  color: var(--color-error);
  margin-top: 4px;
}
```

### 7. Result Card (Página de Resultado)

```css
.result-card {
  background: var(--bg-card);
  border-radius: 24px;
  padding: 32px;
  text-align: center;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.result-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  border-radius: 50%;
  background: var(--gradient-success);
  display: flex;
  align-items: center;
  justify-content: center;
}

.result-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.result-category {
  font-size: 1.25rem;
  font-weight: 600;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
}

.result-message {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.result-score {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 999px;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-top: 24px;
}
```

---

## ✨ Animações

### Transições Globais

```css
/* Transição padrão */
--transition-fast: 150ms ease;
--transition-base: 200ms ease;
--transition-slow: 300ms ease;
--transition-slower: 500ms cubic-bezier(0.4, 0, 0.2, 1);
```

### Keyframes

```css
/* Fade In Up - Para elementos que entram */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fade In Scale - Para cards */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Pulse - Para CTAs importantes */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

/* Shimmer - Loading state */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Slide In - Para opções do quiz */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

### Classes de Animação

```css
.animate-fadeInUp {
  animation: fadeInUp 0.5s ease forwards;
}

.animate-fadeInScale {
  animation: fadeInScale 0.4s ease forwards;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

.animate-slideIn {
  animation: slideIn 0.3s ease forwards;
}

/* Delays para stagger effect */
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }
```

---

## 📱 Responsividade

### Breakpoints

```css
/* Mobile First */
--breakpoint-sm: 640px;   /* Celulares grandes */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Desktops */
--breakpoint-xl: 1280px;  /* Telas grandes */
```

### Layout Mobile (Default)

```css
.quiz-container {
  width: 100%;
  min-height: 100vh;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.quiz-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: var(--quiz-max-width);
  margin: 0 auto;
  width: 100%;
}
```

### Layout Tablet+

```css
@media (min-width: 768px) {
  .quiz-container {
    padding: 32px;
  }
  
  .quiz-content {
    justify-content: center;
  }
}
```

---

## 🎯 Layout das Telas

### 1. Landing Page

```
┌─────────────────────────────────┐
│                                 │
│        [Logo/Imagem]            │
│                                 │
│     Título Principal            │
│     (Gradiente text)            │
│                                 │
│     Subtítulo/Descrição         │
│     (Texto secundário)          │
│                                 │
│   ┌─────────────────────────┐   │
│   │    COMEÇAR QUIZ         │   │
│   │    (Botão Primary)      │   │
│   └─────────────────────────┘   │
│                                 │
│     Depoimentos/Social Proof    │
│                                 │
└─────────────────────────────────┘
```

### 2. Pergunta do Quiz

```
┌─────────────────────────────────┐
│  Progress Bar                   │
│  ░░░░░░░░▓▓▓▓▓▓░░░░░░░░░░      │
│  Pergunta 3 de 10               │
│                                 │
│  ┌───────────────────────────┐  │
│  │                           │  │
│  │    Texto da Pergunta      │  │
│  │    (Grande, centralizado) │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌─────────────────────────┐    │
│  │ A │ Opção 1              │    │
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │
│  │ B │ Opção 2              │    │
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │
│  │ C │ Opção 3              │    │
│  └─────────────────────────┘    │
│  ┌─────────────────────────┐    │
│  │ D │ Opção 4 (selecionada)│    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │      PRÓXIMA →          │    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

### 3. Formulário de Lead

```
┌─────────────────────────────────┐
│                                 │
│     🎉 Parabéns!                │
│                                 │
│     Complete seu cadastro       │
│     para receber o resultado    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ Nome completo           │    │
│  │ ________________________│    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ E-mail                  │    │
│  │ ________________________│    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │ WhatsApp                │    │
│  │ ________________________│    │
│  └─────────────────────────┘    │
│                                 │
│  ┌─────────────────────────┐    │
│  │   VER MEU RESULTADO     │    │
│  └─────────────────────────┘    │
│                                 │
│  🔒 Seus dados estão seguros   │
│                                 │
└─────────────────────────────────┘
```

### 4. Página de Resultado

```
┌─────────────────────────────────┐
│                                 │
│           ✅ (ícone)            │
│                                 │
│     Seu Resultado:              │
│                                 │
│     EXCELENTE                   │
│     (Gradiente text grande)     │
│                                 │
│     ┌─────────────────────┐     │
│     │   Score: 85/100     │     │
│     └─────────────────────┘     │
│                                 │
│  ┌───────────────────────────┐  │
│  │                           │  │
│  │  Mensagem personalizada   │  │
│  │  do resultado com dicas   │  │
│  │  e próximos passos.       │  │
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│  📱 Resultado enviado para     │
│     seu WhatsApp!               │
│                                 │
│  ┌─────────────────────────┐    │
│  │   AGENDAR CONSULTA      │    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘
```

---

## 🖼️ Assets e Ícones

### Ícones (Lucide React)

```tsx
// Ícones recomendados
import {
  ChevronRight,    // Navegação
  ChevronLeft,     // Voltar
  Check,           // Selecionado/Sucesso
  X,               // Fechar/Erro
  Loader2,         // Loading spinner
  ArrowRight,      // CTA
  Shield,          // Segurança
  MessageCircle,   // WhatsApp
  Mail,            // Email
  Phone,           // Telefone
  User,            // Usuário
  Trophy,          // Resultado
  Star,            // Destaque
  Sparkles,        // Decorativo
} from 'lucide-react';
```

### Tamanhos de Ícones

```css
--icon-xs: 16px;
--icon-sm: 20px;
--icon-md: 24px;
--icon-lg: 32px;
--icon-xl: 48px;
```

---

## 📋 Classes Utilitárias Tailwind

### Cores customizadas para usar

```tsx
// No globals.css, as variáveis já estão definidas
// Use essas classes no JSX:

// Backgrounds
className="bg-[#0f0f1a]"      // bg-primary
className="bg-[#1a1a2e]"      // bg-secondary
className="bg-[#16162a]"      // bg-card

// Textos
className="text-white"         // text-primary
className="text-[#a0a0b8]"    // text-secondary
className="text-[#667eea]"    // text-accent

// Gradientes
className="bg-gradient-to-r from-[#667eea] to-[#764ba2]"

// Bordas
className="border-[rgba(102,126,234,0.3)]"
```

---

## ✅ Checklist de Implementação

### Fase 1: Setup
- [ ] Atualizar `globals.css` com variáveis CSS
- [ ] Configurar fonte Inter no layout
- [ ] Definir cores do tema no Tailwind

### Fase 2: Componentes Base
- [ ] Button (Primary e Secondary)
- [ ] Input Field
- [ ] Card
- [ ] Progress Bar

### Fase 3: Componentes Quiz
- [ ] QuizOption (botões de resposta)
- [ ] QuizProgress
- [ ] QuizQuestion
- [ ] LeadForm

### Fase 4: Páginas
- [ ] Landing Page
- [ ] Quiz Page
- [ ] Resultado Page

### Fase 5: Animações
- [ ] Transições de página
- [ ] Animações de entrada
- [ ] Feedback de seleção
- [ ] Loading states

---

## 🎨 Exemplos de Código React

### Botão de Opção do Quiz

```tsx
interface QuizOptionProps {
  letter: string;
  text: string;
  selected: boolean;
  onClick: () => void;
  delay?: number;
}

export function QuizOption({ letter, text, selected, onClick, delay = 0 }: QuizOptionProps) {
  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${delay}ms` }}
      className={`
        w-full p-4 rounded-xl border-2 text-left
        flex items-center gap-3
        transition-all duration-200
        animate-slideIn opacity-0
        ${selected 
          ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] border-transparent scale-[1.02]' 
          : 'bg-[rgba(102,126,234,0.1)] border-[rgba(102,126,234,0.3)] hover:bg-[rgba(102,126,234,0.2)] hover:border-[rgba(102,126,234,0.6)] hover:translate-x-1'
        }
      `}
    >
      <span className={`
        w-8 h-8 rounded-lg flex items-center justify-center
        font-bold text-sm
        ${selected ? 'bg-white/20' : 'bg-white/10'}
      `}>
        {letter}
      </span>
      <span className="text-white font-medium">{text}</span>
    </button>
  );
}
```

### Botão CTA

```tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, disabled, loading, variant = 'primary' }: ButtonProps) {
  const baseStyles = "w-full py-4 px-8 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white hover:shadow-[0_10px_40px_rgba(102,126,234,0.4)] hover:-translate-y-0.5",
    secondary: "bg-transparent border-2 border-[rgba(102,126,234,0.5)] text-white hover:bg-[rgba(102,126,234,0.1)] hover:border-[rgba(102,126,234,0.8)]"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
      ) : (
        children
      )}
    </button>
  );
}
```

---

## 📚 Referências

- **inlead.digital** - Plataforma de referência
- **Tailwind CSS** - Framework de estilização
- **Framer Motion** - Biblioteca de animações
- **Lucide React** - Biblioteca de ícones
- **Inter Font** - Tipografia principal

---

*Este guia deve ser seguido em todas as implementações de UI do projeto Quiz Dr. Renato Silveira.*

