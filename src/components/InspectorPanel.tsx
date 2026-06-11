import React, { useState } from 'react';
import { 
  FileText, Activity, Code, Settings, Copy, Check, Info, ArrowUpRight, CheckCircle
} from 'lucide-react';
import { PortfolioSection } from '../types';

interface InspectorPanelProps {
  section: PortfolioSection;
}

export default function InspectorPanel({ section }: InspectorPanelProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'functionality' | 'code' | 'tokens'>('overview');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(section.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'overview' as const, name: 'Overview', icon: <Info size={14} /> },
    { id: 'functionality' as const, name: 'Functionality Map', icon: <Activity size={14} /> },
    { id: 'code' as const, name: 'Code Blueprint', icon: <Code size={14} /> },
    { id: 'tokens' as const, name: 'Design Tokens', icon: <Settings size={14} /> },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] border border-zinc-900 rounded-xl overflow-hidden shadow-xl text-[#EDEDED]">
      
      {/* Header Info */}
      <div className="p-4 bg-[#050505] border-b border-zinc-90 w-full border-zinc-900">
        <span className="text-[10px] font-mono uppercase tracking-wider text-accent-gold">Blueprint inspector</span>
        <h2 className="font-serif italic text-base sm:text-lg text-white mt-1">{section.title}</h2>
        <p className="text-zinc-500 font-sans text-xs mt-1 leading-relaxed">{section.concept}</p>
      </div>

      {/* Tabs list */}
      <div className="flex overflow-x-auto bg-[#050505]/50 border-b border-zinc-900 p-1 gap-1">
        {tabs.map((tb) => (
          <button
            key={tb.id}
            onClick={() => setActiveTab(tb.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all uppercase whitespace-nowrap cursor-pointer ${
              activeTab === tb.id
                ? 'bg-zinc-90 w-full bg-zinc-900 hover:text-white border border-zinc-800 text-white font-medium'
                : 'text-zinc-500 hover:text-white'
            }`}
          >
            {tb.icon}
            <span>{tb.name}</span>
          </button>
        ))}
      </div>

      {/* Dynamic Tab Body */}
      <div className="flex-1 p-5 overflow-y-auto min-h-[300px] max-h-[580px] bg-[#0a0a0a]">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">Architectural Overview</h3>
              <p className="text-zinc-300 text-xs sm:text-xs leading-relaxed bg-[#050505]/60 p-3.5 rounded-lg border border-zinc-900">
                {section.overview}
              </p>
            </div>

            <div className="p-4 bg-accent-gold/5 border border-accent-gold/20 rounded-lg space-y-2.5">
              <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block font-bold">Recommended UX Goal</span>
              <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                Minimize scroll fatigue by limiting visual noise and focusing purely on clean interactive checkpoints. 
                Keep key deliverables in view with sticky positions or quick contextual badges that highlight when nodes enter the viewport bounds.
              </p>
            </div>
            
            <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
              <CheckCircle size={13} className="text-accent-gold" />
              <span>Full compliance verified down the mobile viewport scale range</span>
            </div>
          </div>
        )}

        {activeTab === 'functionality' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">Interactive Event Map</h3>
            <div className="space-y-3">
              {section.functionalities.map((item, idx) => (
                <div key={idx} className="p-3 bg-[#050505] rounded-lg border border-zinc-900 space-y-2 animate-feed">
                  <div className="flex justify-between items-center bg-zinc-900 px-2 py-1.5 rounded border border-zinc-805 border-zinc-800">
                    <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest">⚡ TRIGGER</span>
                    <span className="text-[10px] text-white font-sans font-medium">{item.trigger}</span>
                  </div>
                  <div className="text-xs space-y-1 pl-1">
                    <p className="text-zinc-400"><strong className="text-[10px] text-zinc-650 mr-1 uppercase font-mono">Action:</strong> {item.action}</p>
                    <p className="text-zinc-500 text-[11px] leading-relaxed"><strong className="text-[10px] text-zinc-650 mr-1 uppercase font-mono">Response:</strong> {item.behavior}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-zinc-950/50 border border-zinc-90 w-full border-zinc-900 rounded-lg text-[10px] text-zinc-500 leading-relaxed font-sans">
              * Note: In the live preview, click and interact with components to observe these triggers and feedback states in real-time.
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-3 flex flex-col h-full">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-zinc-500 uppercase tracking-widest">TSX REACT BLUEPRINT</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-95 w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:text-white rounded text-[10px] transition-all cursor-pointer font-medium"
              >
                {copied ? (
                  <>
                    <Check size={11} className="text-accent-gold" />
                    <span className="text-accent-gold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={11} />
                    <span>Copy Blueprint</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="relative overflow-hidden border border-zinc-90 w-full border-zinc-900 rounded-lg bg-[#050505] flex-1">
              <pre className="p-4 overflow-x-auto text-[10px] text-zinc-400 font-mono leading-relaxed max-h-[380px] max-w-full">
                <code>{section.codeSnippet}</code>
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'tokens' && (
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">Staggered Layout Tokens</h3>
            <div className="grid grid-cols-1 gap-3 font-mono text-[11px]">
              
              <div className="p-2.5 bg-[#050505] border border-zinc-90 w-full border-zinc-900 rounded flex justify-between items-start">
                <span className="text-zinc-500 uppercase">CSS Layout Structure</span>
                <span className="text-zinc-300 font-sans max-w-[180px] text-right">{section.designTokens.layout}</span>
              </div>

              <div className="p-2.5 bg-[#050505] border border-zinc-90 w-full border-zinc-900 rounded flex justify-between items-center">
                <span className="text-zinc-500 uppercase">Spacers / Padding</span>
                <span className="text-zinc-300 font-sans">{section.designTokens.padding}</span>
              </div>

              <div className="p-2.5 bg-[#050505] border border-zinc-90 w-full border-zinc-900 rounded flex justify-between items-start">
                <span className="text-zinc-500 uppercase">UI Typography</span>
                <span className="text-zinc-300 font-sans max-w-[180px] text-right">{section.designTokens.typography}</span>
              </div>

              <div className="p-2.5 bg-[#050505] border border-zinc-90 w-full border-zinc-900 rounded flex justify-between items-start">
                <span className="text-zinc-500 uppercase">Color Gradients</span>
                <span className="text-zinc-[#C0A080] font-sans max-w-[180px] text-right">#050505 & #C0A080 Accent</span>
              </div>

              <div className="p-2.5 bg-[#050505] border border-zinc-90 w-full border-zinc-900 rounded flex justify-between items-start">
                <span className="text-zinc-500 uppercase">Animations Loop</span>
                <span className="text-zinc-300 font-sans max-w-[180px] text-right">{section.designTokens.animations}</span>
              </div>

            </div>
          </div>
        )}
      </div>

    </div>
  );
}
