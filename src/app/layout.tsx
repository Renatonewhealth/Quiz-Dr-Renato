/**
 * 📱 LAYOUT PRINCIPAL - MOBILE-FIRST
 * 
 * Este projeto é desenvolvido com abordagem MOBILE-FIRST:
 * - Viewport configurado para dispositivos móveis
 * - userScalable: false previne zoom acidental
 * - themeColor define a cor da barra de status no mobile
 * - Fonte Inter otimizada para leitura em telas pequenas
 */

import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Quiz - Dr. Renato Silveira",
  description: "Descubra seu perfil de saúde com nosso quiz interativo. Responda algumas perguntas e receba um diagnóstico personalizado.",
  keywords: ["quiz", "saúde", "dr renato silveira", "diagnóstico", "médico"],
  authors: [{ name: "Dr. Renato Silveira" }],
  robots: "index, follow",
  // Configurações para compartilhamento em redes sociais
  openGraph: {
    title: "Quiz - Dr. Renato Silveira",
    description: "Descubra seu perfil de saúde com nosso quiz interativo.",
    type: "website",
    locale: "pt_BR",
  },
  // Configurações para iOS (adicionar à tela inicial)
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Quiz Dr. Renato",
  },
  // Formato mobile-friendly
  formatDetection: {
    telephone: true,
    email: true,
  },
};

/**
 * 📱 VIEWPORT MOBILE-FIRST
 * 
 * Configurações essenciais para experiência mobile:
 * - width: device-width → adapta à largura do dispositivo
 * - initialScale: 1 → sem zoom inicial
 * - maximumScale: 1 → previne zoom em inputs
 * - userScalable: false → previne zoom por pinch (UX melhor em quiz)
 * - viewportFit: cover → suporta notch do iPhone
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0f0f1a",
  viewportFit: "cover", // Suporte a iPhone com notch
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={plusJakartaSans.variable}>
      <head>
        {/* Utmify Pixel - Todas as páginas */}
        <Script id="utmify-pixel" strategy="afterInteractive">
          {`
            window.pixelId = "69badc4635d947be06ab5e3c";
            var a = document.createElement("script");
            a.setAttribute("async", "");
            a.setAttribute("defer", "");
            a.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
            document.head.appendChild(a);
          `}
        </Script>
        {/* Utmify UTM Tracking - Todas as páginas */}
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck=""
          data-utmify-prevent-subids=""
          strategy="afterInteractive"
        />
      </head>
      {/*
        📱 BODY MOBILE-FIRST:
        - min-h-screen: garante altura mínima em mobile
        - bg-white: light mode clean
        - text-gray-900: contraste otimizado para leitura
        - antialiased: suavização de fontes melhor no mobile
      */}
      <body className="antialiased min-h-screen bg-white text-gray-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
