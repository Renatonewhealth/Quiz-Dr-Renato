import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Instrument_Serif } from 'next/font/google';
import { Toaster } from 'sonner';
import { getAuthenticatedUser } from '@/lib/auth';
import Sidebar from './_components/Sidebar';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument-serif',
});

export const metadata: Metadata = {
  title: 'Copywriter Admin · Dr. Renato Silveira',
  description: 'Área administrativa das aplicações de copywriter.',
  robots: { index: false, follow: false },
};

export default async function CopywriterAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div
      className={`${instrumentSerif.variable} bg-[#0A0A0A] text-[#FAFAFA] min-h-screen antialiased`}
    >
      <div className="flex min-h-screen">
        <Sidebar userEmail={user.email ?? ''} />
        <main className="flex-1 min-w-0 bg-[#0A0A0A] text-[#FAFAFA] px-4 md:px-8 py-6">
          {children}
        </main>
      </div>
      <Toaster theme="dark" position="top-right" />
    </div>
  );
}
