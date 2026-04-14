'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { stepSchemas } from '@/lib/schemas/copy-application';
import type { ZodError } from 'zod';

// ---------------- Types ----------------
type YearsExperience = '<1' | '1-2' | '3-5' | '+5' | '';
type Seniority = 'junior' | 'pleno-novo' | 'pleno-senior' | 'senior' | '';

type FormData = {
  // Step 1
  full_name: string;
  instagram: string;
  whatsapp: string;
  // Step 2
  years_experience: YearsExperience;
  seniority: Seniority;
  operations_worked: string;
  niches: string;
  specialty: string;
  // Step 3
  results_brought: string;
  books_read: string;
  top_copywriters: string;
  // Step 4
  answer_unique_mechanism: string;
  answer_superstructure: string;
  answer_offer_block: string;
  // Step 5
  portfolio_url: string;
  free_space: string;
  // Honeypot
  website: string;
};

const initialData: FormData = {
  full_name: '',
  instagram: '',
  whatsapp: '',
  years_experience: '',
  seniority: '',
  operations_worked: '',
  niches: '',
  specialty: '',
  results_brought: '',
  books_read: '',
  top_copywriters: '',
  answer_unique_mechanism: '',
  answer_superstructure: '',
  answer_offer_block: '',
  portfolio_url: '',
  free_space: '',
  website: '',
};

const DRAFT_KEY = 'copy-application-draft';

// ---------------- Helpers ----------------
function maskWhatsapp(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function zodIssuesToErrors(err: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = issue.path.join('.');
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

// ---------------- UI Primitives ----------------
const captionCls =
  'text-xs uppercase tracking-[0.08em] text-[#A3A3A3] font-medium';

const inputCls =
  'bg-[#121212] border border-[#2A2A2A] rounded-lg py-4 px-5 w-full text-[#FAFAFA] placeholder:text-[#666666] transition-all duration-200 focus:outline-none focus:border-[#E5E5E5] focus:ring-[3px] focus:ring-[#E8E3D8]/10';

const textareaCls = `${inputCls} min-h-[120px] resize-y leading-relaxed`;

const primaryBtn =
  'bg-[#E8E3D8] text-[#0A0A0A] hover:bg-[#DAD5C9] py-3 px-6 rounded-lg font-medium transition-all duration-200 disabled:bg-[#404040] disabled:text-[#666666] disabled:cursor-not-allowed motion-reduce:transition-none';

const ghostBtn =
  'bg-transparent border border-[#2A2A2A] text-[#FAFAFA] hover:bg-[#1A1A1A] py-3 px-6 rounded-lg font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed motion-reduce:transition-none';

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className={`${captionCls} flex items-center gap-1`}>
      {children}
      {required && <span className="text-[#8A8579]">*</span>}
    </label>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-[#F87171] text-sm mt-2">{msg}</p>;
}

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div
      className="h-[2px] bg-[#1F1F1F] w-full overflow-hidden"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="bg-[#E8E3D8] h-full transition-all duration-500 motion-reduce:transition-none"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  children,
  id,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <button
      type="button"
      id={id}
      onClick={onClick}
      className={[
        'text-left rounded-lg py-4 px-5 border transition-all duration-200 motion-reduce:transition-none',
        'focus:outline-none focus:ring-[3px] focus:ring-[#E8E3D8]/10',
        selected
          ? 'border-[#E5E5E5] bg-[#1A1A1A] text-[#FAFAFA]'
          : 'border-[#2A2A2A] bg-[#121212] text-[#A3A3A3] hover:bg-[#1A1A1A] hover:text-[#FAFAFA]',
      ].join(' ')}
      aria-pressed={selected}
    >
      <span className="block text-sm font-medium">{children}</span>
    </button>
  );
}

// ---------------- Page ----------------
type Step = 0 | 1 | 2 | 3 | 4 | 5 | 'success';

export default function AplicarPage() {
  const [step, setStep] = useState<Step>(0);
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [showDraftBanner, setShowDraftBanner] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animateKey, setAnimateKey] = useState(0);
  const startTimeRef = useRef<number>(Date.now());
  const draftBannerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const stepContainerRef = useRef<HTMLDivElement | null>(null);

  // ----- Mount: restore draft + start timer -----
  useEffect(() => {
    setMounted(true);
    startTimeRef.current = Date.now();
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          setShowDraftBanner(true);
          draftBannerTimeoutRef.current = setTimeout(() => {
            setShowDraftBanner(false);
          }, 10000);
        }
      }
    } catch {
      // ignore
    }
    return () => {
      if (draftBannerTimeoutRef.current)
        clearTimeout(draftBannerTimeoutRef.current);
    };
  }, []);

  // ----- Persist draft on change (debounced) -----
  useEffect(() => {
    if (!mounted) return;
    if (step === 'success') return;
    const t = setTimeout(() => {
      try {
        // don't persist honeypot
        const { website: _hp, ...rest } = formData;
        void _hp;
        localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ step, data: rest })
        );
      } catch {
        // ignore quota errors
      }
    }, 350);
    return () => clearTimeout(t);
  }, [formData, step, mounted]);

  // Re-trigger enter animation whenever step changes
  useEffect(() => {
    setAnimateKey((k) => k + 1);
  }, [step]);

  // ----- Draft actions -----
  const continueDraft = useCallback(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed?.data) {
        setFormData((prev) => ({ ...prev, ...parsed.data, website: '' }));
      }
      if (typeof parsed?.step === 'number' && parsed.step >= 0 && parsed.step <= 5) {
        setStep(parsed.step as Step);
      } else {
        setStep(1);
      }
    } catch {
      // ignore
    }
    setShowDraftBanner(false);
    if (draftBannerTimeoutRef.current)
      clearTimeout(draftBannerTimeoutRef.current);
  }, []);

  const startFresh = useCallback(() => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      // ignore
    }
    setFormData(initialData);
    setShowDraftBanner(false);
    if (draftBannerTimeoutRef.current)
      clearTimeout(draftBannerTimeoutRef.current);
  }, []);

  // ----- Field updater -----
  const update = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => {
        if (!prev[key as string]) return prev;
        const next = { ...prev };
        delete next[key as string];
        return next;
      });
    },
    []
  );

  // ----- Validation for current step -----
  const validateStep = useCallback(
    (s: Exclude<Step, 0 | 'success'>) => {
      const schema = stepSchemas[s];
      const res = schema.safeParse(formData);
      if (!res.success) {
        const errs = zodIssuesToErrors(res.error);
        setErrors(errs);
        // scroll to first error
        setTimeout(() => {
          const firstKey = Object.keys(errs)[0];
          if (!firstKey) return;
          const el = document.querySelector(
            `[data-field="${firstKey}"]`
          ) as HTMLElement | null;
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const focusable = el.querySelector<HTMLElement>(
              'input, textarea, button'
            );
            focusable?.focus();
          }
        }, 50);
        return false;
      }
      setErrors({});
      return true;
    },
    [formData]
  );

  // ----- Navigation -----
  const goNext = useCallback(() => {
    if (step === 0) {
      setStep(1);
      return;
    }
    if (step === 'success') return;
    const ok = validateStep(step);
    if (!ok) return;
    if (step < 5) {
      setStep(((step as number) + 1) as Step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step, validateStep]);

  const goBack = useCallback(() => {
    if (step === 'success') return;
    if (typeof step === 'number' && step > 0) {
      setStep(((step as number) - 1) as Step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [step]);

  // ----- Submit -----
  const handleSubmit = useCallback(async () => {
    if (step !== 5) return;
    const ok = validateStep(5);
    if (!ok) return;

    // Honeypot — silent success
    if (formData.website && formData.website.trim().length > 0) {
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {}
      setStep('success');
      return;
    }

    setSubmitting(true);
    try {
      const completionTime = Math.round(
        (Date.now() - startTimeRef.current) / 1000
      );
      const payload = {
        ...formData,
        completion_time_seconds: completionTime,
      };
      const res = await fetch('/api/copy-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.success) {
        const msg =
          json?.error ??
          (res.status === 429
            ? 'Muitas aplicações. Tente novamente mais tarde.'
            : 'Erro ao enviar. Tente de novo.');
        toast.error(msg);
        return;
      }
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {}
      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      toast.error('Erro de conexão. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }, [formData, step, validateStep]);

  // ----- Progress percent -----
  const progressPercent = useMemo(() => {
    if (step === 0 || step === 'success') return 0;
    return step * 20;
  }, [step]);

  const showProgress = typeof step === 'number' && step > 0;

  // ---------------- Render ----------------
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      {/* Draft banner */}
      {showDraftBanner && (
        <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
          <div className="mx-auto max-w-2xl rounded-lg border border-[#2A2A2A] bg-[#121212] p-4 shadow-2xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[#FAFAFA]">
                Continuar de onde parou?
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={startFresh}
                  className="text-xs uppercase tracking-[0.08em] font-medium text-[#A3A3A3] hover:text-[#FAFAFA] px-3 py-2 transition-colors"
                >
                  Começar do zero
                </button>
                <button
                  type="button"
                  onClick={continueDraft}
                  className="text-xs uppercase tracking-[0.08em] font-medium bg-[#E8E3D8] text-[#0A0A0A] hover:bg-[#DAD5C9] px-4 py-2 rounded-md transition-colors"
                >
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress */}
      {showProgress && (
        <div className="sticky top-0 z-40 bg-[#0A0A0A]/90 backdrop-blur">
          <ProgressBar percent={progressPercent} />
        </div>
      )}

      <div className="max-w-2xl mx-auto px-6 py-16 sm:py-20 pb-40 sm:pb-24">
        <div
          key={animateKey}
          ref={stepContainerRef}
          className="opacity-0 translate-x-2 animate-[stepIn_250ms_ease-out_forwards] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-x-0"
        >
          {step === 0 && <StepIntro onStart={goNext} />}
          {step === 1 && (
            <Step1
              data={formData}
              errors={errors}
              update={update}
            />
          )}
          {step === 2 && (
            <Step2 data={formData} errors={errors} update={update} />
          )}
          {step === 3 && (
            <Step3 data={formData} errors={errors} update={update} />
          )}
          {step === 4 && (
            <Step4 data={formData} errors={errors} update={update} />
          )}
          {step === 5 && (
            <Step5 data={formData} errors={errors} update={update} />
          )}
          {step === 'success' && <StepSuccess />}
        </div>
      </div>

      {/* Nav bar */}
      {typeof step === 'number' && step > 0 && (
        <NavBar
          step={step as 1 | 2 | 3 | 4 | 5}
          onBack={goBack}
          onNext={step === 5 ? handleSubmit : goNext}
          submitting={submitting}
        />
      )}

      <style jsx global>{`
        @keyframes stepIn {
          from {
            opacity: 0;
            transform: translateX(8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </main>
  );
}

// ---------------- Steps ----------------

function StepIntro({ onStart }: { onStart: () => void }) {
  const steps = [
    { n: '1', label: 'Responder o formulário' },
    { n: '2', label: 'Fazer um mini teste prático' },
    { n: '3', label: 'Realizar uma demanda como freelancer inicialmente (exemplo: fazer X ADS por Y reais)' },
    { n: '4', label: 'Caso bata a meta estipulada dessa demanda inicial como freela, ganha o contrato fixo + % do lucro da operação' },
  ];
  return (
    <section className="space-y-12">
      <div className="space-y-6">
        <p className={captionCls}>Processo Seletivo · @renatosilveirareis</p>
        <h1
          className="font-[family-name:var(--font-instrument-serif)] text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-[#FAFAFA]"
        >
          Processo Seletivo Copywriter Sênior/Pleno com bastante experiência
        </h1>
        <div className="text-[#A3A3A3] max-w-xl leading-relaxed text-base sm:text-lg space-y-4">
          <p>
            Esse formulário tem como objetivo achar os candidatos ideais à vaga de Copywriter Sênior/Pleno com bastante experiência para a operação de Direct Response do expert Renato Silveira Reis.
          </p>
          <p>
            Renato é um expert com altíssimo nível de credibilidade, <span className="text-[#FAFAFA] font-medium">+ de 13 milhões de seguidores</span> nas redes sociais e atua no nicho de saúde em diversas frentes (emagrecimento, rejuvenescimento etc.).
          </p>
          <p className="text-sm italic text-[#666666]">
            Obs: operação 100% white com alto potencial de escala, para quem tem interesse em sair do black.
          </p>
          <p>
            Nessa operação temos diversas frentes, desde infoprodutos até os próprios protocolos físicos do Renato, com produção interna.
          </p>
          <p>
            Estamos em busca de um copywriter com experiência em direct response para ajudar com o funil como um todo, ADS, otimizações, demandas pontuais do posicionamento do Renato etc., para trabalhar como braço direito do CMO da operação <span className="text-[#FAFAFA]">@trheitor</span>.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <p className={captionCls}>O processo seletivo será feito em 4 etapas</p>
        <ol className="space-y-5">
          {steps.map((s) => (
            <li key={s.n} className="flex items-baseline gap-5">
              <span className="font-[family-name:var(--font-instrument-serif)] text-3xl sm:text-4xl text-[#E8E3D8] leading-none w-10 shrink-0">
                {s.n}
              </span>
              <span className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed">
                {s.label}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-6">
        <p className={captionCls}>~15 minutos para preencher</p>
        <button type="button" onClick={onStart} className={primaryBtn}>
          Começar aplicação →
        </button>
      </div>
    </section>
  );
}

type StepProps = {
  data: FormData;
  errors: Record<string, string>;
  update: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
};

function StepHeader({
  caption,
  title,
  note,
}: {
  caption: string;
  title: string;
  note?: string;
}) {
  return (
    <header className="space-y-4 mb-10">
      <p className={captionCls}>{caption}</p>
      <h1 className="font-[family-name:var(--font-instrument-serif)] text-[clamp(2rem,3.5vw,2.75rem)] leading-[1.1] tracking-[-0.02em] text-[#FAFAFA]">
        {title}
      </h1>
      {note && (
        <p className="text-[#A3A3A3] italic text-sm sm:text-base">{note}</p>
      )}
    </header>
  );
}

function Step1({ data, errors, update }: StepProps) {
  return (
    <section>
      <StepHeader caption="Etapa 1 de 5 · Identificação" title="Sobre você" />
      <div className="space-y-8">
        <div data-field="full_name" className="flex flex-col gap-2">
          <Label htmlFor="full_name" required>
            Nome completo
          </Label>
          <input
            id="full_name"
            type="text"
            value={data.full_name}
            onChange={(e) => update('full_name', e.target.value)}
            placeholder="Seu nome completo"
            autoComplete="name"
            className={inputCls}
          />
          <FieldError msg={errors.full_name} />
        </div>

        <div data-field="instagram" className="flex flex-col gap-2">
          <Label htmlFor="instagram" required>
            Instagram
          </Label>
          <input
            id="instagram"
            type="text"
            value={data.instagram}
            onChange={(e) => update('instagram', e.target.value)}
            placeholder="@seuinstagram"
            autoComplete="off"
            className={inputCls}
          />
          <FieldError msg={errors.instagram} />
        </div>

        <div data-field="whatsapp" className="flex flex-col gap-2">
          <Label htmlFor="whatsapp" required>
            WhatsApp
          </Label>
          <input
            id="whatsapp"
            type="tel"
            inputMode="numeric"
            value={data.whatsapp}
            onChange={(e) => update('whatsapp', maskWhatsapp(e.target.value))}
            placeholder="(11) 98765-4321"
            autoComplete="tel"
            className={inputCls}
          />
          <FieldError msg={errors.whatsapp} />
        </div>
      </div>
    </section>
  );
}

function Step2({ data, errors, update }: StepProps) {
  const yearsOptions: { value: YearsExperience; label: string }[] = [
    { value: '<1', label: 'Menos de 1 ano' },
    { value: '1-2', label: '1 a 2 anos' },
    { value: '3-5', label: '3 a 5 anos' },
    { value: '+5', label: 'Mais de 5 anos' },
  ];
  const seniorityOptions: { value: Seniority; label: string }[] = [
    { value: 'junior', label: 'Júnior' },
    { value: 'pleno-novo', label: 'Pleno (recente)' },
    { value: 'pleno-senior', label: 'Pleno (pé em sênior)' },
    { value: 'senior', label: 'Sênior' },
  ];

  return (
    <section>
      <StepHeader
        caption="Etapa 2 de 5 · Experiência"
        title="Seu histórico"
      />
      <div className="space-y-10">
        <div data-field="years_experience" className="flex flex-col gap-3">
          <Label htmlFor="years_experience_group" required>
            Anos de experiência
          </Label>
          <div
            id="years_experience_group"
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            role="radiogroup"
          >
            {yearsOptions.map((opt) => (
              <OptionCard
                key={opt.value}
                selected={data.years_experience === opt.value}
                onClick={() => update('years_experience', opt.value)}
              >
                {opt.label}
              </OptionCard>
            ))}
          </div>
          <FieldError msg={errors.years_experience} />
        </div>

        <div data-field="seniority" className="flex flex-col gap-3">
          <Label htmlFor="seniority_group" required>
            Senioridade
          </Label>
          <div
            id="seniority_group"
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            role="radiogroup"
          >
            {seniorityOptions.map((opt) => (
              <OptionCard
                key={opt.value}
                selected={data.seniority === opt.value}
                onClick={() => update('seniority', opt.value)}
              >
                {opt.label}
              </OptionCard>
            ))}
          </div>
          <FieldError msg={errors.seniority} />
        </div>

        <div data-field="operations_worked" className="flex flex-col gap-2">
          <Label htmlFor="operations_worked" required>
            Operações que já trabalhou
          </Label>
          <textarea
            id="operations_worked"
            value={data.operations_worked}
            onChange={(e) => update('operations_worked', e.target.value)}
            placeholder="Liste as operações, com o período e o que você fez em cada uma."
            className={textareaCls}
          />
          <FieldError msg={errors.operations_worked} />
        </div>

        <div data-field="niches" className="flex flex-col gap-2">
          <Label htmlFor="niches" required>
            Nichos que já escreveu
          </Label>
          <textarea
            id="niches"
            value={data.niches}
            onChange={(e) => update('niches', e.target.value)}
            placeholder="Saúde, finanças, relacionamento, etc."
            className={textareaCls}
          />
          <FieldError msg={errors.niches} />
        </div>

        <div data-field="specialty" className="flex flex-col gap-2">
          <Label htmlFor="specialty" required>
            Sua especialidade como copywriter
          </Label>
          <textarea
            id="specialty"
            value={data.specialty}
            onChange={(e) => update('specialty', e.target.value)}
            placeholder="VSL, advertorial, e-mail, funil completo..."
            className={textareaCls}
          />
          <FieldError msg={errors.specialty} />
        </div>
      </div>
    </section>
  );
}

function Step3({ data, errors, update }: StepProps) {
  return (
    <section>
      <StepHeader caption="Etapa 3 de 5 · Prova" title="O que você entregou" />
      <div className="space-y-10">
        <div data-field="results_brought" className="flex flex-col gap-2">
          <Label htmlFor="results_brought" required>
            Resultados que você trouxe para essas operações
          </Label>
          <textarea
            id="results_brought"
            value={data.results_brought}
            onChange={(e) => update('results_brought', e.target.value)}
            placeholder="Números, métricas, escalas."
            className={textareaCls}
          />
          <p className="text-[#666666] text-xs mt-1 leading-relaxed">
            Ads, VSLs, funnels. Não minta — confirmaremos com os donos das
            operações.
          </p>
          <FieldError msg={errors.results_brought} />
        </div>

        <div data-field="books_read" className="flex flex-col gap-2">
          <Label htmlFor="books_read" required>
            Principais livros de copywriting que leu
          </Label>
          <textarea
            id="books_read"
            value={data.books_read}
            onChange={(e) => update('books_read', e.target.value)}
            placeholder="Título e autor."
            className={textareaCls}
          />
          <FieldError msg={errors.books_read} />
        </div>

        <div data-field="top_copywriters" className="flex flex-col gap-2">
          <Label htmlFor="top_copywriters" required>
            3 melhores copywriters que você conhece e aprendeu com eles
          </Label>
          <textarea
            id="top_copywriters"
            value={data.top_copywriters}
            onChange={(e) => update('top_copywriters', e.target.value)}
            placeholder="Nomes e o que aprendeu com cada um."
            className={textareaCls}
          />
          <FieldError msg={errors.top_copywriters} />
        </div>
      </div>
    </section>
  );
}

function Step4({ data, errors, update }: StepProps) {
  return (
    <section>
      <StepHeader
        caption="Etapa 4 de 5 · Teste"
        title="Fundamentos"
        note="Essas perguntas filtram. Responda com profundidade."
      />
      <div className="space-y-10">
        <div data-field="answer_unique_mechanism" className="flex flex-col gap-2">
          <Label htmlFor="answer_unique_mechanism" required>
            O que é mecanismo único?
          </Label>
          <textarea
            id="answer_unique_mechanism"
            value={data.answer_unique_mechanism}
            onChange={(e) =>
              update('answer_unique_mechanism', e.target.value)
            }
            className={textareaCls}
          />
          <FieldError msg={errors.answer_unique_mechanism} />
        </div>

        <div data-field="answer_superstructure" className="flex flex-col gap-2">
          <Label htmlFor="answer_superstructure" required>
            O que é superestrutura dentro de uma copy?
          </Label>
          <textarea
            id="answer_superstructure"
            value={data.answer_superstructure}
            onChange={(e) => update('answer_superstructure', e.target.value)}
            className={textareaCls}
          />
          <FieldError msg={errors.answer_superstructure} />
        </div>

        <div data-field="answer_offer_block" className="flex flex-col gap-2">
          <Label htmlFor="answer_offer_block" required>
            Como você avalia se o bloco de oferta de um produto é bom? O que
            precisa ter?
          </Label>
          <textarea
            id="answer_offer_block"
            value={data.answer_offer_block}
            onChange={(e) => update('answer_offer_block', e.target.value)}
            className={textareaCls}
          />
          <FieldError msg={errors.answer_offer_block} />
        </div>
      </div>
    </section>
  );
}

function Step5({ data, errors, update }: StepProps) {
  return (
    <section>
      <StepHeader caption="Etapa 5 de 5 · Portfólio" title="Seu trabalho" />
      <div className="space-y-10">
        <div data-field="portfolio_url" className="flex flex-col gap-2">
          <Label htmlFor="portfolio_url" required>
            Link do Google Docs com suas copies dos últimos 12 meses
          </Label>
          <input
            id="portfolio_url"
            type="url"
            value={data.portfolio_url}
            onChange={(e) => update('portfolio_url', e.target.value)}
            placeholder="https://docs.google.com/..."
            autoComplete="url"
            className={inputCls}
          />
          <FieldError msg={errors.portfolio_url} />
        </div>

        <div data-field="free_space" className="flex flex-col gap-2">
          <Label htmlFor="free_space">
            Algo mais que você queira nos contar (opcional)
          </Label>
          <textarea
            id="free_space"
            value={data.free_space}
            onChange={(e) => update('free_space', e.target.value)}
            className={textareaCls}
          />
          <FieldError msg={errors.free_space} />
        </div>

        {/* Honeypot */}
        <input
          type="text"
          name="website"
          value={data.website}
          onChange={(e) => update('website', e.target.value)}
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          style={{ position: 'absolute', left: '-9999px' }}
        />
      </div>
    </section>
  );
}

function StepSuccess() {
  return (
    <section className="text-center space-y-8 py-10">
      <h1 className="font-[family-name:var(--font-instrument-serif)] text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-[-0.02em] text-[#FAFAFA]">
        Recebemos.
      </h1>
      <p className="text-[#A3A3A3] max-w-md mx-auto leading-relaxed">
        Sua aplicação está na nossa fila. Se fizer sentido, entraremos em
        contato em até 7 dias.
      </p>
      <div>
        <a
          href="/"
          className="text-xs uppercase tracking-[0.08em] text-[#A3A3A3] hover:text-[#FAFAFA] transition-colors"
        >
          ← Voltar ao site
        </a>
      </div>
    </section>
  );
}

function NavBar({
  step,
  onBack,
  onNext,
  submitting,
}: {
  step: 1 | 2 | 3 | 4 | 5;
  onBack: () => void;
  onNext: () => void;
  submitting: boolean;
}) {
  const isLast = step === 5;
  const nextLabel = isLast
    ? submitting
      ? 'Enviando...'
      : 'Enviar aplicação'
    : 'Próximo →';
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-[#1F1F1F] bg-[#0A0A0A]/95 backdrop-blur sm:static sm:border-t-0 sm:bg-transparent sm:backdrop-blur-0">
      <div className="max-w-2xl mx-auto px-6 py-4 sm:py-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={step <= 1 || submitting}
          className={ghostBtn}
        >
          ← Voltar
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={submitting}
          className={primaryBtn}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
}
