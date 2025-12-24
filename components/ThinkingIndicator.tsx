import React from 'react';

const ThinkingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 max-w-[85%] animate-fade-in">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
         <span className="text-sm font-bold text-slate-500">Ai</span>
      </div>
      <div className="flex flex-col gap-1 items-start">
        <span className="text-xs text-slate-400 ml-1">iSales Assistant</span>
        <div className="px-4 py-3 bg-white border border-slate-100 rounded-2xl rounded-tl-none shadow-sm text-slate-600">
          <div className="flex items-center gap-1 h-5">
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThinkingIndicator;
