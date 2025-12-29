const ZAPI_URL = process.env.ZAPI_URL || '';
const ZAPI_TOKEN = process.env.ZAPI_TOKEN || '';
const ZAPI_CLIENT_TOKEN = process.env.ZAPI_CLIENT_TOKEN || '';

export async function enviarResultadoWhatsApp(
  telefone: string,
  nome: string,
  resultado: string
) {
  try {
    const mensagem = `Olá ${nome}! 👋\n\nAqui está o resultado do seu quiz:\n\n${resultado}\n\nEm breve nossa equipe entrará em contato!`;

    const response = await fetch(`${ZAPI_URL}/send-text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-Token': ZAPI_CLIENT_TOKEN,
      },
      body: JSON.stringify({
        phone: telefone,
        message: mensagem,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar mensagem via Z-API');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
    throw error;
  }
}

export async function verificarStatusZAPI() {
  try {
    const response = await fetch(`${ZAPI_URL}/status`, {
      method: 'GET',
      headers: {
        'Client-Token': ZAPI_CLIENT_TOKEN,
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Erro ao verificar status Z-API:', error);
    throw error;
  }
}

