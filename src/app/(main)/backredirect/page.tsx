'use client';

import { useEffect, useState } from 'react';

export default function BackRedirectPage() {
  const [referrer, setReferrer] = useState<string | null>(null);

  useEffect(() => {
    // Captura a página anterior (checkout) para redirecionar de volta
    if (document.referrer) {
      setReferrer(document.referrer);
    }
  }, []);

  const handleVoltar = () => {
    if (referrer) {
      window.location.href = referrer;
    } else {
      window.history.back();
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">

        {/* Ícone de presente */}
        <div className="text-center mb-6">
          <span className="text-6xl">🎁</span>
        </div>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl font-black text-white text-center mb-6 leading-tight">
          Calma, eu quero te dar um presente para você garantir seu protocolo{' '}
          <span className="text-yellow-400">AGORA!</span>
        </h1>

        {/* Card principal */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl mb-6">

          {/* Alerta de estoque */}
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <span className="text-red-500 text-xl flex-shrink-0">⚠️</span>
            <p className="text-sm text-red-700 font-medium leading-relaxed">
              Preciso te avisar algo sério, os nossos estoques estão acabando muito rápido, e uma vez que eles acabarem, não temos estimativas de quando vamos poder vender de novo.
            </p>
          </div>

          {/* Texto principal */}
          <p className="text-gray-700 leading-relaxed mb-6">
            Por isso, eu quero te dar um cupom de desconto para você finalizar sua compra agora.
          </p>

          {/* Cupom destaque */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-dashed border-yellow-400 rounded-xl p-5 mb-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Se você voltar na página de pagamento agora, na sessão do cartão de crédito, coloque o cupom:</p>
            <div className="bg-white border-2 border-yellow-400 rounded-lg px-6 py-3 inline-block my-2">
              <span className="text-2xl font-black text-yellow-600 tracking-widest">PRESENTE</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">na área de cupom e ganhe <strong className="text-green-600">5% de desconto</strong> na compra.</p>
          </div>

          {/* Mensagem final */}
          <p className="text-gray-600 text-sm leading-relaxed text-center">
            Esse é meu presente pra você ter certeza que está tomando a decisão certa.
          </p>
        </div>

        {/* Botão CTA */}
        <button
          onClick={handleVoltar}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black text-xl py-5 px-6 rounded-2xl shadow-lg active:scale-[0.98] transition-all duration-150 animate-pulse"
        >
          QUERO APROVEITAR O DESCONTO 🎁
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          Você será redirecionado de volta ao checkout
        </p>
      </div>
    </main>
  );
}
