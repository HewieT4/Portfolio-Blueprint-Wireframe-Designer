import React, { useState } from 'react';
import { Layers, GitBranch, Terminal, Globe, Cpu, RefreshCw, Server, Shield } from 'lucide-react';

export default function ArchitectureTab() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const compilationPipeline = [
    {
      step: 1,
      title: 'Local Development & Vite',
      tech: 'React 19 + TypeScript + Vite 6',
      desc: 'The code is written locally using modular TSX components. Vite executes hot-module compilation in memory to speed up feedback loops.',
      metrics: 'HMR compilation speed < 120ms'
    },
    {
      step: 2,
      title: 'GitHub CI Trigger',
      tech: 'GitHub Actions Push Pipeline',
      desc: 'Lint and type-check scripts (tsc --noEmit) validate formatting criteria. Pull requests run branch compilation test beds.',
      metrics: 'QA checklist passes: 100%'
    },
    {
      step: 3,
      title: 'Vite Production Build',
      tech: 'Rollup Bundler Engine',
      desc: 'Vite compiles and minifies public static assets. Image sizes are optimized, and Dead Code is pruned using tree-shaking.',
      metrics: 'Bundle Size Index < 110kb Gzipped'
    },
    {
      step: 4,
      title: 'Vercel Deployment & Edge Ingress',
      tech: 'Vercel CDN Network',
      desc: 'Vercel hosts the compiled static directory on edge nodes worldwide, returning rapid responses in compliance with the WebVitals metric thresholds.',
      metrics: 'Global CDN Response: < 30ms'
    }
  ];

  return (
    <div className="space-y-8 p-6 bg-[#050505] border border-zinc-900 rounded-xl text-[#EDEDED]">
      
      {/* Intro info card */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center pb-6 border-b border-zinc-900">
        <div>
          <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block mb-1">SYSTEM ECOSYSTEM</span>
          <h2 className="font-serif italic font-medium text-2xl text-white">Engineering Architecture</h2>
          <p className="text-zinc-500 text-xs sm:text-xs leading-relaxed max-w-xl mt-1">
            Analyzing Matthews Thekiso\\'s custom developer portfolio framework: detailed from early codebase layouts
            down to modern edge CDN servers.
          </p>
        </div>

        <div className="flex gap-2 text-xs font-mono">
          <span className="px-3 py-1 bg-accent-gold/10 border border-accent-gold/20 text-accent-gold rounded-lg flex items-center gap-1.5 font-medium">
            <Server size={12} /> Live Site Ready
          </span>
        </div>
      </div>

      {/* Visual map showing modular pathways */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visual Map diagram schema */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-serif italic text-xs text-zinc-400 uppercase tracking-wider mb-2">Ecosystem Architecture Flow Diagram</h3>
          
          <div className="border border-zinc-900 bg-[#0a0a0a] p-5 rounded-2xl relative space-y-6">
            
            {/* Visual rows demonstrating data flow */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
              
              {/* Dev node */}
              <div className="w-full sm:w-1/3 p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl relative group hover:border-accent-gold transition-colors">
                <div className="absolute top-1.5 left-2 font-mono text-[8px] text-zinc-500">INITIATOR</div>
                <div className="flex justify-center text-accent-gold mb-2"><Terminal size={18} /></div>
                <span className="text-xs font-mono font-medium block text-white text-[11px]">Developer Workspace</span>
                <p className="text-[10px] text-zinc-500 mt-1 leading-normal font-sans">Compiles React TSX components locally</p>
              </div>

              {/* Connector line on desktop */}
              <div className="hidden sm:flex flex-col justify-center text-zinc-700 text-xs font-mono">
                <span>━━━━▶</span>
                <span className="text-[9px] mt-0.5 text-accent-gold/60">git push</span>
              </div>

              {/* GitHub node */}
              <div className="w-full sm:w-1/3 p-4 bg-zinc-950/60 border border-[#222] rounded-xl relative group hover:border-accent-gold transition-colors">
                <div className="absolute top-1.5 left-2 font-mono text-[8px] text-zinc-500">AUDITOR</div>
                <div className="flex justify-center text-zinc-400 mb-2"><GitBranch size={18} /></div>
                <span className="text-xs font-mono font-medium block text-white text-[11px]">GitHub Actions CI</span>
                <p className="text-[10px] text-zinc-500 mt-1 leading-normal font-sans">Lints files and checks types</p>
              </div>

              {/* Connector line on desktop */}
              <div className="hidden sm:flex flex-col justify-center text-zinc-700 text-xs font-mono font-sans">
                <span>━━━━▶</span>
                <span className="text-[9px] mt-0.5 text-accent-gold/60">Webhooks</span>
              </div>

              {/* Hosting node */}
              <div className="w-full sm:w-1/3 p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl relative group hover:border-accent-gold transition-colors">
                <div className="absolute top-1.5 left-2 font-mono text-[8px] text-zinc-500">ENDPOINT</div>
                <div className="flex justify-center text-accent-gold mb-2"><Globe size={18} /></div>
                <span className="text-xs font-mono font-medium block text-white text-[11px]">Vercel Edge Network</span>
                <p className="text-[10px] text-zinc-500 mt-1 leading-normal font-sans">Hosts optimized static assets</p>
              </div>

            </div>

            <div className="p-4 bg-zinc-950/20 border border-zinc-900 rounded-xl space-y-2">
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block">Production Client Layers</span>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                <span className="px-2 py-1 bg-zinc-950 rounded border border-zinc-900">UI LAYER: React JS 19</span>
                <span className="px-2 py-1 bg-zinc-905 rounded border border-zinc-900">STYLING: Tailwind CSS v4.0</span>
                <span className="px-2 py-1 bg-zinc-905 rounded border border-zinc-900">ANIMATION: Motion SDK</span>
                <span className="px-2 py-1 bg-zinc-905 rounded border border-zinc-900">ROUTER: Hash-based Anchors</span>
              </div>
            </div>

          </div>
        </div>

        {/* Compile pipelines step selector */}
        <div className="space-y-4">
          <h3 className="font-serif italic text-xs text-zinc-400 uppercase tracking-wider">Compilation Pipeline</h3>
          
          <div className="space-y-3">
            {compilationPipeline.map((pip) => (
              <div 
                key={pip.step}
                onClick={() => setActiveStep(pip.step)}
                className={`p-3 border rounded-xl transition-all cursor-pointer ${
                  activeStep === pip.step
                    ? 'bg-[#0a0a0a] border-zinc-800 shadow-md'
                    : 'bg-zinc-950/20 border-zinc-950 hover:border-zinc-800'
                }`}
              >
                <div className="flex justify-between items-center text-[10px] font-mono mb-1">
                  <span className={`${activeStep === pip.step ? 'text-accent-gold font-bold' : 'text-zinc-500'}`}>0{pip.step} — STEP</span>
                  <span className="px-1.5 py-0.5 bg-zinc-950 border border-zinc-900 rounded text-zinc-400">{pip.tech}</span>
                </div>
                <h4 className="font-sans font-semibold text-xs text-white mt-1">{pip.title}</h4>
                {activeStep === pip.step && (
                  <div className="mt-3.5 space-y-2 font-sans text-xs">
                    <p className="text-zinc-400 text-[11px] leading-relaxed">{pip.desc}</p>
                    <div className="pt-2 border-t border-zinc-900 flex justify-between items-center text-[9px] font-mono text-accent-gold">
                      <span>PERFORMANCE INDICATIVE:</span>
                      <span className="bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-900">{pip.metrics}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
