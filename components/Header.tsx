import React from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';
import { APP_NAME, APP_SUBTITLE } from '../constants';

interface HeaderProps {
  onClear: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClear }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-200">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-50 rounded-lg">
            <MessageSquare className="w-6 h-6 text-brand-600" />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 text-lg leading-tight tracking-tight">
              {APP_NAME}
            </h1>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              {APP_SUBTITLE}
            </p>
          </div>
        </div>
        
        <button
          onClick={onClear}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
          title="Clear conversation"
          aria-label="Clear conversation"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};

export default Header;
