import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import CandidatesTable from '../_components/CandidatesTable';
import type { CopyApplication } from '../_components/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const serifStyle = { fontFamily: 'var(--font-instrument-serif), Georgia, serif' };

export default async function CandidatosPage() {
  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return (
      <div className="max-w-3xl">
        <h1
          className="text-[clamp(2rem,3vw,2.75rem)] leading-tight text-[#FAFAFA]"
          style={serifStyle}
        >
          Candidatos
        </h1>
        <p className="text-[#A3A3A3] mt-2">Serviço indisponível.</p>
      </div>
    );
  }

  const { data, error } = await supabaseAdmin
    .from('copy_applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[candidatos] fetch error', error);
  }

  const apps: CopyApplication[] = (data as CopyApplication[] | null) ?? [];

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1
          className="text-[clamp(2rem,3vw,2.75rem)] leading-tight text-[#FAFAFA]"
          style={serifStyle}
        >
          Candidatos
        </h1>
        <p className="text-[#A3A3A3] mt-1 text-sm">
          {apps.length} aplicaç{apps.length === 1 ? 'ão' : 'ões'} no total
        </p>
      </div>
      <CandidatesTable initialData={apps} />
    </div>
  );
}
