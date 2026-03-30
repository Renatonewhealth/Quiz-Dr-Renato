'use client';

export default function Obrigado2Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Container responsivo para desktop */}
      <div className="max-w-2xl mx-auto px-6">
        {/* Ícone de Sucesso */}
        <section className="pt-10 pb-4 flex justify-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </section>

        {/* Headline Principal */}
        <section className="pb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-center text-[#2ec6a8] leading-tight">
            🎉 Pedido Confirmado com Sucesso! 🎉
          </h1>
        </section>

        {/* Sub-headline */}
        <section className="pb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <p className="text-base sm:text-lg text-gray-700 text-center leading-relaxed">
              Seus kits do Desparafit já estão sendo preparados e vão chegar na sua casa nos próximos dias, por hora, você pode acessar o aplicativo Desparafit e todos os bônus digitais da oferta (veja seu email).
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-6 mt-8">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-4 text-xs">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Contato</a>
            </div>
            <p className="text-sm text-gray-400">
              Dr. Renato Silveira Reis x H9 Pharma
            </p>
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
