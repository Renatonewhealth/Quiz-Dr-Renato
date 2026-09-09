'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AlertCircle, RotateCcw, Send, Sparkles } from 'lucide-react';
import type { ChatMsg } from '../_lib/types';
import { PERGUNTAS_RAPIDAS } from '../_lib/conteudo';

const ROSA = '#c4448f';

const SAUDACAO =
  'Oi! Eu sou a assistente do Dr. Renato Silveira. Estou aqui para tirar suas dúvidas sobre a sua pele, sobre o intestino e sobre a rotina do Korean Kit. Pode perguntar do seu jeito, sem formalidade.';

export default function TabAssistente() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(false);

  const fimRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const carregandoRef = useRef(false);

  const scrollarParaOFim = useCallback(() => {
    fimRef.current?.scrollIntoView({ block: 'end' });
  }, []);

  useEffect(() => {
    scrollarParaOFim();
  }, [msgs, carregando, scrollarParaOFim]);

  const conversar = useCallback(
    async (historico: ChatMsg[]) => {
      if (carregandoRef.current) return;
      carregandoRef.current = true;
      setCarregando(true);
      setErro(false);

      let abriuBolha = false;

      try {
        const res = await fetch('/api/korean-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: historico }),
        });

        if (!res.ok || !res.body) {
          throw new Error('resposta invalida');
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let texto = '';

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          const pedaco = decoder.decode(value, { stream: true });
          if (!pedaco) continue;

          texto += pedaco;

          if (!abriuBolha) {
            abriuBolha = true;
            setCarregando(false);
            setMsgs((atual) => [...atual, { role: 'assistant', content: texto }]);
          } else {
            setMsgs((atual) => {
              const copia = [...atual];
              copia[copia.length - 1] = { role: 'assistant', content: texto };
              return copia;
            });
          }
        }

        const resto = decoder.decode();
        if (resto) {
          texto += resto;
          setMsgs((atual) => {
            const copia = [...atual];
            if (abriuBolha) {
              copia[copia.length - 1] = { role: 'assistant', content: texto };
              return copia;
            }
            return [...copia, { role: 'assistant', content: texto }];
          });
          abriuBolha = true;
        }

        if (!abriuBolha) {
          throw new Error('resposta vazia');
        }
      } catch {
        setErro(true);
      } finally {
        carregandoRef.current = false;
        setCarregando(false);
      }
    },
    [],
  );

  const enviar = useCallback(
    (texto: string) => {
      const limpo = texto.trim();
      if (!limpo || carregandoRef.current) return;

      const historico: ChatMsg[] = [...msgs, { role: 'user', content: limpo }];
      setMsgs(historico);
      setInput('');
      void conversar(historico);
    },
    [msgs, conversar],
  );

  const tentarDeNovo = useCallback(() => {
    setErro(false);
    void conversar(msgs);
  }, [msgs, conversar]);

  const mostrarSugestoes = msgs.length === 0;

  return (
    <div className="flex h-full min-h-[70vh] flex-col bg-gray-50">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 border-b border-gray-100 bg-white px-4 py-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `${ROSA}10` }}
        >
          <Sparkles className="h-5 w-5" style={{ color: ROSA }} />
        </div>
        <div className="min-w-0">
          <p className="text-base font-semibold text-gray-900">Assistente</p>
          <p className="truncate text-sm text-gray-500">Dúvidas sobre a sua pele e a rotina</p>
        </div>
      </div>

      {/* Conversa */}
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
        {/* Saudação inicial */}
        <Bolha role="assistant" texto={SAUDACAO} />

        {mostrarSugestoes && (
          <div className="pt-1">
            <p className="mb-3 px-1 text-sm font-medium text-gray-500">
              Toque em uma pergunta ou escreva a sua:
            </p>
            <div className="flex flex-wrap gap-2">
              {PERGUNTAS_RAPIDAS.map((pergunta) => (
                <button
                  key={pergunta}
                  type="button"
                  onClick={() => enviar(pergunta)}
                  className="min-h-[44px] rounded-2xl border bg-white px-4 py-2.5 text-left text-base leading-snug text-gray-800 shadow-sm transition-colors active:opacity-80"
                  style={{ borderColor: `${ROSA}40` }}
                >
                  {pergunta}
                </button>
              ))}
            </div>
          </div>
        )}

        {msgs.map((m, i) => (
          <Bolha key={`${m.role}-${i}`} role={m.role} texto={m.content} />
        ))}

        {carregando && <Digitando />}

        {erro && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-amber-200 bg-amber-50 px-4 py-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <p className="text-base leading-relaxed text-gray-800">
                  Não consegui responder agora. Pode ser a sua internet. Vamos tentar de novo?
                </p>
              </div>
              <button
                type="button"
                onClick={tentarDeNovo}
                className="mt-3 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-base font-semibold text-gray-800 shadow-sm ring-1 ring-amber-200 active:opacity-80"
              >
                <RotateCcw className="h-5 w-5" />
                Tentar de novo
              </button>
            </div>
          </div>
        )}

        <div ref={fimRef} />
      </div>

      {/* Caixa de escrita */}
      <div className="border-t border-gray-100 bg-white px-4 pb-4 pt-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                enviar(input);
              }
            }}
            rows={1}
            placeholder="Escreva sua pergunta..."
            className="max-h-32 min-h-[52px] flex-1 resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-base leading-snug text-gray-900 outline-none placeholder:text-gray-400 focus:border-gray-300 focus:bg-white"
          />
          <button
            type="button"
            onClick={() => enviar(input)}
            disabled={!input.trim() || carregando}
            aria-label="Enviar pergunta"
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl text-white shadow-sm transition-opacity disabled:opacity-40"
            style={{ backgroundColor: ROSA }}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-2.5 text-center text-xs text-gray-400">
          Orientação educativa, não substitui consulta médica.
        </p>
      </div>
    </div>
  );
}

function Bolha({ role, texto }: { role: ChatMsg['role']; texto: string }) {
  const daUsuaria = role === 'user';

  return (
    <div className={`flex ${daUsuaria ? 'justify-end' : 'justify-start'}`}>
      <div
        className={[
          'max-w-[85%] whitespace-pre-wrap break-words px-4 py-3 text-base leading-relaxed shadow-sm',
          daUsuaria
            ? 'rounded-2xl rounded-br-md text-white'
            : 'rounded-2xl rounded-bl-md bg-white text-gray-800',
        ].join(' ')}
        style={daUsuaria ? { backgroundColor: ROSA } : undefined}
      >
        {texto}
      </div>
    </div>
  );
}

function Digitando() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white px-4 py-4 shadow-sm">
        <span className="sr-only">Digitando</span>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 animate-bounce rounded-full"
            style={{ backgroundColor: `${ROSA}80`, animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
