'use client';

/**
 * Aba "Dúvidas" — chat com respostas prontas.
 *
 * Parece conversa, mas quem responde é o banco local em _lib/faq.ts. O texto
 * digitado passa por responderPergunta(), que decide entre entregar a resposta,
 * pedir para a pessoa escolher entre assuntos parecidos, ou assumir que não
 * entendeu e oferecer o suporte.
 */

import { useEffect, useRef, useState } from 'react';
import { Flame, MessageCircle, Send } from 'lucide-react';
import { responderPergunta, sugestoesIniciais, type PerguntaFaq } from '../_lib/faq';

const LARANJA = '#ea580c';
const WHATSAPP = 'https://wa.me/553535311001';

interface MensagemBot {
  id: number;
  autor: 'bot';
  paragrafos: string[];
  opcoes: PerguntaFaq[];
  suporte: boolean;
}

interface MensagemUsuaria {
  id: number;
  autor: 'usuaria';
  texto: string;
}

type Mensagem = MensagemBot | MensagemUsuaria;

const SAUDACAO = [
  'Oi! Eu sou a assistente do Jejum Termogênico.',
  'Posso te ajudar com o jejum, a rotina do dia, a alimentação e o aplicativo. Escreva do seu jeito, ou toque em uma das perguntas abaixo.',
];

export default function TabDuvidas() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [entrada, setEntrada] = useState('');
  const [digitando, setDigitando] = useState(false);

  const proximoId = useRef(1);
  const fimDaLista = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setMensagens([
      {
        id: 0,
        autor: 'bot',
        paragrafos: SAUDACAO,
        opcoes: sugestoesIniciais(),
        suporte: false,
      },
    ]);
  }, []);

  useEffect(() => {
    const lista = timers.current;
    return () => lista.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (mensagens.length === 0) return;
    fimDaLista.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [mensagens, digitando]);

  function novoId(): number {
    return proximoId.current++;
  }

  function adicionar(msg: Mensagem) {
    setMensagens((atuais) => [...atuais, msg]);
  }

  function responderComPausa(construir: () => MensagemBot) {
    setDigitando(true);
    const t = setTimeout(() => {
      setDigitando(false);
      adicionar(construir());
    }, 650);
    timers.current.push(t);
  }

  function enviar(texto: string) {
    const limpo = texto.trim();
    if (limpo.length === 0 || digitando) return;

    adicionar({ id: novoId(), autor: 'usuaria', texto: limpo });
    setEntrada('');

    responderComPausa(() => {
      const r = responderPergunta(limpo);

      if (r.tipo === 'resposta') {
        return {
          id: novoId(),
          autor: 'bot',
          paragrafos: r.item.resposta,
          opcoes: [],
          suporte: false,
        };
      }

      if (r.tipo === 'sugestoes') {
        return {
          id: novoId(),
          autor: 'bot',
          paragrafos: [r.texto],
          opcoes: r.opcoes,
          suporte: false,
        };
      }

      return {
        id: novoId(),
        autor: 'bot',
        paragrafos: r.paragrafos,
        opcoes: r.opcoes,
        suporte: r.tipo === 'nao_entendi',
      };
    });
  }

  function escolher(item: PerguntaFaq) {
    if (digitando) return;
    adicionar({ id: novoId(), autor: 'usuaria', texto: item.pergunta });
    responderComPausa(() => ({
      id: novoId(),
      autor: 'bot',
      paragrafos: item.resposta,
      opcoes: [],
      suporte: false,
    }));
  }

  const ultima = mensagens[mensagens.length - 1];
  const opcoesVisiveis =
    !digitando && ultima && ultima.autor === 'bot' ? ultima.opcoes : [];
  const mostrarSuporte =
    !digitando && ultima && ultima.autor === 'bot' && ultima.suporte;

  return (
    <div className="flex flex-col pt-4" style={{ paddingBottom: '5rem' }}>
      <div className="flex-1 space-y-3">
        {mensagens.map((msg) =>
          msg.autor === 'usuaria' ? (
            <div key={msg.id} className="flex justify-end">
              <div
                className="max-w-[85%] rounded-2xl rounded-br-md px-4 py-3 text-[15px] leading-relaxed text-white"
                style={{ backgroundColor: LARANJA }}
              >
                {msg.texto}
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex items-end gap-2">
              <div
                className="mb-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${LARANJA}18` }}
                aria-hidden
              >
                <Flame className="h-4 w-4" style={{ color: LARANJA }} strokeWidth={2.5} />
              </div>
              <div className="max-w-[85%] space-y-2 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-gray-200">
                {msg.paragrafos.map((p, i) => (
                  <p key={i} className="text-[15px] leading-relaxed text-gray-800">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ),
        )}

        {digitando && (
          <div className="flex items-end gap-2">
            <div
              className="mb-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `${LARANJA}18` }}
              aria-hidden
            >
              <Flame className="h-4 w-4" style={{ color: LARANJA }} strokeWidth={2.5} />
            </div>
            <div
              className="rounded-2xl rounded-bl-md bg-white px-4 py-3.5 shadow-sm ring-1 ring-gray-200"
              aria-live="polite"
              aria-label="Digitando"
            >
              <span className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-2 w-2 animate-bounce rounded-full bg-gray-300"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}
      </div>

      {opcoesVisiveis.length > 0 && (
        <div className="mt-4 space-y-2 pl-10">
          {opcoesVisiveis.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => escolher(item)}
              className="block w-full rounded-xl border bg-white px-4 py-3 text-left text-[14px] font-medium leading-snug transition-colors hover:bg-gray-50"
              style={{ borderColor: `${LARANJA}40`, color: LARANJA }}
            >
              {item.pergunta}
            </button>
          ))}
        </div>
      )}

      {mostrarSuporte && (
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 ml-10 inline-flex items-center justify-center gap-2 self-start rounded-xl px-5 py-3 text-[15px] font-bold text-white"
          style={{ backgroundColor: '#25D366' }}
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
          Falar com a equipe no WhatsApp
        </a>
      )}

      <div ref={fimDaLista} />

      {/* Campo de escrita, fixo acima da barra de navegação */}
      <div
        className="fixed left-1/2 z-20 w-full max-w-2xl -translate-x-1/2 border-t border-gray-200 bg-white px-3 py-2.5"
        style={{ bottom: 'calc(env(safe-area-inset-bottom) + 3.9rem)' }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            enviar(entrada);
          }}
          className="flex items-end gap-2"
        >
          <textarea
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                enviar(entrada);
              }
            }}
            rows={1}
            placeholder="Escreva a sua dúvida..."
            aria-label="Escreva a sua dúvida"
            className="max-h-28 min-h-[46px] flex-1 resize-none rounded-xl border border-gray-300 px-4 py-3 text-[16px] text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#ea580c]"
          />
          <button
            type="submit"
            disabled={entrada.trim().length === 0 || digitando}
            aria-label="Enviar"
            className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-xl text-white transition-opacity disabled:opacity-40"
            style={{ backgroundColor: LARANJA }}
          >
            <Send className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </form>
        <p className="mt-1.5 text-center text-[11px] text-gray-400">
          Orientação educativa. Não substitui uma consulta médica.
        </p>
      </div>
    </div>
  );
}
