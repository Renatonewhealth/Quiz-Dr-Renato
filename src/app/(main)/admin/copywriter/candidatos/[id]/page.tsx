import Link from 'next/link';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';
import CandidateDetail from '../../_components/CandidateDetail';
import type { CopyApplication } from '../../_components/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const serifStyle = { fontFamily: 'var(--font-instrument-serif), Georgia, serif' };

type Params = Promise<{ id: string }>;

export default async function CandidateDetailPage({ params }: { params: Params }) {
  const { id } = await params;

  if (!isSupabaseConfigured() || !supabaseAdmin) {
    return (
      <div className="max-w-3xl">
        <h1 className="text-3xl text-[#FAFAFA]" style={serifStyle}>
          Serviço indisponível
        </h1>
      </div>
    );
  }

  const { data, error } = await supabaseAdmin
    .from('copy_applications')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !data) {
    return (
      <div className="max-w-3xl">
        <Link
          href="/admin/copywriter/candidatos"
          className="text-sm text-[#A3A3A3] hover:text-[#FAFAFA]"
        >
          ← Candidatos
        </Link>
        <h1 className="text-3xl text-[#FAFAFA] mt-4" style={serifStyle}>
          Candidato não encontrado
        </h1>
        <p className="text-[#A3A3A3] mt-2 text-sm">
          Esta aplicação não existe ou foi removida.
        </p>
      </div>
    );
  }

  // Fetch reviewer email if present
  let reviewerEmail: string | null = null;
  const app = data as CopyApplication;
  if (app.reviewed_by) {
    try {
      const { data: admin } = await supabaseAdmin
        .from('admin_users')
        .select('email, full_name')
        .eq('id', app.reviewed_by)
        .maybeSingle();
      reviewerEmail =
        (admin as { email?: string; full_name?: string } | null)?.email ??
        (admin as { email?: string; full_name?: string } | null)?.full_name ??
        null;
    } catch {
      reviewerEmail = null;
    }
  }

  return <CandidateDetail application={app} reviewerEmail={reviewerEmail} />;
}
