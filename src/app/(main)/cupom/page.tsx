'use client';

import Image from 'next/image';

export default function CupomPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto">

        {/* Logo H9 Pharma */}
        <section className="px-4 pt-8 pb-2 flex justify-center">
          <Image
            src="/images/logo-h9.png"
            alt="H9 Pharma"
            width={160}
            height={60}
            className="object-contain"
          />
        </section>

        {/* Headline */}
        <section className="px-4 pt-4 pb-2">
          <h1 className="text-2xl sm:text-3xl font-black text-center text-[#2ec6a8] leading-tight">
            Parabéns, você ganhou um desconto de 5% para finalizar sua compra do Desparafit! 🎉
          </h1>
        </section>

        {/* Sub-headline */}
        <section className="px-4 pt-2 pb-6">
          <p className="text-base sm:text-lg text-gray-700 text-center leading-relaxed">
            Escolha qual kit você quer, o cupom já vai estar aplicado.
          </p>
        </section>

        {/* 3 Kits */}
        <section className="px-4 py-4 space-y-4">
          <a href="https://checkout.payt.com.br/7c9c47db388f0f6780f93d7d02a9f9de?split=12&coupon=PRESENTE" className="block w-[78%] mx-auto">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/3-kits-cupom.png"
                alt="3 Kits Desparafit - 12x R$78,31 com cupom PRESENTE"
                fill
                className="object-cover"
              />
            </div>
          </a>

          {/* 2 Kits */}
          <a href="https://checkout.payt.com.br/802bd7e3c1214a0954e030130f636355?split=12&coupon=PRESENTE#" className="block w-[78%] mx-auto">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/2-kits-cupom.png"
                alt="2 Kits Desparafit - 12x R$58,66 com cupom PRESENTE"
                fill
                className="object-cover"
              />
            </div>
          </a>

          {/* 1 Kit */}
          <a href="https://checkout.payt.com.br/c11d395593428f094fcb4b279f1ef839?split=12&coupon=PRESENTE#" className="block w-[78%] mx-auto">
            <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/images/1-kit-cupom.png"
                alt="1 Kit Desparafit - 12x R$34 com cupom PRESENTE"
                fill
                className="object-cover"
              />
            </div>
          </a>
        </section>

      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-6 mt-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-4 text-xs">
              <a href="/termos-de-uso" className="text-gray-400 hover:text-white transition-colors">Termos de Uso</a>
              <span className="text-gray-600">|</span>
              <a href="/politica-de-privacidade" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a>
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
