import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Sun, Moon, ArrowRight, Download, Github, Linkedin, 
  Mail, ShieldCheck, Cpu, Code2, FolderClosed, ExternalLink, 
  Briefcase, Send, CheckCircle, MapPin, Layers, Layout, Grid, Maximize2
} from 'lucide-react';
import { ViewMode, ViewportSize, SectionId, ProjectData, ExperienceData } from '../types';
import { mockProjects, mockExperience } from '../data/portfolioData';

interface PortfolioRendererProps {
  viewMode: ViewMode;
  viewportSize: ViewportSize;
  selectedSectionId: SectionId;
  setSelectedSectionId: (id: SectionId) => void;
}

export default function PortfolioRenderer({
  viewMode,
  viewportSize,
  selectedSectionId,
  setSelectedSectionId,
}: PortfolioRendererProps) {
  // Mock interactions for high fidelity mockup
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);
  const [cvDownloading, setCvDownloading] = useState(false);
  const [cvDownloadedSuccess, setCvDownloadedSuccess] = useState(false); // custom refined inline feedback
  const [activeSkillTab, setActiveSkillTab] = useState<'all' | 'front' | 'back' | 'tools'>('all');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  // Interactive simulation index for the wireframe deconstruct layouts
  const [simIndex, setSimIndex] = useState(0);

  // Interval timer for driving simulated interaction inputs, highlights, and traces
  useEffect(() => {
    const interval = setInterval(() => {
      setSimIndex((idx) => {
        if (idx >= 220) return 0;
        return idx + 1;
      });
    }, 180); // ultra-smooth 180ms progress frequency
    return () => clearInterval(interval);
  }, []);

  const targetName = "Sarah Jenkins";
  const targetEmail = "sarah@nexusapi.io";
  const targetMsg = "Loved the Maratto Africa checkout APIs! Let's build a payment pipeline.";

  // Derived simulation properties for the contact form wireframe
  const isTypingName = simIndex >= 0 && simIndex < 20;
  const isTypingEmail = simIndex >= 25 && simIndex < 50;
  const isTypingMsg = simIndex >= 55 && simIndex < 115;
  const isHoveringSubmit = simIndex >= 115 && simIndex < 125;
  const isSendingSim = simIndex >= 125 && simIndex < 155;
  const isSuccessSim = simIndex >= 155 && simIndex < 195;

  const simTypedName = isTypingName 
    ? targetName.slice(0, Math.floor((simIndex / 20) * targetName.length))
    : (simIndex >= 20 ? targetName : '');

  const simTypedEmail = isTypingEmail
    ? targetEmail.slice(0, Math.floor(((simIndex - 25) / 25) * targetEmail.length))
    : (simIndex >= 50 ? targetEmail : '');

  const simTypedMsg = isTypingMsg
    ? targetMsg.slice(0, Math.floor(((simIndex - 55) / 60) * targetMsg.length))
    : (simIndex >= 115 ? targetMsg : '');

  const simSendProgress = isSendingSim
    ? Math.floor(((simIndex - 125) / 30) * 100)
    : (simIndex >= 155 ? 100 : 0);

  // Derived highlights for wireframe sections
  const simulatedActiveSkillIdx = Math.floor(simIndex / 10) % 12;
  const simulatedActiveProjectIdx = Math.floor(simIndex / 40) % 3;
  const simulatedTimelinePercent = (simIndex % 60) / 60 * 100;
  const simulatedThemeToggleClicked = (simIndex > 0 && simIndex % 45 < 4);

  // Trigger CV simulated action
  const handleDownloadCV = (e: React.MouseEvent) => {
    e.preventDefault();
    setCvDownloading(true);
    setCvDownloadedSuccess(false);
    setTimeout(() => {
      setCvDownloading(false);
      setCvDownloadedSuccess(true);
      setTimeout(() => {
        setCvDownloadedSuccess(false);
      }, 4000);
    }, 1200);
  };

  // Submit Simulated Contact Form
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactStatus('sending');
    setTimeout(() => {
      setContactStatus('success');
      setFormSubmissionLog(prev => [
        { time: new Date().toLocaleTimeString(), sender: contactForm.name, msg: contactForm.message },
        ...prev
      ]);
      setContactForm({ name: '', email: '', message: '' });
    }, 1500);
  };

  // Contact logs
  const [formSubmissionLog, setFormSubmissionLog] = useState<Array<{time: string, sender: string, msg: string}>>([]);

  // Skills source
  const skillsMatrix = {
    front: [
      { name: 'TypeScript', level: 90, icon: 'TS' },
      { name: 'React / Next.js', level: 88, icon: 'RE' },
      { name: 'Tailwind CSS', level: 95, icon: 'TW' },
      { name: 'Redux Toolkit', level: 82, icon: 'RT' }
    ],
    back: [
      { name: 'Node.js / Express', level: 85, icon: 'ND' },
      { name: 'PostgreSQL', level: 80, icon: 'PG' },
      { name: 'Redis', level: 75, icon: 'RD' },
      { name: 'Python', level: 78, icon: 'PY' }
    ],
    tools: [
      { name: 'Git & Deployment', level: 88, icon: 'GT' },
      { name: 'Docker', level: 78, icon: 'DK' },
      { name: 'Figma to Code', level: 90, icon: 'FG' },
      { name: 'CI/CD Pipelines', level: 80, icon: 'CI' }
    ]
  };

  const getActiveSkillsList = () => {
    if (activeSkillTab === 'all') {
      return [...skillsMatrix.front, ...skillsMatrix.back, ...skillsMatrix.tools];
    }
    return skillsMatrix[activeSkillTab];
  };

  const isSelected = (id: SectionId) => selectedSectionId === id;

  // Viewport scale matching
  const viewportWidthClass = {
    desktop: 'w-full max-w-5xl',
    tablet: 'w-[768px]',
    mobile: 'w-[380px]',
  }[viewportSize];

  return (
    <div className={`transition-all duration-300 mx-auto ${viewportWidthClass} border border-zinc-90 w-full border-zinc-900 rounded-xl overflow-hidden shadow-2xl bg-[#050505] text-[#EDEDED] font-sans`}>
      
      {/* Dynamic Header */}
      <div 
        onClick={() => setSelectedSectionId('header')}
        className={`group relative cursor-pointer border-2 transition-all duration-200 ${
          isSelected('header') 
            ? 'border-accent-gold shadow-[0_0_15px_rgba(192,160,128,0.2)] z-20' 
            : 'border-transparent hover:border-zinc-800'
        }`}
      >
        {/* Hot badge focus selection */}
        <div className="absolute right-4 top-2 z-30 opacity-0 group-hover:opacity-100 bg-zinc-900 border border-zinc-700 text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded shadow">
          Header (Click to Inspect)
        </div>

        {viewMode === 'wireframe' ? (
          /* WIREFRAME HEADER */
          <div className="w-full bg-[#050505] border-b border-zinc-900 p-4 flex justify-between items-center blueprint-grid text-accent-gold font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="p-1 px-1.5 bg-accent-gold/10 border border-accent-gold/20 rounded text-[9px] text-accent-gold flex items-center gap-1">
                <Layout size={10} /> CSS_FLEX
              </span>
              <span className={`font-serif italic tracking-widest text-sm transition-all duration-300 ${simulatedThemeToggleClicked ? 'text-accent-gold scale-105' : 'text-white'}`}>
                [ logo_block ]
              </span>
              <span className="hidden leading-none sm:inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="hidden sm:inline-block px-1 bg-white/5 text-zinc-500 font-sans">w-full max-w-7xl</span>
              <span className="text-accent-gold/80 border-r border-zinc-900 pr-4 font-mono flex items-center gap-1">
                NAV_ITEMS 
                <span className="text-[9px] font-sans text-zinc-500 hover:text-accent-gold">(About, Skills, Projects, Experience, Contact)</span>
              </span>
              <div className={`p-1 rounded transition-all duration-300 flex items-center gap-1 text-[9px] ${
                simulatedThemeToggleClicked 
                  ? 'bg-accent-gold text-zinc-950 border border-accent-gold font-semibold shadow-[0_0_8px_rgba(192,160,128,0.5)]' 
                  : 'bg-accent-gold/10 border border-accent-gold/20 text-accent-gold/80'
              }`}>
                <span>theme_toggle</span>
                <span className={`h-1 w-1 rounded-full ${simulatedThemeToggleClicked ? 'bg-zinc-950' : 'bg-accent-gold animate-ping'}`}></span>
              </div>
            </div>
          </div>
        ) : (
          /* HI-FI MOCK HEADER */
          <div className={`w-full py-4 px-6 flex justify-between items-center bg-[#050505] z-20 transition-all duration-200 border-b border-zinc-900`}>
            <div className="font-serif italic text-base tracking-widest text-white">
              MATTHEWS<span className="text-accent-gold">.T</span>
            </div>
            
            <div className="flex items-center gap-5 sm:gap-6 text-xs text-[#EDEDED]">
              <span className="hover:text-accent-gold transition-colors pointer-events-none">About</span>
              <span className="hover:text-accent-gold transition-colors pointer-events-none">Skills</span>
              <span className="hover:text-accent-gold transition-colors pointer-events-none">Projects</span>
              <span className="hover:text-accent-gold transition-colors pointer-events-none">Experience</span>
              <span className="hover:text-accent-gold transition-colors pointer-events-none text-accent-gold font-medium">Contact</span>
              <button onClick={(e) => { e.stopPropagation(); setDarkTheme(!darkTheme); }} className="p-1.5 hover:bg-zinc-900 rounded-full transition-colors text-zinc-400 cursor-pointer">
                {darkTheme ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Hero */}
      <div 
        onClick={() => setSelectedSectionId('hero')}
        className={`group relative cursor-pointer border-2 transition-all duration-200 ${
          isSelected('hero') 
            ? 'border-accent-gold shadow-[0_0_15px_rgba(192,160,128,0.2)] z-20' 
            : 'border-transparent hover:border-zinc-800'
        }`}
      >
        <div className="absolute right-4 top-4 z-30 opacity-0 group-hover:opacity-100 bg-zinc-900 border border-zinc-700 text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded shadow">
          Hero Banner (Click to Inspect)
        </div>

        {viewMode === 'wireframe' ? (
          /* WIREFRAME HERO */
          <div className="bg-[#050505] blueprint-grid-dark py-16 px-8 flex flex-col items-center justify-center text-center text-accent-gold font-mono text-xs border-b border-zinc-900 relative">
            
            {/* Ambient telemetry indicators */}
            <div className="absolute right-4 top-4 text-[8px] text-zinc-650 font-mono text-right flex flex-col items-end gap-0.5">
              <span>LAT: -26.2041° S</span>
              <span>LON: 28.0473° E (Johannesburg)</span>
              <span>TICK: {simIndex}</span>
            </div>

            <div className="px-2 py-1 bg-accent-gold/10 border border-accent-gold/20 text-accent-gold rounded text-[9px] mb-4 flex items-center gap-1.5 animate-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-gold"></span>
              <span>[HERO_STAGE] H: MIN-SCREEN</span>
            </div>
            
            <div className="w-16 h-1 bg-accent-gold/30 mb-4 rounded"></div>
            
            <span className="text-[10px] tracking-widest text-accent-gold/70 mb-2 uppercase flex items-center gap-1">
              INTRO_TAG // MONO_FONT 
              <span className="text-zinc-500">[{simIndex % 2 === 0 ? 'STATUS: TRANSMITTING' : 'STATUS: STABLE'}]</span>
            </span>
            
            <div className="max-w-xl w-full border border-dashed border-accent-gold/30 p-4 mb-3 rounded-lg bg-accent-gold/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-1 px-1.5 bg-accent-gold/20 text-[7px] text-zinc-350 border-l border-b border-accent-gold/20">Deconstructing Design Canvas</div>
              <span className="text-zinc-500 text-[9px] block text-left mb-1">HEADER // SERIF_ITALIC // GRADIENT_CAP</span>
              <div className="h-6 bg-accent-gold/20 rounded w-4/5 mx-auto mb-2 flex items-center justify-center text-[10px] text-accent-gold font-mono font-semibold">
                Constructing performant, responsive
              </div>
              <div className="h-6 bg-accent-gold/10 rounded w-1/2 mx-auto flex items-center justify-center text-[10px] text-accent-gold font-serif italic font-semibold">
                digital ecosystems
              </div>
            </div>

            <div className="w-full max-w-md h-12 bg-accent-gold/5 border border-dotted border-accent-gold/20 rounded flex flex-col items-center justify-center text-zinc-500 text-[10px] mb-8 p-2 leading-relaxed">
              <span>SUB_PARAGRAPH // INTER_SANS (bio snippet placeholder, line-height 1.6)</span>
              <span className="text-accent-gold/45 text-[9px]">"Hi, I'm Matthews Thekiso. I design and assemble complex web applications..."</span>
            </div>

            <div className="flex gap-4">
              <div className={`px-4 py-2 border rounded text-[#EDEDED] flex items-center gap-1 font-mono transition-all duration-300 ${
                simulatedActiveProjectIdx === 1 
                  ? 'bg-accent-gold/40 border-accent-gold text-zinc-950 font-semibold shadow-[0_0_12px_rgba(192,160,128,0.4)] scale-105' 
                  : 'bg-accent-gold/25 border-accent-gold/40'
              }`}>
                <span>BUTTON [PRIMARY_CTA]</span>
                <ArrowRight size={12} className={`${simulatedActiveProjectIdx === 1 ? 'translate-x-1' : ''} transition-transform`} />
              </div>
              <div className="px-4 py-2 bg-[#0a0a0a] border border-zinc-850 rounded text-zinc-500 flex items-center gap-1.5">
                <span>BUTTON [CV_DOWNLOADER]</span>
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-500 animate-ping"></span>
              </div>
            </div>
          </div>
        ) : (
          /* HI-FI MOCK HERO */
          <div className="py-20 px-8 bg-[#050505] text-[#EDEDED] flex flex-col justify-center items-center text-center relative overflow-hidden border-b border-zinc-900">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="max-w-2xl z-10 w-full flex flex-col items-center">
              <span className="font-mono text-[10px] text-accent-gold tracking-widest uppercase mb-4 px-3 py-1 bg-accent-gold/5 border border-accent-gold/15 rounded-full inline-block">
                SOFTWARE ENGINEER & ARCHITECT
              </span>
              
              <h1 className="font-serif italic font-medium text-3xl sm:text-4xl md:text-5xl mb-6 tracking-tight leading-normal">
                Constructing performant, responsive{' '}
                <span className="text-accent-gold font-serif italic font-semibold">
                  digital ecosystems
                </span>
              </h1>

              <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-lg mb-8 leading-relaxed">
                Hi, I'm Matthews Thekiso. I design and assemble complex web applications, resilient layouts, and seamless
                user journeys with React, Node, and modern cloud blueprints.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedSectionId('projects'); }}
                  className="px-5 py-2.5 bg-accent-gold hover:bg-amber-200 text-zinc-950 font-medium font-sans text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-accent-gold/10"
                >
                  Inspect Projects
                  <ArrowRight size={14} />
                </button>
                
                <button 
                  onClick={handleDownloadCV} 
                  className={`px-5 py-2.5 font-sans text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    cvDownloadedSuccess 
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold border border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)] shadow' 
                      : 'bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  {cvDownloading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-accent-gold border-t-transparent rounded-full animate-spin"></span>
                      Compiling PDF...
                    </>
                  ) : cvDownloadedSuccess ? (
                    <>
                      <CheckCircle size={13} className="text-zinc-950" />
                      Resume Downloaded!
                    </>
                  ) : (
                    <>
                      <Download size={13} />
                      Download Resume
                    </>
                  )}
                </button>
              </div>

              {/* Minified social hub bar */}
              <div className="flex items-center gap-4 mt-8 text-zinc-500 text-xs font-mono">
                <span className="hover:text-accent-gold transition-colors pointer-events-none flex items-center gap-1">
                  <Github size={12} /> GitHub
                </span>
                <span className="hover:text-accent-gold transition-colors pointer-events-none flex items-center gap-1">
                  <Linkedin size={12} /> LinkedIn
                </span>
                <span className="hover:text-accent-gold transition-colors pointer-events-none flex items-center gap-1 font-sans">
                  <Mail size={12} /> sefellethekiso@gmail.com
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic About Bento */}
      <div 
        onClick={() => setSelectedSectionId('about')}
        className={`group relative cursor-pointer border-2 transition-all duration-200 ${
          isSelected('about') 
            ? 'border-accent-gold shadow-[0_0_15px_rgba(192,160,128,0.2)] z-20' 
            : 'border-transparent hover:border-zinc-800'
        }`}
      >
        <div className="absolute right-4 top-4 z-30 opacity-0 group-hover:opacity-100 bg-zinc-900 border border-zinc-700 text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded shadow">
          About Bento (Click to Inspect)
        </div>

        {viewMode === 'wireframe' ? (
          /* WIREFRAME ABOUT */
          <div className="bg-[#050505] blueprint-grid py-12 px-6 border-b border-zinc-900 text-accent-gold font-mono text-xs">
            <div className="flex justify-between items-center mb-6 text-[10px]">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 bg-accent-gold/10 border border-accent-gold/20 rounded">BENTO_GRID_12cols</span>
                <span className="text-zinc-500">[ SECTION_ID: ABOUT ]</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-zinc-500">
                <Cpu size={10} className="text-accent-gold inline animate-spin" />
                <span>ACTIVE_BIOMETRIC_TELEMETRY</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 border border-accent-gold/30 bg-accent-gold/5 rounded-xl p-5 relative overflow-hidden">
                <span className="absolute right-2 top-2 text-[8px] text-accent-gold/45 font-mono">[SPAN_2_COLS]</span>
                <div className="h-4 bg-accent-gold/20 rounded w-1/4 mb-3 flex items-center px-1 text-[9px] text-zinc-400">Qualitative Synopsis</div>
                <div className="space-y-2 mb-3 text-zinc-500 text-[10px] leading-relaxed">
                  <p className="text-accent-gold/70">"I manage client integrations and design workflows with a deep commitment to clean typography, interactive accessibility, and fast server responsiveness."</p>
                  <p className="text-zinc-505">"My experience spans building full-stack applications with Node and React, optimizing database indices..."</p>
                </div>
                <div className="h-8 bg-accent-gold/5 border border-accent-gold/10 rounded w-full sm:w-2/3 flex items-center justify-between px-3 text-[9px] text-zinc-505">
                  <span className="flex items-center gap-1"><ShieldCheck size={10} className="text-accent-gold" /> blueprints_compiled</span>
                  <span className="flex items-center gap-1"><Cpu size={10} className="text-accent-gold" /> scaled_latency_ok</span>
                </div>
              </div>

              {/* Focus box wireframe */}
              <div className="border border-accent-gold/30 bg-accent-gold/5 rounded-xl p-5 relative flex flex-col justify-between">
                <div>
                  <span className="absolute right-2 top-2 text-[8px] text-accent-gold/45 font-mono">[SPAN_1_COL]</span>
                  <div className="h-4 bg-accent-gold/20 rounded w-2/3 mb-4 flex items-center px-1 text-[9px] text-zinc-400">Live Focus</div>
                  <div className="p-2 bg-zinc-950 border border-dotted border-accent-gold/30 rounded flex flex-col gap-1 text-[9px] text-zinc-500 font-mono">
                    <span className="text-accent-gold/80 font-bold">
                      {simIndex % 90 < 30 ? '▶ VITE_COMPILATION_ORCHESTRATOR' : (simIndex % 90 < 60 ? '▶ DATABASE_LATENCY_INDEX' : '▶ UI_USABILITY_EMITTER')}
                    </span>
                    <span className="text-[8px] text-zinc-600">SYSTEM_BUS_LOAD: {40 + (simIndex % 15)}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[9px] mt-4 text-zinc-550 leading-none">
                  <span className="flex items-center gap-1 justify-start">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
                    <span>ENGINE_CYCLE: OK</span>
                  </span>
                  <span>TICK {simIndex}</span>
                </div>
              </div>

              {/* 4 small stats boxes inside Wireframe */}
              <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-1">
                {[
                  { label: "CODE_EXP", value: "4+ Yrs" },
                  { label: "DEPLOYS_SHIPPED", value: "18 Active" },
                  { label: "OPTIM_RATING", value: `${(98 + (simIndex % 2 === 0 ? 0.4 : 0.6)).toFixed(1)}%` },
                  { label: "GIT_CONTRIBUTES", value: `${1400 + (simIndex % 3)} Pushes` }
                ].map((st, idx) => (
                  <div key={idx} className="border border-dashed border-accent-gold/25 p-4 rounded-lg bg-accent-gold/5 text-center text-[9px] transition-transform duration-200 hover:scale-102">
                    <span className="text-zinc-500 block mb-1 uppercase font-mono">{st.label}</span>
                    <div className="font-mono text-xs text-white font-semibold flex items-center justify-center gap-1">
                      <span>{st.value}</span>
                      <span className="h-1 w-1 bg-accent-gold/30 rounded-full animate-ping"></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* HI-FI MOCK ABOUT */
          <div className="py-16 px-6 bg-[#050505] border-b border-zinc-900">
            <div className="max-w-4xl mx-auto">
              <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block mb-1">BIOMETRICS</span>
              <h2 className="font-serif italic text-xl md:text-2xl font-medium text-white mb-8">System Profile</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Custom bio */}
                <div className="md:col-span-2 p-6 bg-[#0a0a0a] rounded-xl border border-zinc-900 flex flex-col justify-between">
                  <div>
                    <h3 className="font-sans font-medium text-xs text-zinc-350 uppercase tracking-wider mb-3">Qualitative Synopsis</h3>
                    <p className="text-zinc-400 text-xs sm:text-xs leading-relaxed mb-4">
                      I manage client integrations and design workflows with a deep commitment to clean typography,
                      interactive accessibility, and fast server responsiveness.
                    </p>
                    <p className="text-zinc-400 text-xs sm:text-xs leading-relaxed">
                      My experience spans building full-stack applications with Node and React, as well as optimizing
                      custom database queries and orchestrating Docker containers.
                    </p>
                  </div>
                  <div className="flex gap-4 mt-6 pt-4 border-t border-zinc-900">
                    <span className="text-[10px] text-zinc-500 flex items-center gap-1"><ShieldCheck size={12} className="text-accent-gold" /> Compliant Blueprints</span>
                    <span className="text-[10px] text-zinc-500 flex items-center gap-1"><Cpu size={12} className="text-accent-gold" /> Scaled Latencies</span>
                  </div>
                </div>

                {/* Focus Carousel mock */}
                <div className="p-6 bg-[#0a0a0a] rounded-xl border border-zinc-900 flex flex-col justify-between">
                  <div>
                    <h3 className="font-sans font-medium text-xs text-zinc-350 uppercase tracking-wider mb-3">Live Framework focus</h3>
                    <div className="space-y-3">
                      <div className="p-2 bg-zinc-95 w-full bg-zinc-950 border border-zinc-90 w-full border-zinc-900 rounded">
                        <span className="text-[9px] font-mono text-accent-gold block">VITE_COMPILATION</span>
                        <p className="text-[10px] text-zinc-300 mt-0.5">Custom Rollup optimizations</p>
                      </div>
                      <div className="p-2 bg-zinc-95 w-full bg-zinc-950 border border-zinc-90 w-full border-zinc-900 rounded font-mono">
                        <span className="text-[9px] font-mono text-zinc-505 block">DATABASE_GATEWAY</span>
                        <p className="text-[10px] text-zinc-400 mt-0.5">Postgres relational tuning</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-mono text-zinc-600 mt-4 uppercase">
                    <span>Engine: ACTIVE</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse"></span>
                  </div>
                </div>

                {/* Grid stats */}
                <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
                  {[
                    { val: '4+ Yrs', desc: 'Active Code' },
                    { val: '18 Ship', desc: 'Deployments' },
                    { val: '98%', desc: 'Optimization score' },
                    { val: '10k+', desc: 'Terminal pushes' },
                  ].map((st, idx) => (
                    <div key={idx} className="p-4 bg-[#0a0a0a] border border-zinc-900/80 rounded-lg text-center">
                      <span className="font-serif italic text-base sm:text-lg text-white block mb-0.5">{st.val}</span>
                      <span className="text-[9px] text-zinc-505 uppercase font-mono">{st.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Skills Deck */}
      <div 
        onClick={() => setSelectedSectionId('skills')}
        className={`group relative cursor-pointer border-2 transition-all duration-200 ${
          isSelected('skills') 
            ? 'border-accent-gold shadow-[0_0_15px_rgba(192,160,128,0.2)] z-20' 
            : 'border-transparent hover:border-zinc-800'
        }`}
      >
        <div className="absolute right-4 top-4 z-30 opacity-0 group-hover:opacity-100 bg-zinc-900 border border-zinc-700 text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded shadow">
          Skills (Click to Inspect)
        </div>

        {viewMode === 'wireframe' ? (
          /* WIREFRAME SKILLS */
          <div className="bg-[#050505] blueprint-grid-dark py-12 px-6 border-b border-zinc-900 text-accent-gold font-mono text-xs">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[9px] text-accent-gold/70 block uppercase">GRID_CONTAINER // DYNAMIC_REORGANIZATION</span>
                <div className="h-5 bg-accent-gold/20 rounded w-56 mt-1 flex items-center px-1 text-[10px]">Capacitor Skill Inventory</div>
              </div>
              <span className="text-[9px] border border-accent-gold/30 px-2 py-0.5 bg-accent-gold/5 text-zinc-550 animate-pulse">AUTORUN_DIAGNOSTICS: ON</span>
            </div>

            {/* TAB WIREFRAME FILTERS */}
            <div className="flex flex-wrap gap-2 mb-6 text-[10px]">
              {[
                { tabId: 'all', label: 'ALL_UNITS' },
                { tabId: 'front', label: 'FE_CORE' },
                { tabId: 'back', label: 'BE_DB' },
                { tabId: 'tools', label: 'INFRA_TOOL' }
              ].map((f) => (
                <button 
                  key={f.tabId} 
                  onClick={(e) => { e.stopPropagation(); setActiveSkillTab(f.tabId as any); }}
                  className={`px-3 py-1 bg-accent-gold/5 border rounded text-accent-gold/70 cursor-pointer text-[10px] transition-colors ${
                    activeSkillTab === f.tabId ? 'border-accent-gold bg-accent-gold/15 text-white' : 'border-accent-gold/20 hover:border-accent-gold/40'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* CELLS GRID WITH REAL SKILLS & INTERACTIVITY */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
              {getActiveSkillsList().map((skill, index) => {
                const isInspected = index === simulatedActiveSkillIdx;
                return (
                  <div 
                    key={skill.name} 
                    className={`border p-4 rounded-lg transition-all duration-300 relative overflow-hidden ${
                      isInspected 
                        ? 'border-accent-gold bg-accent-gold/15 shadow-[0_0_10px_rgba(192,160,128,0.25)] scale-[1.03]' 
                        : 'border-accent-gold/20 bg-accent-gold/5'
                    }`}
                  >
                    {isInspected && (
                      <span className="absolute right-1 top-1 text-[7px] text-accent-gold font-bold px-1 bg-zinc-950 border border-accent-gold/30 rounded scale-90 animate-pulse">HOVER</span>
                    )}
                    <div className="flex justify-between mb-2 text-[9px] text-zinc-400 font-semibold">
                      <span className={isInspected ? 'text-white' : ''}>{skill.name}</span>
                      <span className="text-accent-gold font-mono">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-[#050505] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 origin-left ${isInspected ? 'bg-white' : 'bg-accent-gold/70'}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* HI-FI MOCK SKILLS */
          <div className="py-16 px-6 bg-[#050505] border-b border-zinc-900">
            <div className="max-w-4xl mx-auto">
              <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block mb-1">INVENTORY</span>
              <h2 className="font-serif italic text-xl md:text-2xl font-medium text-white mb-6">Technology Stack</h2>

              {/* Real filters interactivity */}
              <div className="flex gap-1.5 mb-6 overflow-x-auto pb-2">
                {(['all', 'front', 'back', 'tools'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={(e) => { e.stopPropagation(); setActiveSkillTab(tab); }}
                    className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider rounded-md border transition-all cursor-pointer ${
                      activeSkillTab === tab
                        ? 'bg-accent-gold/10 border-accent-gold text-accent-gold'
                        : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {tab === 'all' ? 'All Skills' : tab === 'front' ? 'Frontend' : tab === 'back' ? 'Backend' : 'Infra'}
                  </button>
                ))}
              </div>

              {/* Filtered Grid elements */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {getActiveSkillsList().map((sk) => (
                  <div key={sk.name} className="p-4 bg-[#0a0a0a] rounded-xl border border-zinc-900 hover:border-zinc-800 transition-all group">
                    <div className="flex justify-between items-center mb-2.5">
                      <span className="font-sans text-xs text-zinc-200">{sk.name}</span>
                      <span className="font-mono text-[10px] text-accent-gold">{sk.level}%</span>
                    </div>
                    <div className="w-full bg-[#050505] h-1 rounded-full overflow-hidden">
                      <div 
                        className="bg-accent-gold h-full rounded-full transition-all duration-700 origin-left"
                        style={{ width: `${sk.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Projects Showcase */}
      <div 
        onClick={() => setSelectedSectionId('projects')}
        className={`group relative cursor-pointer border-2 transition-all duration-200 ${
          isSelected('projects') 
            ? 'border-accent-gold shadow-[0_0_15px_rgba(192,160,128,0.2)] z-20' 
            : 'border-transparent hover:border-zinc-800'
        }`}
      >
        <div className="absolute right-4 top-4 z-30 opacity-0 group-hover:opacity-100 bg-zinc-900 border border-zinc-700 text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded shadow">
          Projects (Click to Inspect)
        </div>

        {viewMode === 'wireframe' ? (
          /* WIREFRAME PROJECTS */
          <div className="bg-[#050505] blueprint-grid py-12 px-6 border-b border-zinc-900 text-accent-gold font-mono text-xs">
            <div className="flex justify-between items-start mb-6 text-[10px]">
              <div>
                <span className="text-zinc-500 block uppercase">GALLERY_DECK // STRUCTURAL_FLEX_WRAP</span>
                <div className="h-5 bg-accent-gold/20 rounded w-52 mt-1 flex items-center px-1 text-[10px]">Selected Projects Catalog</div>
              </div>
              <span className="px-1.5 py-0.5 bg-accent-gold/15 text-accent-gold rounded uppercase flex items-center gap-1 mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>GRID: 3_COL_ROW // INSPECTOR_HOVER</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {mockProjects.map((p, i) => {
                const isHovered = i === simulatedActiveProjectIdx;
                return (
                  <div 
                    key={p.title} 
                    className={`border rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                      isHovered 
                        ? 'border-accent-gold bg-accent-gold/15 shadow-[0_0_12px_rgba(192,160,128,0.3)] scale-[1.03]' 
                        : 'border-accent-gold/20 bg-accent-gold/5'
                    }`}
                  >
                    {isHovered && (
                      <div className="absolute top-0 right-0 p-1 bg-accent-gold text-zinc-950 text-[7px] font-bold tracking-widest scale-90 uppercase rounded-bl">HOVER FOCUS</div>
                    )}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <div className="w-8 h-8 rounded-lg bg-accent-gold/20 border border-accent-gold/30 flex items-center justify-center text-[14px]">
                          {p.mockImage}
                        </div>
                        <div className="text-[8px] font-mono border border-accent-gold/20 px-1.5 py-0.5 rounded bg-zinc-950 max-w-[80px] truncate text-zinc-400">
                          {p.tags[0]}
                        </div>
                      </div>
                      <h3 className={`font-serif italic text-sm mb-2 font-semibold ${isHovered ? 'text-white' : 'text-zinc-350'}`}>
                        {p.title}
                      </h3>
                      <p className="text-zinc-505 leading-relaxed text-[10px] mb-4">
                        {p.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-zinc-90 w-full border-zinc-900 text-[8px] text-zinc-550 font-mono">
                      <div className="flex flex-wrap gap-1 mb-2.5">
                        {p.tags.slice(1, 3).map((tg) => (
                          <span key={tg} className="text-[7.5px] px-1 bg-zinc-950 border border-zinc-900 rounded text-zinc-500">{tg}</span>
                        ))}
                      </div>
                      <div className="flex gap-3 text-[9px] text-[#EDEDED]">
                        <span className="hover:text-accent-gold transition-colors flex items-center gap-1 cursor-pointer"><Github size={10} /> [github_src]</span>
                        <span className="text-accent-gold hover:text-white transition-colors flex items-center gap-1 cursor-pointer ml-auto"><ExternalLink size={10} /> [live_node]</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* HI-FI MOCK PROJECTS */
          <div className="py-16 px-6 bg-[#050505] border-b border-zinc-900">
            <div className="max-w-4xl mx-auto">
              <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block mb-1">CATALOG</span>
              <h2 className="font-serif italic text-xl md:text-2xl font-medium text-white mb-8">Selected Applications</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {mockProjects.map((p, i) => (
                  <div key={i} className="bg-[#0a0a0a] border border-zinc-900 rounded-xl flex flex-col justify-between overflow-hidden group hover:border-[#1F1F1F] transition-all">
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[16px]">{p.mockImage}</span>
                        <span className="text-[9px] font-mono uppercase bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900 text-zinc-500">
                          {p.tags[0]}
                        </span>
                      </div>
                      <h3 className="font-serif italic font-semibold text-sm mb-2 text-white group-hover:text-accent-gold transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-zinc-400 text-[11px] sm:text-[11px] leading-relaxed mb-4">
                        {p.description}
                      </p>
                    </div>

                    <div className="px-5 pb-5 mt-auto">
                      <div className="flex flex-wrap gap-1 mb-4">
                        {p.tags.slice(1).map((tg) => (
                          <span key={tg} className="text-[9px] font-mono text-zinc-500 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-900">
                            {tg}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 pt-3 border-t border-zinc-90 w-full border-zinc-900 text-[10px] text-zinc-400">
                        <span className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                          <Github size={11} /> Source
                        </span>
                        <span className="text-accent-gold hover:text-amber-200 transition-colors cursor-pointer flex items-center gap-1 ml-auto">
                          <ExternalLink size={11} /> Live View
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Experience Timeline */}
      <div 
        onClick={() => setSelectedSectionId('experience')}
        className={`group relative cursor-pointer border-2 transition-all duration-200 ${
          isSelected('experience') 
            ? 'border-accent-gold shadow-[0_0_15px_rgba(192,160,128,0.2)] z-20' 
            : 'border-transparent hover:border-zinc-800'
        }`}
      >
        <div className="absolute right-4 top-4 z-30 opacity-0 group-hover:opacity-100 bg-zinc-900 border border-zinc-700 text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded shadow">
          Experience (Click to Inspect)
        </div>

        {viewMode === 'wireframe' ? (
          /* WIREFRAME EXPERIENCE */
          <div className="bg-[#050505] blueprint-grid-dark py-12 px-6 border-b border-zinc-900 text-accent-gold font-mono text-xs relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[9px] text-accent-gold/70 block uppercase">CHRONOLOGY_NODE_AXIS // TIMELINE_MARKERS</span>
              <span className="text-[9px] text-zinc-500 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-gold animate-bounce"></span>
                <span>WALKING_PARTICLE: {Math.floor(simulatedTimelinePercent)}%</span>
              </span>
            </div>
            
            <div className="relative border-l border-[#1F1F1F] pl-6 ml-4 space-y-8">
              {/* Animated crawler trace particle moving down the timeline axis */}
              <div 
                className="absolute w-[2px] bg-accent-gold rounded transition-all duration-300"
                style={{ 
                  top: '0%', 
                  height: `${simulatedTimelinePercent}%`,
                  left: '-2px',
                  boxShadow: '0 0 10px #c0a080'
                }}
              />
              {mockExperience.map((exp, n) => {
                const isActive = (simulatedTimelinePercent > 35 && n === 0) || (simulatedTimelinePercent <= 35 && n === 1);
                return (
                  <div key={n} className={`relative transition-all duration-300 ${isActive ? 'translate-x-1 text-white' : ''}`}>
                    {/* node dot */}
                    <span className={`absolute -left-[32px] top-1 w-4 h-4 rounded-full border transition-all duration-300 bg-zinc-950 flex items-center justify-center text-[7px] ${
                      isActive ? 'border-accent-gold text-accent-gold scale-110 shadow-[0_0_8px_rgba(192,160,128,0.4)]' : 'border-[#1F1F1F] text-zinc-650'
                    }`}>
                      {isActive ? '●' : '○'}
                    </span>
                    
                    <div className="absolute top-0 right-0 text-[8px] text-zinc-505 tracking-widest font-mono uppercase">{exp.period}</div>
                    
                    <div className="h-3.5 flex items-center text-[9px] font-bold text-accent-gold border-accent-gold/20 uppercase mb-1">
                      {exp.company}
                    </div>
                    <div className="text-[12px] font-serif italic text-white mb-2 leading-none">{exp.role}</div>
                    
                    <div className="space-y-1.5 my-3 text-[10px] text-zinc-500 leading-normal">
                      <p className={isActive ? 'text-zinc-350' : 'text-zinc-550'}>• {exp.achievements[0]}</p>
                      <p className="text-zinc-600">• {exp.achievements[1]}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* HI-FI MOCK EXPERIENCE */
          <div className="py-16 px-6 bg-[#050505] border-b border-zinc-900">
            <div className="max-w-xl mx-auto">
              <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block mb-1">CHRONICLE</span>
              <h2 className="font-serif italic text-xl md:text-2xl font-medium text-white mb-10">Historical Timeline</h2>
 
              <div className="relative border-l border-zinc-90 w-full border-zinc-900 pl-6 ml-4 space-y-10">
                {mockExperience.map((exp, i) => (
                  <div key={i} className="relative group">
                    <span className="absolute -left-[31px] top-1 p-1 bg-zinc-950 border border-[#2a2a2a] text-accent-gold rounded-full flex items-center justify-center">
                      <Briefcase size={10} className="text-accent-gold" />
                    </span>
 
                    <span className="text-[9px] font-mono text-zinc-500 tracking-wide uppercase">{exp.period}</span>
                    <h3 className="font-serif italic font-semibold text-sm text-white mt-0.5 mb-1">{exp.role}</h3>
                    <p className="text-xs text-accent-gold font-mono mb-4">{exp.company}</p>
 
                    <ul className="space-y-2 text-zinc-400 text-[11px] sm:text-[11px] leading-relaxed">
                      {exp.achievements.slice(0, 2).map((achievement, j) => (
                        <li key={j} className="flex gap-2 items-start">
                          <span className="w-1 h-1 rounded-full bg-accent-gold mt-1.5 shrink-0"></span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Contact Node */}
      <div 
        onClick={() => setSelectedSectionId('contact')}
        className={`group relative cursor-pointer border-2 transition-all duration-200 ${
          isSelected('contact') 
            ? 'border-accent-gold shadow-[0_0_15px_rgba(192,160,128,0.2)] z-20' 
            : 'border-transparent hover:border-zinc-800'
        }`}
      >
        <div className="absolute right-4 top-4 z-30 opacity-0 group-hover:opacity-100 bg-zinc-900 border border-zinc-700 text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded shadow">
          Contact Node (Click to Inspect)
        </div>

        {viewMode === 'wireframe' ? (
          /* WIREFRAME CONTACT - ANIMATED INTERACTION SIMULATOR */
          <div className="bg-[#050505] blueprint-grid py-12 px-6 text-accent-gold font-mono text-xs">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[9px] text-zinc-500 block uppercase">SECTION_DISPATCH // COMPONENT_ID: CONTACT</span>
              <span className="text-[8px] text-accent-gold bg-accent-gold/15 border border-accent-gold/20 px-1.5 py-0.5 rounded flex items-center gap-1 animate-pulse">
                <span className="h-1.5 w-1.5 bg-accent-gold rounded-full animate-ping"></span>
                <span>CLIENT_INPUT_SIM_RUNNING</span>
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-2 border border-dotted border-accent-gold/20 p-5 rounded-xl bg-accent-gold/5">
                <div className="h-4 bg-accent-gold/20 rounded w-1/3 mb-4 flex items-center px-1 text-[9px] text-zinc-400">Coordinates</div>
                <div className="space-y-2 mb-6 text-zinc-500 text-[10px] leading-relaxed">
                  <p>Send a direct payload transmission to review contract terms or deploy pipelines.</p>
                  <p className="text-accent-gold flex items-center gap-1.5 text-[9px] pt-1.5">
                    <span>📧</span> sefellethekiso@gmail.com
                  </p>
                  <p className="text-zinc-500 flex items-center gap-1.5 text-[9px]">
                    <span>📍</span> Johannesburg, South Africa
                  </p>
                </div>
                <div className="h-8 bg-zinc-950 border border-[#111111] p-1.5 rounded w-full flex items-center justify-between text-[7px] text-zinc-650 uppercase">
                  <span>PACKET_SINK: STEADY</span>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                </div>
              </div>

              {/* Driving simulated typing in input fields */}
              <div className={`md:col-span-3 border rounded-2xl p-6 transition-all duration-300 relative ${
                isSuccessSim 
                  ? 'border-emerald-500 bg-emerald-950/10 shadow-[0_0_12px_rgba(16,185,129,0.2)]' 
                  : (isSendingSim ? 'border-accent-gold/50 bg-accent-gold/5' : 'border-accent-gold/30 bg-[#070707]')
              }`}>
                <span className="absolute right-2 top-2 text-[8px] text-accent-gold/45 font-mono">[CONTACT_FORM_COILS]</span>
                <div className="h-4 bg-accent-gold/25 rounded w-1/4 mb-4 flex items-center px-1 text-[9px] text-zinc-400">Dispatch Payload</div>
                
                {isSuccessSim ? (
                  <div className="text-center py-6 space-y-2 text-[10px]">
                    <div className="inline-flex p-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-base animate-bounce">
                      ✓
                    </div>
                    <p className="text-white font-semibold flex items-center justify-center gap-1">DISPATCH_STATUS: SECURED_202_OK</p>
                    <p className="text-zinc-505 max-w-xs mx-auto text-[9px]">Payload compiled and transmitted to sefellethekiso@gmail.com. Loop resetting shortly...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Name input box */}
                    <div className={`border p-2 rounded transition-all duration-200 ${isTypingName ? 'border-accent-gold bg-accent-gold/5 shadow-[0_0_6px_rgba(192,160,128,0.15)]' : 'border-accent-gold/15 bg-zinc-950'}`}>
                      <span className="text-[8px] text-zinc-650 font-mono">INPUT_SENDER_NAME [REQD] {isTypingName && '┃ ACTIVE_CURSOR'}</span>
                      <div className="h-5 text-[11px] text-white flex items-center font-mono mt-0.5">
                        <span>{simTypedName}</span>
                        {isTypingName && <span className="animate-pulse font-bold text-accent-gold font-mono ml-0.5">|</span>}
                      </div>
                    </div>

                    {/* Email input box */}
                    <div className={`border p-2 rounded transition-all duration-200 ${isTypingEmail ? 'border-accent-gold bg-accent-gold/5 shadow-[0_0_6px_rgba(192,160,128,0.15)]' : 'border-accent-gold/15 bg-zinc-950'}`}>
                      <span className="text-[8px] text-zinc-650 font-mono">INPUT_SENDER_EMAIL [REQD_EMAIL_VLDN] {isTypingEmail && '┃ ACTIVE_CURSOR'}</span>
                      <div className="h-5 text-[11px] text-white flex items-center font-mono mt-0.5">
                        <span>{simTypedEmail}</span>
                        {isTypingEmail && <span className="animate-pulse font-bold text-accent-gold font-mono ml-0.5">|</span>}
                      </div>
                    </div>

                    {/* Message input box */}
                    <div className={`border p-2 rounded transition-all duration-200 ${isTypingMsg ? 'border-accent-gold bg-accent-gold/5 shadow-[0_0_6px_rgba(192,160,128,0.15)]' : 'border-accent-gold/15 bg-zinc-950'}`}>
                      <span className="text-[8px] text-zinc-650 font-mono">INPUT_SENDER_PAYLOAD [LIMIT_1024_BYTES] {isTypingMsg && '┃ ACTIVE_CURSOR'}</span>
                      <div className="h-6 text-[10px] text-white flex items-start font-mono mt-0.5 max-w-full overflow-hidden truncate">
                        <span>{simTypedMsg}</span>
                        {isTypingMsg && <span className="animate-pulse font-bold text-accent-gold font-mono ml-0.5">|</span>}
                      </div>
                    </div>

                    {/* Submit Dispatch Button with click & loading progress simulation */}
                    <div className="relative font-mono">
                      <div className={`h-10 rounded flex items-center justify-center text-[10px] transition-all duration-300 font-bold overflow-hidden ${
                        isSendingSim 
                          ? 'bg-accent-gold/10 border border-accent-gold/30 text-white' 
                          : (isHoveringSubmit ? 'bg-accent-gold text-zinc-950 scale-102 cursor-pointer shadow-[0_0_10px_rgba(192,160,128,0.4)]' : 'bg-accent-gold/20 border border-accent-gold/50 text-accent-gold/90')
                      }`}>
                        {isSendingSim ? (
                          <div className="relative z-10 font-mono text-[9px] flex items-center gap-1.5">
                            <span className="animate-spin text-accent-gold">⏳</span>
                            <span>TRANSMITTING_PAYLOAD_PACKETS... {simSendProgress}%</span>
                          </div>
                        ) : (
                          <span className="z-10 uppercase tracking-widest flex items-center gap-1 font-mono">
                            {isHoveringSubmit && '▶ '}BUTTON [SUBMIT_DISPATCH]
                          </span>
                        )}
                        {/* Interactive fill state loading background bar for the submission */}
                        {isSendingSim && (
                          <div 
                            className="absolute left-0 top-0 h-full bg-accent-gold/25 transition-all duration-200 origin-left"
                            style={{ width: `${simSendProgress}%` }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* HI-FI MOCK CONTACT */
          <div className="py-16 px-6 bg-[#050505]">
            <div className="max-w-4xl mx-auto">
              <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block mb-1">COORDINATION</span>
              <h2 className="font-serif italic text-xl md:text-2xl font-medium text-white mb-8">Dispatch Gateway</h2>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Visual contact nodes */}
                <div className="md:col-span-2 space-y-4">
                  <h3 className="font-sans font-medium text-xs text-zinc-350 uppercase tracking-wider mb-2">Direct Terminal Links</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                    Send a direct payload transmission if you wish to review contract terms, explore architectures, or map components together.
                  </p>
                  
                  <div className="p-4 bg-zinc-900/30 rounded-xl border border-zinc-900 space-y-3 font-mono text-[10px]">
                    <div className="flex items-center gap-2">
                      <Mail size={12} className="text-accent-gold" />
                      <span>sefellethekiso@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-2 mr-auto">
                      <MapPin size={12} className="text-accent-gold" />
                      <span>Johannesburg, South Africa</span>
                    </div>
                  </div>

                  {/* submission logs panel for extreme fidelity */}
                  {formSubmissionLog.length > 0 && (
                    <div className="p-3 bg-[#0a0a0a] border border-dashed border-accent-gold/25 rounded-xl">
                      <p className="text-[9px] font-mono text-accent-gold mb-2 font-semibold">LOCAL TRANSMISSION LOGS ({formSubmissionLog.length})</p>
                      <div className="space-y-2 max-h-24 overflow-y-auto pr-1">
                        {formSubmissionLog.map((log, i) => (
                          <div key={i} className="text-[9px] font-mono bg-zinc-950 p-1.5 rounded border border-zinc-900">
                            <span className="text-zinc-500">{log.time}</span> - <span className="text-accent-gold">{log.sender}</span>:
                            <p className="text-zinc-400 truncate mt-0.5">{log.msg}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Form layout */}
                <div className="md:col-span-3 bg-[#0a0a0a] border border-zinc-900 rounded-xl p-5">
                  {contactStatus === 'success' ? (
                    <div className="text-center py-6 space-y-3">
                      <div className="inline-flex p-3 bg-accent-gold/10 border border-accent-gold/30 text-accent-gold rounded-full">
                        <CheckCircle size={28} />
                      </div>
                      <h3 className="font-serif italic font-semibold text-sm text-white">Transmission Successful</h3>
                      <p className="text-zinc-450 text-[11px] max-w-xs mx-auto">
                        Your message has been compiled. Feel free to log another transmission if needed!
                      </p>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setContactStatus('idle'); }} 
                        className="text-[10px] font-mono text-accent-gold underline hover:text-white transition-colors cursor-pointer"
                      >
                        Reset Dispatch Coils
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Sender Identity</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-3 py-2 bg-zinc-950 border border-zinc-900 rounded text-xs text-white focus:outline-none focus:border-accent-gold/40 transition-colors"
                          placeholder="Your Name"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Gateway Email</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-3 py-2 bg-zinc-950 border border-zinc-900 rounded text-xs text-white focus:outline-none focus:border-accent-gold/40 transition-colors"
                          placeholder="yourname@domain.com"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Payload Message</label>
                        <textarea
                          required
                          rows={3}
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full px-3 py-2 bg-zinc-950 border border-zinc-90 w-full border-zinc-900 rounded text-xs text-white focus:outline-none focus:border-accent-gold/40 transition-colors resize-none"
                          placeholder="What can we compile together?"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={contactStatus === 'sending'}
                        className="w-full py-2 bg-accent-gold hover:bg-[#d5b595] disabled:bg-[#1a1a1a] disabled:text-zinc-600 text-zinc-950 font-semibold text-xs font-sans rounded transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        {contactStatus === 'sending' ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></span>
                            COMPILING PAYLOAD...
                          </>
                        ) : (
                          <>
                            <Send size={12} />
                            DISPATCH MESSAGES
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
