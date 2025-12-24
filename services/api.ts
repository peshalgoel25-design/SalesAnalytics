import { WEBHOOK_URL } from '../constants';
import { Message, WebhookPayload, WebhookResponse } from '../types';

export const sendToWebhook = async (
  conversationId: string,
  messages: Message[],
  latestUserMessage: string
): Promise<string> => {
  
  // Prepare payload based on requirements
  // "messages array" usually implies history context for LLMs
  const messageHistory = messages.map(m => ({
    role: m.role,
    content: m.content
  }));

  const payload: WebhookPayload = {
    conversation_id: conversationId,
    messages: messageHistory,
    latest_user_message: latestUserMessage,
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data: WebhookResponse = await response.json();

    // Normalise response - handle flexible formats
    if (typeof data === 'string') return data;
    if (data.output && typeof data.output === 'string') return data.output;
    if (data.text && typeof data.text === 'string') return data.text;
    if (data.message && typeof data.message === 'string') return data.message;
    if (data.reply && typeof data.reply === 'string') return data.reply;
    
    // Fallback if structure is unknown but JSON is valid
    return JSON.stringify(data);

  } catch (error) {
    console.error('Webhook error:', error);
    throw error;
  }
};
