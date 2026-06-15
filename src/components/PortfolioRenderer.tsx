import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Sun, Moon, ArrowRight, Download, Github, Linkedin, 
  Mail, ShieldCheck, Cpu, Code2, FolderClosed, ExternalLink, 
  Briefcase, Send, CheckCircle, MapPin, Layers, Layout, Grid, Maximize2,
  Wifi, Battery, Lock, RefreshCw
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
  // Device and Emulation State
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isIslandHovered, setIsIslandHovered] = useState(false);

  // Monitor physical screen width to adapt layout on window resize as well
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewportSize === 'mobile';
  const isTablet = viewportSize === 'tablet';

  const isPhysicalMobile = windowWidth < 680;
  const isPhysicalTablet = windowWidth >= 680 && windowWidth < 1024;

  const showMobileLayout = isMobile || isPhysicalMobile;
  const showTabletLayout = (isTablet || isPhysicalTablet) && !showMobileLayout;

  // Reset scroll position on switching bounds
  useEffect(() => {
    setScrollOffset(0);
    const mobileEl = document.getElementById('mobile-viewport-scroll');
    const tabletEl = document.getElementById('tablet-viewport-scroll');
    const desktopEl = document.getElementById('desktop-viewport-scroll');
    if (mobileEl) mobileEl.scrollTop = 0;
    if (tabletEl) tabletEl.scrollTop = 0;
    if (desktopEl) desktopEl.scrollTop = 0;
  }, [viewportSize]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollOffset(Math.round(e.currentTarget.scrollTop));
  };

  const scrollToSection = (id: SectionId) => {
    setSelectedSectionId(id);
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(`${id}-section`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

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
  const isDesktop = viewportSize === 'desktop';

  return (
    <div className={`transition-all duration-300 mx-auto w-full flex flex-col items-center justify-center p-1 md:p-3`}>
      
      {/* Device Chassis Outer Frame */}
      <div className={`transition-all duration-300 w-full flex flex-col relative overflow-hidden select-none ${
        isMobile 
          ? 'mx-auto border-[12px] border-zinc-900 bg-zinc-950 rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] max-w-[380px]' 
          : isTablet 
            ? 'mx-auto border-[16px] border-zinc-900 bg-zinc-950 rounded-[38px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] max-w-[768px]'
            : 'border border-zinc-900 bg-[#0a0a0a] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] max-w-5xl'
      }`}>

        {/* Device hardware visual elements */}
        {isMobile && (
          <>
            {/* Ear speaker */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-1 bg-zinc-800 rounded-full z-45"></div>
            {/* Hardware side buttons */}
            <div className="absolute -left-[14px] top-24 w-[2px] h-10 bg-zinc-800 rounded-l"></div>
            <div className="absolute -left-[14px] top-38 w-[2px] h-12 bg-zinc-800 rounded-l"></div>
            <div className="absolute -left-[14px] top-52 w-[2px] h-12 bg-zinc-800 rounded-l"></div>
            <div className="absolute -right-[14px] top-32 w-[2px] h-16 bg-zinc-800 rounded-r"></div>
          </>
        )}
        {isTablet && (
          /* Subtle iPad front camera dot */
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-zinc-800 rounded-full z-45"></div>
        )}

        {/* Browser Top Chrome Header for Desktop */}
        {isDesktop && (
          <div className="h-11 border-b border-zinc-900 bg-zinc-950/80 px-4 flex items-center justify-between select-none shrink-0 font-mono text-[10px] tracking-wide text-zinc-400">
            <div className="flex items-center gap-1.5 w-24">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40"></span>
            </div>
            <div className="flex-1 max-w-lg bg-[#070707] border border-zinc-900 rounded-lg px-3 py-1 flex items-center gap-2 text-zinc-500 justify-center">
              <Lock size={10} className="text-emerald-500" />
              <span className="text-[9.5px] text-zinc-450 select-all truncate">https://matthews-thekiso-portfolio.vercel.app</span>
              <RefreshCw size={10} className="ml-auto text-zinc-600 hover:text-white cursor-pointer transition-colors" />
            </div>
            <div className="flex items-center gap-2 w-24 justify-end text-zinc-500">
              <span className="text-[9.2px] hover:text-white transition-colors cursor-pointer select-none">✕</span>
            </div>
          </div>
        )}

        {/* Mobile iOS Status Bar */}
        {isMobile && (
          <div className="h-11 px-6 pt-3 flex justify-between items-center text-[10px] font-mono text-zinc-450 z-40 select-none bg-black/40 backdrop-blur-sm shrink-0">
            <span className="font-semibold text-white/95">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            
            {/* Interactive Dynamic Island notch */}
            <motion.div 
              onMouseEnter={() => setIsIslandHovered(true)}
              onMouseLeave={() => setIsIslandHovered(false)}
              animate={{ width: isIslandHovered ? 210 : 88, height: isIslandHovered ? 26 : 18 }}
              className="absolute left-1/2 -translate-x-1/2 top-2 bg-black rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.8)] z-50 overflow-hidden text-neutral-400 border border-zinc-800"
            >
              {isIslandHovered ? (
                <motion.span 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[7.5px] font-mono text-accent-gold whitespace-nowrap flex items-center gap-1.5 px-3 uppercase tracking-wider"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>COILS_TRACE_RUNNING</span>
                </motion.span>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1 px-2 text-[7.5px] font-mono tracking-wide text-zinc-500"
                >
                  <div className="h-1 w-1 rounded-full bg-accent-gold animate-ping"></div>
                  <span>NEXUS_SIM</span>
                </motion.div>
              )}
            </motion.div>

            <div className="flex items-center gap-1.5">
              <Wifi size={10} className="text-zinc-505" />
              <span className="text-[8px] font-bold text-zinc-505">5G</span>
              <Battery size={12} className="text-zinc-550" />
            </div>
          </div>
        )}

        {/* Tablet iPadOS Status Bar */}
        {isTablet && (
          <div className="h-9 px-6 pt-2 flex justify-between items-center text-[10px] font-mono text-zinc-400 z-40 select-none bg-black/30 backdrop-blur-sm shrink-0">
            <span className="text-zinc-500 uppercase flex items-center gap-1 text-[8px] tracking-widest font-mono text-accent-gold">
              <span className="h-1 w-1 bg-accent-gold rounded-full animate-pulse"></span> PORTFOLIO_EMULATOR Node
            </span>
            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <div className="flex items-center gap-2">
              <Wifi size={11} className="text-zinc-500" />
              <span className="text-[9px] text-zinc-500">88%</span>
              <Battery size={13} className="text-zinc-505" />
            </div>
          </div>
        )}

        {/* Interactive scroll inside content section */}
        <div 
          onScroll={handleScroll}
          id={`${viewportSize}-viewport-scroll`}
          className={`flex-1 overflow-x-hidden scrollbar-none content-scroll-pane bg-[#050505] transition-all duration-300 relative select-text ${
            isMobile 
              ? 'h-[600px] overflow-y-auto rounded-b-[42px] px-1' 
              : isTablet 
                ? 'h-[700px] overflow-y-auto rounded-b-[22px] px-1' 
                : 'h-[750px] overflow-y-auto'
          }`}
        >
      
      {/* Dynamic Header */}
      <div 
        id="header-section"
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

        <AnimatePresence mode="wait">
          {viewMode === 'wireframe' ? (
            /* WIREFRAME HEADER */
            <motion.div
              key="wireframe-header"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col bg-[#050505] border-b border-zinc-900 text-accent-gold font-mono text-xs blueprint-grid"
            >
              <div className="w-full p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="p-1 px-1.5 bg-accent-gold/10 border border-accent-gold/20 rounded text-[9px] text-accent-gold flex items-center gap-1">
                    <Layout size={10} /> CSS_FLEX
                  </span>
                  <span className={`font-serif italic tracking-widest text-sm transition-all duration-300 ${simulatedThemeToggleClicked ? 'text-accent-gold scale-105' : 'text-white'}`}>
                    [ logo_block ]
                  </span>
                  <span className="hidden sm:inline-flex leading-none h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>

                {showMobileLayout ? (
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded transition-all duration-300 flex items-center gap-1 text-[8px] ${
                      simulatedThemeToggleClicked 
                        ? 'bg-accent-gold text-zinc-950 border border-accent-gold font-semibold shadow-[0_0_8px_rgba(192,160,128,0.5)]' 
                        : 'bg-accent-gold/10 border border-accent-gold/20 text-accent-gold/80'
                    }`}>
                      <span>theme</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setMobileMenuOpen(!mobileMenuOpen); }}
                      className="p-1 border border-accent-gold/30 rounded text-accent-gold bg-accent-gold/5 cursor-pointer flex items-center justify-center"
                    >
                      {mobileMenuOpen ? <X size={12} /> : <Menu size={12} />}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 text-[11px]">
                    <span className="hidden sm:inline-block px-1 bg-white/5 text-zinc-500 font-sans">w-full max-w-7xl</span>
                    <span className="text-accent-gold/80 border-r border-[#151515] pr-4 font-mono flex items-center gap-1">
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
                )}
              </div>

              {showMobileLayout && mobileMenuOpen && (
                <div className="p-3 bg-zinc-950/95 border-t border-zinc-900 font-mono text-[9px] text-zinc-450 space-y-2 pb-4">
                  <span className="text-accent-gold block text-[8px] tracking-widest uppercase border-b border-zinc-900 pb-1 font-bold">[NAV_OVERLAY_BLUEPRINT]</span>
                  <div className="grid grid-cols-2 gap-2 text-center mt-2">
                    <button onClick={(e) => { e.stopPropagation(); scrollToSection('about'); }} className="p-2 border border-accent-gold/20 hover:border-accent-gold rounded bg-accent-gold/5 hover:bg-accent-gold/10 text-accent-gold text-center leading-none text-[8.5px]">CELL_01 // ABOUT</button>
                    <button onClick={(e) => { e.stopPropagation(); scrollToSection('skills'); }} className="p-2 border border-accent-gold/20 hover:border-accent-gold rounded bg-accent-gold/5 hover:bg-accent-gold/10 text-accent-gold text-center leading-none text-[8.5px]">CELL_02 // SKILLS</button>
                    <button onClick={(e) => { e.stopPropagation(); scrollToSection('projects'); }} className="p-2 border border-accent-gold/20 hover:border-accent-gold rounded bg-accent-gold/5 hover:bg-accent-gold/10 text-accent-gold text-center leading-none text-[8.5px]">CELL_03 // PROJECTS</button>
                    <button onClick={(e) => { e.stopPropagation(); scrollToSection('experience'); }} className="p-2 border border-accent-gold/20 hover:border-accent-gold rounded bg-accent-gold/5 hover:bg-accent-gold/10 text-accent-gold text-center leading-none text-[8.5px]">CELL_04 // EXP</button>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); scrollToSection('contact'); }} className="w-full mt-2 p-2 border border-accent-gold/40 hover:border-accent-gold rounded bg-accent-gold/15 text-white text-[9px] uppercase font-bold text-center leading-none">TRIGGER_GATEWAY // CONTACT</button>
                </div>
              )}
            </motion.div>
          ) : (
            /* HI-FI MOCK HEADER */
            <motion.div
              key="mockup-header"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="w-full flex flex-col bg-[#050505] z-20 border-b border-zinc-900"
            >
              <div className="w-full py-4 px-4 sm:px-6 flex justify-between items-center">
                <div className="font-serif italic text-base tracking-widest text-[#EDEDED] select-none">
                  MATTHEWS<span className="text-accent-gold">.T</span>
                </div>
                
                {showMobileLayout ? (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setDarkTheme(!darkTheme); }} 
                      className="p-1.5 hover:bg-zinc-900 rounded-full transition-colors text-zinc-400 cursor-pointer flex items-center justify-center"
                    >
                      {darkTheme ? <Sun size={13} /> : <Moon size={13} />}
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setMobileMenuOpen(!mobileMenuOpen); }}
                      className="p-1.5 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded transition-colors cursor-pointer flex items-center justify-center border border-zinc-800"
                    >
                      {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-5 sm:gap-6 text-xs text-[#EDEDED]">
                    <span onClick={(e) => { e.stopPropagation(); scrollToSection('about'); }} className="hover:text-accent-gold transition-colors font-medium cursor-pointer">About</span>
                    <span onClick={(e) => { e.stopPropagation(); scrollToSection('skills'); }} className="hover:text-accent-gold transition-colors font-medium cursor-pointer">Skills</span>
                    <span onClick={(e) => { e.stopPropagation(); scrollToSection('projects'); }} className="hover:text-accent-gold transition-colors font-medium cursor-pointer">Projects</span>
                    <span onClick={(e) => { e.stopPropagation(); scrollToSection('experience'); }} className="hover:text-accent-gold transition-colors font-medium cursor-pointer">Experience</span>
                    <span onClick={(e) => { e.stopPropagation(); scrollToSection('contact'); }} className="hover:text-accent-gold transition-colors text-accent-gold font-semibold cursor-pointer">Contact</span>
                    <button onClick={(e) => { e.stopPropagation(); setDarkTheme(!darkTheme); }} className="p-1.5 hover:bg-zinc-900 rounded-full transition-colors text-zinc-400 cursor-pointer flex items-center justify-center">
                      {darkTheme ? <Sun size={14} /> : <Moon size={14} />}
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile dropdown panel */}
              {showMobileLayout && mobileMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-4 flex flex-col bg-zinc-950 border-t border-zinc-900 font-sans text-xs divide-y divide-zinc-900 z-30"
                >
                  <button onClick={(e) => { e.stopPropagation(); scrollToSection('about'); }} className="w-full text-left py-2.5 text-zinc-400 hover:text-accent-gold transition-colors font-medium">About</button>
                  <button onClick={(e) => { e.stopPropagation(); scrollToSection('skills'); }} className="w-full text-left py-2.5 text-zinc-400 hover:text-accent-gold transition-colors font-medium">Skills</button>
                  <button onClick={(e) => { e.stopPropagation(); scrollToSection('projects'); }} className="w-full text-left py-2.5 text-zinc-400 hover:text-accent-gold transition-colors font-medium">Projects</button>
                  <button onClick={(e) => { e.stopPropagation(); scrollToSection('experience'); }} className="w-full text-left py-2.5 text-zinc-400 hover:text-accent-gold transition-colors font-medium">Experience</button>
                  <button onClick={(e) => { e.stopPropagation(); scrollToSection('contact'); }} className="w-full text-left py-2.5 text-accent-gold hover:text-white transition-colors font-semibold">Contact Dispatch</button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dynamic Hero */}
      <div 
        id="hero-section"
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

        <AnimatePresence mode="wait">
          {viewMode === 'wireframe' ? (
            /* WIREFRAME HERO */
            <motion.div
              key="wireframe-hero"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`bg-[#050505] blueprint-grid-dark flex flex-col items-center justify-center text-center text-accent-gold font-mono text-xs border-b border-zinc-900 relative ${
                showMobileLayout ? 'py-10 px-4' : 'py-16 px-8'
              }`}
            >
              
              {/* Ambient telemetry indicators */}
              {!showMobileLayout && (
                <div className="absolute right-4 top-4 text-[8px] text-zinc-650 font-mono text-right flex flex-col items-end gap-0.5">
                  <span>LAT: -26.2041° S</span>
                  <span>LON: 28.0473° E (Johannesburg)</span>
                  <span>TICK: {simIndex}</span>
                </div>
              )}

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
                <div className={`h-12 bg-accent-gold/20 rounded w-full mx-auto mb-2 flex flex-col items-center justify-center text-[10px] text-accent-gold font-mono font-semibold px-2 ${showMobileLayout ? 'leading-tight py-1' : ''}`}>
                  <span>Constructing performant, responsive</span>
                  <span className="text-white italic">digital ecosystems</span>
                </div>
              </div>

              <div className={`w-full max-w-md bg-accent-gold/5 border border-dotted border-accent-gold/20 rounded flex flex-col items-center justify-center text-zinc-500 text-[9px] mb-6 p-2 leading-relaxed ${
                showMobileLayout ? 'h-auto py-3' : 'h-12'
              }`}>
                <span>SUB_PARAGRAPH // INTER_SANS (bio snippet)</span>
                <span className="text-accent-gold/55 text-[8.5px] max-w-xs truncate block">"Hi, I'm Matthews Thekiso. I design and assemble complex applications..."</span>
              </div>

              <div className={`flex w-full items-center justify-center ${showMobileLayout ? 'flex-col gap-2 max-w-xs' : 'gap-4'}`}>
                <div className={`border rounded text-[#EDEDED] flex items-center justify-center gap-1 font-mono transition-all duration-300 cursor-pointer ${
                  simulatedActiveProjectIdx === 1 
                    ? 'bg-accent-gold/40 border-accent-gold text-zinc-950 font-semibold shadow-[0_0_12px_rgba(192,160,128,0.4)] scale-102' 
                    : 'bg-accent-gold/25 border-accent-gold/40'
                } ${showMobileLayout ? 'w-full py-2 text-[10px]' : 'px-4 py-2 text-xs'}`}>
                  <span>BUTTON [PRIMARY_CTA]</span>
                  <ArrowRight size={10} className={`${simulatedActiveProjectIdx === 1 ? 'translate-x-1' : ''} transition-transform`} />
                </div>
                <div className={`bg-[#0a0a0a] border border-zinc-850 rounded text-zinc-500 flex items-center justify-center gap-1.5 cursor-not-allowed ${
                  showMobileLayout ? 'w-full py-2 text-[10px]' : 'px-4 py-2 text-xs'
                }`}>
                  <span>BUTTON [CV_DOWNLOADER]</span>
                  <span className="h-1 w-1 rounded-full bg-zinc-500 animate-ping"></span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* HI-FI MOCK HERO */
            <motion.div
              key="mockup-hero"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`bg-[#050505] text-[#EDEDED] flex flex-col justify-center items-center text-center relative overflow-hidden border-b border-zinc-900 ${
                showMobileLayout ? 'py-12 px-4' : 'py-20 px-8'
              }`}
            >
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="max-w-2xl z-10 w-full flex flex-col items-center">
                <span className="font-mono text-[10px] text-accent-gold tracking-widest uppercase mb-4 px-3 py-1 bg-accent-gold/5 border border-accent-gold/15 rounded-full inline-block select-none">
                  SOFTWARE ENGINEER & ARCHITECT
                </span>
                
                <h1 className={`font-serif italic font-medium tracking-tight leading-snug mb-5 ${
                  showMobileLayout ? 'text-xl' : 'text-3xl sm:text-4xl md:text-5xl'
                }`}>
                  Constructing performant, responsive{' '}
                  <span className="text-accent-gold font-serif italic font-semibold">
                    digital ecosystems
                  </span>
                </h1>

                <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-lg mb-8 leading-relaxed">
                  Hi, I'm Matthews Thekiso. I design and assemble complex web applications, resilient layouts, and seamless
                  user journeys with React, Node, and modern cloud blueprints.
                </p>

                <div className={`flex items-center justify-center gap-3 w-full max-w-xs sm:max-w-none ${
                  showMobileLayout ? 'flex-col px-4' : 'flex-wrap'
                }`}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); scrollToSection('projects'); }}
                    className={`bg-accent-gold hover:bg-amber-200 text-zinc-950 font-medium font-sans text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-accent-gold/10 ${
                      showMobileLayout ? 'w-full py-3' : 'px-5 py-2.5'
                    }`}
                  >
                    Inspect Projects
                    <ArrowRight size={14} />
                  </button>
                  
                  <button 
                    onClick={handleDownloadCV} 
                    className={`font-sans text-xs rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      cvDownloadedSuccess 
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold border border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)] shadow' 
                        : 'bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700'
                    } ${
                      showMobileLayout ? 'w-full py-3' : 'px-5 py-2.5'
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
                <div className={`flex items-center justify-center text-zinc-500 font-mono flex-wrap ${
                  showMobileLayout ? 'text-[9.5px] gap-x-3 gap-y-1.5 mt-6 px-1' : 'text-xs gap-4 mt-8'
                }`}>
                  <span className="hover:text-accent-gold transition-colors pointer-events-none flex items-center gap-1">
                    <Github size={11} /> GitHub
                  </span>
                  <span className="hover:text-accent-gold transition-colors pointer-events-none flex items-center gap-1">
                    <Linkedin size={11} /> LinkedIn
                  </span>
                  <span className="hover:text-accent-gold transition-colors pointer-events-none flex items-center gap-1 font-sans">
                    <Mail size={11} /> sefellethekiso@gmail.com
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dynamic About Bento */}
      <div 
        id="about-section"
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

        <AnimatePresence mode="wait">
          {viewMode === 'wireframe' ? (
            /* WIREFRAME ABOUT */
            <motion.div
              key="wireframe-about"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`bg-[#050505] blueprint-grid border-b border-zinc-900 text-accent-gold font-mono text-xs ${
                showMobileLayout ? 'py-8 px-4' : 'py-12 px-6'
              }`}
            >
              <div className="flex justify-between items-center mb-6 text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-accent-gold/10 border border-accent-gold/20 rounded">BENTO_GRID_12cols</span>
                  <span className="text-zinc-500">[ ABOUT ]</span>
                </div>
                {!showMobileLayout && (
                  <div className="flex items-center gap-1 text-[9px] text-zinc-500">
                    <Cpu size={10} className="text-accent-gold inline animate-spin" />
                    <span>BIOMETRIC_TELEMETRY</span>
                  </div>
                )}
              </div>

              <div className={`grid gap-4 ${showMobileLayout ? 'grid-cols-1' : 'grid-cols-3'}`}>
                <div className={`border border-accent-gold/30 bg-accent-gold/5 rounded-xl p-5 relative overflow-hidden ${
                  showMobileLayout ? '' : 'md:col-span-2'
                }`}>
                  <span className="absolute right-2 top-2 text-[8px] text-accent-gold/45 font-mono">[SPAN_2_COLS]</span>
                  <div className="h-4 bg-accent-gold/20 rounded w-1/4 mb-3 flex items-center px-1 text-[9px] text-zinc-400">Synopsis</div>
                  <div className={`space-y-2 mb-3 text-zinc-500 leading-relaxed ${showMobileLayout ? 'text-[9.5px]' : 'text-[10px]'}`}>
                    <p className="text-accent-gold/70">"I manage client integrations and design workflows with a deep commitment to clean typography, interactive accessibility, and fast server responsiveness."</p>
                    <p className="text-zinc-500">"My experience spans building full-stack applications with Node and React, optimizing database indices..."</p>
                  </div>
                  <div className="h-8 bg-accent-gold/5 border border-accent-gold/10 rounded w-full sm:w-2/3 flex items-center justify-between px-3 text-[9px] text-zinc-500 gap-2">
                    <span className="flex items-center gap-1"><ShieldCheck size={10} className="text-accent-gold" /> blueprints</span>
                    <span className="flex items-center gap-1"><Cpu size={10} className="text-accent-gold" /> latency_ok</span>
                  </div>
                </div>

                {/* Focus box wireframe */}
                <div className="border border-accent-gold/30 bg-accent-gold/5 rounded-xl p-5 relative flex flex-col justify-between">
                  <div>
                    <span className="absolute right-2 top-2 text-[8px] text-accent-gold/45 font-mono">[SPAN_1_COL]</span>
                    <div className="h-4 bg-accent-gold/20 rounded w-2/3 mb-4 flex items-center px-1 text-[9px] text-zinc-400">Live Focus</div>
                    <div className="p-2 bg-zinc-950 border border-dotted border-accent-gold/30 rounded flex flex-col gap-1 text-[9px] text-zinc-500 font-mono">
                      <span className="text-accent-gold/80 font-bold block truncate">
                        {simIndex % 90 < 30 ? 'VITE_COMPILATION_ORCHESTRATOR' : (simIndex % 90 < 60 ? 'DATABASE_LATENCY_INDEX' : 'UI_USABILITY_EMITTER')}
                      </span>
                      <span className="text-[8px] text-zinc-650">SYSTEM_BUS_LOAD: {40 + (simIndex % 15)}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[9px] mt-4 text-zinc-650 leading-none">
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>ENGINE_CYCLE: OK</span>
                    </span>
                    <span>TICK {simIndex}</span>
                  </div>
                </div>

                {/* 4 small stats boxes inside Wireframe */}
                <div className={`grid grid-cols-2 gap-3 mt-1 ${showMobileLayout ? 'grid-cols-2' : 'md:col-span-3 sm:grid-cols-4'}`}>
                  {[
                    { label: "CODE_EXP", value: "4+ Yrs" },
                    { label: "DEPLOYS_SHIPPED", value: "18 Active" },
                    { label: "OPTIM_RATING", value: `${(98 + (simIndex % 2 === 0 ? 0.4 : 0.6)).toFixed(1)}%` },
                    { label: "GIT_PUHES", value: `${1400 + (simIndex % 3)} Pushes` }
                  ].map((st, idx) => (
                    <div key={idx} className="border border-dashed border-accent-gold/25 p-3 rounded-lg bg-accent-gold/5 text-center text-[9px] transition-transform duration-200 hover:scale-102">
                      <span className="text-zinc-500 block mb-1 uppercase font-mono tracking-wider">{st.label}</span>
                      <div className="font-mono text-xs text-white font-semibold flex items-center justify-center gap-1">
                        <span>{st.value}</span>
                        <span className="h-1 w-1 bg-accent-gold/30 rounded-full animate-ping"></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* HI-FI MOCK ABOUT */
            <motion.div
              key="mockup-about"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`bg-[#050505] border-b border-zinc-900 ${
                showMobileLayout ? 'py-8 px-4' : 'py-16 px-6'
              }`}
            >
              <div className="max-w-4xl mx-auto">
                <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block mb-1">BIOMETRICS</span>
                <h2 className="font-serif italic text-xl md:text-2xl font-medium text-white mb-8">System Profile</h2>
                
                <div className={`grid gap-5 ${showMobileLayout ? 'grid-cols-1' : 'grid-cols-3'}`}>
                  {/* Custom bio */}
                  <div className={`p-5 sm:p-6 bg-[#0a0a0a] rounded-xl border border-zinc-900 flex flex-col justify-between ${
                    showMobileLayout ? '' : 'md:col-span-2'
                  }`}>
                    <div>
                      <h3 className="font-sans font-medium text-xs text-zinc-350 uppercase tracking-wider mb-3">Qualitative Synopsis</h3>
                      <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                        I manage client integrations and design workflows with a deep commitment to clean typography,
                        interactive accessibility, and fast server responsiveness.
                      </p>
                      <p className="text-zinc-400 text-xs leading-relaxed">
                        My experience spans building full-stack applications with Node and React, as well as optimizing
                        custom database queries and orchestrating Docker containers.
                      </p>
                    </div>
                    <div className="flex gap-4 mt-6 pt-4 border-t border-zinc-900 flex-wrap">
                      <span className="text-[10px] text-zinc-500 flex items-center gap-1"><ShieldCheck size={11} className="text-accent-gold" /> Compliant Blueprints</span>
                      <span className="text-[10px] text-zinc-500 flex items-center gap-1"><Cpu size={11} className="text-accent-gold" /> Scaled Latencies</span>
                    </div>
                  </div>

                  {/* Focus Carousel mock */}
                  <div className="p-5 sm:p-6 bg-[#0a0a0a] rounded-xl border border-zinc-900 flex flex-col justify-between">
                    <div>
                      <h3 className="font-sans font-medium text-xs text-zinc-350 uppercase tracking-wider mb-3">Live Framework focus</h3>
                      <div className="space-y-3">
                        <div className="p-2 bg-zinc-950 border border-zinc-900 rounded">
                          <span className="text-[9px] font-mono text-accent-gold block">VITE_COMPILATION</span>
                          <p className="text-[10px] text-zinc-300 mt-0.5">Custom Rollup build optimizations</p>
                        </div>
                        <div className="p-2 bg-zinc-955 bg-zinc-950 border border-zinc-900 rounded font-mono">
                          <span className="text-[9px] font-mono text-zinc-500 block">DATABASE_GATEWAY</span>
                          <p className="text-[10px] text-zinc-400 mt-0.5">Postgres relational index tuning</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-mono text-zinc-650 mt-4 uppercase">
                      <span>Engine: ACTIVE</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse"></span>
                    </div>
                  </div>

                  {/* Grid stats */}
                  <div className={`grid gap-3 mt-2 ${showMobileLayout ? 'grid-cols-2' : 'md:col-span-3 sm:grid-cols-4'}`}>
                    {[
                      { val: '4+ Yrs', desc: 'Active Code' },
                      { val: '18 Ship', desc: 'Deployments' },
                      { val: '98%', desc: 'Optimization' },
                      { val: '10k+', desc: 'Terminal pushes' },
                    ].map((st, idx) => (
                      <div key={idx} className="p-4 bg-[#0a0a0a] border border-zinc-900/80 rounded-lg text-center">
                        <span className="font-serif italic text-base text-white block mb-0.5">{st.val}</span>
                        <span className="text-[9px] text-zinc-500 uppercase font-mono tracking-wider">{st.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dynamic Skills Deck */}
      <div 
        id="skills-section"
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

        <AnimatePresence mode="wait">
          {viewMode === 'wireframe' ? (
            /* WIREFRAME SKILLS */
            <motion.div
              key="wireframe-skills"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`bg-[#050505] blueprint-grid-dark border-b border-zinc-900 text-accent-gold font-mono text-xs ${
                showMobileLayout ? 'py-8 px-4' : 'py-12 px-6'
              }`}
            >
              <div className="flex justify-between items-start mb-6 gap-2">
                <div>
                  <span className="text-[9px] text-accent-gold/70 block uppercase">GRID_CONTAINER // DYNAMIC_REORGANIZATION</span>
                  <div className="h-5 bg-accent-gold/20 rounded w-44 sm:w-56 mt-1 flex items-center px-1 text-[10px] truncate">Capacitor Inventory</div>
                </div>
                {!showMobileLayout && (
                  <span className="text-[9px] border border-accent-gold/30 px-2 py-0.5 bg-accent-gold/5 text-zinc-500 animate-pulse">DIAGNOSTICS: ON</span>
                )}
              </div>

              {/* TAB WIREFRAME FILTERS */}
              <div className="flex flex-wrap gap-1.5 mb-6 text-[10px]">
                {[
                  { tabId: 'all', label: 'ALL_UNITS' },
                  { tabId: 'front', label: 'FE_CORE' },
                  { tabId: 'back', label: 'BE_DB' },
                  { tabId: 'tools', label: 'INFRA_TOOL' }
                ].map((f) => (
                  <button 
                    key={f.tabId} 
                    onClick={(e) => { e.stopPropagation(); setActiveSkillTab(f.tabId as any); }}
                    className={`px-2 py-0.5 sm:px-3 sm:py-1 bg-accent-gold/5 border rounded text-accent-gold/70 cursor-pointer text-[9.5px] transition-colors ${
                      activeSkillTab === f.tabId ? 'border-accent-gold bg-accent-gold/15 text-white' : 'border-accent-gold/20 hover:border-accent-gold/40'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* CELLS GRID WITH REAL SKILLS & INTERACTIVITY */}
              <div className={`grid gap-3 font-mono ${showMobileLayout ? 'grid-cols-2 gap-2 text-[9px]' : 'grid-cols-4 text-xs'}`}>
                {getActiveSkillsList().map((skill, index) => {
                  const isInspected = index === simulatedActiveSkillIdx;
                  return (
                    <div 
                      key={skill.name} 
                      className={`border rounded-lg transition-all duration-300 relative overflow-hidden ${
                        isInspected 
                          ? 'border-accent-gold bg-accent-gold/15 shadow-[0_0_10px_rgba(192,160,128,0.25)] scale-[1.02]' 
                          : 'border-accent-gold/20 bg-accent-gold/5'
                      } ${showMobileLayout ? 'p-2.5' : 'p-4'}`}
                    >
                      {isInspected && !showMobileLayout && (
                        <span className="absolute right-1 top-1 text-[7px] text-accent-gold font-bold px-1 bg-zinc-950 border border-accent-gold/30 rounded scale-90 animate-pulse">HOVER</span>
                      )}
                      <div className="flex justify-between mb-2 text-[9px] text-zinc-400 font-semibold gap-1">
                        <span className={`truncate ${isInspected ? 'text-white' : ''}`}>{skill.name}</span>
                        <span className="text-accent-gold font-mono whitespace-nowrap">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-[#050505] h-1 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 origin-left ${isInspected ? 'bg-white' : 'bg-accent-gold/70'}`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* HI-FI MOCK SKILLS */
            <motion.div
              key="mockup-skills"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`bg-[#050505] border-b border-zinc-900 ${
                showMobileLayout ? 'py-8 px-4' : 'py-16 px-6'
              }`}
            >
              <div className="max-w-4xl mx-auto">
                <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block mb-1">INVENTORY</span>
                <h2 className="font-serif italic text-xl md:text-2xl font-medium text-white mb-6">Technology Stack</h2>

                {/* Real filters interactivity */}
                <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1.5 scrollbar-thin">
                  {(['all', 'front', 'back', 'tools'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={(e) => { e.stopPropagation(); setActiveSkillTab(tab); }}
                      className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-md border transition-all cursor-pointer whitespace-nowrap ${
                        activeSkillTab === tab
                          ? 'bg-accent-gold/10 border-accent-gold text-accent-gold'
                          : 'border-zinc-800 text-zinc-550 hover:text-zinc-300'
                      }`}
                    >
                      {tab === 'all' ? 'All' : tab === 'front' ? 'Frontend' : tab === 'back' ? 'Backend' : 'Infra'}
                    </button>
                  ))}
                </div>

                {/* Filtered Grid elements */}
                <div className={`grid gap-3 ${showMobileLayout ? 'grid-cols-2 gap-2' : 'grid-cols-4'}`}>
                  {getActiveSkillsList().map((sk) => (
                    <div key={sk.name} className={`bg-[#0a0a0a] rounded-xl border border-zinc-900 hover:border-zinc-850 transition-all group ${
                      showMobileLayout ? 'p-3' : 'p-4'
                    }`}>
                      <div className="flex justify-between items-center mb-2 gap-1">
                        <span className="font-sans text-xs text-zinc-200 truncate">{sk.name}</span>
                        <span className="font-mono text-[9.5px] text-accent-gold whitespace-nowrap">{sk.level}%</span>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dynamic Projects Showcase */}
      <div 
        id="projects-section"
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

        <AnimatePresence mode="wait">
          {viewMode === 'wireframe' ? (
            /* WIREFRAME PROJECTS */
            <motion.div
              key="wireframe-projects"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`bg-[#050505] blueprint-grid border-b border-zinc-900 text-accent-gold font-mono text-xs ${
                showMobileLayout ? 'py-8 px-4' : 'py-12 px-6'
              }`}
            >
              <div className="flex justify-between items-start mb-6 text-[10px] gap-2">
                <div>
                  <span className="text-zinc-500 block uppercase font-mono">GALLERY_DECK // FLEX_WRAP</span>
                  <div className="h-5 bg-accent-gold/20 rounded w-44 sm:w-52 mt-1 flex items-center px-1 text-[10px] truncate">Selected Projects</div>
                </div>
                {!showMobileLayout && (
                  <span className="px-1.5 py-0.5 bg-accent-gold/15 text-accent-gold rounded uppercase flex items-center gap-1 mb-1 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>GRID: 3_COL_ROW // HOVER</span>
                  </span>
                )}
              </div>

              <div className={`grid gap-5 ${showMobileLayout ? 'grid-cols-1' : 'grid-cols-3'}`}>
                {mockProjects.map((p, i) => {
                  const isHovered = i === simulatedActiveProjectIdx;
                  return (
                    <div 
                      key={p.title} 
                      className={`border rounded-2xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                        isHovered 
                          ? 'border-accent-gold bg-accent-gold/15 shadow-[0_0_12px_rgba(192,160,128,0.3)] scale-[1.02]' 
                          : 'border-accent-gold/20 bg-accent-gold/5'
                      } ${showMobileLayout ? 'p-4' : 'p-5'}`}
                    >
                      {isHovered && !showMobileLayout && (
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
                        <p className="text-zinc-500 leading-relaxed text-[10px] mb-4">
                          {p.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-zinc-90 w-full border-zinc-900 text-[8px] text-zinc-550 font-mono">
                        <div className="flex flex-wrap gap-1 mb-2.5">
                          {p.tags.slice(1, 3).map((tg) => (
                            <span key={tg} className="text-[7.5px] px-1 bg-zinc-950 border border-zinc-900 rounded text-zinc-500">{tg}</span>
                          ))}
                        </div>
                        <div className="flex gap-3 text-[9px] text-[#EDEDED] items-center">
                          <span className="hover:text-accent-gold transition-colors flex items-center gap-1 cursor-pointer"><Github size={10} /> [github]</span>
                          <span className="text-accent-gold hover:text-white transition-colors flex items-center gap-1 cursor-pointer ml-auto"><ExternalLink size={10} /> [live]</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            /* HI-FI MOCK PROJECTS */
            <motion.div
              key="mockup-projects"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`bg-[#050505] border-b border-zinc-900 ${
                showMobileLayout ? 'py-8 px-4' : 'py-16 px-6'
              }`}
            >
              <div className="max-w-4xl mx-auto">
                <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block mb-1">CATALOG</span>
                <h2 className="font-serif italic text-xl md:text-2xl font-medium text-white mb-8">Selected Applications</h2>

                <div className={`grid gap-5 ${showMobileLayout ? 'grid-cols-1' : 'grid-cols-3'}`}>
                  {mockProjects.map((p, i) => (
                    <div key={i} className="bg-[#0a0a0a] border border-zinc-900 rounded-xl flex flex-col justify-between overflow-hidden group hover:border-[#1F1F1F] transition-all">
                      <div className={showMobileLayout ? 'p-4' : 'p-5'}>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[16px]">{p.mockImage}</span>
                          <span className="text-[8px] font-mono uppercase bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-900 text-zinc-500">
                            {p.tags[0]}
                          </span>
                        </div>
                        <h3 className="font-serif italic font-semibold text-sm mb-2 text-white group-hover:text-accent-gold transition-colors">
                          {p.title}
                        </h3>
                        <p className="text-zinc-400 text-[11px] leading-relaxed mb-4">
                          {p.description}
                        </p>
                      </div>

                      <div className={`mt-auto ${showMobileLayout ? 'px-4 pb-4' : 'px-5 pb-5'}`}>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {p.tags.slice(1).map((tg) => (
                            <span key={tg} className="text-[8px] font-mono text-zinc-500 bg-zinc-950 px-1 py-0.5 rounded border border-zinc-900">
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
            {/* Dynamic Experience Timeline */}
      <div 
        id="experience-section"
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

        <AnimatePresence mode="wait">
          {viewMode === 'wireframe' ? (
            /* WIREFRAME EXPERIENCE */
            <motion.div
              key="wireframe-experience"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`bg-[#050505] blueprint-grid-dark border-b border-zinc-900 text-accent-gold font-mono text-xs relative overflow-hidden ${
                showMobileLayout ? 'py-8 px-4' : 'py-12 px-6'
              }`}
            >
              <div className="flex justify-between items-center mb-6 gap-2">
                <span className="text-[9px] text-accent-gold/70 block uppercase font-mono">CHRONOLOGY_NODE_AXIS // TIMELINE_MARKERS</span>
                {!showMobileLayout && (
                  <span className="text-[9px] text-zinc-500 flex items-center gap-1 font-mono">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-gold animate-bounce"></span>
                    <span>WALKING_PARTICLE: {Math.floor(simulatedTimelinePercent)}%</span>
                  </span>
                )}
              </div>
              
              <div className={`relative border-l border-[#1F1F1F] space-y-8 ${
                showMobileLayout ? 'pl-4 ml-2' : 'pl-6 ml-4'
              }`}>
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
                      <span className={`absolute top-1 w-4 h-4 rounded-full border transition-all duration-300 bg-zinc-950 flex items-center justify-center text-[7px] ${
                        showMobileLayout ? '-left-[24px]' : '-left-[32px]'
                      } ${
                        isActive ? 'border-accent-gold text-accent-gold scale-110 shadow-[0_0_8px_rgba(192,160,128,0.4)]' : 'border-[#1F1F1F] text-zinc-650'
                      }`}>
                        {isActive ? '●' : '○'}
                      </span>
                      
                      <div className={`flex ${showMobileLayout ? 'flex-col gap-1 mb-2' : 'justify-between items-start mb-1'}`}>
                        <div className="h-3.5 flex items-center text-[9px] font-bold text-accent-gold uppercase">
                          {exp.company}
                        </div>
                        <div className="text-[8px] text-zinc-550 tracking-widest font-mono uppercase">
                          {exp.period}
                        </div>
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
            </motion.div>
          ) : (
            /* HI-FI MOCK EXPERIENCE */
            <motion.div
              key="mockup-experience"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`bg-[#050505] border-b border-zinc-900 ${
                showMobileLayout ? 'py-8 px-4' : 'py-16 px-6'
              }`}
            >
              <div className="max-w-xl mx-auto">
                <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block mb-1">CHRONICLE</span>
                <h2 className="font-serif italic text-xl md:text-2xl font-medium text-white mb-10">Historical Timeline</h2>
   
                <div className={`relative border-l border-zinc-900 pl-6 space-y-10 ${
                  showMobileLayout ? 'pl-4 ml-2' : 'pl-6 ml-4'
                }`}>
                  {mockExperience.map((exp, i) => (
                    <div key={i} className="relative group">
                      <span className={`absolute top-1 p-1 bg-zinc-950 border border-[#2a2a2a] text-accent-gold rounded-full flex items-center justify-center ${
                        showMobileLayout ? '-left-[21px]' : '-left-[31px]'
                      }`}>
                        <Briefcase size={10} className="text-accent-gold" />
                      </span>
   
                      <div className={`flex ${showMobileLayout ? 'flex-col gap-1 mb-1' : 'justify-between items-baseline'}`}>
                        <span className="text-[9px] font-mono text-zinc-500 tracking-wide uppercase">{exp.period}</span>
                        <p className="text-xs text-accent-gold font-mono">{exp.company}</p>
                      </div>
                      <h3 className="font-serif italic font-semibold text-sm text-white mt-0.5 mb-3">{exp.role}</h3>
   
                      <ul className="space-y-2 text-zinc-400 text-[11px] leading-relaxed">
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dynamic Contact Node */}
      <div 
        id="contact-section"
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

        <AnimatePresence mode="wait">
          {viewMode === 'wireframe' ? (
            /* WIREFRAME CONTACT - ANIMATED INTERACTION SIMULATOR */
            <motion.div
              key="wireframe-contact"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`bg-[#050505] blueprint-grid text-accent-gold font-mono text-xs ${
                showMobileLayout ? 'py-8 px-4' : 'py-12 px-6'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-[9px] text-zinc-500 block uppercase font-mono">SECTION_DISPATCH // COMPONENT_ID: CONTACT</span>
                {!showMobileLayout && (
                  <span className="text-[8px] text-accent-gold bg-accent-gold/15 border border-accent-gold/20 px-1.5 py-0.5 rounded flex items-center gap-1 animate-pulse font-mono">
                    <span className="h-1.5 w-1.5 bg-accent-gold rounded-full animate-ping"></span>
                    <span>CLIENT_INPUT_SIM_RUNNING</span>
                  </span>
                )}
              </div>
              
              <div className={`grid gap-6 ${showMobileLayout ? 'grid-cols-1' : 'grid-cols-5 gap-8'}`}>
                <div className={`border border-dotted border-accent-gold/20 p-5 rounded-xl bg-accent-gold/5 ${
                  showMobileLayout ? '' : 'md:col-span-2'
                }`}>
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
                <div className={`border rounded-2xl p-6 transition-all duration-300 relative ${
                  isSuccessSim 
                    ? 'border-emerald-500 bg-emerald-950/10 shadow-[0_0_12px_rgba(16,185,129,0.2)]' 
                    : (isSendingSim ? 'border-accent-gold/50 bg-accent-gold/5' : 'border-accent-gold/30 bg-[#070707]')
                } ${showMobileLayout ? '' : 'md:col-span-3'}`}>
                  <span className="absolute right-2 top-2 text-[8px] text-accent-gold/45 font-mono">[CONTACT_FORM_COILS]</span>
                  <div className="h-4 bg-accent-gold/25 rounded w-1/4 mb-4 flex items-center px-1 text-[9px] text-zinc-400">Dispatch Payload</div>
                  
                  {isSuccessSim ? (
                    <div className="text-center py-6 space-y-2 text-[10px]">
                      <div className="inline-flex p-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-base animate-bounce">
                        ✓
                      </div>
                      <p className="text-white font-semibold flex items-center justify-center gap-1 font-mono">STATUS: SECURED_202_OK</p>
                      <p className="text-[#a1a1aa] max-w-xs mx-auto text-[9px]">Payload compiled and transmitted to sefellethekiso@gmail.com. Loop resetting shortly...</p>
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
            </motion.div>
          ) : (
            /* HI-FI MOCK CONTACT */
            <motion.div
              key="mockup-contact"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`bg-[#050505] ${showMobileLayout ? 'py-8 px-4' : 'py-16 px-6'}`}
            >
              <div className="max-w-4xl mx-auto">
                <span className="text-[10px] font-mono text-accent-gold uppercase tracking-widest block mb-1">COORDINATION</span>
                <h2 className="font-serif italic text-xl md:text-2xl font-medium text-white mb-8 font-serif">Dispatch Gateway</h2>

                <div className={`grid gap-8 ${showMobileLayout ? 'grid-cols-1 gap-6' : 'grid-cols-5'}`}>
                  {/* Visual contact nodes */}
                  <div className={`space-y-4 ${showMobileLayout ? '' : 'md:col-span-2'}`}>
                    <h3 className="font-sans font-medium text-xs text-zinc-350 uppercase tracking-wider mb-2 font-mono">Direct Terminal Links</h3>
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
                            <div key={i} className="text-[9px] font-mono bg-zinc-950 p-1.5 rounded border border-zinc-905">
                              <span className="text-zinc-500">{log.time}</span> - <span className="text-accent-gold">{log.sender}</span>:
                              <p className="text-zinc-400 truncate mt-0.5">{log.msg}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Form layout */}
                  <div className={`bg-[#0a0a0a] border border-zinc-900 rounded-xl p-5 ${
                    showMobileLayout ? '' : 'md:col-span-3'
                  }`}>
                    {contactStatus === 'success' ? (
                      <div className="text-center py-6 space-y-3">
                        <div className="inline-flex p-3 bg-accent-gold/10 border border-accent-gold/30 text-accent-gold rounded-full">
                          <CheckCircle size={28} />
                        </div>
                        <h3 className="font-serif italic font-semibold text-sm text-white font-serif">Transmission Successful</h3>
                        <p className="text-zinc-400 text-[11px] max-w-xs mx-auto">
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
                          <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5 font-mono">Sender Identity</label>
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
                          <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5 font-mono">Gateway Email</label>
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
                          <label className="block font-mono text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5 font-mono">Payload Message</label>
                          <textarea
                            required
                            rows={3}
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            className="w-full px-3 py-2 bg-zinc-950 border border-zinc-900 rounded text-xs text-white focus:outline-none focus:border-accent-gold/40 transition-colors resize-none"
                            placeholder="What can we compile together?"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={contactStatus === 'sending'}
                          className="w-full py-2 bg-accent-gold hover:bg-[#d5b595] disabled:bg-[#1a1a1a] disabled:text-zinc-650 text-zinc-950 font-semibold text-xs font-mono rounded transition-colors cursor-pointer flex items-center justify-center gap-1.5"
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

        </div>

        {/* Swipe Handle Indicator Bars (Bottom phone/tablet hardware notch) */}
        {isTablet && (
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-40 h-[4.5px] bg-white/20 rounded-full z-40 select-none"></div>
        )}
        {isMobile && (
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-[4.5px] bg-white/20 rounded-full z-40 select-none"></div>
        )}

      </div>

      {/* Dynamic Scroll Debug HUD display in the margins */}
      <div className="mt-3 text-[9px] font-mono text-zinc-600 uppercase tracking-[0.14em] flex flex-wrap justify-between items-center w-full max-w-5xl px-2 gap-2">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-gold/40 animate-pulse"></span>
          <span>EMULATION_LINK: active_trace</span>
        </span>
        <div className="flex gap-4">
          <span>Viewport: <span className="text-accent-gold">{viewportSize.toUpperCase()}</span></span>
          <span>•</span>
          <span>Inner Offset Y: <span className="text-accent-gold">{scrollOffset}px</span></span>
          <span>•</span>
          <span>Fluid Scaling: Dynamic</span>
        </div>
      </div>

    </div>
  );
}
