import React, { useState } from 'react';
import { Copy, Check, RotateCcw, AlertCircle, User } from 'lucide-react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  onRetry?: () => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onRetry }) => {
  const isUser = message.role === 'user';
  const isError = message.status === 'error';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div
      className={`group flex items-start gap-3 max-w-full ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      } animate-fade-in mb-6`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border shadow-sm ${
          isUser
            ? 'bg-brand-600 border-brand-700 text-white'
            : 'bg-white border-slate-200 text-slate-600'
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5" />
        ) : (
          <span className="text-xs font-bold">Ai</span>
        )}
      </div>

      {/* Bubble Container */}
      <div className={`flex flex-col max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
        
        {/* Name Label */}
        <span className="text-xs text-slate-400 mb-1 mx-1">
          {isUser ? 'You' : 'iSales Assistant'}
        </span>

        {/* The Bubble */}
        <div
          className={`relative px-4 py-3 rounded-2xl shadow-sm text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words ${
            isUser
              ? 'bg-brand-600 text-white rounded-tr-none'
              : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
          } ${isError ? 'border-red-300 bg-red-50 text-red-800' : ''}`}
        >
          {message.content}
        </div>

        {/* Actions / Status */}
        <div className="flex items-center gap-2 mt-1 mx-1 h-5">
          {isError ? (
            <div className="flex items-center gap-2 text-xs text-red-600 font-medium">
              <AlertCircle className="w-3 h-3" />
              <span>Could not reach server.</span>
              {onRetry && (
                <button 
                  onClick={onRetry}
                  className="underline hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                >
                  Retry?
                </button>
              )}
            </div>
          ) : (
             // Only show copy button for bot messages or successful user messages, on hover
            !isUser && (
              <button
                onClick={handleCopy}
                className={`opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 ${
                  copied ? 'text-green-600 hover:text-green-700' : ''
                }`}
                title="Copy message"
                aria-label="Copy message"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>
            )
          )}
          
          {/* Timestamp (Optional polish) */}
          <span className="text-[10px] text-slate-300">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
