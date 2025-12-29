import { QuizAnswer } from './quiz';

export interface Lead {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  score: number;
  resultado: string;
  respostas: QuizAnswer[];
  whatsapp_enviado?: boolean;
  created_at?: string;
}

export interface LeadFormData {
  nome: string;
  email: string;
  telefone: string;
}

