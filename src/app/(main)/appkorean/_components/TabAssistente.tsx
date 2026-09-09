'use client';

/**
 * Aba "Dúvidas" — chat com respostas prontas.
 *
 * A conversa parece um chat, mas quem responde é o banco local em
 * _lib/faq.ts (94 perguntas revisadas), não um modelo de IA. O texto que a
 * pessoa escreve passa por responderPergunta(), que decide entre:
 *   - entregar a resposta direto (acerto isolado e forte)
 *   - perguntar qual dos assuntos é o caso (empate técnico)
 *   - assumir que não entendeu e oferecer caminhos + suporte
 *
 * A rota /api/korean-chat continua no projeto para quando a IA for ligada:
 * bastaria trocar a chamada de responderPergunta() por um fetch com stream.
 */

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, Sparkles } from 'lucide-react';
import {
  responderPergunta,
  sugestoesIniciais,
  type PerguntaFaq,
} from '../_lib/faq';

const ROSA = '#c4448f';
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

const SAUDACAO: string[] = [
  'Oi! Eu sou a assistente do Dr. Renato Silveira.',
  'Posso te ajudar com a rotina do Korean Kit, com dúvidas sobre a sua pele e com o seu pedido. Escreva do seu jeito, ou toque em uma das perguntas abaixo.',
];

export default function TabAssistente() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [entrada, setEntrada] = useState('');
  const [digitando, setDigitando] = useState(false);

  const proximoId = useRef(1);
  const fimDaLista = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Primeira mensagem, montada só no cliente.
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

  // Limpa timers pendentes se a aba for desmontada no meio de uma resposta.
  useEffect(() => {
    const lista = timers.current;
    return () => {
      lista.forEach(clearTimeout);
    };
  }, []);

  // Rola para a última mensagem sempre que a conversa muda.
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

  /** Responde depois de uma pausa curta, para a conversa não parecer instantânea. */
  function responderComPausa(construir: () => MensagemBot) {
    setDigitando(true);
    const t = setTimeout(() => {
      setDigitando(false);
      adicionar(construir());
    }, 650);
    timers.current.push(t);
  }

  /** Texto livre digitado pela usuária. */
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

  /** Toque em uma pergunta sugerida: entrega a resposta daquele item direto. */
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
      {/* Conversa */}
      <div className="flex-1 space-y-3">
        {mensagens.map((msg) =>
          msg.autor === 'usuaria' ? (
            <div key={msg.id} className="flex justify-end">
              <div
                className="max-w-[85%] rounded-2xl rounded-br-md px-4 py-3 text-[15px] leading-relaxed text-white"
                style={{ backgroundColor: ROSA }}
              >
                {msg.texto}
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex items-end gap-2">
              <div
                className="mb-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${ROSA}18` }}
                aria-hidden
              >
                <Sparkles className="h-4 w-4" style={{ color: ROSA }} strokeWidth={2.5} />
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

        {/* Digitando */}
        {digitando && (
          <div className="flex items-end gap-2">
            <div
              className="mb-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: `${ROSA}18` }}
              aria-hidden
            >
              <Sparkles className="h-4 w-4" style={{ color: ROSA }} strokeWidth={2.5} />
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

      {/* Perguntas sugeridas da última resposta */}
      {opcoesVisiveis.length > 0 && (
        <div className="mt-4 space-y-2 pl-10">
          {opcoesVisiveis.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => escolher(item)}
              className="block w-full rounded-xl border bg-white px-4 py-3 text-left text-[14px] font-medium leading-snug transition-colors hover:bg-gray-50"
              style={{ borderColor: `${ROSA}40`, color: ROSA }}
            >
              {item.pergunta}
            </button>
          ))}
        </div>
      )}

      {/* Atalho para o suporte quando não houve resposta */}
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
            className="max-h-28 min-h-[46px] flex-1 resize-none rounded-xl border border-gray-300 px-4 py-3 text-[16px] text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#c4448f]"
          />
          <button
            type="submit"
            disabled={entrada.trim().length === 0 || digitando}
            aria-label="Enviar"
            className="flex h-[46px] w-[46px] flex-shrink-0 items-center justify-center rounded-xl text-white transition-opacity disabled:opacity-40"
            style={{ backgroundColor: ROSA }}
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
