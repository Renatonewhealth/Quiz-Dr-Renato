'use client';

import { useState, useEffect, useRef, ReactNode, MouseEvent } from 'react';

interface OneKitUpsellLinkProps {
  href: string;        // Fallback 1 kit checkout URL
  promoHref: string;   // 2 kits promo checkout URL
  children: ReactNode; // Image / content to wrap
  className?: string;
}

/**
 * Intercepta o clique na imagem de "1 kit", mostra overlay de loading por 2s
 * e depois abre um pop-up oferecendo upsell de 5% de desconto em 2 kits
 * com timer de 5 minutos.
 */
export default function OneKitUpsellLink({
  href,
  promoHref,
  children,
  className,
}: OneKitUpsellLinkProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'modal'>('idle');
  const [secondsLeft, setSecondsLeft] = useState(300);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setState('loading');
    setTimeout(() => {
      setState('modal');
      setSecondsLeft(300);
    }, 2000);
  };

  useEffect(() => {
    if (state === 'modal') {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state]);

  useEffect(() => {
    if (state === 'modal' || state === 'loading') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [state]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>

      {/* Loading Overlay */}
      {state === 'loading' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-md"
          aria-live="polite"
        >
          <div className="text-center">
            <div className="w-14 h-14 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white text-lg font-semibold drop-shadow-lg">
              Processando...
            </p>
          </div>
        </div>
      )}

      {/* Upsell Modal */}
      {state === 'modal' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md px-4 py-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 relative shadow-2xl animate-[fadeInUp_0.3s_ease-out]">
            {/* Timer */}
            <div className="text-center mb-5 pb-4 border-b border-gray-100">
              <p className="text-[11px] uppercase tracking-[0.1em] text-gray-500 mb-1 font-medium">
                Essa promoção expira em
              </p>
              <p className="text-3xl sm:text-4xl font-black text-[#dc2626] tabular-nums leading-none">
                {formatTime(secondsLeft)}
              </p>
            </div>

            {/* Headline */}
            <h3 className="text-xl sm:text-2xl font-black text-center text-gray-900 leading-tight mb-3">
              🎉 Parabéns, você foi escolhida para ganhar um desconto especial de{' '}
              <span className="text-[#2ec6a8]">5%</span> para comprar{' '}
              <span className="text-[#2ec6a8]">2 kits Desparafit</span>!
            </h3>

            {/* Sub-text */}
            <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">
              Você quer aproveitar essa promoção ou prefere seguir com apenas 1 kit mesmo?
            </p>

            {/* Buttons */}
            <div className="space-y-3">
              <a
                href={promoHref}
                className="block w-full bg-[#2ec6a8] hover:bg-[#27b098] text-white font-bold text-center py-4 px-4 rounded-lg transition-colors shadow-lg"
              >
                QUERO APROVEITAR A PROMOÇÃO
              </a>
              <a
                href={href}
                className="block w-full text-sm text-gray-500 hover:text-gray-700 text-center underline py-2 transition-colors"
              >
                Quero apenas 1 kit
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
