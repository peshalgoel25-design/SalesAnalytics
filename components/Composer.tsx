import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';
import { DISCLAIMER_TEXT } from '../constants';

interface ComposerProps {
  onSend: (text: string) => void;
  isLoading: boolean;
  initialValue?: string;
  onClearInitialValue?: () => void;
}

const Composer: React.FC<ComposerProps> = ({ 
  onSend, 
  isLoading, 
  initialValue = '',
  onClearInitialValue 
}) => {
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync initialValue (from suggested prompt) into local state
  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
      // We also want to focus the input so user can hit enter
      if (textareaRef.current) {
        textareaRef.current.focus();
        adjustHeight();
      }
      if (onClearInitialValue) onClearInitialValue();
    }
  }, [initialValue, onClearInitialValue]);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto'; // Reset to calculate true shrink
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`; // Max height approx 5 lines
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    adjustHeight();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!value.trim() || isLoading) return;
    onSend(value.trim());
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.focus();
    }
  };

  const isDisabled = !value.trim() || isLoading;

  return (
    <div className="sticky bottom-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 pb-safe">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="relative flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-brand-100 focus-within:border-brand-400 transition-all shadow-sm">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about sales policies or performance..."
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-3 px-2 text-slate-800 placeholder:text-slate-400 text-base max-h-[120px] disabled:opacity-50"
          />
          <button
            onClick={handleSubmit}
            disabled={isDisabled}
            className={`p-3 rounded-xl flex-shrink-0 transition-all duration-200 ${
              isDisabled
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-brand-600 text-white shadow-md hover:bg-brand-700 active:scale-95'
            }`}
            aria-label="Send message"
          >
            <SendHorizontal className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex justify-between items-start mt-2 px-1">
          <p className="text-[10px] sm:text-xs text-slate-400">
             Enter to send · Shift+Enter for new line
          </p>
          <p className="text-[10px] text-slate-300 max-w-[200px] sm:max-w-xs text-right hidden sm:block">
            {DISCLAIMER_TEXT}
          </p>
        </div>
        {/* Mobile-only disclaimer appearing below */}
        <p className="text-[10px] text-slate-300 mt-1 text-center sm:hidden block px-4">
           {DISCLAIMER_TEXT}
        </p>
      </div>
    </div>
  );
};

export default Composer;
