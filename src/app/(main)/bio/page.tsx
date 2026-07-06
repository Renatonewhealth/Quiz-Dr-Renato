import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Instagram, MessageCircle, ChevronRight, BadgeCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dr. Renato Silveira · H9 Pharma',
  description:
    'Página oficial de links do Dr. Renato Silveira Reis. Conheça o Desparafit e os outros protocolos da H9 Pharma.',
  robots: 'index, follow',
};

/* ---------- Link button ---------- */
interface LinkButtonProps {
  href: string;
  label: string;
  sublabel?: string;
  primary?: boolean;
}

function LinkButton({ href, label, sublabel, primary }: LinkButtonProps) {
  const baseClasses =
    'group relative flex items-center justify-between gap-3 w-full rounded-2xl px-5 py-5 sm:py-6 transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow-md';
  const primaryClasses =
    'bg-[#14532d] hover:bg-[#0f3d21] text-white border border-[#14532d]';
  const secondaryClasses =
    'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200';

  return (
    <a
      href={href}
      className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses}`}
    >
      <div className="flex-1 text-left">
        <p
          className={`font-bold text-base sm:text-lg leading-tight ${
            primary ? 'text-white' : 'text-gray-900'
          }`}
        >
          {label}
        </p>
        {sublabel && (
          <p
            className={`text-[13px] sm:text-sm mt-0.5 leading-snug ${
              primary ? 'text-white/80' : 'text-gray-500'
            }`}
          >
            {sublabel}
          </p>
        )}
      </div>
      <ChevronRight
        className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:translate-x-1 ${
          primary ? 'text-white/70' : 'text-gray-400'
        }`}
        strokeWidth={2}
      />
    </a>
  );
}

/* ============================================================
    PAGE
   ============================================================ */
export default function BioPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#14532d]/5 via-white to-[#c9a961]/5 flex flex-col">
      <div className="flex-1 flex flex-col items-center px-5 sm:px-6 pt-12 sm:pt-16 pb-8">
        <div className="w-full max-w-md">
          {/* Foto + info do perfil */}
          <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-4 ring-white shadow-lg mb-4">
              <Image
                src="/images/dr-renato-portrait.jpg"
                alt="Dr. Renato Silveira Reis"
                fill
                className="object-cover"
                sizes="128px"
                priority
              />
            </div>

            <div className="flex items-center gap-1.5 mb-1">
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Dr. Renato Silveira
              </h1>
              <BadgeCheck className="w-5 h-5 text-[#14532d]" fill="#14532d" strokeWidth={2} />
            </div>

            <a
              href="https://www.instagram.com/renatosilveirareis/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-3"
            >
              <Instagram className="w-4 h-4" strokeWidth={2} />
              <span>@renatosilveirareis</span>
            </a>

            <p className="text-[15px] sm:text-base text-gray-700 leading-relaxed max-w-xs">
              Pesquisador, Palestrante, Mentor, Empresário e Farmacêutico.
            </p>
          </div>

          {/* Botões */}
          <div className="space-y-3 sm:space-y-3.5 mb-10">
            <LinkButton
              primary
              href="/desparafit"
              label="Quero Conhecer o Desparafit"
              sublabel="Meu protocolo N° 1 para emagrecimento · +10.000 mulheres transformadas"
            />
            <LinkButton
              href="/produtosh9"
              label="Todos os Protocolos H9 Pharma"
              sublabel="Ozenkit · Libidumax · Hairvit Max"
            />
          </div>
        </div>
      </div>

      {/* Rodapé com suporte no WhatsApp */}
      <footer className="w-full px-5 sm:px-6 pb-10 sm:pb-12">
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
            <p className="text-[14px] sm:text-[15px] text-gray-700 leading-relaxed text-center mb-4">
              Comprou algum dos nossos produtos e precisa de ajuda? Nos chame no
              WhatsApp, ficaremos felizes em ajudar!
            </p>
            <a
              href="https://wa.me/553535311001"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-sm sm:text-base py-3 px-5 rounded-xl transition-colors"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={2.5} />
              Falar no WhatsApp
            </a>
          </div>

          {/* Links institucionais */}
          <div className="flex items-center justify-center gap-4 mt-6 text-[12px] text-gray-400">
            <Link
              href="/politica-de-privacidade"
              className="hover:text-gray-600 transition-colors underline"
            >
              Privacidade
            </Link>
            <span>·</span>
            <Link
              href="/termos-de-uso"
              className="hover:text-gray-600 transition-colors underline"
            >
              Termos
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
