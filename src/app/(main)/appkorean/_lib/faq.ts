/**
 * Banco de perguntas e respostas do Korean App.
 *
 * Por enquanto a aba "Dúvidas" responde a partir daqui (respostas prontas,
 * previsíveis e revisadas). A rota /api/korean-chat continua existindo para
 * quando o assistente de IA for ligado.
 *
 * REGRAS DE CONTEÚDO seguidas em toda resposta:
 * - Não diagnostica, não prescreve e não substitui consulta médica.
 * - Nada de promessa de resultado garantido ou prazo certo.
 * - Gravidez, amamentação, medicação controlada e tratamento dermatológico
 *   em andamento sempre encaminham para o médico que acompanha a pessoa.
 * - Não cita preço nem tenta vender.
 */

export type CategoriaId =
  | 'rotina'
  | 'resultados'
  | 'seguranca'
  | 'pele'
  | 'intestino'
  | 'skincare'
  | 'massagem'
  | 'pedido'
  | 'app';

export interface Categoria {
  id: CategoriaId;
  nome: string;
  descricao: string;
}

export interface PerguntaFaq {
  id: string;
  categoria: CategoriaId;
  pergunta: string;
  /** Cada item vira um parágrafo na tela. */
  resposta: string[];
  /** Termos extras que ajudam a busca a encontrar esta pergunta. */
  termos?: string[];
}

export const CATEGORIAS: Categoria[] = [
  { id: 'rotina', nome: 'Como usar o kit', descricao: 'Horários, dose, esquecimento e o dia a dia' },
  { id: 'resultados', nome: 'Resultados e prazos', descricao: 'O que esperar e quando' },
  { id: 'seguranca', nome: 'Segurança e saúde', descricao: 'Remédios, gravidez, alergias e reações' },
  { id: 'pele', nome: 'Sobre a sua pele', descricao: 'Manchas, rugas, oleosidade e flacidez' },
  { id: 'intestino', nome: 'Intestino e alimentação', descricao: 'O que comer, beber e por quê' },
  { id: 'skincare', nome: 'Skincare e produtos', descricao: 'Ordem, protetor solar e o que já usa' },
  { id: 'massagem', nome: 'Massagem facial', descricao: 'Como e quando fazer' },
  { id: 'pedido', nome: 'Pedido, entrega e garantia', descricao: 'Rastreio, prazo e reembolso' },
  { id: 'app', nome: 'Sobre o aplicativo', descricao: 'Fotos, dados e como funciona' },
];

export const FAQ: PerguntaFaq[] = [
  // ============================ ROTINA ============================
  {
    id: 'rotina-como-usar',
    categoria: 'rotina',
    pergunta: 'Como eu uso o Korean Kit no dia a dia?',
    resposta: [
      'São só dois momentos, e nenhum deles toma mais que dois minutos.',
      'De manhã: dissolva uma dose do pó Regenera Skin em um copo de água (uns 200 ml), mexa bem e beba.',
      'À noite: lave o rosto e aplique o Sérum Hialurônico com a pele ainda levemente úmida.',
      'É isso. A parte que realmente conta é a constância: fazer todo dia vale muito mais do que fazer perfeito de vez em quando.',
    ],
    termos: ['rotina', 'passo a passo', 'como funciona', 'usar'],
  },
  {
    id: 'rotina-hora-po',
    categoria: 'rotina',
    pergunta: 'Qual a melhor hora para tomar o pó?',
    resposta: [
      'De manhã, ao acordar, antes ou junto do café da manhã.',
      'Mas o mais importante não é o relógio: é escolher um horário que você consiga repetir todos os dias. Se a sua manhã é corrida, tomar às 10h todo dia funciona melhor do que tentar às 7h e esquecer metade da semana.',
    ],
    termos: ['horario', 'quando tomar', 'manha'],
  },
  {
    id: 'rotina-esqueci-po',
    categoria: 'rotina',
    pergunta: 'Esqueci de tomar o pó de manhã. Tomo agora?',
    resposta: [
      'Pode tomar, sim. Se ainda for de dia, tome assim que lembrar.',
      'Se já estiver tarde da noite, prefira pular e retomar no dia seguinte, no horário de sempre.',
      'Não dobre a dose para compensar o dia perdido. Um dia esquecido não atrapalha o conjunto.',
    ],
    termos: ['esqueci', 'pulei', 'faltou', 'atrasado'],
  },
  {
    id: 'rotina-esqueci-serum',
    categoria: 'rotina',
    pergunta: 'Esqueci de passar o sérum à noite. Faz mal?',
    resposta: [
      'Não faz mal nenhum. Só retome na noite seguinte.',
      'Se lembrou ainda na madrugada ou logo ao acordar, pode aplicar naquele momento, com o rosto limpo.',
      'Uma noite perdida não apaga o que você já construiu. O que constrói resultado é a repetição ao longo das semanas.',
    ],
    termos: ['esqueci serum', 'pulei a noite'],
  },
  {
    id: 'rotina-po-suco',
    categoria: 'rotina',
    pergunta: 'Posso tomar o pó com suco em vez de água?',
    resposta: [
      'Pode. Água é o jeito mais simples e neutro, mas se o sabor te incomoda, misturar em um suco natural resolve.',
      'Evite misturar em bebida muito quente, em bebida alcoólica ou em suco muito açucarado.',
      'Se puder escolher, água ainda é a melhor opção, porque hidratação também é parte do cuidado com a pele.',
    ],
    termos: ['suco', 'misturar', 'sabor', 'leite', 'vitamina'],
  },
  {
    id: 'rotina-jejum',
    categoria: 'rotina',
    pergunta: 'Posso tomar o pó em jejum?',
    resposta: [
      'Pode, sem problema.',
      'Algumas pessoas preferem tomar junto com o café da manhã porque sentem o estômago mais confortável assim. Teste os dois jeitos e fique com o que cair melhor para você.',
    ],
    termos: ['jejum', 'estomago vazio', 'antes de comer'],
  },
  {
    id: 'rotina-todo-dia',
    categoria: 'rotina',
    pergunta: 'Preciso tomar todo dia, mesmo no fim de semana?',
    resposta: [
      'Sim, todo dia, inclusive fim de semana e feriado.',
      'A lógica aqui é de constância: o corpo responde a estímulo repetido, não a esforço concentrado. Semana com falhas espalhadas rende bem menos do que semana completa.',
    ],
    termos: ['todo dia', 'fim de semana', 'pausa', 'descanso'],
  },
  {
    id: 'rotina-quantidade-agua',
    categoria: 'rotina',
    pergunta: 'Quanta água eu uso para dissolver o pó?',
    resposta: [
      'Cerca de 200 ml, que é um copo comum.',
      'Se ficar muito concentrado para o seu gosto, pode usar um pouco mais de água. Não muda o efeito, só o sabor.',
    ],
    termos: ['quantidade', 'ml', 'copo', 'dose'],
  },
  {
    id: 'rotina-nao-dissolveu',
    categoria: 'rotina',
    pergunta: 'O pó não dissolveu direito. O que eu faço?',
    resposta: [
      'Mexa por mais tempo, uns 20 a 30 segundos, de preferência com água em temperatura ambiente.',
      'Água muito gelada dificulta a dissolução. Uma coqueteleira ou um mixer resolvem rápido se você tiver em casa.',
      'Se sobrar um pouco de resíduo no fundo, complete com um dedo de água, mexa e beba. Assim nada se perde.',
    ],
    termos: ['nao dissolve', 'grumos', 'fundo do copo', 'pelota'],
  },
  {
    id: 'rotina-serum-manha',
    categoria: 'rotina',
    pergunta: 'Posso usar o sérum de manhã também?',
    resposta: [
      'Pode. O protocolo pede o uso à noite, mas usar também de manhã não traz problema.',
      'Se for usar de manhã, aplique com o rosto limpo e finalize com protetor solar. O protetor de manhã não é opcional: sem ele, boa parte do cuidado que você faz à noite é desfeita durante o dia.',
    ],
    termos: ['serum manha', 'duas vezes', 'dia'],
  },
  {
    id: 'rotina-ordem-serum-hidratante',
    categoria: 'rotina',
    pergunta: 'Passo o sérum antes ou depois do hidratante?',
    resposta: [
      'Antes. A regra geral do skincare é ir do produto mais leve para o mais pesado.',
      'Então fica assim: rosto limpo, sérum, e por cima o hidratante. O hidratante ajuda a segurar o sérum na pele.',
    ],
    termos: ['ordem', 'antes ou depois', 'hidratante'],
  },
  {
    id: 'rotina-lavar-antes',
    categoria: 'rotina',
    pergunta: 'Preciso lavar o rosto antes de passar o sérum?',
    resposta: [
      'Sim. O sérum funciona melhor na pele limpa, sem maquiagem, sem protetor solar e sem a oleosidade do dia.',
      'Uma dica que faz diferença: aplique com a pele ainda levemente úmida, logo depois de secar com batidinhas na toalha. O ácido hialurônico puxa água, e assim ele tem água por perto para segurar.',
    ],
    termos: ['lavar', 'limpar', 'pele limpa'],
  },
  {
    id: 'rotina-pescoco',
    categoria: 'rotina',
    pergunta: 'Posso passar o sérum no pescoço e no colo?',
    resposta: [
      'Pode, e é uma boa ideia. Pescoço e colo costumam entregar a idade tanto quanto o rosto, e quase sempre são esquecidos.',
      'Use o que sobrar nas mãos depois de aplicar no rosto e espalhe de baixo para cima.',
    ],
    termos: ['pescoco', 'colo', 'maos'],
  },
  {
    id: 'rotina-quantas-gotas',
    categoria: 'rotina',
    pergunta: 'Quantas gotas de sérum eu uso?',
    resposta: [
      'De 3 a 5 gotas dão conta do rosto inteiro.',
      'Mais produto não significa mais resultado: o excesso não penetra e acaba desperdiçado. Espalhe com as pontas dos dedos e dê leves batidinhas para ajudar a absorver.',
    ],
    termos: ['gotas', 'quantidade serum', 'quanto usar'],
  },
  {
    id: 'rotina-acabou-kit',
    categoria: 'rotina',
    pergunta: 'Meu kit acabou e o próximo ainda não chegou. E agora?',
    resposta: [
      'Mantenha o que dá para manter: continue lavando o rosto à noite, hidratando e usando protetor solar de manhã.',
      'Quando o novo kit chegar, é só retomar do jeito de sempre, sem precisar recomeçar nada.',
      'Se quiser evitar essa janela na próxima vez, peça o novo kit quando o atual estiver na última semana.',
    ],
    termos: ['acabou', 'terminou', 'intervalo', 'sem produto'],
  },

  // ========================== RESULTADOS ==========================
  {
    id: 'resultado-tempo',
    categoria: 'resultados',
    pergunta: 'Em quanto tempo eu vou ver resultado?',
    resposta: [
      'Os primeiros sinais costumam aparecer nas primeiras semanas: o rosto menos inchado pela manhã, a pele menos ressecada e um pouco mais de viço.',
      'Dentro dos primeiros 60 dias, a maioria já enxerga mudança clara ao se olhar no espelho.',
      'A parte mais profunda, que é firmeza e contorno, depende do colágeno ser remontado, e isso leva alguns meses.',
      'Cada pele responde no seu tempo, então trate isso como tendência, não como promessa de data.',
    ],
    termos: ['quanto tempo', 'prazo', 'demora', 'resultado'],
  },
  {
    id: 'resultado-duas-semanas',
    categoria: 'resultados',
    pergunta: 'Faz duas semanas e eu não vi nada. É normal?',
    resposta: [
      'É normal, sim. Duas semanas é pouco tempo para um processo que acontece de dentro para fora.',
      'Nesse começo as mudanças costumam ser mais sentidas do que vistas: pele menos repuxada, rosto menos inchado ao acordar.',
      'Uma dica prática: tire uma foto hoje, na aba Diário. Daqui a um mês você compara as duas lado a lado. A pele muda devagar, e o olho que vê todo dia não percebe.',
    ],
    termos: ['nao vi nada', 'nao funcionou', 'sem resultado', 'duas semanas'],
  },
  {
    id: 'resultado-o-que-notar',
    categoria: 'resultados',
    pergunta: 'O que eu devo notar primeiro?',
    resposta: [
      'Normalmente nesta ordem: rosto menos inchado pela manhã, pele menos ressecada e repuxada, mais viço e luminosidade, e só depois textura e firmeza.',
      'Muita gente também nota o intestino funcionando de forma mais regular nas primeiras semanas.',
    ],
    termos: ['primeiros sinais', 'o que esperar', 'ordem'],
  },
  {
    id: 'resultado-para-sempre',
    categoria: 'resultados',
    pergunta: 'Vou precisar usar para sempre?',
    resposta: [
      'Não. Você não fica dependente: não é remédio, é um cuidado que reequilibra e sustenta.',
      'Você faz o ciclo, o corpo responde, e o resultado se mantém, principalmente se você seguir com os bons hábitos: água, sono, alimentação e protetor solar.',
      'Muita gente escolhe continuar depois, não por necessidade, mas porque gosta de como se sente. Isso é escolha, não obrigação.',
    ],
    termos: ['para sempre', 'dependencia', 'viciar', 'sempre'],
  },
  {
    id: 'resultado-parar',
    categoria: 'resultados',
    pergunta: 'Se eu parar, volta tudo como era antes?',
    resposta: [
      'Não volta de um dia para o outro, e não necessariamente volta ao ponto inicial.',
      'O que você reconstruiu não desaparece de repente. Mas a pele continua envelhecendo naturalmente, e sem cuidado nenhum o processo simplesmente segue seu curso.',
      'Por isso o protetor solar e os hábitos do dia a dia importam tanto: são eles que seguram o que você conquistou.',
    ],
    termos: ['parar', 'voltar', 'perder resultado'],
  },
  {
    id: 'resultado-acelerar',
    categoria: 'resultados',
    pergunta: 'Tem como acelerar o resultado?',
    resposta: [
      'Não existe atalho, mas existem quatro coisas que fazem diferença real: beber água ao longo do dia, dormir bem, usar protetor solar todo dia e não pular a rotina.',
      'Dobrar a dose não acelera nada, e não é recomendado.',
      'O maior acelerador é o mais chato de ouvir: constância.',
    ],
    termos: ['acelerar', 'mais rapido', 'dobrar dose'],
  },
  {
    id: 'resultado-amiga',
    categoria: 'resultados',
    pergunta: 'Minha amiga viu resultado antes de mim. Por quê?',
    resposta: [
      'Porque nenhuma pele parte do mesmo ponto. Idade, genética, tempo de sol acumulado, sono, alimentação, estresse e nível de ressecamento mudam totalmente o ritmo da resposta.',
      'Comparar com você mesma funciona muito melhor do que comparar com outra pessoa. É exatamente para isso que serve o Diário de Pele.',
    ],
    termos: ['comparar', 'amiga', 'outra pessoa', 'demorando'],
  },
  {
    id: 'resultado-como-sei',
    categoria: 'resultados',
    pergunta: 'Como eu sei que está funcionando?',
    resposta: [
      'Três sinais valem mais que a impressão do dia: como a pele está pela manhã, como ela responde ao toque, e a foto de um mês atrás.',
      'Use a aba Diário e fotografe a cada 7 dias, sempre no mesmo lugar e com a mesma luz. É a forma mais honesta de enxergar a evolução.',
    ],
    termos: ['esta funcionando', 'como saber', 'avaliar'],
  },
  {
    id: 'resultado-foto-ajuda',
    categoria: 'resultados',
    pergunta: 'Tirar foto ajuda mesmo?',
    resposta: [
      'Ajuda muito, e é o recurso mais subestimado.',
      'Você se vê no espelho todo dia, então não percebe a mudança lenta. A foto guarda o ponto de partida que a sua memória já apagou.',
      'Para a comparação valer: mesma luz, mesmo lugar, mesma posição do rosto, sem maquiagem e sem filtro.',
    ],
    termos: ['foto', 'antes e depois', 'registro'],
  },
  {
    id: 'resultado-duracao-kit',
    categoria: 'resultados',
    pergunta: 'Quanto tempo dura um kit?',
    resposta: [
      'Cada kit é feito para durar o ciclo completo de uso seguindo a rotina indicada, com uma dose de pó por dia e a aplicação do sérum à noite.',
      'Se você usa mais sérum do que o indicado, ele acaba antes. De 3 a 5 gotas dão conta do rosto inteiro.',
    ],
    termos: ['dura', 'quantos dias', 'rende'],
  },

  // ========================== SEGURANÇA ===========================
  {
    id: 'seg-efeito-colateral',
    categoria: 'seguranca',
    pergunta: 'Tem efeito colateral?',
    resposta: [
      'A fórmula é feita com ingredientes naturais e produzida pela H9 Pharma seguindo boas práticas de fabricação.',
      'A maioria das pessoas não relata nenhum incômodo. Algumas sentem o intestino trabalhar um pouco mais nos primeiros dias, o que costuma se ajustar sozinho.',
      'Se você sentir qualquer reação que te preocupe, pare o uso e procure o seu médico.',
    ],
    termos: ['efeito colateral', 'reacao', 'faz mal'],
  },
  {
    id: 'seg-remedios',
    categoria: 'seguranca',
    pergunta: 'Posso tomar junto com os meus remédios?',
    resposta: [
      'Essa é uma pergunta que só o seu médico pode responder com segurança, porque depende do remédio que você usa.',
      'Leve a embalagem ou a lista de ingredientes na próxima consulta e confirme com ele. É rápido e tira qualquer dúvida.',
      'Eu não posso avaliar interação com medicamento por aqui.',
    ],
    termos: ['remedio', 'medicamento', 'interacao', 'junto'],
  },
  {
    id: 'seg-gravida',
    categoria: 'seguranca',
    pergunta: 'Estou grávida. Posso usar?',
    resposta: [
      'Na gravidez, a orientação é sempre confirmar com o seu obstetra antes de começar qualquer suplemento.',
      'Não é uma questão de o produto fazer mal: é que nesse período qualquer decisão passa pelo médico que acompanha você e o bebê.',
    ],
    termos: ['gravida', 'gravidez', 'gestante'],
  },
  {
    id: 'seg-amamentando',
    categoria: 'seguranca',
    pergunta: 'Estou amamentando. Posso usar?',
    resposta: [
      'Mesma orientação da gravidez: converse com o seu médico antes de começar.',
      'Durante a amamentação, quem decide o que entra na sua rotina é o profissional que acompanha vocês dois.',
    ],
    termos: ['amamentando', 'amamentacao', 'lactante'],
  },
  {
    id: 'seg-diabetes',
    categoria: 'seguranca',
    pergunta: 'Tenho diabetes. Posso tomar?',
    resposta: [
      'Quem tem diabetes deve confirmar com o médico que acompanha o caso antes de incluir qualquer suplemento novo.',
      'Leve a lista de ingredientes na consulta. Ele vai saber avaliar considerando o seu tratamento e os seus exames.',
    ],
    termos: ['diabetes', 'diabetica', 'glicemia', 'acucar no sangue'],
  },
  {
    id: 'seg-pressao',
    categoria: 'seguranca',
    pergunta: 'Tenho pressão alta. Posso tomar?',
    resposta: [
      'Se você faz uso de medicação para pressão, confirme com o seu médico antes de começar.',
      'Essa checagem é rápida e vale para qualquer suplemento novo, não só para este.',
    ],
    termos: ['pressao alta', 'hipertensao', 'coracao'],
  },
  {
    id: 'seg-anticoncepcional',
    categoria: 'seguranca',
    pergunta: 'Uso anticoncepcional. Interfere?',
    resposta: [
      'Quem pode responder isso com segurança é o seu ginecologista, porque depende do anticoncepcional que você usa.',
      'Vale mencionar na próxima consulta ou mandar uma mensagem para ele, se você tiver esse contato.',
    ],
    termos: ['anticoncepcional', 'pilula', 'ginecologista'],
  },
  {
    id: 'seg-alergia',
    categoria: 'seguranca',
    pergunta: 'Tenho alergia a alguns alimentos. Como sei se posso usar?',
    resposta: [
      'Leia a lista completa de ingredientes na embalagem antes de começar. Ela está impressa no rótulo.',
      'Se você encontrar algo a que já teve reação, ou se ficar em dúvida, não comece por conta própria: confirme com o seu médico ou alergista.',
      'Se quiser, o nosso suporte também envia a lista de ingredientes por escrito.',
    ],
    termos: ['alergia', 'alergica', 'ingredientes', 'composicao'],
  },
  {
    id: 'seg-acido-isotretinoina',
    categoria: 'seguranca',
    pergunta: 'Uso ácido ou isotretinoína. Posso usar o sérum?',
    resposta: [
      'Se você está em tratamento dermatológico com ácido, isotretinoína ou qualquer ativo prescrito, converse com o seu dermatologista antes de acrescentar o sérum.',
      'A pele em tratamento fica mais sensível, e quem conhece o seu caso é ele.',
    ],
    termos: ['acido', 'isotretinoina', 'roacutan', 'tretinoina', 'dermatologista'],
  },
  {
    id: 'seg-ardeu',
    categoria: 'seguranca',
    pergunta: 'A pele ardeu quando passei o sérum. É normal?',
    resposta: [
      'Um leve formigamento no primeiro contato pode acontecer, principalmente em pele muito ressecada.',
      'Ardência forte, vermelhidão que não passa, coceira ou inchaço não são esperados. Nesse caso, lave o rosto com água, suspenda o uso e procure o seu médico.',
      'Se você aplicou logo depois de esfoliar ou de usar algum ácido, a pele fica mais reativa. Espere a pele acalmar antes de tentar de novo.',
    ],
    termos: ['ardeu', 'ardencia', 'queimou', 'coceira', 'vermelhidao'],
  },
  {
    id: 'seg-espinha',
    categoria: 'seguranca',
    pergunta: 'Apareceu uma espinha depois que comecei. É o produto?',
    resposta: [
      'Nem sempre. Espinha responde a muita coisa ao mesmo tempo: fase do ciclo menstrual, estresse, sono, alimentação, troca de fronha e outros produtos que você usa.',
      'Observe por alguns dias e veja se é algo isolado ou um padrão que se repete.',
      'Se aparecerem muitas lesões, se doer ou se piorar rápido, suspenda o uso e procure um dermatologista.',
    ],
    termos: ['espinha', 'acne', 'cravos', 'piorou'],
  },
  {
    id: 'seg-pele-sensivel',
    categoria: 'seguranca',
    pergunta: 'Tenho pele sensível ou rosácea. Posso usar?',
    resposta: [
      'Quem tem rosácea, dermatite ou pele muito reativa deve confirmar com o dermatologista antes de incluir qualquer produto novo.',
      'Se ele liberar, um cuidado extra ajuda: comece aplicando o sérum em dias alternados na primeira semana e observe como a sua pele responde.',
    ],
    termos: ['pele sensivel', 'rosacea', 'dermatite', 'reativa'],
  },
  {
    id: 'seg-adolescente',
    categoria: 'seguranca',
    pergunta: 'Posso dar para a minha filha adolescente?',
    resposta: [
      'Para menores de idade, a orientação é conversar com o pediatra ou com o médico que acompanha ela antes.',
      'O protocolo foi pensado para pele adulta, principalmente a partir dos 30 e poucos anos, quando a produção de colágeno começa a cair.',
    ],
    termos: ['adolescente', 'filha', 'crianca', 'menor de idade', 'idade minima'],
  },
  {
    id: 'seg-idade-maxima',
    categoria: 'seguranca',
    pergunta: 'Tem idade máxima para usar?',
    resposta: [
      'Não existe idade máxima. Pele em qualquer idade responde a hidratação, nutrição e proteção solar.',
      'Se você tem alguma condição de saúde ou toma medicação de uso contínuo, vale a mesma recomendação de sempre: confirme com o seu médico antes de começar.',
    ],
    termos: ['idade maxima', 'idosa', 'velha', '60 anos', '70 anos'],
  },

  // ============================= PELE =============================
  {
    id: 'pele-por-que-envelhece',
    categoria: 'pele',
    pergunta: 'Por que a pele envelhece?',
    resposta: [
      'A partir dos 30 e poucos anos, a produção natural de colágeno começa a cair um pouco a cada ano. O colágeno é o que sustenta a pele por dentro, então menos colágeno significa menos firmeza e mais linhas.',
      'Somam-se a isso o sol acumulado ao longo da vida, que é o maior fator isolado de envelhecimento da pele, além de sono ruim, estresse, açúcar em excesso e um intestino desequilibrado.',
      'É por isso que cuidar só por fora tem limite: parte da causa está dentro.',
    ],
    termos: ['envelhecimento', 'colageno', 'idade', 'por que'],
  },
  {
    id: 'pele-eixo',
    categoria: 'pele',
    pergunta: 'O que é o eixo intestino-pele?',
    resposta: [
      'É a relação de mão dupla entre o que acontece no seu intestino e o que aparece na sua pele.',
      'Um intestino inflamado, com pouca fibra, pouca água e microbiota desequilibrada, tende a se manifestar na pele como opacidade, oleosidade irregular, vermelhidão e envelhecimento mais rápido.',
      'Por isso o protocolo tem duas frentes: uma que age de dentro, com o pó pela manhã, e outra que age por fora, com o sérum à noite.',
    ],
    termos: ['eixo intestino pele', 'intestino', 'relacao'],
  },
  {
    id: 'pele-toxina',
    categoria: 'pele',
    pergunta: 'O que é a Toxina do Envelhecimento?',
    resposta: [
      'É o nome que o Dr. Renato usa para explicar, de forma simples, o processo inflamatório de baixo grau que nasce em um intestino desequilibrado e acaba afetando a pele.',
      'A ideia central: quando o intestino não vai bem, o corpo vive em estado inflamatório leve e constante, e esse estado consome colágeno e acelera o envelhecimento visível.',
      'Frear esse processo é o que abre espaço para a pele se reconstruir.',
    ],
    termos: ['toxina', 'envelhecimento', 'inflamacao'],
  },
  {
    id: 'pele-manchas',
    categoria: 'pele',
    pergunta: 'Serve para manchas?',
    resposta: [
      'A rotina ajuda no aspecto geral da pele: mais viço, mais uniformidade, mais luminosidade.',
      'Mas mancha é um assunto que tem várias causas diferentes, e cada tipo pede uma abordagem própria. Melasma, mancha de sol e mancha pós-acne não são a mesma coisa.',
      'Se a mancha é a sua principal queixa, vale uma avaliação com dermatologista para saber com o que você está lidando. E use protetor solar todo dia: sem isso, qualquer mancha tende a piorar.',
    ],
    termos: ['manchas', 'mancha', 'melasma', 'sol'],
  },
  {
    id: 'pele-rugas',
    categoria: 'pele',
    pergunta: 'Serve para rugas e linhas finas?',
    resposta: [
      'Linhas finas costumam ser as primeiras a responder, porque muitas delas são agravadas pelo ressecamento. Pele bem hidratada already parece mais lisa.',
      'Rugas profundas, que já são marcas estruturais, respondem menos e mais devagar. Nesse caso o cuidado ajuda a suavizar e a não piorar, mas não apaga.',
      'Ninguém pode prometer o desaparecimento de rugas com um produto tópico, e eu não vou prometer.',
    ],
    termos: ['rugas', 'linhas finas', 'marcas'],
  },
  {
    id: 'pele-flacidez',
    categoria: 'pele',
    pergunta: 'Serve para flacidez?',
    resposta: [
      'Firmeza é justamente a parte que depende do colágeno ser remontado, e por isso é a que demora mais: alguns meses de uso contínuo.',
      'A massagem facial da aba Bônus ajuda a estimular a circulação da região e a trabalhar o contorno.',
      'Flacidez muito acentuada tem limite para qualquer cuidado tópico ou oral. Nesse caso, um dermatologista pode indicar o que mais faz sentido para o seu caso.',
    ],
    termos: ['flacidez', 'firmeza', 'contorno', 'papada'],
  },
  {
    id: 'pele-oleosa',
    categoria: 'pele',
    pergunta: 'Minha pele é oleosa. Serve para mim?',
    resposta: [
      'Serve. E tem um detalhe que confunde muita gente: pele oleosa também fica desidratada.',
      'Quando falta água na pele, ela responde produzindo ainda mais óleo para se proteger. O ácido hialurônico hidrata sem deixar aquela sensação pesada.',
      'Se você tem pele oleosa, prefira um hidratante em gel por cima e não pule o protetor solar, procurando uma versão de toque seco.',
    ],
    termos: ['pele oleosa', 'oleosidade', 'brilho', 'gordurosa'],
  },
  {
    id: 'pele-seca',
    categoria: 'pele',
    pergunta: 'Minha pele é seca. Serve para mim?',
    resposta: [
      'Serve, e a pele seca costuma ser a que mais sente diferença logo no começo.',
      'Uma dica que muda o resultado: aplique o sérum com a pele ainda levemente úmida e sele com um hidratante mais encorpado por cima. Sem essa camada de cima, o hialurônico pode puxar água e ela evaporar.',
    ],
    termos: ['pele seca', 'ressecada', 'descamando', 'repuxando'],
  },
  {
    id: 'pele-melasma',
    categoria: 'pele',
    pergunta: 'Tenho melasma. Ajuda?',
    resposta: [
      'Melasma é uma condição específica e teimosa, que envolve fatores hormonais e sensibilidade ao sol e ao calor.',
      'A rotina cuida da saúde geral da pele, o que sempre ajuda, mas melasma pede acompanhamento dermatológico e proteção solar rigorosa, inclusive em dia nublado e dentro de casa perto de janela.',
      'Não conte só com o kit para tratar melasma.',
    ],
    termos: ['melasma', 'mancha escura', 'hormonal'],
  },
  {
    id: 'pele-olheiras',
    categoria: 'pele',
    pergunta: 'Serve para olheiras?',
    resposta: [
      'Depende do tipo de olheira. Quando ela vem de ressecamento e pele fina, a hidratação melhora o aspecto.',
      'Quando é de fundo genético, por vascularização ou pela anatomia da região, o ganho é pequeno.',
      'Sono e hidratação influenciam bastante, e são a parte que está na sua mão.',
    ],
    termos: ['olheiras', 'olhos', 'escuro'],
  },
  {
    id: 'pele-poros',
    categoria: 'pele',
    pergunta: 'Serve para poros dilatados?',
    resposta: [
      'Pele bem hidratada e com boa textura faz os poros parecerem menos aparentes.',
      'Mas o tamanho do poro em si é genético e não muda de forma permanente. O que muda é o quanto ele chama atenção.',
      'Limpeza adequada e proteção solar ajudam bastante nessa aparência.',
    ],
    termos: ['poros', 'dilatados', 'textura'],
  },
  {
    id: 'pele-corpo',
    categoria: 'pele',
    pergunta: 'Serve para o corpo também ou só para o rosto?',
    resposta: [
      'O pó age de dentro, então beneficia a pele do corpo inteiro.',
      'O sérum é de uso facial. Se sobrar produto nas mãos, aproveite no pescoço, no colo e nas costas das mãos, que são as áreas que mais entregam a idade.',
    ],
    termos: ['corpo', 'so rosto', 'maos', 'braco'],
  },

  // ========================== INTESTINO ===========================
  {
    id: 'int-relacao',
    categoria: 'intestino',
    pergunta: 'O que o intestino tem a ver com a minha pele?',
    resposta: [
      'Mais do que a maioria das pessoas imagina. O intestino é onde você absorve os nutrientes que a pele usa como matéria-prima, e é também um dos principais reguladores da inflamação no corpo.',
      'Intestino desequilibrado significa pior absorção e mais inflamação. Os dois efeitos aparecem na pele, em forma de opacidade, irregularidade e envelhecimento mais rápido.',
      'Cuidar de dentro é o que sustenta o resultado do cuidado de fora.',
    ],
    termos: ['intestino e pele', 'relacao', 'por que'],
  },
  {
    id: 'int-mudar-alimentacao',
    categoria: 'intestino',
    pergunta: 'Preciso mudar minha alimentação?',
    resposta: [
      'Não precisa virar a sua vida do avesso. O protocolo foi feito para funcionar dentro da rotina que você já tem.',
      'Dito isso, bons hábitos aceleram e sustentam o resultado. Se você quiser fazer só uma mudança, faça esta: beber mais água ao longo do dia.',
      'A aba Bônus traz orientações práticas para quem quiser ir além.',
    ],
    termos: ['alimentacao', 'dieta', 'mudar', 'comida'],
  },
  {
    id: 'int-alimentos-ajudam',
    categoria: 'intestino',
    pergunta: 'Que alimentos ajudam a pele?',
    resposta: [
      'Água em primeiro lugar, ao longo do dia inteiro.',
      'Depois: fibras, como verduras, legumes, frutas com casca e aveia. Boas gorduras, como abacate, azeite, castanhas e peixes. Proteína em todas as refeições, porque colágeno se constrói a partir de aminoácidos. E alimentos coloridos, que trazem antioxidantes.',
      'Não é sobre comer perfeito. É sobre a maior parte do prato ir nessa direção na maioria dos dias.',
    ],
    termos: ['alimentos', 'comer', 'ajudam', 'bom para pele'],
  },
  {
    id: 'int-alimentos-atrapalham',
    categoria: 'intestino',
    pergunta: 'Que alimentos atrapalham?',
    resposta: [
      'Os principais são açúcar em excesso, ultraprocessados, frituras e álcool em quantidade.',
      'O açúcar tem um efeito específico e bem documentado: em excesso, ele se liga ao colágeno e o deixa rígido e quebradiço. É o oposto do que você quer.',
      'Não precisa cortar tudo. Reduzir a frequência já muda bastante.',
    ],
    termos: ['atrapalham', 'evitar', 'acucar', 'fritura', 'alcool'],
  },
  {
    id: 'int-quanta-agua',
    categoria: 'intestino',
    pergunta: 'Quanta água eu devo beber por dia?',
    resposta: [
      'A referência mais usada é cerca de 35 ml por quilo de peso. Uma pessoa de 60 kg fica em torno de 2 litros por dia.',
      'Um jeito fácil de acertar sem contar: deixe uma garrafa à vista e beba ao longo do dia, em vez de tentar compensar tudo à noite.',
      'A cor da urina entrega bastante: quanto mais clara, melhor está a sua hidratação.',
    ],
    termos: ['agua', 'quanto beber', 'litros', 'hidratacao'],
  },
  {
    id: 'int-preso',
    categoria: 'intestino',
    pergunta: 'Meu intestino é preso. O produto ajuda?',
    resposta: [
      'Muitas pessoas relatam o intestino funcionando de forma mais regular ao longo do uso.',
      'Três coisas ajudam junto: água, fibras e movimento. Uma caminhada diária faz mais diferença do que parece.',
      'Se a prisão de ventre é persistente, dolorosa ou veio acompanhada de outras mudanças, vale investigar com um médico.',
    ],
    termos: ['intestino preso', 'constipacao', 'prisao de ventre'],
  },
  {
    id: 'int-mexeu',
    categoria: 'intestino',
    pergunta: 'Senti o intestino mexer mais nos primeiros dias. É normal?',
    resposta: [
      'É comum quando o intestino recebe mais fibra e mais água do que estava acostumado. Costuma se ajustar em poucos dias.',
      'Se o desconforto for forte, persistir ou vier com dor, suspenda o uso e converse com o seu médico.',
    ],
    termos: ['intestino mexendo', 'gases', 'inchaco', 'desconforto'],
  },
  {
    id: 'int-cafe',
    categoria: 'intestino',
    pergunta: 'Posso tomar café junto?',
    resposta: [
      'Pode. Não há problema em tomar o seu café na mesma refeição.',
      'Só evite dissolver o pó dentro do café quente. Água em temperatura ambiente é o ideal para a dissolução.',
    ],
    termos: ['cafe', 'cha', 'quente'],
  },
  {
    id: 'int-cortar-acucar',
    categoria: 'intestino',
    pergunta: 'Preciso cortar o açúcar?',
    resposta: [
      'Não precisa cortar por completo, e proibição total costuma durar pouco mesmo.',
      'O que vale é reduzir a frequência, principalmente de refrigerante, doce diário e ultraprocessado.',
      'O motivo é concreto: açúcar em excesso enrijece o colágeno, que é justamente o que você está tentando reconstruir.',
    ],
    termos: ['acucar', 'doce', 'cortar', 'refrigerante'],
  },
  {
    id: 'int-sono',
    categoria: 'intestino',
    pergunta: 'O sono influencia na pele?',
    resposta: [
      'Muito. É durante o sono profundo que o corpo faz a maior parte do trabalho de reparo dos tecidos, inclusive da pele.',
      'Noites mal dormidas de forma repetida aparecem no rosto: mais inchaço, menos viço, olheira mais marcada.',
      'Se você puder melhorar um hábito além da rotina do kit, dormir melhor é provavelmente o de maior retorno.',
    ],
    termos: ['sono', 'dormir', 'noite', 'descanso'],
  },

  // =========================== SKINCARE ===========================
  {
    id: 'sk-protetor',
    categoria: 'skincare',
    pergunta: 'Preciso mesmo usar protetor solar?',
    resposta: [
      'Precisa. Se você fizer só uma coisa além da rotina do kit, que seja esta.',
      'O sol acumulado é o maior fator isolado de envelhecimento da pele. Sem proteção, boa parte do cuidado que você faz à noite é desfeita durante o dia.',
      'Use todo dia, inclusive em dia nublado e mesmo ficando dentro de casa, porque a luz que entra pela janela também conta. Reaplique se ficar muito tempo exposta.',
    ],
    termos: ['protetor solar', 'filtro solar', 'fps', 'sol'],
  },
  {
    id: 'sk-ordem',
    categoria: 'skincare',
    pergunta: 'Qual a ordem certa dos produtos?',
    resposta: [
      'A regra geral é ir do mais leve para o mais pesado.',
      'De manhã: limpeza, sérum se for usar, hidratante e protetor solar por último.',
      'À noite: limpeza, sérum, hidratante. À noite não precisa de protetor.',
      'Espere alguns segundos entre um produto e outro para dar tempo de absorver.',
    ],
    termos: ['ordem', 'sequencia', 'primeiro', 'depois'],
  },
  {
    id: 'sk-produtos-atuais',
    categoria: 'skincare',
    pergunta: 'Posso continuar usando os meus produtos atuais?',
    resposta: [
      'Pode. O sérum entra na rotina que você já tem, não substitui tudo.',
      'A única atenção é com ácidos e ativos fortes prescritos por dermatologista. Nesse caso, confirme com ele como encaixar.',
      'Se você usa muitos produtos e algo der reação, fica difícil saber qual foi o responsável. Simplificar ajuda a enxergar melhor.',
    ],
    termos: ['meus produtos', 'continuar', 'trocar', 'substituir'],
  },
  {
    id: 'sk-maquiagem',
    categoria: 'skincare',
    pergunta: 'Posso usar maquiagem por cima?',
    resposta: [
      'Pode, sem problema. Só espere o sérum absorver antes de começar a maquiagem, o que leva de um a dois minutos.',
      'O mais importante é o outro lado: nunca durma de maquiagem. Lavar o rosto à noite é parte do protocolo.',
    ],
    termos: ['maquiagem', 'base', 'make'],
  },
  {
    id: 'sk-mais-produtos',
    categoria: 'skincare',
    pergunta: 'Preciso comprar mais produtos?',
    resposta: [
      'Não. O básico que sustenta resultado é curto: um sabonete facial suave, um hidratante e um protetor solar.',
      'Você provavelmente já tem os três. Não precisa de dez etapas nem de produto caro.',
      'A aba Bônus mostra como montar essa rotina simples.',
    ],
    termos: ['comprar', 'outros produtos', 'preciso de mais'],
  },
  {
    id: 'sk-sabonete',
    categoria: 'skincare',
    pergunta: 'Que sabonete devo usar no rosto?',
    resposta: [
      'Um sabonete facial suave, próprio para o rosto.',
      'Evite sabonete em barra de corpo no rosto: costuma ser mais agressivo e resseca.',
      'Se a sua pele fica repuxada logo depois de lavar, esse é um sinal de que o produto está forte demais para você.',
    ],
    termos: ['sabonete', 'lavar rosto', 'limpeza'],
  },
  {
    id: 'sk-hidratante-necessario',
    categoria: 'skincare',
    pergunta: 'Preciso de hidratante se já uso o sérum?',
    resposta: [
      'Na maioria dos casos, sim. Eles fazem coisas diferentes: o sérum entrega água para a pele, e o hidratante ajuda a segurar essa água ali dentro.',
      'Sem a camada de cima, parte do que o sérum trouxe pode evaporar, principalmente em pele seca ou em ambiente com ar-condicionado.',
      'Pele oleosa costuma se dar melhor com hidratante em gel.',
    ],
    termos: ['hidratante', 'preciso', 'necessario'],
  },
  {
    id: 'sk-acido-junto',
    categoria: 'skincare',
    pergunta: 'Posso usar ácido junto com o sérum?',
    resposta: [
      'Se o ácido foi prescrito por um dermatologista, pergunte a ele como encaixar os dois. É a resposta mais segura.',
      'Como orientação geral, muita gente alterna as noites: uma noite o ativo, outra noite o sérum, para não sobrecarregar a pele.',
      'Ardência, descamação e vermelhidão são sinais de que a pele está recebendo coisa demais ao mesmo tempo.',
    ],
    termos: ['acido', 'ativo', 'vitamina c', 'retinol', 'junto'],
  },
  {
    id: 'sk-esfoliacao',
    categoria: 'skincare',
    pergunta: 'Com que frequência posso esfoliar?',
    resposta: [
      'Uma vez por semana costuma ser suficiente para a maioria das peles, e pele sensível pode precisar de menos ainda.',
      'Esfoliar demais é um erro comum: machuca a barreira da pele e provoca o efeito contrário, com mais sensibilidade e mais oleosidade.',
      'Depois de esfoliar, capriche na hidratação e evite ativos fortes naquela noite.',
    ],
    termos: ['esfoliar', 'esfoliacao', 'peeling'],
  },
  {
    id: 'sk-agua-temperatura',
    categoria: 'skincare',
    pergunta: 'Água quente ou fria para lavar o rosto?',
    resposta: [
      'Morna, tendendo para o fresco.',
      'Água muito quente remove a oleosidade natural que protege a pele e deixa aquela sensação de repuxado.',
      'Seque com batidinhas na toalha, sem esfregar.',
    ],
    termos: ['agua quente', 'agua fria', 'temperatura', 'lavar'],
  },

  // =========================== MASSAGEM ===========================
  {
    id: 'mass-precisa',
    categoria: 'massagem',
    pergunta: 'Preciso fazer a massagem facial?',
    resposta: [
      'Não é obrigatória. A rotina principal continua sendo o pó pela manhã e o sérum à noite.',
      'A massagem é um bônus que ajuda na circulação da região, no aspecto de inchaço e no trabalho do contorno.',
      'Se você tiver dois minutos, vale. Se não tiver, não se cobre por isso.',
    ],
    termos: ['massagem', 'obrigatorio', 'precisa'],
  },
  {
    id: 'mass-tempo',
    categoria: 'massagem',
    pergunta: 'Quanto tempo de massagem por dia?',
    resposta: [
      'De dois a cinco minutos já dão conta. Não é preciso mais do que isso.',
      'Constância vale mais que duração: todo dia por dois minutos rende mais do que vinte minutos uma vez por semana.',
    ],
    termos: ['tempo', 'quantos minutos', 'duracao'],
  },
  {
    id: 'mass-rolinho',
    categoria: 'massagem',
    pergunta: 'Posso usar rolinho de jade ou gua sha?',
    resposta: [
      'Pode. São ferramentas que facilitam o movimento, mas as suas próprias mãos funcionam muito bem.',
      'Se usar, aplique sempre sobre a pele deslizante, com o sérum ou um hidratante, nunca na pele seca, para não puxar.',
      'Lave a ferramenta com frequência.',
    ],
    termos: ['rolinho', 'jade', 'gua sha', 'ferramenta'],
  },
  {
    id: 'mass-flacidez-risco',
    categoria: 'massagem',
    pergunta: 'Massagem pode causar flacidez?',
    resposta: [
      'Massagem feita com movimento leve e no sentido de baixo para cima não causa flacidez.',
      'O que faz mal é puxar, esfregar e beliscar a pele com força, principalmente na área dos olhos, que é fina e delicada.',
      'Pressão leve, sempre com a pele deslizante. Se doeu, você apertou demais.',
    ],
    termos: ['flacidez', 'faz mal', 'esticar', 'puxar'],
  },
  {
    id: 'mass-quando',
    categoria: 'massagem',
    pergunta: 'Faço a massagem antes ou depois do sérum?',
    resposta: [
      'Depois. O sérum deixa a pele deslizante, o que é exatamente o que a massagem precisa.',
      'Massagear a pele seca provoca atrito e pode irritar.',
    ],
    termos: ['antes ou depois', 'quando fazer', 'ordem massagem'],
  },

  // ============================ PEDIDO ============================
  {
    id: 'ped-garantia',
    categoria: 'pedido',
    pergunta: 'Como funciona a garantia de 60 dias?',
    resposta: [
      'Você tem 60 dias, contados a partir do recebimento, para testar seguindo a rotina indicada.',
      'Se nesse período você não sentir diferença, é só pedir o reembolso e devolvemos 100% do valor. Sem interrogatório e sem burocracia.',
      'A ideia é simples: o risco fica com a gente, não com você.',
    ],
    termos: ['garantia', '60 dias', 'devolucao', 'risco'],
  },
  {
    id: 'ped-reembolso',
    categoria: 'pedido',
    pergunta: 'Como eu peço o reembolso?',
    resposta: [
      'Mande um e-mail para suporteh9pharma@gmail.com com o seu nome e o e-mail usado na compra.',
      'Você também pode falar com a gente pelo WhatsApp, no número (35) 3531-1001.',
      'A equipe conduz o processo e explica cada passo.',
    ],
    termos: ['reembolso', 'dinheiro de volta', 'cancelar', 'devolver'],
  },
  {
    id: 'ped-prazo-entrega',
    categoria: 'pedido',
    pergunta: 'Quanto tempo demora a entrega?',
    resposta: [
      'Assim que o pagamento é confirmado, o pedido é separado e despachado, e você recebe o código de rastreio.',
      'Para boa parte do Brasil a entrega leva poucos dias. Para regiões mais distantes, um pouco mais.',
      'Você acompanha cada etapa pelo código de rastreio, do nosso depósito até a sua porta.',
    ],
    termos: ['entrega', 'prazo', 'demora', 'chegar', 'frete'],
  },
  {
    id: 'ped-rastreio',
    categoria: 'pedido',
    pergunta: 'Como eu rastreio o meu pedido?',
    resposta: [
      'O código de rastreio é enviado para o e-mail cadastrado na compra assim que o pedido é despachado.',
      'Se não encontrar, confira a caixa de spam e a aba de promoções.',
      'Se ainda assim não achar, fale com o suporte pelo WhatsApp (35) 3531-1001 ou por suporteh9pharma@gmail.com que a gente reenvia.',
    ],
    termos: ['rastreio', 'rastrear', 'codigo', 'correios'],
  },
  {
    id: 'ped-nao-recebi',
    categoria: 'pedido',
    pergunta: 'Não recebi o meu pedido. O que eu faço?',
    resposta: [
      'Primeiro confira o status pelo código de rastreio que foi enviado ao seu e-mail. Às vezes o pacote está retido em uma unidade ou houve tentativa de entrega sem ninguém em casa.',
      'Se o status estiver parado ou algo estiver estranho, fale com a gente pelo WhatsApp (35) 3531-1001 ou por suporteh9pharma@gmail.com.',
      'Tenha em mãos o seu nome completo e o e-mail da compra para agilizar.',
    ],
    termos: ['nao recebi', 'nao chegou', 'atraso', 'extraviado'],
  },
  {
    id: 'ped-parcelar',
    categoria: 'pedido',
    pergunta: 'Posso parcelar?',
    resposta: [
      'Pode. O pagamento aceita cartão parcelado em até 12 vezes, e também Pix para quem prefere pagar à vista.',
      'As condições aparecem na tela de pagamento no momento da compra.',
    ],
    termos: ['parcelar', 'cartao', 'pix', 'pagamento', '12x'],
  },
  {
    id: 'ped-seguro',
    categoria: 'pedido',
    pergunta: 'É seguro comprar pelo site?',
    resposta: [
      'É. O pagamento é processado por uma das maiores empresas de pagamento do país, com o mesmo padrão de criptografia usado por bancos.',
      'Os seus dados de pagamento não ficam armazenados conosco.',
    ],
    termos: ['seguro', 'confiavel', 'golpe', 'site'],
  },
  {
    id: 'ped-suporte',
    categoria: 'pedido',
    pergunta: 'Como eu falo com o suporte?',
    resposta: [
      'Pelo WhatsApp no número (35) 3531-1001, que costuma ser o caminho mais rápido.',
      'Ou por e-mail, em suporteh9pharma@gmail.com.',
      'Tenha o seu nome completo e o e-mail usado na compra à mão. Isso agiliza bastante o atendimento.',
    ],
    termos: ['suporte', 'contato', 'falar', 'atendimento', 'whatsapp'],
  },
  {
    id: 'ped-danificado',
    categoria: 'pedido',
    pergunta: 'Recebi o produto danificado. E agora?',
    resposta: [
      'Tire fotos da embalagem e do produto assim que perceber, antes de descartar qualquer coisa.',
      'Mande as fotos para suporteh9pharma@gmail.com ou pelo WhatsApp (35) 3531-1001, junto com o seu nome e o e-mail da compra.',
      'A equipe resolve para você.',
    ],
    termos: ['danificado', 'quebrado', 'vazou', 'violado'],
  },
  {
    id: 'ped-trocar-endereco',
    categoria: 'pedido',
    pergunta: 'Posso trocar o endereço de entrega?',
    resposta: [
      'Se o pedido ainda não foi despachado, normalmente sim.',
      'Fale com o suporte o quanto antes pelo WhatsApp (35) 3531-1001. Quanto mais rápido, maior a chance de dar tempo.',
      'Depois de despachado, a alteração passa a depender da transportadora.',
    ],
    termos: ['endereco', 'trocar', 'mudei', 'cep errado'],
  },

  // ============================== APP =============================
  {
    id: 'app-conta',
    categoria: 'app',
    pergunta: 'Preciso criar uma conta para usar o aplicativo?',
    resposta: [
      'Não. Não tem login, não tem senha e não tem cadastro.',
      'É só abrir o endereço e usar. Tudo que você marca fica guardado no próprio aparelho.',
    ],
    termos: ['conta', 'login', 'senha', 'cadastro'],
  },
  {
    id: 'app-fotos-privacidade',
    categoria: 'app',
    pergunta: 'As minhas fotos vão para a internet?',
    resposta: [
      'Não. As fotos do Diário de Pele ficam guardadas apenas neste aparelho, no armazenamento do próprio navegador.',
      'Elas não são enviadas para nenhum servidor, nem para a H9 Pharma, nem para ninguém.',
    ],
    termos: ['fotos', 'privacidade', 'internet', 'servidor', 'seguranca'],
  },
  {
    id: 'app-perdi-fotos',
    categoria: 'app',
    pergunta: 'Perdi as minhas fotos. Como recupero?',
    resposta: [
      'Como as fotos ficam só neste aparelho, não existe cópia em servidor para restaurar. Limpar os dados do navegador ou trocar de celular apaga o histórico.',
      'Para não perder o registro, uma dica: quando tirar uma foto importante, salve também na galeria do celular.',
      'É o preço de um aplicativo que não pede cadastro e não guarda nada seu na internet.',
    ],
    termos: ['perdi fotos', 'sumiu', 'recuperar', 'backup'],
  },
  {
    id: 'app-dois-celulares',
    categoria: 'app',
    pergunta: 'Posso usar em mais de um celular?',
    resposta: [
      'Pode abrir em quantos aparelhos quiser, mas os dados não são compartilhados entre eles.',
      'Como não existe conta, cada aparelho guarda o seu próprio histórico de marcações e as suas próprias fotos.',
      'O ideal é escolher um aparelho e usar sempre o mesmo.',
    ],
    termos: ['dois celulares', 'outro aparelho', 'tablet', 'sincronizar'],
  },
  {
    id: 'app-marcar-passos',
    categoria: 'app',
    pergunta: 'Como eu marco os passos do dia?',
    resposta: [
      'Na aba Hoje, toque no botão do passo que você acabou de fazer, ou no círculo ao lado dele.',
      'Marcou por engano? Toque de novo para desmarcar.',
      'A barra no topo mostra o seu progresso do dia.',
    ],
    termos: ['marcar', 'check', 'concluir', 'desmarcar'],
  },
  {
    id: 'app-sequencia',
    categoria: 'app',
    pergunta: 'O que é a sequência de dias?',
    resposta: [
      'É a contagem de dias seguidos em que você cumpriu pelo menos um passo da rotina.',
      'Serve como um lembrete visual de constância, que é justamente o que mais influencia no resultado.',
      'Se você quebrar a sequência, não tem problema nenhum: recomece no dia seguinte. Ninguém faz 100%.',
    ],
    termos: ['sequencia', 'streak', 'dias seguidos', 'contagem'],
  },
  {
    id: 'app-instalar',
    categoria: 'app',
    pergunta: 'Consigo deixar o aplicativo na tela do celular?',
    resposta: [
      'Consegue. No iPhone, abra no Safari, toque no ícone de compartilhar e escolha "Adicionar à Tela de Início".',
      'No Android, abra no Chrome, toque nos três pontinhos e escolha "Adicionar à tela inicial".',
      'Assim ele fica com ícone próprio, como qualquer outro aplicativo.',
    ],
    termos: ['instalar', 'tela inicial', 'atalho', 'icone'],
  },
  {
    id: 'app-offline',
    categoria: 'app',
    pergunta: 'Funciona sem internet?',
    resposta: [
      'Você precisa de internet para abrir o aplicativo.',
      'Depois de aberto, marcar os passos e ver as suas fotos funciona normalmente, porque esses dados estão no próprio aparelho.',
    ],
    termos: ['offline', 'sem internet', 'dados moveis'],
  },
];

/** Quantidade total de perguntas no banco. */
export const TOTAL_PERGUNTAS = FAQ.length;

/** Perguntas de uma categoria. */
export function perguntasDaCategoria(categoria: CategoriaId): PerguntaFaq[] {
  return FAQ.filter((p) => p.categoria === categoria);
}

/** Remove acentos e baixa a caixa, para a busca funcionar sem acento. */
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Busca simples por termo. Pontua o titulo mais alto que o corpo, para a
 * pergunta mais obvia aparecer primeiro.
 */
export function buscarPerguntas(termo: string): PerguntaFaq[] {
  const alvo = normalizar(termo.trim());
  if (alvo.length < 2) return [];

  const palavras = alvo.split(/\s+/).filter((p) => p.length > 1);
  if (palavras.length === 0) return [];

  const pontuadas = FAQ.map((item) => {
    const titulo = normalizar(item.pergunta);
    const extras = normalizar((item.termos ?? []).join(' '));
    const corpo = normalizar(item.resposta.join(' '));

    let pontos = 0;
    for (const palavra of palavras) {
      if (titulo.includes(palavra)) pontos += 10;
      if (extras.includes(palavra)) pontos += 6;
      if (corpo.includes(palavra)) pontos += 1;
    }
    if (titulo.includes(alvo)) pontos += 15;

    return { item, pontos };
  });

  return pontuadas
    .filter((p) => p.pontos > 0)
    .sort((a, b) => b.pontos - a.pontos)
    .map((p) => p.item);
}
