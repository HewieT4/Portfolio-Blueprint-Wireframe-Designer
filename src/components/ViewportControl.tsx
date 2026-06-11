import React from 'react';
import { Monitor, Tablet, Smartphone, Code, FileText, Sparkles } from 'lucide-react';
import { ViewMode, ViewportSize } from '../types';

interface ViewportControlProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  viewportSize: ViewportSize;
  setViewportSize: (size: ViewportSize) => void;
  selectedSectionName: string;
}

export default function ViewportControl({
  viewMode,
  setViewMode,
  viewportSize,
  setViewportSize,
  selectedSectionName,
}: ViewportControlProps) {
  const sizes = [
    { id: 'desktop' as ViewportSize, name: 'Desktop (1440px)', icon: <Monitor size={16} /> },
    { id: 'tablet' as ViewportSize, name: 'Tablet (1024px)', icon: <Tablet size={16} /> },
    { id: 'mobile' as ViewportSize, name: 'Mobile (420px)', icon: <Smartphone size={16} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-[#0a0a0a] border-b border-zinc-900 text-zinc-300">
      {/* Selector viewports */}
      <div className="flex items-center gap-2">
        <label className="text-xs font-mono uppercase text-zinc-500 mr-2">Viewport Bounds:</label>
        <div className="flex bg-[#050505] p-1 rounded-lg border border-zinc-900">
          {sizes.map((sz) => (
            <button
              key={sz.id}
              onClick={() => setViewportSize(sz.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                viewportSize === sz.id
                  ? 'bg-zinc-900 text-accent-gold font-medium border border-zinc-800'
                  : 'text-zinc-500 hover:text-white hover:bg-zinc-90 w-full hover:bg-zinc-900/40'
              }`}
              title={sz.name}
            >
              {sz.icon}
              <span className="hidden sm:inline">{sz.id.toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selector Mode */}
      <div className="flex items-center gap-2 self-end md:self-auto">
        <label className="text-xs font-mono uppercase text-zinc-500 mr-2">Render Mode:</label>
        <div className="flex bg-[#050505] p-1 rounded-lg border border-zinc-900">
          <button
            onClick={() => setViewMode('wireframe')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-mono transition-all ${
              viewMode === 'wireframe'
                ? 'bg-accent-gold/10 text-accent-gold border border-accent-gold/20 font-medium'
                : 'text-zinc-500 hover:text-white'
            }`}
          >
            <Code size={14} />
            <span>WIREFRAME</span>
          </button>
          <button
            onClick={() => setViewMode('mockup')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-mono transition-all ${
              viewMode === 'mockup'
                ? 'bg-accent-gold/10 text-accent-gold border border-accent-gold/25 font-medium'
                : 'text-zinc-500 hover:text-white'
            }`}
          >
            <Sparkles size={14} />
            <span>HI-FI MOCKUP</span>
          </button>
        </div>
      </div>

      {/* Focus Status Indicator */}
      <div className="hidden lg:flex items-center gap-2 text-xs font-mono">
        <span className="text-zinc-500">INSPECTING:</span>
        <span className="px-2 py-0.5 rounded bg-[#050505] border border-zinc-900 text-accent-gold text-[11px] uppercase tracking-wide">
          {selectedSectionName}
        </span>
      </div>
    </div>
  );
}
