import React from 'react';
import { Monitor, Tablet, Smartphone, Code, Sparkles } from 'lucide-react';
import { ViewMode, ViewportSize, SectionId } from '../types';

interface ViewportControlProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  viewportSize: ViewportSize;
  setViewportSize: (size: ViewportSize) => void;
  selectedSectionId: SectionId;
  setSelectedSectionId: (id: SectionId) => void;
}

export default function ViewportControl({
  viewMode,
  setViewMode,
  viewportSize,
  setViewportSize,
  selectedSectionId,
  setSelectedSectionId,
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
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${
                viewportSize === sz.id
                  ? 'bg-zinc-900 text-accent-gold font-medium border border-zinc-800'
                  : 'text-zinc-500 hover:text-white hover:bg-[#0a0a0a] w-full'
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
      <div className="flex items-center gap-2 self-start md:self-auto">
        <label className="text-xs font-mono uppercase text-zinc-500 mr-2">Render Mode:</label>
        <div className="flex bg-[#050505] p-1 rounded-lg border border-zinc-900">
          <button
            onClick={() => setViewMode('wireframe')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${
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
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-mono transition-all cursor-pointer ${
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

      {/* Focus Status Indicator - Interactive selector for mobile and desktop */}
      <div className="flex items-center justify-between md:justify-start gap-2.5 text-xs font-mono border-t md:border-t-0 border-zinc-90 w-full md:w-auto border-zinc-900/50 pt-2.5 md:pt-0">
        <span className="text-zinc-500 uppercase">Inspecting:</span>
        <div className="relative inline-block w-48 sm:w-56 text-left">
          <select
            value={selectedSectionId}
            onChange={(e) => setSelectedSectionId(e.target.value as SectionId)}
            className="w-full appearance-none bg-[#050505] border border-zinc-800 hover:border-accent-gold/50 text-accent-gold font-medium text-[11px] uppercase tracking-wider py-1.5 pl-3.5 pr-8 rounded-lg focus:outline-none transition-all cursor-pointer shadow-sm"
          >
            <option value="header">Navigation Header</option>
            <option value="hero">Hero Banner</option>
            <option value="about">About Bento Profile</option>
            <option value="skills">Skills Inventory Deck</option>
            <option value="projects">Selected Projects Showcase</option>
            <option value="experience">Historical Experience</option>
            <option value="contact">Contact Dispatch Node</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-accent-gold/70">
            <svg className="fill-current h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
