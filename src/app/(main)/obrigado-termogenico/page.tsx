'use client';

import {
  CheckCircle2,
  Download,
  FileText,
  Mail,
  MessageCircle,
  Search,
  Smartphone,
} from 'lucide-react';

/**
 * Página de obrigado do Jejum Termogênico.
 *
 * O objetivo aqui é um só: tirar a pessoa da dúvida logo depois do pagamento.
 * Ela acabou de comprar e a pergunta na cabeça dela é "e agora, onde eu
 * acesso?". Por isso os três passos aparecem numerados e em ordem, com o
 * e-mail do alpaclass em primeiro lugar, que é onde a maioria trava.
 */

const LARANJA = '#ea580c';
const WHATSAPP = 'https://wa.me/553535311001';
const EMAIL = 'suporteh9pharma@gmail.com';

const PDFS = [
  { semana: 1, nome: 'Limpeza Termogênica', arquivo: '/protocolos/protocolo-semana-1.pdf' },
  { semana: 2, nome: 'Revolução Metabólica', arquivo: '/protocolos/protocolo-semana-2.pdf' },
  { semana: 3, nome: 'Queima Metabólica', arquivo: '/protocolos/protocolo-semana-3.pdf' },
];

export default function ObrigadoTermogenicoPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Topo — confirmação */}
      <section
        className="px-5 py-10 text-center text-white sm:py-14"
        style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}
      >
        <div className="mx-auto max-w-2xl">
          <CheckCircle2 className="mx-auto h-16 w-16" strokeWidth={2} />
          <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
            Compra confirmada!
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[17px] leading-relaxed text-white/90">
            Seja bem-vinda ao Jejum Termogênico. Agora são 21 dias que podem
            mudar a sua relação com o seu corpo.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-5 py-8 sm:py-10">
        <h2 className="mb-1 text-2xl font-bold text-gray-900">
          Comece por aqui
        </h2>
        <p className="mb-6 text-[16px] leading-relaxed text-gray-600">
          São três passos rápidos. Faça na ordem que a gente deixou.
        </p>

        <div className="space-y-4">
          {/* Passo 1 — alpaclass */}
          <Passo numero={1} titulo="Acesse as suas aulas">
            <div className="mb-4 flex items-start gap-2.5 rounded-xl bg-white p-4 ring-1 ring-gray-200">
              <Mail className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: LARANJA }} strokeWidth={2.5} />
              <p className="text-[15px] leading-relaxed text-gray-800">
                O link de acesso foi enviado para o{' '}
                <strong>e-mail que você usou na compra</strong>. Procure na sua
                caixa de entrada por <strong>alpaclass</strong>.
              </p>
            </div>

            <div
              className="flex items-start gap-2.5 rounded-xl p-4"
              style={{ backgroundColor: `${LARANJA}12` }}
            >
              <Search className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: LARANJA }} strokeWidth={2.5} />
              <p className="text-[14px] leading-relaxed text-gray-700">
                Não achou? Escreva <strong>alpaclass</strong> na busca do seu
                e-mail e confira também a caixa de spam e a aba de promoções. Se
                ainda assim não aparecer, fale com a gente no fim desta página.
              </p>
            </div>

            <p className="mt-4 text-[14px] leading-relaxed text-gray-600">
              É lá que ficam os treinos com a Uiara Medeiros e a Gabi Ushiro, as
              meditações e as aulas do método.
            </p>
          </Passo>

          {/* Passo 2 — app */}
          <Passo numero={2} titulo="Abra o seu aplicativo">
            <p className="mb-4 text-[15px] leading-relaxed text-gray-700">
              O app te acompanha todos os dias: mostra a rotina da sua semana,
              controla o tempo do seu jejum, conta a sua água e guarda as
              receitas na palma da mão.
            </p>

            <a
              href="/apptermogenico"
              className="flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-center text-[17px] font-bold text-white shadow-md transition-opacity hover:opacity-90"
              style={{ backgroundColor: LARANJA }}
            >
              <Smartphone className="h-5 w-5" strokeWidth={2.5} />
              Abrir o aplicativo
            </a>

            <p className="mt-3 text-[13px] leading-relaxed text-gray-500">
              Dica: depois de abrir, adicione à tela de início do celular. No
              iPhone, toque em compartilhar e escolha &ldquo;Adicionar à Tela de
              Início&rdquo;. No Android, toque nos três pontinhos e escolha
              &ldquo;Adicionar à tela inicial&rdquo;.
            </p>
          </Passo>

          {/* Passo 3 — PDFs */}
          <Passo numero={3} titulo="Baixe os protocolos">
            <p className="mb-4 text-[15px] leading-relaxed text-gray-700">
              São os três protocolos completos, um por semana. Vale baixar agora
              para poder consultar mesmo sem internet.
            </p>

            <div className="space-y-2">
              {PDFS.map((pdf) => (
                <a
                  key={pdf.semana}
                  href={pdf.arquivo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl bg-white p-4 ring-1 ring-gray-200 transition-colors hover:bg-gray-50"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <FileText
                      className="h-5 w-5 flex-shrink-0"
                      style={{ color: LARANJA }}
                      strokeWidth={2.5}
                    />
                    <span className="min-w-0">
                      <span className="block text-[15px] font-semibold text-gray-900">
                        Semana {pdf.semana}
                      </span>
                      <span className="block text-[13px] text-gray-500">
                        {pdf.nome}
                      </span>
                    </span>
                  </span>
                  <Download
                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                    strokeWidth={2.5}
                  />
                </a>
              ))}
            </div>
          </Passo>
        </div>

        {/* Suporte */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 text-center">
          <p className="text-[17px] font-bold text-gray-900">
            Ficou com alguma dúvida?
          </p>
          <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-gray-600">
            A nossa equipe te ajuda com o acesso, com o protocolo ou com o que
            mais precisar. Tenha em mãos o e-mail que você usou na compra.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[16px] font-bold text-white"
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageCircle className="h-5 w-5" strokeWidth={2.5} />
            Falar no WhatsApp
          </a>
          <p className="mt-3 text-[14px] text-gray-500">ou {EMAIL}</p>
        </section>

        {/* Aviso de saúde */}
        <p className="mt-8 text-center text-[13px] leading-relaxed text-gray-500">
          O Jejum Termogênico é um programa educativo e não substitui
          acompanhamento médico. Se você está grávida ou amamentando, tem
          diabetes, pressão alterada, faz uso de medicação contínua ou tem
          histórico de transtorno alimentar, converse com o seu médico antes de
          começar.
        </p>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 py-6 text-white">
        <div className="mx-auto max-w-2xl px-4">
          <div className="space-y-3 text-center">
            <div className="flex justify-center gap-4 text-xs">
              <a href="/termos-de-uso" className="text-gray-400 transition-colors hover:text-white">
                Termos de Uso
              </a>
              <span className="text-gray-600">|</span>
              <a
                href="/politica-de-privacidade"
                className="text-gray-400 transition-colors hover:text-white"
              >
                Política de Privacidade
              </a>
            </div>
            <p className="text-sm text-gray-400">Dr. Renato Silveira Reis x H9 Pharma</p>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Passo({
  numero,
  titulo,
  children,
}: {
  numero: number;
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[16px] font-black text-white"
          style={{ backgroundColor: LARANJA }}
        >
          {numero}
        </span>
        <h3 className="text-[19px] font-bold leading-tight text-gray-900">
          {titulo}
        </h3>
      </div>
      <div className="rounded-xl bg-gray-50 p-4 sm:p-5">{children}</div>
    </section>
  );
}
