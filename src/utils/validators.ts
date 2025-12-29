import { z } from 'zod';

export const leadFormSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z
    .string()
    .regex(/^(\+55\s?)?\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'Telefone inválido'),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export const quizAnswerSchema = z.object({
  questionId: z.string(),
  optionId: z.string(),
  score: z.number().min(0).max(5),
});

export const quizSubmissionSchema = z.object({
  answers: z.array(quizAnswerSchema),
  leadData: leadFormSchema,
});

