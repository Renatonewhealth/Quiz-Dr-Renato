import type { Receita } from './types';

/**
 * Todas as preparações do protocolo, transcritas dos 3 PDFs do Jejum
 * Termogênico do Dr. Renato Silveira.
 */
export const RECEITAS: Receita[] = [
  // ---------------- SEMANA 1 ----------------
  {
    id: 'shot-energia',
    nome: 'Shot Ativador de Energia',
    categoria: 'shot',
    semanas: [1],
    quando: 'Ao acordar, ainda em jejum',
    ingredientes: [
      '50 ml de água fria',
      '5 gotas de própolis',
      '½ colher de chá de canela',
      '½ colher de chá de cúrcuma',
    ],
    preparo: ['Misture tudo em um copo e beba.'],
    observacao:
      'Não quebra o jejum. Se faltar algum ingrediente, pode fazer sem ele, mas providencie para o dia seguinte.',
  },
  {
    id: 'super-coffee',
    nome: 'Super Coffee 3.0',
    categoria: 'bebida',
    semanas: [1],
    quando: 'Logo após a caminhada, ainda em jejum',
    ingredientes: [
      '50 ml de café expresso',
      '½ colher de café de óleo de coco',
      '2 gotas de azeite de oliva',
    ],
    preparo: ['Misture no café ainda quente e beba.'],
    observacao:
      'As gorduras boas aumentam a saciedade e seguram a fome até a primeira refeição.',
  },
  {
    id: 'thermogenic-ginger',
    nome: 'Thermogenic Ginger',
    categoria: 'bebida',
    semanas: [1],
    quando: 'Uma vez ao dia, no período da tarde',
    ingredientes: [
      '500 ml de água fria',
      '2 folhas de manjericão ou 5 folhas de hortelã',
      '1 rodela fina de gengibre descascado (tamanho de uma moeda)',
      'Gelo a gosto',
    ],
    preparo: ['Bata tudo no liquidificador.', 'Tome em seguida, bem gelado.'],
    observacao: 'Ajuda a reduzir o apetite e a absorção de gorduras.',
  },
  {
    id: 'cha-enzimas',
    nome: 'Chá Ativador de Enzimas',
    categoria: 'cha',
    semanas: [1],
    quando: '30 minutos depois do almoço e do jantar',
    ingredientes: ['150 ml de água', 'Cerca de 10 folhas de hortelã'],
    preparo: [
      'Ferva a água.',
      'Assim que levantar fervura, desligue o fogo e coloque as folhas de hortelã.',
      'Deixe descansar 5 minutos e beba.',
    ],
  },
  {
    id: 'suco-detox-s1',
    nome: 'Suco Detox da Semana 1',
    categoria: 'bebida',
    semanas: [1],
    quando: 'Às 8h, ao quebrar o jejum',
    ingredientes: [
      '100 ml de água fria',
      '2 folhas de couve',
      '3 folhas de hortelã',
      '¼ de maçã',
      '1 rodela de gengibre (tamanho de uma moeda)',
    ],
    preparo: ['Bata tudo no liquidificador.', 'Tome gelado.'],
    observacao:
      'Durante a semana dá para variar: trocar a couve por agrião ou espinafre, mudar a fruta, acrescentar salsa ou salsão.',
  },
  {
    id: 'picole-diuretico',
    nome: 'Picolé Diurético',
    categoria: 'doce',
    semanas: [1],
    quando: 'Até 3x na semana, fora do período de jejum',
    ingredientes: ['Polpa de melancia (pode ser com semente)', '3 folhas de hortelã'],
    preparo: [
      'Bata a melancia com a hortelã no liquidificador.',
      'Distribua em forminhas de picolé e leve ao freezer.',
    ],
  },
  {
    id: 'brigadeiro-energetico',
    nome: 'Brigadeiro Energético',
    categoria: 'doce',
    semanas: [1],
    quando: '2 brigadeiros, até 3x na semana, fora do jejum',
    ingredientes: [
      '½ xícara de chá de água',
      '1 xícara de chá de leite de coco em pó',
      '½ xícara de chá de cacau',
      '4 colheres de xilitol',
      '2 colheres de sopa de óleo de coco',
    ],
    preparo: [
      'Bata todos os ingredientes no liquidificador.',
      'Leve à panela e mexa até engrossar.',
    ],
  },

  // ---------------- SEMANA 2 ----------------
  {
    id: 'shot-revolution',
    nome: 'Shot Revolution',
    categoria: 'shot',
    semanas: [2],
    quando: 'Ao acordar, depois do Momento Gestão Emocional',
    ingredientes: [
      '30 ml de água fria',
      '3 gotas de própolis',
      '½ colher de chá de vinagre de maçã',
      '½ colher de chá de cúrcuma',
      '½ colher de sobremesa de limão',
    ],
    preparo: ['Misture tudo e beba.'],
    observacao: 'Não quebra o jejum.',
  },
  {
    id: 'tonico-blindagem',
    nome: 'Tônico de Blindagem Imunológica',
    categoria: 'tonico',
    semanas: [2, 3],
    quando: 'De manhã, depois do circuito. Preparado na véspera.',
    ingredientes: [
      '100 ml de água fria filtrada',
      '1 dente de alho descascado',
      '4 a 5 gotas de própolis (só na hora de beber)',
      '½ colher de chá de limão (semana 2)',
    ],
    preparo: [
      'Na noite anterior: coloque a água e o dente de alho em um copo.',
      'Cubra com um pires e deixe descansar a noite toda.',
      'De manhã: acrescente o própolis (e o limão, na semana 2) e beba.',
    ],
    observacao:
      'Precisa ser preparado na véspera. Não quebra o jejum, então pode ser tomado durante o período de jejum.',
  },
  {
    id: 'chatime',
    nome: 'CháTime',
    categoria: 'cha',
    semanas: [2],
    quando: '1 hora depois do almoço',
    ingredientes: ['150 ml de água', '1 colher de chá de erva doce'],
    preparo: [
      'Ferva a água em fogo médio.',
      'Quando começar a ferver, desligue e adicione a erva doce.',
      'Misture, deixe descansar 10 minutos, coe e sirva.',
    ],
  },
  {
    id: 'suco-detox-s2',
    nome: 'Suco Detox da Semana 2',
    categoria: 'bebida',
    semanas: [2],
    quando: 'Às 10h, ao quebrar o jejum',
    ingredientes: [
      '200 ml de água fria',
      '2 rodelas de pepino japonês',
      'Suco de ½ limão',
      '1 colher de chá de linhaça',
      '1 ramo de salsa',
      '½ cenoura',
      '1 folha de couve',
    ],
    preparo: ['Bata tudo no liquidificador.', 'Tome gelado.'],
    observacao:
      'Dá para variar trocando ingredientes por outros do mesmo grupo.',
  },

  // ---------------- SEMANA 3 ----------------
  {
    id: 'shot-cetogenico',
    nome: 'Shot Cetogênico',
    categoria: 'shot',
    semanas: [3],
    quando: 'Ao acordar, depois da Selagem Emocional',
    ingredientes: [
      '50 ml de água fria',
      '3 gotas de própolis',
      '½ colher de chá de canela',
      '½ colher de sobremesa de limão',
      '5 gotas de azeite extra virgem',
    ],
    preparo: ['Misture tudo e beba.'],
    observacao: 'Não quebra o jejum.',
  },
  {
    id: 'suco-detox-s3',
    nome: 'Suco Detox da Semana 3',
    categoria: 'bebida',
    semanas: [3],
    quando: 'Às 11h, ao quebrar o jejum',
    ingredientes: [
      '200 ml de água fria',
      '2 folhas de couve',
      '1 limão',
      '1 ramo de salsa',
      '1 colher de café de óleo de coco',
    ],
    preparo: ['Bata tudo no liquidificador.', 'Pode coar ou não.'],
  },
  {
    id: 'cha-noturno',
    nome: 'Chá Noturno',
    categoria: 'cha',
    semanas: [1, 2, 3],
    quando: 'Antes de dormir, todos os dias',
    ingredientes: [
      'Camomila, hortelã, melissa ou erva-cidreira',
      'Pode ser in natura ou de saquinho',
    ],
    preparo: ['Prepare como preferir.', 'Sempre sem açúcar.'],
    observacao: 'Cada dia você pode escolher um chá diferente.',
  },
];

export function receitaPorId(id: string): Receita | undefined {
  return RECEITAS.find((r) => r.id === id);
}

export function receitasDaSemana(semana: 1 | 2 | 3): Receita[] {
  return RECEITAS.filter((r) => r.semanas.includes(semana));
}
