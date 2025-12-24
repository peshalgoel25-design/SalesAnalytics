import { Conversation, Message } from '../types';

const STORAGE_KEY = 'isales_conversation_v1';

export const getStoredConversation = (): Conversation => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to parse conversation from storage', e);
  }

  // Return new default conversation if none exists
  return {
    id: crypto.randomUUID(),
    messages: [],
    createdAt: Date.now(),
  };
};

export const saveStoredConversation = (conversation: Conversation): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversation));
  } catch (e) {
    console.error('Failed to save conversation', e);
  }
};

export const clearStoredConversation = (): Conversation => {
  localStorage.removeItem(STORAGE_KEY);
  return getStoredConversation();
};
