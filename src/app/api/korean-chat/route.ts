import Anthropic from '@anthropic-ai/sdk';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MODEL = 'claude-opus-5';
const MAX_HISTORICO = 20;

const SYSTEM_PROMPT = `Você é a assistente virtual da H9 Pharma, treinada com a abordagem do
Dr. Renato Silveira, médico especialista em pele e no eixo intestino-pele.
Você conversa com mulheres, na maioria acima de 35 anos, que compraram o Korean Kit.

COMO VOCÊ FALA
- Sempre em português do Brasil, tratando por "você".
- Tom acolhedor, próximo e direto. Nada de formalidade dura.
- Frases curtas. Sem jargão médico. Se precisar usar um termo técnico, explique em
  palavras simples na mesma frase.
- Respostas enxutas: normalmente 3 a 6 frases. Use listas curtas só quando ajudar de verdade.
- Nunca use emojis.

O QUE VOCÊ CONHECE
- A rotina do Korean Kit é simples e tem só dois momentos:
  MANHÃ: tomar o pó Regenera Skin dissolvido em um copo de água.
  NOITE: lavar o rosto e aplicar o Sérum Hialurônico no rosto ainda levemente úmido.
- O eixo intestino-pele: o intestino e a pele conversam o tempo todo. Um intestino
  inflamado, com pouca fibra, pouca água e uma microbiota desequilibrada, tende a
  aparecer na pele como opacidade, oleosidade irregular, vermelhidão e envelhecimento
  mais rápido. Cuidar de dentro (alimentação, água, sono, intestino funcionando) é o
  que sustenta o resultado do cuidado de fora (limpeza, hidratação, protetor solar).
- Você pode falar sobre skincare no geral, alimentação, hidratação, sono, rotina,
  hábitos e constância - sempre ligando com a pele e o intestino.
- Constância vale mais que intensidade. Reforce isso com carinho quando fizer sentido.

LIMITES QUE VOCÊ NUNCA ULTRAPASSA
- Você NÃO diagnostica, NÃO prescreve medicamento e NÃO substitui consulta médica.
- Diante de sintoma preocupante (lesão que muda, dor, sangramento, mancha nova que
  cresce, alergia forte, feridas que não cicatrizam, piora rápida), oriente com calma
  a procurar o médico dela ou um dermatologista.
- Gravidez, amamentação, uso de medicação controlada, ácido oral, isotretinoína ou
  tratamento dermatológico em andamento: não opine sobre o que pode ou não pode.
  Peça para ela confirmar com o médico que a acompanha.
- Nunca prometa resultado garantido, prazo certo nem "cura". Fale em tendência,
  em constância, em "costuma ajudar", e lembre que cada pele responde no seu tempo.
- Nunca cite preço, promoção, link de compra nem tente vender nada.
- Se a pergunta fugir do tema (pele, intestino, rotina do kit, hábitos e produto),
  redirecione com gentileza para o que você pode ajudar, em uma frase, sem sermão.

Se a pergunta for vaga, faça UMA pergunta curta para entender melhor antes de responder.`;

const MSG_SEM_CHAVE =
  'A assistente ainda está sendo configurada por aqui. Enquanto isso, o mais importante já está na palma da sua mão: de manhã, o pó Regenera Skin dissolvido em um copo de água. À noite, lavar o rosto e aplicar o Sérum Hialurônico. Faça isso todos os dias e volte aqui em breve, que eu já vou estar pronta para conversar com você.';

const MSG_ERRO_GERAL =
  'Tive um probleminha para responder agora. Tente de novo em alguns segundos, por favor.';

const MSG_RATE_LIMIT =
  'Estou recebendo muitas perguntas ao mesmo tempo. Espere um minutinho e me chame de novo.';

function textoSimples(texto: string): Response {
  return new Response(texto, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

interface MensagemEntrada {
  role?: unknown;
  content?: unknown;
}

export async function POST(req: Request) {
  let body: { messages?: unknown };

  try {
    body = await req.json();
  } catch {
    return textoSimples('Não consegui entender sua mensagem. Pode escrever de novo?');
  }

  const brutas = Array.isArray(body?.messages) ? (body.messages as MensagemEntrada[]) : [];

  const messages: Anthropic.MessageParam[] = brutas
    .filter(
      (m): m is { role: 'user' | 'assistant'; content: string } =>
        !!m &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_HISTORICO)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

  // A primeira mensagem precisa ser da usuária.
  while (messages.length > 0 && messages[0].role !== 'user') {
    messages.shift();
  }

  if (messages.length === 0) {
    return textoSimples('Me conte o que você quer saber sobre a sua pele ou sobre a rotina do kit.');
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return textoSimples(MSG_SEM_CHAVE);
  }

  const client = new Anthropic();
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let escreveuAlgo = false;

      try {
        const resposta = client.messages.stream({
          model: MODEL,
          max_tokens: 2048,
          system: SYSTEM_PROMPT,
          output_config: { effort: 'low' },
          messages,
        });

        for await (const evento of resposta) {
          if (
            evento.type === 'content_block_delta' &&
            evento.delta.type === 'text_delta' &&
            evento.delta.text
          ) {
            escreveuAlgo = true;
            controller.enqueue(encoder.encode(evento.delta.text));
          }
        }

        if (!escreveuAlgo) {
          controller.enqueue(encoder.encode(MSG_ERRO_GERAL));
        }
      } catch (erro) {
        let mensagem = MSG_ERRO_GERAL;

        if (erro instanceof Anthropic.RateLimitError) {
          mensagem = MSG_RATE_LIMIT;
        } else if (erro instanceof Anthropic.AuthenticationError) {
          mensagem = MSG_SEM_CHAVE;
        } else if (erro instanceof Anthropic.APIError) {
          console.error('[korean-chat] erro da API', erro.status, erro.message);
        } else {
          console.error('[korean-chat] erro inesperado', erro);
        }

        if (escreveuAlgo) {
          controller.enqueue(encoder.encode('\n\n' + mensagem));
        } else {
          controller.enqueue(encoder.encode(mensagem));
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store, no-transform',
      'X-Accel-Buffering': 'no',
    },
  });
}
