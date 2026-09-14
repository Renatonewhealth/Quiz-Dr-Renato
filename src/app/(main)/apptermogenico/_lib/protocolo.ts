import type { Semana, SemanaId } from './types';

/**
 * As 3 semanas do Jejum Termogênico do Dr. Renato Silveira, transcritas
 * dos PDFs oficiais do protocolo (PROTOCOLO_01, 02 e 03).
 */
export const SEMANAS: Semana[] = [
  {
    id: 1,
    nome: 'Limpeza Termogênica',
    subtitulo: 'Semana 1 · dias 1 a 7',
    explicacao: [
      'Ao longo da vida a gente vai acumulando glúten, leite e derivados, industrializados, corantes e aromatizantes. Isso vira excesso, inflamação, toxina guardada.',
      'É como um filtro de água: com o tempo ele junta resíduo, e a água que sai já não é limpa. O filtro só volta a funcionar depois que é lavado.',
      'Essa semana é isso: limpar e desintoxicar, para deixar o seu corpo pronto para aproveitar o jejum termogênico de verdade.',
    ],
    jejumHoras: 13,
    jejumInicio: 19,
    jejumFim: 8,
    aguaLitros: 3,
    tarefas: [
      {
        id: 's1-shot',
        momento: 'jejum',
        titulo: 'Shot Ativador de Energia',
        descricao: 'Primeira coisa do dia, ainda em jejum. Não quebra o jejum.',
        horario: 'Ao acordar',
        receitaId: 'shot-energia',
      },
      {
        id: 's1-caminhada',
        momento: 'jejum',
        titulo: 'Caminhada Termogênica (20 min)',
        descricao:
          'Caminhe 2 minutos e corra 1 minuto, alternando pelos 20 minutos. Puxe o ar pelos pulmões e solte pelo nariz. Se não puder correr, caminhar os 20 minutos também traz resultado.',
        horario: 'Logo após o shot',
      },
      {
        id: 's1-coffee',
        momento: 'jejum',
        titulo: 'Super Coffee 3.0',
        descricao: 'Ao terminar a caminhada, ainda em jejum.',
        receitaId: 'super-coffee',
      },
      {
        id: 's1-quebra',
        momento: 'manha',
        titulo: 'Quebrar o jejum com o suco detox',
        descricao: 'A primeira refeição do dia é o suco detox.',
        horario: '08:00',
        receitaId: 'suco-detox-s1',
      },
      {
        id: 's1-almoco',
        momento: 'manha',
        titulo: 'Almoço',
        descricao:
          'Arroz (6 col. sopa), feijão (4 col. sopa), carne (150 g), legumes e folhas à vontade.',
      },
      {
        id: 's1-cha-almoco',
        momento: 'manha',
        titulo: 'Chá Ativador de Enzimas',
        descricao: '30 minutos depois do almoço.',
        receitaId: 'cha-enzimas',
      },
      {
        id: 's1-lanche',
        momento: 'tarde',
        titulo: 'Lanche da tarde',
        descricao: '2 ovos mexidos com 50 g de bacon (o bacon é opcional).',
      },
      {
        id: 's1-ginger',
        momento: 'tarde',
        titulo: 'Thermogenic Ginger',
        descricao: 'No meio ou no fim da tarde.',
        receitaId: 'thermogenic-ginger',
      },
      {
        id: 's1-treino',
        momento: 'tarde',
        titulo: 'Treino do dia',
        descricao:
          'Escolha um vídeo na plataforma do curso e faça 1x ao dia, em qualquer horário.',
      },
      {
        id: 's1-jantar',
        momento: 'noite',
        titulo: 'Jantar',
        descricao: 'O mesmo do almoço. Última refeição do dia.',
        horario: 'Até 19:00',
      },
      {
        id: 's1-cha-jantar',
        momento: 'noite',
        titulo: 'Chá Ativador de Enzimas',
        descricao: '30 minutos depois do jantar.',
        receitaId: 'cha-enzimas',
      },
      {
        id: 's1-cha-noite',
        momento: 'noite',
        titulo: 'Chá noturno',
        descricao: 'Antes de dormir, sempre sem açúcar.',
        receitaId: 'cha-noturno',
      },
    ],
    pode: [
      'Arroz',
      'Queijos maturados, sem exagero',
      'Trocar um alimento do cardápio por outro do mesmo grupo, desde que sem glúten, açúcar ou refinados',
    ],
    naoPode: [
      'Refinados',
      'Glúten',
      'Produtos industrializados',
      'Passar fome',
      'Bebida alcoólica',
      'Açúcar',
      'Farinhas',
    ],
    desafios: [
      'Beber 3 litros de água ao longo do dia',
      'Thermogenic Ginger todos os dias (500 ml)',
      'Exercício ao acordar: caminhada termogênica',
      'Chá Ativador de Enzimas depois do almoço e do jantar',
      'Super Coffee 3.0 uma vez ao dia',
    ],
    cardapio: [
      { refeicao: 'Ao quebrar o jejum', horario: '08:00', descricao: 'Suco detox' },
      {
        refeicao: 'Almoço',
        descricao:
          'Arroz (6 col. sopa, ~180 g) + feijão (4 col. sopa, ~110 g) + carne (150 g) + legumes (brócolis, couve-flor, cenoura cozida, rabanete, abobrinha) + folhas à vontade',
      },
      { refeicao: 'Depois do almoço', descricao: 'Chá Ativador de Enzimas, 30 min depois' },
      { refeicao: 'Lanche da tarde', descricao: '2 ovos mexidos com 50 g de bacon (opcional)' },
      { refeicao: 'Tarde', descricao: 'Thermogenic Ginger' },
      { refeicao: 'Jantar', horario: 'Até 19:00', descricao: 'O mesmo do almoço' },
      { refeicao: 'Depois do jantar', descricao: 'Chá Ativador de Enzimas, 30 min depois' },
      { refeicao: 'Antes de dormir', descricao: 'Chá noturno, sem açúcar' },
    ],
    autocuidados: [
      {
        titulo: 'Vá a um lugar diferente',
        texto:
          'Pode ser restaurante, parque, ruas novas, lojas. Mas vá a um lugar onde nunca esteve. Observe cores, pessoas, aromas, paisagens. Respire fundo. Planeje um passeio dentro da sua própria cidade.',
      },
      {
        titulo: 'Adote uma plantinha',
        texto:
          'E se o seu mundo ficasse mais verde? Dedique-se a conhecê-la, descubra as particularidades dela, cuide. É um presente que você dá a você mesma.',
      },
    ],
  },

  {
    id: 2,
    nome: 'Revolução Metabólica',
    subtitulo: 'Semana 2 · dias 8 a 14',
    explicacao: [
      'Você venceu a primeira etapa. Agora é hora de blindar os hábitos novos, com mais potência e mais foco.',
      'Com o corpo já em processo de limpeza, ele entra na Revolução Metabólica: desenvolve a capacidade fisiológica de equilibrar a produção de hormônios, acelera o metabolismo e ativa a queima de gordura.',
      'A sua produção natural de colágeno também aumenta nessa fase.',
    ],
    jejumHoras: 15,
    jejumInicio: 19,
    jejumFim: 10,
    aguaLitros: 4,
    tarefas: [
      {
        id: 's2-emocional',
        momento: 'jejum',
        titulo: 'Momento Gestão Emocional',
        descricao:
          'Leia: "Lembre sempre que a sua vontade de triunfar é mais importante do que qualquer outra coisa." (Abraham Lincoln). Respire fundo, puxando o ar pelo nariz e soltando pela boca. Escreva a frase em um papel e cole em um lugar visível. Compartilhe com alguém.',
        horario: 'Ao acordar',
      },
      {
        id: 's2-shot',
        momento: 'jejum',
        titulo: 'Shot Revolution',
        descricao: 'Depois do momento de gestão emocional. Não quebra o jejum.',
        receitaId: 'shot-revolution',
      },
      {
        id: 's2-circuito',
        momento: 'jejum',
        titulo: 'Circuito Metabólico (20 min)',
        descricao:
          '10 abdominais, depois 5 minutos de caminhada intensa. Repita o circuito até completar 20 minutos. Se não conseguir, caminhe os 20 minutos em ritmo rápido.',
      },
      {
        id: 's2-tonico',
        momento: 'jejum',
        titulo: 'Tônico de Blindagem Imunológica',
        descricao: 'Depois do circuito. Lembre de preparar na noite anterior.',
        receitaId: 'tonico-blindagem',
      },
      {
        id: 's2-quebra',
        momento: 'manha',
        titulo: 'Quebrar o jejum com o suco detox',
        descricao: 'Primeira refeição do dia.',
        horario: '10:00',
        receitaId: 'suco-detox-s2',
      },
      {
        id: 's2-almoco',
        momento: 'manha',
        titulo: 'Almoço',
        descricao:
          'Arroz (3 col. sopa), feijão (4 col. sopa), carne (150 g), legumes e folhas à vontade.',
      },
      {
        id: 's2-chatime',
        momento: 'tarde',
        titulo: 'CháTime',
        descricao: '1 hora depois do almoço.',
        receitaId: 'chatime',
      },
      {
        id: 's2-lanche',
        momento: 'tarde',
        titulo: 'Lanche da tarde',
        descricao:
          '½ mamão papaia com 1 colher de chia, ou 1 banana com 1 colher de sopa de aveia. Com muita fome, pode as duas opções.',
      },
      {
        id: 's2-meditacao',
        momento: 'tarde',
        titulo: 'Meditação',
        descricao: 'Meditação com a Coach Uiara Medeiros, na plataforma do curso.',
      },
      {
        id: 's2-treino',
        momento: 'tarde',
        titulo: 'Treino do dia',
        descricao: 'Escolha um vídeo na plataforma e faça 1x ao dia.',
      },
      {
        id: 's2-jantar',
        momento: 'noite',
        titulo: 'Jantar',
        descricao: 'O mesmo do almoço, porém sem o arroz.',
        horario: 'Até 19:00',
      },
      {
        id: 's2-cha-noite',
        momento: 'noite',
        titulo: 'Chá noturno',
        descricao: 'Antes de dormir, sempre sem açúcar.',
        receitaId: 'cha-noturno',
      },
      {
        id: 's2-preparar-tonico',
        momento: 'noite',
        titulo: 'Preparar o tônico de amanhã',
        descricao:
          'Água com 1 dente de alho, coberto com um pires, descansando a noite toda.',
        receitaId: 'tonico-blindagem',
      },
    ],
    pode: [
      'Arroz, apenas no almoço',
      'Queijos maturados, sem exagero',
      'Trocar um alimento do cardápio por outro do mesmo grupo, desde que sem glúten, açúcar ou refinados',
    ],
    naoPode: [
      'Refinados',
      'Glúten',
      'Produtos industrializados',
      'Bebida alcoólica',
      'Açúcar',
      'Farinhas',
    ],
    desafios: [
      'Escolher 2 dias da semana e trocar o jejum de 15h pelo de 18h',
      'Beber 4 litros de água ao longo do dia',
      'Tônico da Blindagem Imunológica todos os dias',
      'Meditação com a Coach Uiara Medeiros',
      'Circuito Metabólico como atividade fixa',
      'CháTime depois do almoço',
      'Momento Gestão Emocional ao acordar',
    ],
    cardapio: [
      { refeicao: 'Ao quebrar o jejum', horario: '10:00', descricao: 'Suco detox' },
      {
        refeicao: 'Almoço',
        descricao:
          'Arroz (3 col. sopa, ~60 g) + feijão (4 col. sopa, ~110 g) + carne (150 g) + legumes + folhas à vontade',
      },
      { refeicao: 'Depois do almoço', descricao: 'CháTime, 1 hora depois' },
      {
        refeicao: 'Lanche da tarde',
        descricao: '½ mamão papaia com chia, ou banana com aveia',
      },
      { refeicao: 'Jantar', horario: 'Até 19:00', descricao: 'O mesmo do almoço, sem o arroz' },
      { refeicao: 'Antes de dormir', descricao: 'Chá noturno, sem açúcar' },
    ],
    autocuidados: [
      {
        titulo: 'Alinhe o que você consome',
        texto:
          'O que você assiste? O que tem lido? Quem segue no Instagram? Tire da sua vida todo conteúdo que não te acrescenta algo bom. Seja criteriosa com isso.',
      },
      {
        titulo: 'Olhe para a sua beleza',
        texto:
          'Aprenda a focar na saúde. Coma bem, movimente-se, crie condicionamento, tome sol com filtro. Olhe o quanto o seu corpo faz por você, o quanto ele te carrega. Faça as pazes com o espelho.',
      },
    ],
  },

  {
    id: 3,
    nome: 'Queima Metabólica',
    subtitulo: 'Semana 3 · dias 15 a 21',
    explicacao: [
      'Chegou a fase mais esperada: agora o seu corpo passa a usar a própria gordura como fonte de energia.',
      'Nesta semana a glicose cai bastante, porque o carboidrato quase sai do cardápio. Sem glicose disponível, o corpo entra em cetose e busca energia na gordura.',
      'Associado ao jejum termogênico, esse processo fica ainda mais potente. É a semana mais intensa: seja fiel ao protocolo.',
    ],
    jejumHoras: 17,
    jejumInicio: 18,
    jejumFim: 11,
    aguaLitros: 5,
    tarefas: [
      {
        id: 's3-selagem',
        momento: 'jejum',
        titulo: 'Selagem Emocional',
        descricao:
          'Assista ao vídeo do dia (lista na aba Protocolo). São vídeos curtos, de 4 a 9 minutos.',
        horario: 'Ao acordar',
      },
      {
        id: 's3-shot',
        momento: 'jejum',
        titulo: 'Shot Cetogênico',
        descricao: 'Depois da selagem emocional. Não quebra o jejum.',
        receitaId: 'shot-cetogenico',
      },
      {
        id: 's3-circuito',
        momento: 'jejum',
        titulo: 'Circuito Metabólico Fase 2 (30 min)',
        descricao:
          '20 abdominais, 3 minutos de caminhada intensa e 1 minuto correndo. Repita o circuito até completar 30 minutos. Se não conseguir, caminhe 20 minutos em ritmo rápido.',
      },
      {
        id: 's3-tonico',
        momento: 'jejum',
        titulo: 'Tônico de Blindagem Imunológica',
        descricao: 'Depois do circuito. Não quebra o jejum.',
        receitaId: 'tonico-blindagem',
      },
      {
        id: 's3-quebra',
        momento: 'manha',
        titulo: 'Quebrar o jejum com o suco detox',
        descricao: 'Primeira refeição do dia.',
        horario: '11:00',
        receitaId: 'suco-detox-s3',
      },
      {
        id: 's3-almoco',
        momento: 'manha',
        titulo: 'Almoço',
        descricao: 'Carne (150 g) + legumes + folhas. Sem arroz e sem feijão.',
        horario: '13:00',
      },
      {
        id: 's3-lanche',
        momento: 'tarde',
        titulo: 'Lanche da tarde',
        descricao:
          '2 ovos mexidos com 2 fatias finas de bacon, ou 1 porção de fruta permitida com mix de castanhas.',
        horario: '15:00',
      },
      {
        id: 's3-treino1',
        momento: 'tarde',
        titulo: 'Treino (1º do dia)',
        descricao: 'Esta semana são 2 treinos por dia. Escolha um vídeo na plataforma.',
      },
      {
        id: 's3-treino2',
        momento: 'tarde',
        titulo: 'Treino (2º do dia)',
        descricao: 'Segundo treino do dia. A semana é mais intensa mesmo.',
      },
      {
        id: 's3-jantar',
        momento: 'noite',
        titulo: 'Jantar',
        descricao: 'O mesmo do almoço. Última refeição do dia.',
        horario: '18:00',
      },
      {
        id: 's3-cha-noite',
        momento: 'noite',
        titulo: 'Chá noturno',
        descricao: 'Camomila, hortelã, melissa ou erva-cidreira. Sempre sem açúcar.',
        receitaId: 'cha-noturno',
      },
      {
        id: 's3-preparar-tonico',
        momento: 'noite',
        titulo: 'Preparar o tônico de amanhã',
        descricao: 'Água com 1 dente de alho, descansando a noite toda.',
        receitaId: 'tonico-blindagem',
      },
    ],
    pode: [
      'Carnes, ovos, azeite e cogumelos',
      'Queijos maturados',
      'Oleaginosas: amêndoas, castanhas, nozes',
      'Frutas pouco doces: abacate, coco, frutas vermelhas, kiwi, limão e maracujá',
      'Trocar um alimento por outro do mesmo grupo, sem glúten, açúcar ou refinados',
    ],
    naoPode: [
      'Refinados',
      'Glúten',
      'Produtos industrializados',
      'Bebida alcoólica',
      'Açúcar',
      'Farinhas, nem mesmo as sem glúten',
      'Arroz, tapioca, macarrão, pão, feijão, batata, ervilha, grãos e amidos',
    ],
    desafios: [
      'Escolher 1 dia da semana e trocar o jejum de 17h pelo de 24h',
      'Beber 5 litros de água ao longo do dia',
      'Tônico da Blindagem Imunológica (ele continua)',
      'Meditação com a Coach Uiara Medeiros',
      'Circuito Metabólico Fase 2',
      'Selagem Emocional todos os dias',
    ],
    cardapio: [
      { refeicao: 'Ao quebrar o jejum', horario: '11:00', descricao: 'Suco detox' },
      {
        refeicao: 'Almoço',
        horario: '13:00',
        descricao:
          'Carne (150 g) + legumes (brócolis, couve-flor, rabanete, abobrinha) + folhas',
      },
      {
        refeicao: 'Lanche da tarde',
        horario: '15:00',
        descricao: '2 ovos mexidos com bacon, ou fruta permitida com mix de castanhas',
      },
      { refeicao: 'Jantar', horario: '18:00', descricao: 'O mesmo do almoço' },
      { refeicao: 'Antes de dormir', descricao: 'Chá noturno, sem açúcar' },
    ],
    autocuidados: [
      {
        titulo: 'Abandone um velho hábito para sempre',
        texto:
          'Escolha um e elimine da sua vida a partir de agora. Faça sem pensar muito. Apenas foque: eu me amo e mereço o melhor, por isso não preciso mais desse hábito.',
      },
      {
        titulo: 'Medite',
        texto:
          'Não é só o corpo que merece um tempinho só para ele. A sua mente também precisa estar saudável para enfrentar os desafios do dia a dia. Cuide das suas emoções.',
      },
    ],
  },
];

/** Vídeos curtos da Selagem Emocional (semana 3), um por dia. */
export const SELAGEM_EMOCIONAL = [
  { dia: 'Dia 1', titulo: 'O poder do hábito', duracao: '6 min', url: 'https://youtu.be/9BtrLf6PfYY' },
  { dia: 'Dia 2', titulo: 'O Monge e o Executivo', duracao: '7 min', url: 'https://youtu.be/Uz3jcUol2P4' },
  { dia: 'Dia 3', titulo: 'Super Cérebro', duracao: '8 min', url: 'https://youtu.be/tkSJjZzIl30' },
  { dia: 'Dia 4', titulo: 'O poder do Agora', duracao: '8 min', url: 'https://youtu.be/LJjp3bCaIn0' },
  { dia: 'Dia 5', titulo: 'Como acabar com a procrastinação', duracao: '4 min', url: 'https://youtu.be/UYdC0yjZOZc' },
  { dia: 'Dia 6', titulo: 'O milagre da manhã', duracao: '9 min', url: 'https://youtu.be/ihB3_GWSKuk' },
  { dia: 'Dia 7', titulo: 'A mágica de pensar grande', duracao: '5 min', url: 'https://youtu.be/4YrMuzl3Xko' },
  { dia: 'Extra', titulo: 'O poder da autorresponsabilidade', duracao: '6 min', url: 'https://youtu.be/-E6_p5gZVLo' },
];

/** Alimentos liberados na semana 3 (fase de cetose). */
export const ALIMENTOS_PERMITIDOS = [
  { grupo: 'Carnes', itens: 'Aves, peixe e carne de vaca' },
  {
    grupo: 'Vegetais',
    itens:
      'Abobrinha, brócolis, couve-flor, cenoura, beterraba, rabanete, berinjela, chuchu, quiabo, cebola, tomate',
  },
  { grupo: 'Folhas verdes', itens: 'Rúcula, agrião, espinafre, couve' },
  {
    grupo: 'Oleaginosas',
    itens:
      'Amendoim, castanha de caju, castanha do Pará, amêndoas, macadâmia, avelã, semente de girassol',
  },
  {
    grupo: 'Frutas',
    itens: 'Coco, abacate, framboesa, mirtilo, amora, limão, morango, kiwi, maracujá',
  },
  { grupo: 'Adoçantes', itens: 'Stevia e xilitol' },
  { grupo: 'Gorduras', itens: 'Óleo de coco, azeite, óleo de abacate' },
  { grupo: 'Laticínios', itens: 'Manteiga ghee e queijo maturado' },
];

/** Como fazer o jejum de 24h (desafio da semana 3). */
export const JEJUM_24H = {
  titulo: 'Como fazer o dia de jejum de 24 horas',
  passos: [
    'Você faz apenas 1 refeição no dia: o almoço, por volta de meio-dia.',
    'Nesse almoço pode comer folhas à vontade e bastante carne com gordura, como picanha.',
    'Também pode incluir qualquer alimento da lista de permitidos.',
    'Beba 6 litros de água nesse período.',
    'Café e chás sem açúcar são permitidos durante o jejum.',
    'O tônico da blindagem imunológica também pode ser tomado no período de jejum.',
    'O jejum se encerra no dia seguinte, ao meio-dia.',
  ],
};

/** Semana correspondente a um dia do protocolo (1-21). */
export function semanaDoDia(dia: number): Semana {
  if (dia <= 7) return SEMANAS[0];
  if (dia <= 14) return SEMANAS[1];
  return SEMANAS[2];
}

export function semanaPorId(id: SemanaId): Semana {
  return SEMANAS[id - 1];
}

/** Total de dias do programa. */
export const TOTAL_DIAS = 21;
