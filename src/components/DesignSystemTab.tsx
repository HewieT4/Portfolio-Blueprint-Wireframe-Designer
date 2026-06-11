import React, { useState } from 'react';
import { Copy, Check, Type, Droplet, Move, Layout } from 'lucide-react';

export default function DesignSystemTab() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyColorToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  const colors = [
    { title: 'Canvas BG', hex: '#050505', tw: 'bg-[#050505]', description: 'Primary root black backdrop' },
    { title: 'Bento Surface BG', hex: '#0a0a0a', tw: 'bg-[#0a0a0a]', description: 'Surgical dark card layout panel' },
    { title: 'Canvas Layout', hex: '#080808', tw: 'bg-[#080808]', description: 'Middle staging level layout surface' },
    { title: 'Subtle Borders', hex: 'rgba(255,255,255,0.08)', tw: 'bg-white/10', description: 'Delimiting fine outline vectors' },
    { title: 'Primary Gold Accent', hex: '#C0A080', tw: 'bg-accent-gold', description: 'Luxurious warm gold accent details' },
    { title: 'Primary Text', hex: '#EDEDED', tw: 'bg-zinc-200', description: 'Neutral high contrast text' },
  ];

  const spacingScales = [
    { id: 'S-1', size: '4px', usage: 'Capsule margins, border gap, dots layout' },
    { id: 'S-2', size: '12px', usage: 'Card subitem spacing, tag rows outer offsets' },
    { id: 'S-3', size: '20px', usage: 'Inner margins inside standard Grid components' },
    { id: 'S-4', size: '24px', usage: 'Default padding for mobile view cells' },
    { id: 'S-5', size: '48px', usage: 'Desktop container gaps and separation blocks' },
    { id: 'S-6', size: '96px', usage: 'Vertical spacer heights for sections (Hero to About)' },
  ];

  return (
    <div className="space-y-8 p-6 bg-zinc-950 border border-zinc-900 rounded-xl text-zinc-300">
      
      {/* Tab info heading */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center pb-6 border-b border-zinc-900">
        <div>
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">DESIGN LANGUAGE</span>
          <h2 className="font-display font-semibold text-2xl text-white">Visual Design System Tokens</h2>
          <p className="text-zinc-500 text-xs sm:text-xs leading-relaxed max-w-xl mt-1">
            Analyzing visual properties, typography selections, and layout geometries constructed inside Matthews Thekiso\\'s UI components.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Color swatches */}
        <div className="space-y-4">
          <h3 className="font-display font-medium text-xs text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Droplet size={14} className="text-teal-400" /> Dynamic Swatches palette (Click to Copy Hex)
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {colors.map((c) => (
              <div 
                key={c.hex}
                onClick={() => copyColorToClipboard(c.hex)}
                className="p-3 bg-zinc-90 w-full bg-zinc-900 border border-zinc-850 hover:border-zinc-700 rounded-xl cursor-pointer select-none transition-all group relative active:scale-95"
              >
                <div className={`h-12 w-full rounded-md ${c.tw} mb-3.5 border border-zinc-800/40 relative flex items-center justify-center`}>
                  {copiedColor === c.hex && (
                    <span className="bg-zinc-950/90 text-emerald-450 px-2 py-0.5 rounded text-[9px] font-mono border border-emerald-500/20 text-emerald-450">
                      HEX COPIED
                    </span>
                  )}
                </div>
                <div className="font-display text-[11px] font-semibold text-zinc-200">{c.title}</div>
                <div className="font-mono text-[9px] text-zinc-500 flex justify-between items-center mt-0.5">
                  <span>{c.hex}</span>
                  <Copy size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </div>
                <p className="text-[10px] text-zinc-450 mt-1 leading-relaxed font-sans">{c.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Typography settings */}
        <div className="space-y-4">
          <h3 className="font-display font-medium text-xs text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Type size={14} className="text-accent-gold" /> Typography Matrix
          </h3>

          <div className="space-y-4 p-5 bg-[#0a0a0a] border border-zinc-900 rounded-2xl">
            
            {/* Display Font details */}
            <div className="space-y-1 pb-4 border-b border-zinc-900">
              <div className="flex justify-between items-baseline text-[10px] font-mono">
                <span className="text-accent-gold font-bold uppercase">Display Headings</span>
                <span className="text-zinc-500">Playfair Display / Georgia (Serif, Elegant italic)</span>
              </div>
              <p className="font-serif text-lg py-1 italic text-white tracking-tight">
                Architectural Performance Ecosystem
              </p>
              <span className="text-[9px] text-zinc-500 font-mono">Usage: Nav identities, elegant section headers, hero statements, UX Wireframe title</span>
            </div>

            {/* Standard Copy font */}
            <div className="space-y-1 pb-4 border-b border-[#0f0f0f]">
              <div className="flex justify-between items-baseline text-[10px] font-mono">
                <span className="text-accent-gold font-bold uppercase">Standard Copy & Body</span>
                <span className="text-zinc-500">Inter Sans (Geometrical bounds)</span>
              </div>
              <p className="font-sans text-xs tracking-wide py-1 text-zinc-400 leading-relaxed max-w-sm">
                Hi, I'm Matthews Thekiso. I construct robust visual components, coordinate databases, and integrate API modules.
              </p>
              <span className="text-[9px] text-zinc-500 font-mono">Usage: Biographies, list definitions, timeline cards achievements</span>
            </div>

            {/* JetBrains Mono font */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline text-[10px] font-mono">
                <span className="text-accent-gold font-bold uppercase">Monospace Metadata</span>
                <span className="text-zinc-500">JetBrains Mono (Logical alignments)</span>
              </div>
              <p className="font-mono text-xs tracking-normal py-1 text-zinc-300">
                const gatewayUrl = "api/dispatches";
              </p>
              <span className="text-[9px] text-zinc-500 font-mono">Usage: Layout metrics labels, component blueprints tags, form names</span>
            </div>

          </div>
        </div>

        {/* Corner Radiuses and spacing details */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-display font-medium text-xs text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Move size={14} className="text-accent-gold" /> Gaps & Spaces Hierarchy Grid
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {spacingScales.map((sp) => (
              <div key={sp.id} className="p-3 bg-zinc-900/30 border border-zinc-900 rounded-xl relative">
                <div className="absolute top-1.5 right-2 font-mono text-[8px] text-zinc-500">{sp.id}</div>
                <div className="font-display font-bold text-base text-white">{sp.size}</div>
                <div className="h-1 bg-accent-gold/20 rounded w-1/3 mt-1.5"></div>
                <p className="text-[10px] text-zinc-450 mt-4 leading-relaxed font-sans">{sp.usage}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
