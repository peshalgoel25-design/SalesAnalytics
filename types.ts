export type Role = 'user' | 'assistant';

export type MessageStatus = 'sending' | 'sent' | 'error';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  status?: MessageStatus;
}

export interface Conversation {
  id: string;
  messages: Message[];
  createdAt: number;
}

export interface PromptExample {
  id: string;
  text: string;
  category: 'leader' | 'sales';
}

export interface WebhookPayload {
  conversation_id: string;
  messages: Array<{ role: string; content: string }>;
  latest_user_message: string;
}

export interface WebhookResponse {
  [key: string]: any; 
  // We expect flexible formats, typically { output: string } or { text: string }
}