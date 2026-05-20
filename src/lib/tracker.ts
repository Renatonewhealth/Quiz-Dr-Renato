/**
 * Tracker leve para enviar eventos pro /api/track.
 * - session_id: TTL 24h (localStorage)
 * - visitor_id: perene (localStorage)
 * - UTM captura: na primeira visita, salva UTM params no localStorage e
 *   anexa em todos os eventos da sessão.
 * - Batching: junta eventos por até 1.5s antes de enviar (ou usa
 *   sendBeacon no unload pra eventos pendentes).
 */

const SESSION_KEY = 'tr_sid';
const SESSION_EXPIRY_KEY = 'tr_sid_exp';
const VISITOR_KEY = 'tr_vid';
const UTM_KEY = 'tr_utm';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24h

export type EventType =
  | 'page_view'
  | 'quiz_start'
  | 'quiz_question_answered'
  | 'quiz_completed'
  | 'lead_captured'
  | 'cta_click';

interface UtmParams {
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
}

interface TrackPayload {
  session_id: string;
  visitor_id: string;
  event_type: EventType;
  page_slug?: string;
  variant?: string | null;
  question_id?: number | null;
  metadata?: Record<string, unknown>;
  timestamp: string;
  referrer?: string | null;
}

interface OutgoingEvent extends TrackPayload, UtmParams {}

function nowMs() {
  return Date.now();
}

function uuid(): string {
  // RFC 4122-ish, suficiente pra session/visitor
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    try {
      return crypto.randomUUID();
    } catch {
      // fallback
    }
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function safeGet(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

function getOrCreateVisitorId(): string {
  let id = safeGet(VISITOR_KEY);
  if (!id) {
    id = uuid();
    safeSet(VISITOR_KEY, id);
  }
  return id;
}

function getOrCreateSessionId(): string {
  const expRaw = safeGet(SESSION_EXPIRY_KEY);
  const exp = expRaw ? parseInt(expRaw, 10) : 0;
  const existing = safeGet(SESSION_KEY);
  if (existing && exp > nowMs()) {
    // Renova a expiração
    safeSet(SESSION_EXPIRY_KEY, String(nowMs() + SESSION_TTL_MS));
    return existing;
  }
  const id = uuid();
  safeSet(SESSION_KEY, id);
  safeSet(SESSION_EXPIRY_KEY, String(nowMs() + SESSION_TTL_MS));
  return id;
}

function captureUtmFromUrl(): UtmParams | null {
  if (typeof window === 'undefined') return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const utm: UtmParams = {};
    let any = false;
    (['source', 'medium', 'campaign', 'term', 'content'] as const).forEach((k) => {
      const v = params.get(`utm_${k}`);
      if (v) {
        any = true;
        (utm as Record<string, string>)[`utm_${k}`] = v.slice(0, 200);
      }
    });
    return any ? utm : null;
  } catch {
    return null;
  }
}

function getStoredUtm(): UtmParams {
  const raw = safeGet(UTM_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as UtmParams;
  } catch {
    return {};
  }
}

function ensureUtmCaptured(): UtmParams {
  // Captura UTM do URL na primeira visita, persiste no localStorage.
  // Em visitas seguintes, usa o que está armazenado.
  const fromUrl = captureUtmFromUrl();
  if (fromUrl) {
    safeSet(UTM_KEY, JSON.stringify(fromUrl));
    return fromUrl;
  }
  return getStoredUtm();
}

// ----- Batching -----
let queue: OutgoingEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;

function flush(useBeacon = false) {
  if (typeof window === 'undefined') return;
  if (queue.length === 0) return;
  const events = queue;
  queue = [];

  const body = JSON.stringify({ events });
  const url = '/api/track';

  if (useBeacon && navigator.sendBeacon) {
    try {
      const blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon(url, blob);
      return;
    } catch {
      // fallback pra fetch
    }
  }

  try {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {
      /* tracking não deve quebrar a página */
    });
  } catch {
    /* ignore */
  }
}

function scheduleFlush() {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flush(false);
  }, 1500);
}

function pageSlug(): string {
  if (typeof window === 'undefined') return '/';
  const path = window.location.pathname || '/';
  return path.length > 1 ? path.replace(/\/$/, '') : '/';
}

export interface TrackOptions {
  page_slug?: string;
  variant?: string | null;
  question_id?: number | null;
  metadata?: Record<string, unknown>;
  immediate?: boolean; // se true, envia agora (beacon)
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split('; ')
    .find((c) => c.startsWith(name + '='));
  if (!match) return null;
  return decodeURIComponent(match.slice(name.length + 1));
}

/**
 * Resolve a variante de A/B test:
 *   1. Se opts.variant explícito → usa
 *   2. Senão, lê cookie `tr_variant` (setado pelo middleware no formato
 *      "experimento:variante") e usa como variante
 *   3. Senão null
 */
function resolveVariant(explicit: string | null | undefined): string | null {
  if (explicit) return explicit;
  const cookie = readCookie('tr_variant');
  return cookie || null;
}

export function track(eventType: EventType, opts: TrackOptions = {}) {
  if (typeof window === 'undefined') return;

  const session_id = getOrCreateSessionId();
  const visitor_id = getOrCreateVisitorId();
  const utm = ensureUtmCaptured();

  const event: OutgoingEvent = {
    session_id,
    visitor_id,
    event_type: eventType,
    page_slug: opts.page_slug ?? pageSlug(),
    variant: resolveVariant(opts.variant),
    question_id: opts.question_id ?? null,
    metadata: opts.metadata ?? {},
    timestamp: new Date().toISOString(),
    referrer: document.referrer || null,
    ...utm,
  };

  queue.push(event);

  if (opts.immediate) {
    flush(true);
  } else {
    scheduleFlush();
  }
}

export function setupUnloadFlush() {
  if (typeof window === 'undefined') return;
  const handler = () => flush(true);
  window.addEventListener('pagehide', handler);
  window.addEventListener('beforeunload', handler);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush(true);
  });
}
