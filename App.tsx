import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import MessageBubble from './components/MessageBubble';
import WelcomeScreen from './components/WelcomeScreen';
import Composer from './components/Composer';
import ThinkingIndicator from './components/ThinkingIndicator';
import { Message, Conversation } from './types';
import { getStoredConversation, saveStoredConversation, clearStoredConversation } from './services/storage';
import { sendToWebhook } from './services/api';

const App: React.FC = () => {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [composerInput, setComposerInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize from storage
  useEffect(() => {
    const stored = getStoredConversation();
    setConversation(stored);
  }, []);

  // Persist to storage whenever conversation changes
  useEffect(() => {
    if (conversation) {
      saveStoredConversation(conversation);
    }
  }, [conversation]);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation?.messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!conversation) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
      status: 'sent',
    };

    // Optimistic Update
    const updatedMessages = [...conversation.messages, userMessage];
    setConversation({
      ...conversation,
      messages: updatedMessages,
    });
    setIsLoading(true);

    try {
      const responseText = await sendToWebhook(conversation.id, updatedMessages, text);

      const botMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: responseText,
        timestamp: Date.now(),
        status: 'sent',
      };

      setConversation(prev => 
        prev ? { ...prev, messages: [...prev.messages, botMessage] } : null
      );
    } catch (error) {
      // Mark last message as failed or add system error? 
      // User requirements say "Inline error bubble from assistant".
      // We'll create a temporary error message that allows retry.
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant', // Display as assistant bubble for alignment
        content: '', // Content is empty, handled by status='error' in component
        timestamp: Date.now(),
        status: 'error',
      };
      
      setConversation(prev => 
        prev ? { ...prev, messages: [...prev.messages, errorMessage] } : null
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = async () => {
    if (!conversation) return;
    
    // Find the last user message to resend
    // Filter out the error message from history
    const validMessages = conversation.messages.filter(m => m.status !== 'error');
    const lastUserMessage = [...validMessages].reverse().find(m => m.role === 'user');

    if (lastUserMessage) {
      // Remove the error message from state
      setConversation({ ...conversation, messages: validMessages });
      // Resend
      await handleSendMessage(lastUserMessage.content);
    }
  };

  const handleClear = () => {
    const newConv = clearStoredConversation();
    setConversation(newConv);
  };

  const handlePromptSelect = (text: string) => {
    setComposerInput(text);
  };

  if (!conversation) return null; // Or a loading spinner

  const isEmpty = conversation.messages.length === 0;

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans">
      <Header onClear={handleClear} />

      {/* Main Chat Area */}
      <main className="flex-1 overflow-y-auto w-full">
        <div className="max-w-4xl mx-auto px-4 py-6 min-h-full flex flex-col">
          
          {isEmpty ? (
            <div className="flex-1 flex flex-col justify-center pb-20">
               <WelcomeScreen onPromptSelect={handlePromptSelect} />
            </div>
          ) : (
            <div className="flex flex-col justify-end min-h-0">
               {/* Spacer for top header */}
               <div className="h-4"></div>
               
               {conversation.messages.map((msg) => (
                 <MessageBubble 
                    key={msg.id} 
                    message={msg} 
                    onRetry={msg.status === 'error' ? handleRetry : undefined}
                 />
               ))}
               
               {isLoading && <ThinkingIndicator />}
               
               <div ref={chatEndRef} className="h-4" />
            </div>
          )}
        </div>
      </main>

      <Composer 
        onSend={handleSendMessage} 
        isLoading={isLoading} 
        initialValue={composerInput}
        onClearInitialValue={() => setComposerInput('')}
      />
    </div>
  );
};

export default App;
