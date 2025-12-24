import React, { useState } from 'react';
import { LEADER_PROMPTS, SALES_PROMPTS } from '../constants';
import { BarChart3, Briefcase, Sparkles, ChevronRight } from 'lucide-react';

interface WelcomeScreenProps {
  onPromptSelect: (text: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onPromptSelect }) => {
  const [activeTab, setActiveTab] = useState<'leader' | 'sales'>('leader');

  const activePrompts = activeTab === 'leader' ? LEADER_PROMPTS : SALES_PROMPTS;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-4 py-8 animate-fade-in">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-2xl p-6 mb-8 text-center shadow-sm w-full">
        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4 text-brand-600">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">What can I help you with?</h2>
        <p className="text-slate-600 max-w-lg mx-auto text-sm leading-relaxed">
          Ask anything about incentives, leave, territory crediting, and performance insights. 
          I can answer both policy questions and leader-level analytics in the same chat.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-100 rounded-xl mb-6 w-full max-w-md">
        <button
          onClick={() => setActiveTab('leader')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'leader'
              ? 'bg-white text-brand-700 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Analytical Questions
        </button>
        <button
          onClick={() => setActiveTab('sales')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === 'sales'
              ? 'bg-white text-brand-700 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Policy Questions
        </button>
      </div>

      {/* Prompt Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
        {activePrompts.map((prompt) => (
          <button
            key={prompt.id}
            onClick={() => onPromptSelect(prompt.text)}
            className="group flex items-start gap-3 p-4 bg-white border border-slate-200 hover:border-brand-300 hover:shadow-md hover:-translate-y-0.5 rounded-xl transition-all duration-200 text-left w-full"
          >
            <div className={`mt-0.5 p-1.5 rounded-lg flex-shrink-0 transition-colors ${
                activeTab === 'leader' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
            }`}>
              {activeTab === 'leader' ? <BarChart3 className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
            </div>
            <span className="text-sm text-slate-700 group-hover:text-slate-900 leading-snug flex-1">
              {prompt.text}
            </span>
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-400 opacity-0 group-hover:opacity-100 transition-all self-center" />
          </button>
        ))}
      </div>

      <p className="mt-6 text-xs text-slate-400 font-medium">
        Click an example to try it, or type your own below.
      </p>
    </div>
  );
};

export default WelcomeScreen;