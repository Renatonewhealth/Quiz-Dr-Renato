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
  openGraph: {
    title: "Quiz - Dr. Renato Silveira",
    description: "Descubra seu perfil de saúde com nosso quiz interativo.",
    type: "website",
    locale: "pt_BR",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Quiz Dr. Renato",
  },
  formatDetection: {
    telephone: true,
    email: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0f0f1a",
  viewportFit: "cover",
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
        {/* Utmify UTM Tracking - Todas as páginas */}
        <Script
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck=""
          data-utmify-prevent-subids=""
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased min-h-screen bg-white text-gray-900 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
