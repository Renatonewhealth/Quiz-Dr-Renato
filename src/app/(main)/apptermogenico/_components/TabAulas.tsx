'use client';

import { Dumbbell, GraduationCap, Mail, MessageCircle, Search, Sparkles } from 'lucide-react';

const LARANJA = '#ea580c';
const WHATSAPP = 'https://wa.me/553535311001';
const EMAIL = 'suporteh9pharma@gmail.com';

/** O que a pessoa encontra dentro da plataforma de aulas. */
const CONTEUDO = [
  {
    icone: Dumbbell,
    titulo: 'Treinos com a Uiara Medeiros e a Gabi Ushiro',
    texto:
      'Os vídeos de treino do protocolo. Na semana 1 e 2 você escolhe um vídeo e faz 1x ao dia. Na semana 3 são 2x ao dia.',
  },
  {
    icone: Sparkles,
    titulo: 'Meditação com a Coach Uiara Medeiros',
    texto:
      'Entra a partir da semana 2, junto com o Momento Gestão Emocional.',
  },
  {
    icone: GraduationCap,
    titulo: 'Aulas do método',
    texto:
      'As aulas que explicam a lógica do Jejum Termogênico e como tirar o máximo de cada fase.',
  },
];

export default function TabAulas() {
  return (
    <div className="pt-5">
      <header className="mb-5">
        <h1 className="text-2xl font-bold leading-tight text-gray-900">Aulas</h1>
        <p className="mt-1 text-[15px] text-gray-600">
          Onde ficam os treinos, as meditações e as aulas do método.
        </p>
      </header>

      {/* Onde acessar */}
      <section
        className="mb-5 overflow-hidden rounded-2xl text-white shadow-lg"
        style={{ background: 'linear-gradient(135deg, #ea580c, #c2410c)' }}
      >
        <div className="px-5 py-6">
          <div className="mb-3 flex items-center gap-2">
            <Mail className="h-5 w-5" strokeWidth={2.5} />
            <p className="text-sm font-bold uppercase tracking-wide">
              O acesso chegou no seu e-mail
            </p>
          </div>

          <p className="text-[17px] font-bold leading-snug">
            O link das aulas foi enviado para o e-mail que você usou na compra.
          </p>

          <p className="mt-3 text-[15px] leading-relaxed text-white/90">
            Procure na sua caixa de entrada por{' '}
            <strong className="font-bold text-white">alpaclass</strong>. É lá que
            ficam todas as aulas, os treinos e as meditações do protocolo.
          </p>

          <div className="mt-4 rounded-xl bg-white/15 p-4">
            <p className="flex items-start gap-2 text-[15px] leading-relaxed">
              <Search className="mt-0.5 h-4 w-4 flex-shrink-0" strokeWidth={2.5} />
              <span>
                Não achou? Escreva <strong>alpaclass</strong> na busca do seu e-mail
                e confira também a caixa de spam e a aba de promoções.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* O que tem lá dentro */}
      <section className="mb-6">
        <h2 className="mb-3 text-[17px] font-bold text-gray-900">
          O que você encontra lá
        </h2>
        <div className="space-y-2.5">
          {CONTEUDO.map((item) => {
            const Icone = item.icone;
            return (
              <div
                key={item.titulo}
                className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4"
              >
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${LARANJA}18` }}
                >
                  <Icone className="h-5 w-5" style={{ color: LARANJA }} strokeWidth={2.5} />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-gray-900">
                    {item.titulo}
                  </span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-gray-600">
                    {item.texto}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Suporte */}
      <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-center">
        <p className="text-[15px] font-semibold text-gray-900">
          Não recebeu o e-mail de acesso?
        </p>
        <p className="mt-1 text-[14px] leading-relaxed text-gray-600">
          Fale com a nossa equipe que a gente reenvia. Tenha em mãos o e-mail que
          você usou na compra.
        </p>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[15px] font-bold text-white"
          style={{ backgroundColor: '#25D366' }}
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
          Falar no WhatsApp
        </a>
        <p className="mt-3 text-[13px] text-gray-500">ou {EMAIL}</p>
      </section>
    </div>
  );
}
