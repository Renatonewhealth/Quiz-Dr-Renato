import { z } from 'zod';

const nonEmpty = (msg = 'Esse campo é obrigatório.') =>
  z.string().trim().min(1, msg);

export const copyApplicationSchema = z.object({
  // Step 1 - Identificação
  full_name: nonEmpty('Informe seu nome completo.').min(3, 'Nome muito curto.'),
  instagram: nonEmpty('Informe seu Instagram.'),
  whatsapp: nonEmpty('Informe seu WhatsApp.').refine(
    (v) => v.replace(/\D/g, '').length >= 10,
    'WhatsApp inválido.'
  ),

  // Step 2 - Perfil profissional
  years_experience: z.enum(['<1', '1-2', '3-5', '+5'], {
    message: 'Selecione uma opção.',
  }),
  seniority: z.enum(['junior', 'pleno-novo', 'pleno-senior', 'senior'], {
    message: 'Selecione uma opção.',
  }),
  operations_worked: nonEmpty('Esse campo é obrigatório.'),
  niches: nonEmpty('Esse campo é obrigatório.'),
  specialty: nonEmpty('Esse campo é obrigatório.'),

  // Step 3 - Resultados e referências
  results_brought: nonEmpty('Esse campo é obrigatório.'),
  books_read: nonEmpty('Esse campo é obrigatório.'),
  top_copywriters: nonEmpty('Esse campo é obrigatório.'),
  recommended_by: z.string().trim().optional().or(z.literal('')),

  // Step 4 - Teste técnico
  answer_unique_mechanism: nonEmpty('Responda com profundidade.').min(
    20,
    'Responda com mais profundidade.'
  ),
  answer_superstructure: nonEmpty('Responda com profundidade.').min(
    20,
    'Responda com mais profundidade.'
  ),
  answer_offer_block: nonEmpty('Responda com profundidade.').min(
    20,
    'Responda com mais profundidade.'
  ),

  // Step 5 - Portfólio
  portfolio_url: nonEmpty('Informe o link.')
    .url('Informe uma URL válida.')
    .refine(
      (v) => /docs\.google\.com|drive\.google\.com/i.test(v),
      'O link precisa ser do Google Docs ou Google Drive.'
    ),
  opportunity_preference: z.enum(['fixed-moderate', 'aggressive-only', 'either'], {
    message: 'Selecione uma opção.',
  }),
  free_space: z.string().trim().optional().or(z.literal('')),

  // Honeypot + meta
  website: z.string().optional(),
  completion_time_seconds: z.number().int().nonnegative().optional(),
});

export type CopyApplicationInput = z.infer<typeof copyApplicationSchema>;

// Per-step schemas for client-side step validation
export const stepSchemas = {
  1: copyApplicationSchema.pick({
    full_name: true,
    instagram: true,
    whatsapp: true,
  }),
  2: copyApplicationSchema.pick({
    years_experience: true,
    seniority: true,
    operations_worked: true,
    niches: true,
    specialty: true,
  }),
  3: copyApplicationSchema.pick({
    results_brought: true,
    books_read: true,
    top_copywriters: true,
    recommended_by: true,
  }),
  4: copyApplicationSchema.pick({
    answer_unique_mechanism: true,
    answer_superstructure: true,
    answer_offer_block: true,
  }),
  5: copyApplicationSchema.pick({
    portfolio_url: true,
    opportunity_preference: true,
    free_space: true,
  }),
} as const;
