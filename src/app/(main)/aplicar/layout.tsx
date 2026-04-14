import type { Metadata } from 'next';
import { Instrument_Serif } from 'next/font/google';
import { Toaster } from 'sonner';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

export const metadata: Metadata = {
  title: 'Copywriter Sênior · Dr. Renato Silveira',
  description:
    'Processo seletivo para copywriter da operação de Direct Response do Dr. Renato Silveira.',
  robots: { index: false, follow: false },
};

export default function AplicarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${instrumentSerif.variable} bg-[#0A0A0A] text-[#FAFAFA] min-h-screen antialiased`}
    >
      {children}
      <Toaster theme="dark" position="top-right" />
    </div>
  );
}
