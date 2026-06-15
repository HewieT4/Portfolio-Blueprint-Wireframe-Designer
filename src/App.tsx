import React, { useState } from 'react';
import { 
  Layers, Settings, SlidersHorizontal, Terminal, Info, 
  ExternalLink, ArrowUpRight, Github, Monitor, Compass, Sparkles
} from 'lucide-react';

import { ViewMode, ViewportSize, ActiveTab, SectionId } from './types';
import { portfolioSections } from './data/portfolioData';

import ViewportControl from './components/ViewportControl';
import PortfolioRenderer from './components/PortfolioRenderer';
import InspectorPanel from './components/InspectorPanel';
import ArchitectureTab from './components/ArchitectureTab';
import DesignSystemTab from './components/DesignSystemTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inspector');
  const [viewMode, setViewMode] = useState<ViewMode>('wireframe');
  const [viewportSize, setViewportSize] = useState<ViewportSize>('desktop');
  const [selectedSectionId, setSelectedSectionId] = useState<SectionId>('hero');
  const [mobileSubTab, setMobileSubTab] = useState<'preview' | 'inspector'>('preview');

  const handleSelectSection = (id: SectionId) => {
    setSelectedSectionId(id);
    setMobileSubTab('inspector');
  };

  // Find currently inspected layout section
  const currentSection = portfolioSections.find(s => s.id === selectedSectionId) || portfolioSections[0];

  const exploreTabs = [
    { id: 'inspector' as const, name: 'Wireframes Showcase', mobileName: 'Wireframe', icon: <SlidersHorizontal size={14} /> },
    { id: 'architecture' as const, name: 'System Architecture', mobileName: 'System', icon: <Layers size={14} /> },
    { id: 'tokens' as const, name: 'Design System Tokens', mobileName: 'Tokens', icon: <Settings size={14} /> },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#EDEDED] font-sans selection:bg-accent-gold/30 selection:text-white">
      
      {/* Absolute ambient top grid lighting aura */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-accent-gold/5 via-transparent to-transparent pointer-events-none"></div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 relative z-10">
        
        {/* Top Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center p-8 bg-[#0a0a0a] border border-zinc-900 rounded-xl gap-6">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="p-1 px-2 bg-accent-gold/10 border border-accent-gold/20 text-accent-gold rounded text-[9px] font-mono uppercase tracking-wider">
                  ACTIVE_NODE // VER_2.1
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-semibold">Interactive UX Showcase</span>
              </div>
              <div className="space-y-1">
                <h1 className="font-serif font-semibold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-none">
                  Hews <span className="text-accent-gold italic font-medium">Port Designer</span>
                </h1>
                <p className="font-mono text-xs text-zinc-450 tracking-wide">
                  Architectural Portfolio Blueprint & Schematic Viewer
                </p>
              </div>
              <p className="text-zinc-500 text-[11px]">
                Deconstructing dynamic layouts, blueprints, design tokens, and compiled specifications for Matthews Thekiso.
              </p>
            </div>
          </div>

          {/* Core Explorer mode Tabs (Optimized responsive grid, no scroll bar) */}
          <div className="grid grid-cols-3 bg-zinc-950 p-1 rounded-lg border border-zinc-900 w-full md:w-auto gap-1">
            {exploreTabs.map((tb) => (
              <button
                key={tb.id}
                onClick={() => setActiveTab(tb.id)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 py-2 sm:px-3.5 sm:py-2 rounded-md text-[10px] sm:text-xs font-mono transition-all uppercase cursor-pointer ${
                  activeTab === tb.id
                    ? 'bg-zinc-900 text-white border border-zinc-805 border-zinc-800 font-medium shadow'
                    : 'text-zinc-500 hover:text-white hover:bg-zinc-90 w-full hover:bg-zinc-900/40'
                }`}
              >
                {tb.icon}
                <span className="hidden sm:inline leading-none">{tb.name}</span>
                <span className="sm:hidden leading-none text-[9px]">{tb.mobileName}</span>
              </button>
            ))}
          </div>
        </header>

        {/* Dynamic workspace context based on primary Selection tab */}
        {activeTab === 'inspector' && (
          <div className="space-y-4">
            
            {/* Viewport bar controls */}
            <ViewportControl 
              viewMode={viewMode}
              setViewMode={setViewMode}
              viewportSize={viewportSize}
              setViewportSize={setViewportSize}
              selectedSectionId={selectedSectionId}
              setSelectedSectionId={handleSelectSection}
            />

            {/* Mobile/Tablet view toggle for narrow screens (below 1024px) */}
            <div className="flex lg:hidden bg-zinc-950 p-1.5 rounded-xl border border-zinc-900 gap-2 w-full shadow-lg">
              <button
                onClick={() => setMobileSubTab('preview')}
                className={`flex-1 py-2 sm:py-2.5 rounded-lg text-2xs sm:text-xs font-mono transition-all uppercase cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                  mobileSubTab === 'preview'
                    ? 'bg-zinc-900 border border-zinc-800 text-accent-gold font-semibold shadow-inner'
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold"></span>
                <span>1. Showcase Preview</span>
              </button>
              <button
                onClick={() => setMobileSubTab('inspector')}
                className={`flex-1 py-2 sm:py-2.5 rounded-lg text-2xs sm:text-xs font-mono transition-all uppercase cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                  mobileSubTab === 'inspector'
                    ? 'bg-zinc-900 border border-zinc-800 text-accent-gold font-semibold shadow-inner'
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse"></span>
                <span>2. Spec Inspector</span>
              </button>
            </div>

            {/* Main Interactive Split panel grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              
              {/* Left Column - Scrollable Stage showing either wireframe outline or mock site */}
              <div className={`lg:col-span-7 space-y-4 ${
                mobileSubTab === 'preview' ? 'block' : 'max-lg:hidden'
              }`}>
                <div className="flex justify-between items-center px-2 text-[10px] font-mono">
                  <span className="text-zinc-500 flex items-center gap-1">
                    <Compass size={12} className="text-accent-gold" />
                    CLICK ANY BLOCK BELOW TO INSPECT BLUEPRINT DETAILS IN RIGHT PANEL
                  </span>
                  <span className="hidden sm:inline-block text-zinc-650">Viewport dynamic scale enabled</span>
                </div>

                <div className="bg-[#080808] p-3 sm:p-5 rounded-xl border border-zinc-900 min-h-[400px] flex items-center justify-center">
                  <PortfolioRenderer 
                    viewMode={viewMode}
                    viewportSize={viewportSize}
                    selectedSectionId={selectedSectionId}
                    setSelectedSectionId={handleSelectSection}
                  />
                </div>
              </div>

              {/* Right Column - Spec blueprint Inspector details */}
              <div className={`lg:col-span-5 h-full self-stretch md:sticky md:top-6 ${
                mobileSubTab === 'inspector' ? 'block' : 'max-lg:hidden'
              }`}>
                <InspectorPanel section={currentSection} />
              </div>

            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <ArchitectureTab />
        )}

        {activeTab === 'tokens' && (
          <DesignSystemTab />
        )}

        {/* Informative Footer */}
        <footer className="p-6 bg-[#0a0a0a] border border-zinc-900 rounded-xl text-center space-y-2">
          <p className="text-[11px] font-mono text-zinc-600">
            COMPLIANT WEB LAYOUT SPECIFICATION MATRIX // STACK EXPLO: VITE + REACT
          </p>
          <p className="text-[12px] sm:text-xs text-zinc-500 font-sans max-w-xl mx-auto">
            This showcase designer presents architectural wireframes, exact responsive behavior parameters, 
            styling layout values, and real React code snippets for Matthews Thekiso\\'s Vercel-hosted portfolio site.
          </p>
        </footer>

      </div>
    </div>
  );
}
