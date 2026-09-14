/**
 * Perguntas e respostas do Jejum Termogênico, escritas a partir dos 3 PDFs
 * do protocolo.
 *
 * Guardrails em toda resposta: não diagnostica, não prescreve, não substitui
 * consulta. Gravidez, amamentação, diabetes, pressão, medicação de uso
 * contínuo e qualquer sintoma preocupante encaminham para o médico.
 */

export type CategoriaId = 'jejum' | 'rotina' | 'comida' | 'saude' | 'resultados' | 'app';

export interface Categoria {
  id: CategoriaId;
  nome: string;
}

export interface PerguntaFaq {
  id: string;
  categoria: CategoriaId;
  pergunta: string;
  resposta: string[];
  termos?: string[];
}

export const CATEGORIAS: Categoria[] = [
  { id: 'jejum', nome: 'Sobre o jejum' },
  { id: 'rotina', nome: 'Rotina e exercícios' },
  { id: 'comida', nome: 'Alimentação' },
  { id: 'saude', nome: 'Saúde e segurança' },
  { id: 'resultados', nome: 'Resultados' },
  { id: 'app', nome: 'Sobre o aplicativo' },
];

export const FAQ: PerguntaFaq[] = [
  // ---------------- JEJUM ----------------
  {
    id: 'j-o-que-quebra',
    categoria: 'jejum',
    pergunta: 'O que quebra o jejum?',
    resposta: [
      'Qualquer coisa com caloria quebra o jejum. Os shots do protocolo (Ativador de Energia, Revolution e Cetogênico) não quebram, e o Tônico de Blindagem Imunológica também não.',
      'Água, café sem açúcar e chá sem açúcar estão liberados durante o jejum.',
      'Leite, adoçante calórico, suco e qualquer alimento quebram.',
    ],
    termos: ['quebra jejum', 'pode tomar', 'cafe', 'agua'],
  },
  {
    id: 'j-atrasei',
    categoria: 'jejum',
    pergunta: 'Atrasei o início do jejum. E agora?',
    resposta: [
      'Sem problema. É só compensar o mesmo tempo na hora de encerrar.',
      'Exemplo: se você deveria começar às 19h e só começou às 20h, então encerra uma hora mais tarde no dia seguinte.',
      'O que importa é fechar as horas de jejum da semana, não o relógio exato.',
    ],
    termos: ['atrasei', 'comecei tarde', 'horario'],
  },
  {
    id: 'j-mudar-horario',
    categoria: 'jejum',
    pergunta: 'Posso mudar o horário do jejum?',
    resposta: [
      'Pode. Os horários sugeridos são uma referência, não uma regra rígida.',
      'Se você preferir começar mais cedo ou mais tarde, tudo bem, desde que complete as horas de jejum daquela semana.',
      'Escolha uma janela que caiba na sua rotina de verdade. A que você consegue repetir todo dia é a que funciona.',
    ],
    termos: ['mudar horario', 'outro horario', 'flexivel'],
  },
  {
    id: 'j-quantas-horas',
    categoria: 'jejum',
    pergunta: 'Quantas horas de jejum em cada semana?',
    resposta: [
      'Semana 1, Limpeza Termogênica: 13 horas, das 19h às 8h.',
      'Semana 2, Revolução Metabólica: 15 horas, das 19h às 10h.',
      'Semana 3, Queima Metabólica: 17 horas, das 18h às 11h.',
      'O aumento é gradual de propósito: o corpo vai se adaptando aos poucos.',
    ],
    termos: ['quantas horas', '13', '15', '17', 'semanas'],
  },
  {
    id: 'j-desafio-18h',
    categoria: 'jejum',
    pergunta: 'Como funciona o desafio de 18 horas da semana 2?',
    resposta: [
      'Na segunda semana você escolhe 2 dias e, nesses dias, estende o jejum de 15h para 18h.',
      'Você escolhe quais dias. Prefira dias mais tranquilos, em que a fome costuma te pegar menos.',
    ],
    termos: ['18 horas', 'desafio', 'semana 2'],
  },
  {
    id: 'j-desafio-24h',
    categoria: 'jejum',
    pergunta: 'Como funciona o jejum de 24 horas da semana 3?',
    resposta: [
      'Você escolhe 1 dia da semana e faz uma única refeição: o almoço, por volta de meio-dia.',
      'Nesse almoço pode comer folhas à vontade e bastante carne com gordura, como picanha, além de qualquer alimento da lista de permitidos.',
      'Beba 6 litros de água nesse dia. Café e chás sem açúcar continuam liberados, e o tônico da blindagem também pode.',
      'O jejum se encerra no dia seguinte, ao meio-dia.',
    ],
    termos: ['24 horas', 'desafio', 'semana 3', 'um dia'],
  },
  {
    id: 'j-fome',
    categoria: 'jejum',
    pergunta: 'Estou com muita fome durante o jejum. O que faço?',
    resposta: [
      'Beba água. Boa parte da fome no começo do jejum é sede disfarçada.',
      'Café e chá sem açúcar ajudam bastante a atravessar esse período.',
      'É normal sentir mais fome nos primeiros dias: o corpo ainda está se adaptando. Costuma melhorar depois da primeira semana.',
      'Se a fome vier com tontura, tremedeira ou mal-estar, encerre o jejum e converse com o seu médico.',
    ],
    termos: ['fome', 'com fome', 'aguentar'],
  },
  {
    id: 'j-tontura',
    categoria: 'jejum',
    pergunta: 'Senti tontura ou fraqueza. É normal?',
    resposta: [
      'Um pouco de adaptação nos primeiros dias acontece, principalmente se você não estava acostumada a passar tantas horas sem comer.',
      'Mas tontura forte, tremedeira, suor frio ou mal-estar não são para ser suportados. Encerre o jejum, coma algo e procure o seu médico.',
      'Se você tem diabetes, pressão baixa ou usa medicação contínua, isso merece atenção redobrada.',
    ],
    termos: ['tontura', 'fraqueza', 'mal estar', 'tremendo'],
  },

  // ---------------- ROTINA ----------------
  {
    id: 'r-nao-consigo-correr',
    categoria: 'rotina',
    pergunta: 'Não consigo correr. Posso só caminhar?',
    resposta: [
      'Pode, e o próprio protocolo diz isso.',
      'Na caminhada termogênica, se não der para correr, caminhe os 20 minutos que também traz bons resultados.',
      'No circuito metabólico, se não conseguir o formato completo, caminhe em ritmo rápido pelo tempo indicado.',
    ],
    termos: ['nao consigo correr', 'caminhar', 'so caminhada'],
  },
  {
    id: 'r-exercicio-jejum',
    categoria: 'rotina',
    pergunta: 'Preciso fazer exercício em jejum?',
    resposta: [
      'Sim, a atividade da manhã é feita em jejum, logo depois do shot. É parte da lógica do protocolo.',
      'Se você sentir mal-estar fazendo em jejum, pare e converse com o seu médico antes de continuar.',
    ],
    termos: ['exercicio em jejum', 'treinar', 'atividade'],
  },
  {
    id: 'r-esqueci-shot',
    categoria: 'rotina',
    pergunta: 'Esqueci de tomar o shot. Tomo depois?',
    resposta: [
      'Se ainda estiver no período de jejum, pode tomar assim que lembrar.',
      'Se já quebrou o jejum, deixe para o dia seguinte. Não dobre a dose.',
      'Um dia fora do roteiro não estraga o protocolo. O que conta é o conjunto da semana.',
    ],
    termos: ['esqueci', 'shot', 'pulei'],
  },
  {
    id: 'r-falta-ingrediente',
    categoria: 'rotina',
    pergunta: 'Não tenho um dos ingredientes do shot. Posso fazer sem?',
    resposta: [
      'Pode. O próprio protocolo orienta: faça sem o item que falta e providencie para o dia seguinte.',
      'Melhor tomar o shot incompleto do que não tomar nada.',
    ],
    termos: ['falta ingrediente', 'nao tenho', 'substituir'],
  },
  {
    id: 'r-tonico-esqueci',
    categoria: 'rotina',
    pergunta: 'Esqueci de preparar o tônico na noite anterior. E agora?',
    resposta: [
      'O tônico precisa do alho descansando na água a noite toda, então não dá para fazer na hora.',
      'Deixe preparado hoje à noite e retome amanhã. Nesse dia, siga o resto da rotina normalmente.',
      'Uma dica: prepare sempre logo depois do jantar, junto com a louça, que vira hábito.',
    ],
    termos: ['tonico', 'esqueci preparar', 'alho'],
  },
  {
    id: 'r-quantos-treinos',
    categoria: 'rotina',
    pergunta: 'Quantos treinos por dia?',
    resposta: [
      'Semanas 1 e 2: escolha um vídeo na plataforma e faça 1x ao dia, em qualquer horário.',
      'Semana 3: são 2 treinos por dia. Essa semana é mais intensa mesmo.',
      'Os vídeos estão na plataforma de aulas, que chegou no seu e-mail com o nome alpaclass.',
    ],
    termos: ['treinos', 'quantas vezes', 'aulas'],
  },

  // ---------------- COMIDA ----------------
  {
    id: 'c-trocar-alimento',
    categoria: 'comida',
    pergunta: 'Posso trocar um alimento do cardápio?',
    resposta: [
      'Pode, desde que seja por outro do mesmo grupo e que não tenha glúten, açúcar ou refinados.',
      'Nos sucos detox, o protocolo até incentiva variar: trocar couve por agrião ou espinafre, mudar a fruta, acrescentar salsa ou salsão.',
      'Nas carnes, legumes e folhas também dá para ir alternando ao longo da semana.',
    ],
    termos: ['trocar', 'substituir', 'nao gosto'],
  },
  {
    id: 'c-passar-fome',
    categoria: 'comida',
    pergunta: 'Posso comer menos do que está no cardápio?',
    resposta: [
      'O protocolo é claro em um ponto: não pode passar fome.',
      'A ideia não é comer pouco, é comer certo dentro da janela. Se você está com fome nas refeições, aumente as folhas e os legumes.',
      'Comer de menos atrapalha o metabolismo, que é justamente o que você está tentando acelerar.',
    ],
    termos: ['passar fome', 'comer menos', 'pouco'],
  },
  {
    id: 'c-cafe-adocante',
    categoria: 'comida',
    pergunta: 'Posso adoçar o café e o chá?',
    resposta: [
      'Açúcar não, em nenhuma semana.',
      'Na semana 3 o protocolo libera stevia e xilitol como adoçantes.',
      'Durante o período de jejum, o ideal é café e chá puros, sem nada.',
    ],
    termos: ['adocante', 'acucar', 'adocar', 'stevia', 'xilitol'],
  },
  {
    id: 'c-arroz',
    categoria: 'comida',
    pergunta: 'Posso comer arroz?',
    resposta: [
      'Depende da semana.',
      'Semana 1: pode, no almoço e no jantar (6 colheres de sopa por refeição).',
      'Semana 2: pode, mas só no almoço, e em porção menor (3 colheres de sopa).',
      'Semana 3: não. Nessa fase saem arroz, feijão, tapioca, macarrão, pão, batata, ervilha, grãos e amidos, porque o objetivo é entrar em cetose.',
    ],
    termos: ['arroz', 'carboidrato', 'feijao'],
  },
  {
    id: 'c-doces',
    categoria: 'comida',
    pergunta: 'Posso comer doce?',
    resposta: [
      'Açúcar está fora em todas as semanas.',
      'Mas a semana 1 traz dois doces low carb liberados: o picolé diurético de melancia e o brigadeiro energético com xilitol.',
      'Os dois podem até 3x na semana, sempre fora do período de jejum. As receitas estão na aba Receitas.',
    ],
    termos: ['doce', 'sobremesa', 'brigadeiro', 'picole'],
  },
  {
    id: 'c-agua-muita',
    categoria: 'comida',
    pergunta: 'Preciso beber toda aquela água mesmo?',
    resposta: [
      'A meta sobe a cada semana: 3 litros na primeira, 4 na segunda e 5 na terceira.',
      'O jeito de conseguir é distribuir ao longo do dia, não tentar compensar tudo de uma vez.',
      'Use o contador da aba Hoje: cada toque é um copo de 250 ml.',
      'Se você tem alguma condição renal ou cardíaca, confirme essa quantidade com o seu médico antes.',
    ],
    termos: ['agua', 'litros', 'beber muito'],
  },
  {
    id: 'c-alcool',
    categoria: 'comida',
    pergunta: 'Posso beber álcool?',
    resposta: [
      'Não, em nenhuma das três semanas. Bebida alcoólica está na lista do que não pode em todo o protocolo.',
    ],
    termos: ['alcool', 'cerveja', 'vinho', 'bebida'],
  },

  // ---------------- SAÚDE ----------------
  {
    id: 's-remedios',
    categoria: 'saude',
    pergunta: 'Tomo remédio de uso contínuo. Posso fazer o protocolo?',
    resposta: [
      'Essa é uma pergunta para o seu médico, porque depende do remédio e do horário em que você toma.',
      'Jejum prolongado pode interferir em algumas medicações, principalmente as que precisam ser tomadas com comida.',
      'Leve o protocolo na próxima consulta e confirme antes de começar.',
    ],
    termos: ['remedio', 'medicamento', 'uso continuo'],
  },
  {
    id: 's-diabetes',
    categoria: 'saude',
    pergunta: 'Tenho diabetes. Posso fazer jejum?',
    resposta: [
      'Quem tem diabetes precisa da liberação do médico antes de fazer qualquer protocolo de jejum.',
      'Jejum prolongado mexe diretamente na glicemia, e quem ajusta isso com segurança é quem acompanha o seu caso.',
      'Não comece por conta própria.',
    ],
    termos: ['diabetes', 'diabetica', 'glicemia', 'insulina'],
  },
  {
    id: 's-gravida',
    categoria: 'saude',
    pergunta: 'Estou grávida ou amamentando. Posso fazer?',
    resposta: [
      'Gravidez e amamentação não combinam com jejum prolongado nem com restrição alimentar sem acompanhamento.',
      'Converse com o seu obstetra antes de qualquer coisa. Nesse período, quem decide é ele.',
    ],
    termos: ['gravida', 'gravidez', 'amamentando', 'gestante'],
  },
  {
    id: 's-pressao',
    categoria: 'saude',
    pergunta: 'Tenho pressão alta ou baixa. Posso fazer?',
    resposta: [
      'Confirme com o seu médico antes de começar, principalmente se você usa medicação para pressão.',
      'Jejum e mudança grande de alimentação podem alterar a pressão, e isso merece acompanhamento.',
    ],
    termos: ['pressao alta', 'pressao baixa', 'hipertensao'],
  },
  {
    id: 's-idade',
    categoria: 'saude',
    pergunta: 'Tem restrição de idade?',
    resposta: [
      'O protocolo foi pensado para adultos.',
      'Crianças, adolescentes e idosos com condições de saúde devem ter avaliação médica antes de qualquer protocolo de jejum.',
    ],
    termos: ['idade', 'crianca', 'adolescente', 'idoso'],
  },
  {
    id: 's-transtorno-alimentar',
    categoria: 'saude',
    pergunta: 'Já tive transtorno alimentar. Posso fazer?',
    resposta: [
      'Nesse caso, converse antes com o profissional que acompanha ou acompanhou você.',
      'Protocolos de jejum e restrição podem ser gatilho para quem tem histórico de transtorno alimentar, e isso precisa ser avaliado por quem conhece a sua história.',
      'Sua segurança vem antes de qualquer resultado.',
    ],
    termos: ['transtorno alimentar', 'compulsao', 'anorexia', 'bulimia'],
  },

  // ---------------- RESULTADOS ----------------
  {
    id: 'res-quanto-emagrece',
    categoria: 'resultados',
    pergunta: 'Quanto vou emagrecer em 21 dias?',
    resposta: [
      'Não dá para prometer um número, e ninguém honesto vai te dar um.',
      'O resultado depende do seu ponto de partida, da sua constância, do sono, do estresse e da sua individualidade.',
      'O que o protocolo propõe é um caminho: limpar, reequilibrar e depois ativar a queima. Seguir os 21 dias inteiros é o que faz diferença.',
    ],
    termos: ['quanto emagrece', 'quantos quilos', 'perder peso'],
  },
  {
    id: 'res-quando-vejo',
    categoria: 'resultados',
    pergunta: 'Quando vou começar a ver diferença?',
    resposta: [
      'Muita gente relata menos inchaço e mais disposição já na primeira semana, que é a fase de limpeza.',
      'A queima de gordura mais intensa é o objetivo da terceira semana, quando o corpo entra em cetose.',
      'Cada corpo responde no seu tempo. Compare você com você, não com outra pessoa.',
    ],
    termos: ['quando vejo', 'quanto tempo', 'diferenca'],
  },
  {
    id: 'res-furei',
    categoria: 'resultados',
    pergunta: 'Furei o protocolo um dia. Perdi tudo?',
    resposta: [
      'Não perdeu nada. Um dia fora não apaga o que você construiu.',
      'Retome no dia seguinte, do ponto onde estava, sem tentar compensar comendo menos ou jejuando mais.',
      'Quem chega ao fim não é quem nunca falha, é quem volta no dia seguinte.',
    ],
    termos: ['furei', 'sai da dieta', 'errei', 'perdi tudo'],
  },
  {
    id: 'res-depois-21',
    categoria: 'resultados',
    pergunta: 'O que faço depois dos 21 dias?',
    resposta: [
      'Os hábitos que você construiu são o resultado mais duradouro: beber água, se movimentar de manhã, cortar ultraprocessado, respeitar uma janela de alimentação.',
      'Muita gente escolhe manter uma janela de jejum mais leve no dia a dia e repetir o ciclo completo de tempos em tempos.',
      'Se você quer um plano de manutenção personalizado, vale conversar com um nutricionista.',
    ],
    termos: ['depois', '21 dias', 'manutencao', 'terminar'],
  },

  // ---------------- APP ----------------
  {
    id: 'a-aulas',
    categoria: 'app',
    pergunta: 'Onde ficam as aulas e os treinos?',
    resposta: [
      'Na plataforma de aulas, cujo link foi enviado para o e-mail que você usou na compra.',
      'Procure na sua caixa de entrada por alpaclass. É lá que ficam os treinos, as meditações e as aulas do método.',
      'Se não encontrar, confira o spam e a aba de promoções, ou fale com o suporte que a gente reenvia.',
    ],
    termos: ['aulas', 'treinos', 'plataforma', 'alpaclass', 'acesso'],
  },
  {
    id: 'a-conta',
    categoria: 'app',
    pergunta: 'Preciso criar conta neste aplicativo?',
    resposta: [
      'Não. Não tem login nem senha: é só abrir e usar.',
      'Tudo que você marca fica guardado no próprio aparelho.',
    ],
    termos: ['conta', 'login', 'senha', 'cadastro'],
  },
  {
    id: 'a-dia-errado',
    categoria: 'app',
    pergunta: 'O aplicativo está mostrando o dia errado. Como ajusto?',
    resposta: [
      'O dia é contado a partir da data em que você abriu o aplicativo pela primeira vez.',
      'Se você começou o protocolo antes ou depois disso, dá para reiniciar a contagem: na aba Hoje, role até o fim e use a opção de recomeçar o programa.',
      'Reiniciar zera as marcações, mas coloca a contagem no dia certo.',
    ],
    termos: ['dia errado', 'contagem', 'reiniciar', 'data'],
  },
  {
    id: 'a-perco-dados',
    categoria: 'app',
    pergunta: 'Se eu limpar o navegador, perco meu progresso?',
    resposta: [
      'Sim. Como não existe conta, tudo fica salvo apenas neste aparelho.',
      'Limpar os dados do navegador ou trocar de celular apaga o histórico de marcações.',
      'É o preço de um aplicativo que não pede cadastro e não guarda nada seu na internet.',
    ],
    termos: ['perco dados', 'limpar', 'trocar celular', 'backup'],
  },
  {
    id: 'a-instalar',
    categoria: 'app',
    pergunta: 'Consigo deixar o aplicativo na tela do celular?',
    resposta: [
      'Consegue. No iPhone, abra no Safari, toque no ícone de compartilhar e escolha "Adicionar à Tela de Início".',
      'No Android, abra no Chrome, toque nos três pontinhos e escolha "Adicionar à tela inicial".',
      'Assim ele fica com ícone próprio, como qualquer outro aplicativo.',
    ],
    termos: ['instalar', 'tela inicial', 'atalho', 'icone'],
  },
];

export const TOTAL_PERGUNTAS = FAQ.length;

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Palavras vazias: aparecem em quase toda pergunta e não dizem nada sobre o
 * assunto. Sem isso, "qual a capital da França" casaria com qualquer pergunta
 * que comece com "qual".
 */
const VAZIAS = new Set([
  'qual', 'quais', 'quando', 'onde', 'como', 'quanto', 'quanta', 'quantos', 'quantas',
  'que', 'porque', 'por', 'para', 'pra', 'pro', 'com', 'sem', 'sobre', 'entre',
  'meu', 'minha', 'meus', 'minhas', 'seu', 'sua', 'seus', 'suas',
  'esse', 'essa', 'isso', 'este', 'esta', 'aquele', 'aquela',
  'uma', 'uns', 'umas', 'dos', 'das', 'nos', 'nas', 'aos',
  'mais', 'menos', 'muito', 'muita', 'tudo', 'nada', 'algum', 'alguma',
  'posso', 'pode', 'podem', 'preciso', 'precisa', 'tenho', 'tem', 'estou', 'esta',
  'sou', 'ser', 'ter', 'fazer', 'faco', 'faz', 'vou', 'vai', 'quero', 'queria',
  'ainda', 'agora', 'depois', 'antes', 'sempre', 'nunca', 'entao',
  'nao', 'sim', 'ola', 'oi', 'voce', 'eu', 'ele', 'ela', 'mesmo', 'cada',
]);

export interface Acerto {
  item: PerguntaFaq;
  pontos: number;
}

export function buscarComPontos(termo: string): Acerto[] {
  const alvo = normalizar(termo.trim());
  if (alvo.length < 2) return [];

  const palavras = alvo.split(/\s+/).filter((p) => p.length > 2 && !VAZIAS.has(p));
  if (palavras.length === 0) return [];

  return FAQ.map((item) => {
    const titulo = normalizar(item.pergunta);
    const extras = normalizar((item.termos ?? []).join(' '));
    const corpo = normalizar(item.resposta.join(' '));

    let pontos = 0;
    for (const palavra of palavras) {
      if (titulo.includes(palavra)) pontos += 10;
      if (extras.includes(palavra)) pontos += 7;
      if (corpo.includes(palavra)) pontos += 1;
    }
    if (titulo.includes(alvo)) pontos += 20;

    return { item, pontos };
  })
    .filter((a) => a.pontos > 0)
    .sort((a, b) => b.pontos - a.pontos);
}

export function perguntasDaCategoria(categoria: CategoriaId): PerguntaFaq[] {
  return FAQ.filter((p) => p.categoria === categoria);
}

/* ================== MOTOR DE RESPOSTA DO CHAT ================== */

export type RespostaChat =
  | { tipo: 'resposta'; item: PerguntaFaq }
  | { tipo: 'sugestoes'; texto: string; opcoes: PerguntaFaq[] }
  | { tipo: 'social'; paragrafos: string[]; opcoes: PerguntaFaq[] }
  | { tipo: 'nao_entendi'; paragrafos: string[]; opcoes: PerguntaFaq[] };

const SAUDACOES = ['oi', 'ola', 'ei', 'bom dia', 'boa tarde', 'boa noite', 'tudo bem'];
const AGRADECIMENTOS = ['obrigada', 'obrigado', 'valeu', 'brigada', 'brigado', 'vlw'];
const DESPEDIDAS = ['tchau', 'ate mais', 'ate logo', 'falou'];

const SUGESTOES_PADRAO = ['j-o-que-quebra', 'j-atrasei', 'c-trocar-alimento', 'res-furei'];

function porIds(ids: string[]): PerguntaFaq[] {
  return ids
    .map((id) => FAQ.find((p) => p.id === id))
    .filter((p): p is PerguntaFaq => Boolean(p));
}

export function sugestoesIniciais(): PerguntaFaq[] {
  return porIds([
    'j-o-que-quebra',
    'j-atrasei',
    'r-nao-consigo-correr',
    'c-trocar-alimento',
    'res-furei',
    'a-aulas',
  ]);
}

export function responderPergunta(entrada: string): RespostaChat {
  const texto = normalizar(entrada.trim());

  if (texto.length === 0) {
    return {
      tipo: 'nao_entendi',
      paragrafos: ['Me conta o que você quer saber que eu procuro aqui.'],
      opcoes: porIds(SUGESTOES_PADRAO),
    };
  }

  if (SAUDACOES.includes(texto)) {
    return {
      tipo: 'social',
      paragrafos: [
        'Oi! Que bom te ver por aqui.',
        'Pode me perguntar sobre o jejum, a rotina do dia, a alimentação ou o aplicativo. Escreva do seu jeito.',
      ],
      opcoes: porIds(SUGESTOES_PADRAO),
    };
  }

  if (AGRADECIMENTOS.some((a) => texto === a || texto.startsWith(a + ' '))) {
    return {
      tipo: 'social',
      paragrafos: ['Imagina, estou aqui para isso.', 'Se pintar outra dúvida, é só escrever.'],
      opcoes: [],
    };
  }

  if (DESPEDIDAS.includes(texto)) {
    return {
      tipo: 'social',
      paragrafos: ['Até mais! Não esquece da sua rotina de hoje.'],
      opcoes: [],
    };
  }

  const acertos = buscarComPontos(entrada);

  if (acertos.length === 0 || acertos[0].pontos < 7) {
    return {
      tipo: 'nao_entendi',
      paragrafos: [
        'Essa eu não sei responder por aqui.',
        'Eu ajudo com o jejum, a rotina do protocolo, a alimentação e o aplicativo. Se for algo específico do seu caso ou da sua saúde, a nossa equipe te atende no WhatsApp.',
      ],
      opcoes: porIds(SUGESTOES_PADRAO),
    };
  }

  const melhor = acertos[0];
  const segundo = acertos[1];
  const isolado = !segundo || melhor.pontos >= segundo.pontos + 8;

  if (isolado) {
    return { tipo: 'resposta', item: melhor.item };
  }

  return {
    tipo: 'sugestoes',
    texto: 'Acho que entendi. Sobre qual desses você quer saber?',
    opcoes: acertos.slice(0, 4).map((a) => a.item),
  };
}
