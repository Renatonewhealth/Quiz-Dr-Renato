'use client';

/**
 * VSL do Korean — esqueleto pronto pra plugar VSL + kits + FAQ.
 *
 * Placeholders a substituir quando os assets chegarem:
 *   1) Bloco VSL: preloads do vturb + <vturb-smartplayer id="vid-..."> +
 *      <Script src="..."> + (opcional) script de delay + classe `.esconder`
 *      na section dos kits pra revelar aos N segundos do vídeo.
 *   2) Bloco Kits: 3 <a href="<checkout-payt>"> com <Image src="/images/..."/>
 *      no lugar dos 3 placeholders.
 *   3) Bloco FAQ: trocar o item placeholder por N <details> reais com
 *      pergunta + resposta (copy vem do Heitor).
 */
export default function KoreanPage() {
  return (
    <main className="min-h-screen bg-white">
      <style jsx global>{`
        .esconder {
          display: none;
        }
      `}</style>

      <div className="max-w-2xl mx-auto">
        {/* ====================================================================
            1. VSL PLAYER — placeholder
            SUBSTITUIR: preloads do vturb (no <head> via <link rel="preload">),
            embed <vturb-smartplayer> e <Script src=".../player.js">.
            Ex: veja /vsl-lead-test/page.tsx pra pattern completo.
        ==================================================================== */}
        <section className="w-full pt-6 sm:pt-8 px-4">
          <div className="relative w-full max-w-[400px] mx-auto aspect-[9/16] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center px-6">
              <p className="text-gray-400 text-sm font-mono uppercase tracking-wider mb-1">
                [ Placeholder VSL ]
              </p>
              <p className="text-gray-500 text-xs">
                Colar aqui o embed do vturb
                <br />
                (portrait 9:16, max 400px)
              </p>
            </div>
          </div>
        </section>

        {/* ====================================================================
            2. KITS — 3 imagens clicáveis (placeholders)
            SUBSTITUIR href pelo checkout da Payt e src pela imagem do kit.
            Pra esconder até o delay do vídeo: adicionar `esconder` na section
            + script de delay igual ao /vsl-lead-test.
        ==================================================================== */}
        <section className="px-4 py-8 space-y-4">
          {[
            { n: 1, label: 'Placeholder Kit 1' },
            { n: 2, label: 'Placeholder Kit 2' },
            { n: 3, label: 'Placeholder Kit 3' },
          ].map((k) => (
            <a
              key={k.n}
              href="#"
              className="block w-[78%] mx-auto relative aspect-[3/4] bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <div className="text-center px-6">
                <p className="text-gray-400 text-sm font-mono uppercase tracking-wider mb-1">
                  [ Kit {k.n} ]
                </p>
                <p className="text-gray-500 text-xs">
                  href → checkout Payt
                  <br />
                  src → /images/&lt;kit&gt;.png
                </p>
              </div>
            </a>
          ))}
          {/* Disclaimer termos (mantém o padrão das outras VSLs) */}
          <p className="text-xs text-gray-400 text-center pt-2 pb-4">
            Ao comprar você concorda com os{' '}
            <a href="/termos-de-uso" className="underline hover:text-gray-600">
              termos de uso
            </a>{' '}
            da H9 Pharma.
          </p>
        </section>

        {/* ====================================================================
            3. FAQ — placeholder
            SUBSTITUIR o <details> abaixo por N reais com a copy do Heitor.
        ==================================================================== */}
        <section className="px-4 pt-6 pb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-center text-gray-900 mb-2">
            Perguntas Frequentes
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Tire suas dúvidas antes de começar
          </p>

          <div className="space-y-3">
            {/* Exemplo placeholder — trocar por N <details> reais quando a copy chegar */}
            <details className="group border border-gray-200 rounded-xl bg-white overflow-hidden">
              <summary className="flex items-center justify-between gap-3 p-5 text-left cursor-pointer list-none hover:bg-gray-50 transition-colors">
                <span className="text-[16px] sm:text-[15px] font-semibold text-gray-900">
                  [ Pergunta placeholder — trocar pela copy ]
                </span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-gray-600 transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5 pt-0 text-[15px] text-gray-700 leading-relaxed">
                [ Resposta placeholder — vai receber a copy do FAQ do Korean aqui. ]
              </div>
            </details>
          </div>
        </section>
      </div>

      {/* ====================================================================
          4. FOOTER — institucional H9
      ==================================================================== */}
      <footer className="w-full bg-gray-900 text-white py-6 mt-4">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center space-y-3">
            <div className="flex justify-center gap-4 text-xs">
              <a
                href="/termos-de-uso"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Termos de Uso
              </a>
              <span className="text-gray-600">|</span>
              <a
                href="/politica-de-privacidade"
                className="text-gray-400 hover:text-white transition-colors"
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
