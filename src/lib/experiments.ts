/**
 * ====================================================
 *  A/B Experiments — gerenciados via UI (/admin/experiments)
 * ====================================================
 *
 *  Persistência: tabela `experiments` no Supabase.
 *  Middleware lê via REST (anon key) com cache em memória de 60s
 *  pra não impactar performance. Quando você cria/edita/desativa
 *  um experimento no admin, novos visitantes pegam a mudança em
 *  até 60 segundos.
 */

export interface ExperimentVariant {
  id: string;
  path: string;
  weight?: number;
}

export interface Experiment {
  id?: string;
  slug: string;
  enabled?: boolean;
  entry: string;
  description?: string | null;
  variants: ExperimentVariant[];
  cookieMaxAgeSeconds?: number;
}

interface RawExperiment {
  id: string;
  slug: string;
  entry: string;
  enabled: boolean;
  variants: ExperimentVariant[];
  cookie_max_age_seconds: number;
  description: string | null;
  created_at: string;
  updated_at: string;
}

/* ---------------- Helpers ---------------- */

export function pickVariant(exp: Experiment, seed?: number): ExperimentVariant {
  const totalWeight = exp.variants.reduce((s, v) => s + (v.weight ?? 1), 0);
  const r = (typeof seed === 'number' ? seed : Math.random()) * totalWeight;
  let acc = 0;
  for (const v of exp.variants) {
    acc += v.weight ?? 1;
    if (r < acc) return v;
  }
  return exp.variants[exp.variants.length - 1];
}

export function findVariantById(
  exp: Experiment,
  variantId: string
): ExperimentVariant | null {
  return exp.variants.find((v) => v.id === variantId) ?? null;
}

export function experimentCookieName(expSlug: string): string {
  return `exp_${expSlug}`;
}

/* ---------------- Cache (Edge-compatible) ---------------- */

interface CacheState {
  experiments: Experiment[];
  fetchedAt: number;
}

let cache: CacheState | null = null;
let inflight: Promise<Experiment[]> | null = null;
const CACHE_TTL_MS = 60 * 1000;

function rawToExperiment(r: RawExperiment): Experiment {
  return {
    id: r.id,
    slug: r.slug,
    entry: r.entry,
    enabled: r.enabled,
    variants: r.variants,
    cookieMaxAgeSeconds: r.cookie_max_age_seconds,
    description: r.description,
  };
}

async function fetchExperimentsFromDb(): Promise<Experiment[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  try {
    const res = await fetch(
      `${url}/rest/v1/experiments?select=*&enabled=eq.true`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
        // Edge-friendly: não usa fetch cache do Next
        cache: 'no-store',
      }
    );
    if (!res.ok) return [];
    const rows = (await res.json()) as RawExperiment[];
    return rows.map(rawToExperiment);
  } catch {
    return [];
  }
}

export async function loadExperiments(): Promise<Experiment[]> {
  const now = Date.now();
  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.experiments;
  }
  if (inflight) return inflight;
  inflight = fetchExperimentsFromDb().then((exps) => {
    cache = { experiments: exps, fetchedAt: Date.now() };
    inflight = null;
    return exps;
  });
  return inflight;
}

/** Invalida cache manualmente (chamado após CRUD no admin). */
export function invalidateExperimentsCache() {
  cache = null;
}

export async function findExperimentForEntry(
  pathname: string
): Promise<Experiment | null> {
  const exps = await loadExperiments();
  for (const exp of exps) {
    if (exp.enabled === false) continue;
    if (exp.entry === pathname) return exp;
  }
  return null;
}
