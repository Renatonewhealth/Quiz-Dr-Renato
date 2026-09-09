/**
 * Conteudo estatico do app Korean Kit: rotina, bonus de skincare,
 * massagens faciais e sugestoes de pergunta para o chat.
 *
 * Tudo em pt-BR, tom acolhedor e direto. Sem promessa medica.
 */

import type { Periodo } from './types';

/** Um passo da rotina diaria do Korean Kit. */
export interface PassoRotina {
  periodo: Periodo;
  titulo: string;
  descricao: string;
  dicas: string[];
  horarioSugerido: string;
}

/** Um passo dentro de um bloco do Protocolo Skin Care Perfeito. */
export interface PassoSkincare {
  nome: string;
  comoFazer: string;
  porque: string;
}

/** Um bloco (manha ou noite) do Protocolo Skin Care Perfeito. */
export interface BlocoSkincare {
  titulo: string;
  subtitulo: string;
  passos: PassoSkincare[];
}

/** Uma tecnica de massagem facial. */
export interface TecnicaMassagem {
  nome: string;
  duracao: string;
  comoFazer: string[];
  beneficio: string;
}

/**
 * A ROTINA. So dois passos por dia, de proposito:
 * manha = tomar o po; noite = lavar o rosto e aplicar o serum.
 */
export const PASSOS_ROTINA: PassoRotina[] = [
  {
    periodo: 'manha',
    titulo: 'Tomar o Regenera Skin',
    descricao:
      'Dissolva 1 dose do pó em um copo de água (cerca de 200 ml), mexa bem e beba. É o seu passo de dentro para fora.',
    horarioSugerido: 'Ao acordar, antes ou junto do café da manhã',
    dicas: [
      'Use água em temperatura ambiente ou gelada. Água muito quente deixa o pó empelotado e o sabor fica ruim.',
      'Mexa por uns 20 segundos com uma colher ou dê uma chacoalhada na garrafinha até não sobrar nenhum grumo.',
      'Deixe o pote na bancada da cozinha, ao lado do copo. Ver o pote é o maior lembrete que existe.',
      'Tomou com o estômago vazio e sentiu incômodo? Tome logo depois de comer alguma coisa leve. Funciona igual.',
    ],
  },
  {
    periodo: 'noite',
    titulo: 'Lavar o rosto e aplicar o Sérum Hialurônico',
    descricao:
      'Lave o rosto com água morna e o seu sabonete facial, seque dando leves batidinhas e aplique 3 a 4 gotas do sérum no rosto e pescoço.',
    horarioSugerido: 'Antes de dormir, logo depois do banho',
    dicas: [
      'Aplique o sérum com a pele ainda levemente úmida. O ácido hialurônico precisa de água para segurar a hidratação.',
      'Espalhe de baixo para cima e de dentro para fora, sem esfregar. Não esqueça do pescoço.',
      'Espere 1 minuto para o sérum absorver antes de passar o hidratante por cima.',
      'Não pule a lavagem. Dormir de maquiagem anula boa parte do trabalho do sérum.',
    ],
  },
];

/**
 * BONUS: Protocolo Skin Care Perfeito.
 * Dois blocos (manha e noite), com skincare consensual e sem exagero.
 */
export const BONUS_SKINCARE: BlocoSkincare[] = [
  {
    titulo: 'Rotina da Manhã',
    subtitulo: 'Limpar de leve, hidratar e proteger. Em 3 minutos você termina.',
    passos: [
      {
        nome: 'Limpeza suave',
        comoFazer:
          'Molhe o rosto com água morna, use uma quantidade pequena de sabonete facial suave e massageie por 30 segundos com as pontas dos dedos. Enxágue e seque com batidinhas na toalha.',
        porque:
          'Durante a noite a pele produz oleosidade natural. Uma limpeza leve tira esse excesso sem raspar a barreira de proteção da pele.',
      },
      {
        nome: 'Hidratante facial',
        comoFazer:
          'Com a pele ainda um pouco úmida, espalhe uma quantidade do tamanho de uma ervilha por todo o rosto e pescoço, de baixo para cima.',
        porque:
          'Pele hidratada fica mais macia, com aspecto mais uniforme, e a maquiagem assenta muito melhor por cima.',
      },
      {
        nome: 'Protetor solar (o passo que mais importa)',
        comoFazer:
          'Use FPS 30 ou mais, cerca de duas linhas de dedo de produto para o rosto todo. Passe também no pescoço, nas orelhas e nas costas das mãos. Reaplique a cada 3 ou 4 horas se pegar sol.',
        porque:
          'A maior parte das manchas e das marcas que aparecem com o tempo vem da exposição ao sol acumulada. Protetor todo dia, inclusive nublado, é o cuidado com melhor retorno.',
      },
      {
        nome: 'Água ao longo do dia',
        comoFazer:
          'Deixe uma garrafa de 500 ml à vista e mire em encher e beber 3 a 4 vezes até a noite.',
        porque:
          'A hidratação da pele também vem de dentro. Sem água suficiente, nenhum creme sustenta o resultado sozinho.',
      },
    ],
  },
  {
    titulo: 'Rotina da Noite',
    subtitulo: 'Tirar o dia do rosto, tratar e selar a hidratação enquanto você dorme.',
    passos: [
      {
        nome: 'Remover maquiagem e protetor',
        comoFazer:
          'Passe água micelar ou um óleo de limpeza com o algodão ou com as mãos, sem esfregar, até sair todo o resto de maquiagem e protetor solar.',
        porque:
          'Protetor solar e base não saem só com água. Se ficam na pele, entopem os poros e atrapalham tudo que vier depois.',
      },
      {
        nome: 'Limpeza com sabonete facial',
        comoFazer:
          'Água morna (nunca quente), sabonete facial suave, 30 a 60 segundos de massagem circular. Enxágue bem e seque com batidinhas.',
        porque:
          'É a segunda limpeza que de fato deixa a pele pronta para absorver o sérum. Água quente demais resseca e irrita.',
      },
      {
        nome: 'Sérum Hialurônico (o ativo da noite)',
        comoFazer:
          '3 a 4 gotas na palma da mão, espalhe no rosto e pescoço com a pele ainda levemente úmida, de baixo para cima. Espere absorver por 1 minuto.',
        porque:
          'À noite a pele está em modo de recuperação. O ácido hialurônico atrai e segura água nas camadas superficiais, deixando a pele mais preenchida e macia pela manhã.',
      },
      {
        nome: 'Hidratante para selar',
        comoFazer:
          'Por cima do sérum, aplique o hidratante noturno em movimentos suaves. Se a pele do pescoço for mais seca, capriche ali.',
        porque:
          'O hidratante forma a camada que impede a água trazida pelo sérum de evaporar durante a noite.',
      },
    ],
  },
];

/**
 * MASSAGEM FACIAL: tecnicas simples de contorno e drenagem.
 * Sempre com a pele deslizando (use o serum ou o hidratante), nunca a seco.
 */
export const MASSAGEM_FACIAL: TecnicaMassagem[] = [
  {
    nome: 'Drenagem linfática facial',
    duracao: '3 minutos',
    beneficio: 'Ajuda a desinchar o rosto, principalmente aquele inchaço de quando você acorda.',
    comoFazer: [
      'Aplique o sérum ou o hidratante primeiro, para os dedos deslizarem sem puxar a pele.',
      'Com as pontas dos dedos, faça 5 movimentos leves do centro da testa em direção às têmporas.',
      'Do canto do nariz, deslize até a frente da orelha, 5 vezes de cada lado, com pressão bem suave.',
      'Do queixo, deslize ao longo do maxilar até a orelha, 5 vezes de cada lado.',
      'Termine descendo da orelha até a base do pescoço, 5 vezes de cada lado. É ali que o líquido escoa.',
    ],
  },
  {
    nome: 'Lifting do maxilar',
    duracao: '2 minutos',
    beneficio: 'Trabalha a região do queixo e do maxilar, deixando o contorno do rosto mais definido.',
    comoFazer: [
      'Feche as mãos em punho leve e use a parte lateral dos dedos indicadores.',
      'Comece no centro do queixo e deslize firme (sem doer) ao longo do maxilar até embaixo da orelha.',
      'Repita 10 vezes de cada lado, sempre no sentido queixo para orelha, nunca voltando com pressão.',
      'Depois, com o polegar e o indicador em pinça, belisque de leve toda a linha do maxilar, ponta a ponta, 3 vezes.',
      'Finalize deslizando da orelha para o pescoço para escoar.',
    ],
  },
  {
    nome: 'Área dos olhos',
    duracao: '1 minuto',
    beneficio: 'Alivia a sensação de peso e o inchaço das pálpebras, que aparece mais pela manhã.',
    comoFazer: [
      'Use SEMPRE o dedo anelar: é o dedo mais fraco da mão e não força a pele fina dos olhos.',
      'Com toques leves, tipo tamborilar, percorra do canto interno ao canto externo da pálpebra inferior.',
      'Faça 3 voltas completas ao redor de cada olho, sem esticar nem esfregar a pele.',
      'Pressione de leve por 5 segundos na têmpora, ao lado do canto externo do olho, e solte. Repita 3 vezes.',
      'Se o inchaço for grande, faça com uma colher gelada por cima do creme.',
    ],
  },
  {
    nome: 'Alisar a testa e a linha do olhar',
    duracao: '2 minutos',
    beneficio:
      'Relaxa a musculatura que a gente contrai o dia todo sem perceber, franzindo a testa na frente da tela.',
    comoFazer: [
      'Coloque as pontas dos três dedos do meio no centro da testa, logo acima das sobrancelhas.',
      'Deslize devagar em direção às têmporas, alisando a testa. Repita 10 vezes.',
      'Suba um dedo de altura e repita, até cobrir a testa toda até a linha do cabelo.',
      'Com o polegar e o indicador, belisque de leve toda a sobrancelha, do início até a ponta, 3 vezes de cada lado.',
      'Termine com as palmas das mãos apoiadas na testa e respire fundo 3 vezes.',
    ],
  },
];

/** Sugestoes de pergunta para o chat com a assistente. */
export const PERGUNTAS_RAPIDAS: string[] = [
  'Esqueci de tomar o pó hoje de manhã. Tomo agora?',
  'Posso tomar o Regenera Skin com suco em vez de água?',
  'Em quanto tempo eu começo a ver diferença na pele?',
  'Posso usar o Sérum Hialurônico de manhã também?',
  'Qual a ordem certa: sérum antes ou depois do hidratante?',
  'Minha pele é oleosa. Preciso mesmo usar hidratante?',
];
