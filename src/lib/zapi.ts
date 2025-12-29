const ZAPI_URL = process.env.ZAPI_URL || '';
const ZAPI_TOKEN = process.env.ZAPI_TOKEN || '';
const ZAPI_CLIENT_TOKEN = process.env.ZAPI_CLIENT_TOKEN || '';

// Verificar se Z-API está configurada
export const isZapiConfigured = (): boolean => {
  return ZAPI_URL.length > 0 && ZAPI_TOKEN.length > 0 && ZAPI_CLIENT_TOKEN.length > 0;
};

export async function enviarResultadoWhatsApp(
  telefone: string,
  nome: string,
  resultado: string
) {
  // Verificar se Z-API está configurada
  if (!isZapiConfigured()) {
    console.warn('Z-API não configurada - mensagem não será enviada');
    return { success: true, message: 'Z-API não configurada (modo dev)' };
  }

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
      const errorData = await response.text();
      console.error('Erro Z-API response:', errorData);
      throw new Error('Erro ao enviar mensagem via Z-API');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
    throw error;
  }
}

export async function verificarStatusZAPI() {
  if (!isZapiConfigured()) {
    return { connected: false, message: 'Z-API não configurada' };
  }

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
