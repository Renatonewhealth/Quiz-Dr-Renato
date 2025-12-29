/**
 * 📱 BREAKPOINTS - SISTEMA MOBILE-FIRST
 * 
 * Este projeto usa a abordagem MOBILE-FIRST do Tailwind CSS:
 * - Estilos base são para MOBILE (0px - 639px)
 * - Prefixos (sm:, md:, lg:) adicionam estilos para telas MAIORES
 * 
 * @example
 * // CORRETO (Mobile-First): texto pequeno no mobile, maior em desktop
 * className="text-sm md:text-base lg:text-lg"
 * 
 * // ERRADO (Desktop-First): nunca faça isso!
 * className="text-lg md:text-base sm:text-sm"
 */

/**
 * Breakpoints do Tailwind CSS
 * Usar com min-width (mobile-first)
 */
export const BREAKPOINTS = {
  /** Mobile: 0px - 639px (BASE, sem prefixo) */
  mobile: 0,
  
  /** Small: 640px+ (celulares grandes em landscape) */
  sm: 640,
  
  /** Medium: 768px+ (tablets em portrait) */
  md: 768,
  
  /** Large: 1024px+ (tablets landscape, desktops pequenos) */
  lg: 1024,
  
  /** Extra Large: 1280px+ (desktops) */
  xl: 1280,
  
  /** 2XL: 1536px+ (telas grandes) */
  '2xl': 1536,
} as const;

/**
 * Dispositivos alvo principais
 */
export const TARGET_DEVICES = {
  /** iPhone SE, iPhone 8 */
  iPhoneSE: { width: 375, height: 667 },
  
  /** iPhone 12/13/14 */
  iPhone12: { width: 390, height: 844 },
  
  /** iPhone 12/13/14 Pro Max */
  iPhoneProMax: { width: 428, height: 926 },
  
  /** Android médio */
  androidMedium: { width: 360, height: 800 },
  
  /** Samsung Galaxy S21 */
  galaxyS21: { width: 412, height: 915 },
} as const;

/**
 * Tamanho máximo recomendado para containers do quiz
 * Otimizado para leitura confortável em mobile
 */
export const QUIZ_CONTAINER_WIDTH = 480; // px

/**
 * Media queries para uso em CSS-in-JS
 * @example
 * const styles = {
 *   [MEDIA_QUERIES.tablet]: { padding: '24px' }
 * }
 */
export const MEDIA_QUERIES = {
  /** Tablets e acima (768px+) */
  tablet: `@media (min-width: ${BREAKPOINTS.md}px)`,
  
  /** Desktops e acima (1024px+) */
  desktop: `@media (min-width: ${BREAKPOINTS.lg}px)`,
  
  /** Telas grandes (1280px+) */
  largeDesktop: `@media (min-width: ${BREAKPOINTS.xl}px)`,
  
  /** Modo landscape em mobile */
  mobileLandscape: `@media (max-width: ${BREAKPOINTS.md - 1}px) and (orientation: landscape)`,
  
  /** Preferência por reduced motion */
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
  
  /** Dark mode do sistema */
  darkMode: '@media (prefers-color-scheme: dark)',
} as const;

/**
 * Hook helper para verificar breakpoints (client-side)
 * 
 * @example
 * const isMobile = useMediaQuery(MEDIA_QUERIES.tablet, false);
 */
export const checkBreakpoint = (breakpoint: keyof typeof BREAKPOINTS): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= BREAKPOINTS[breakpoint];
};

/**
 * Classes Tailwind para tipografia responsiva mobile-first
 */
export const RESPONSIVE_TEXT = {
  /** Hero/Título principal: 30px mobile → 48px desktop */
  hero: 'text-3xl md:text-4xl lg:text-5xl',
  
  /** Títulos de seção: 24px mobile → 32px desktop */
  title: 'text-2xl md:text-3xl',
  
  /** Subtítulos: 18px mobile → 20px desktop */
  subtitle: 'text-lg md:text-xl',
  
  /** Texto normal: 16px (base) */
  body: 'text-base',
  
  /** Texto pequeno: 14px mobile */
  small: 'text-sm',
  
  /** Labels/Captions: 12px */
  caption: 'text-xs',
} as const;

/**
 * Classes Tailwind para espaçamentos responsivos mobile-first
 */
export const RESPONSIVE_SPACING = {
  /** Padding de página: 16px mobile → 32px desktop */
  pagePadding: 'px-4 md:px-8',
  
  /** Padding vertical de seção: 32px mobile → 64px desktop */
  sectionPadding: 'py-8 md:py-16',
  
  /** Gap entre elementos: 16px mobile → 24px desktop */
  gap: 'gap-4 md:gap-6',
  
  /** Margin bottom: 24px mobile → 32px desktop */
  marginBottom: 'mb-6 md:mb-8',
} as const;

