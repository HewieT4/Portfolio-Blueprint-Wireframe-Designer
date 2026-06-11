import { PortfolioSection, ProjectData, ExperienceData } from '../types';

export const mockProjects: ProjectData[] = [
  {
    title: 'Maratto Commerce — High-Performance API Gateway',
    description: 'An enterprise-grade checkout and logistics aggregation gateway built for South African merchants, integrating secure regional payment APIs, telemetry logging, and micro-second payload proxying.',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Stripe'],
    mockImage: '🌍'
  },
  {
    title: 'FlowSync — Cloud Infrastructure Hub',
    description: 'A distributed service gateway and orchestration platform that scales real-time database transactions, rate-limiting handlers, and micro-frontend state sync matrices.',
    tags: ['React', 'Express', 'Redis', 'Docker', 'AWS'],
    mockImage: '⚙️'
  },
  {
    title: 'Siyakha — Blueprint Portfolio Architect',
    description: 'An interactive structural viewer deconstructing responsive web design blueprints, typography tracking parameters, and design tokens for UI auditing.',
    tags: ['React 19', 'Vite', 'Motion', 'Tailwind CSS'],
    mockImage: '📐'
  }
];

export const mockExperience: ExperienceData[] = [
  {
    role: 'Lead Full-Stack Developer',
    company: 'Maratto Africa',
    period: '2023 - Present',
    achievements: [
      'Scale regional transaction pipelines across Johannesburg nodes, improving load velocities by 42%.',
      'Configured automated CI/CD pipelines, optimizing micro-service deploys on multi-zone load balancing systems.',
      'Designed custom design system architectures pairing with highly responsive layout systems.'
    ]
  },
  {
    role: 'Senior Software Engineer',
    company: 'Apex Digital Solutions',
    period: '2021 - 2023',
    achievements: [
      'Refactored legacy commerce platforms into modern React matrices, increasing client web accessibility by 30%.',
      'Architected Postgres database engines executing complex queries across regional shards smoothly.',
      'Authored secure webhook handlers preventing transaction failures during peak commerce intervals.'
    ]
  }
];

export const portfolioSections: PortfolioSection[] = [
  {
    id: 'header',
    name: 'Navigation Header',
    title: 'Sticky Glassmorphic Navigation',
    concept: 'A thin, minimal structural navigation rail providing immediate access to key applet sections while prioritizing screen space.',
    overview: 'The header behaves like a floating container that responds to user scroll coordinates. It remains invisible at peak zero-coordinate, then transitions smoothly into a glassmorphic background layer as the viewport moves downwards. This preserves visual hierarchy and maximizes negative space.',
    functionalities: [
      {
        trigger: 'Scroll Event (offset > 20px)',
        action: 'CSS Grid Refinement',
        behavior: 'Applies deep charcoal backdrop filter (backdrop-blur-md) and subtle bottom border line.'
      },
      {
        trigger: 'Mobile Menu Tap',
        action: 'Interactive Overlay Drawer',
        behavior: 'Slide-out side navigation panel with stagger-animated navigation item links.'
      },
      {
        trigger: 'Theme Toggle Click',
        action: 'Dynamic Theme Switching',
        behavior: 'Toggles system theme colors with smooth transitions, updating root attributes.'
      }
    ],
    designTokens: {
      layout: 'Flex Row, Space-Between, Sticky Position',
      padding: 'px-6 md:px-12 py-4',
      typography: 'font-display select-none font-semibold text-sm tracking-wider',
      colors: 'bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200/50 dark:border-zinc-800/50',
      animations: 'transition-all duration-300 ease-in-out'
    },
    codeSnippet: `import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={\`fixed top-0 left-0 w-full z-50 transition-all duration-300 \${
      scrolled 
        ? 'bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/40 py-3' 
        : 'bg-transparent py-5'
    }\`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="font-display font-medium text-lg tracking-wider text-white">
          MATTHEWS<span className="text-teal-400">.T</span>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-300 font-sans">
          {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
            <a key={item} href={\`#\${item.toLowerCase()}\`} className="hover:text-white transition-colors">
              {item}
            </a>
          ))}
          <button onClick={() => setDark(!dark)} className="p-2 hover:bg-zinc-900 rounded-full transition-colors text-zinc-400">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Menu Arrow button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-zinc-300 hover:text-white">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 flex flex-col px-6 py-6 gap-4 text-zinc-300">
          {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
            <a key={item} href={\`#\${item.toLowerCase()}\`} onClick={() => setMobileOpen(false)} className="text-lg py-1 hover:text-white">
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}`
  },
  {
    id: 'hero',
    name: 'Hero Section',
    title: 'Developer Persona & Headline Greeting',
    concept: 'An commanding, elegant visual starting block establishing Matthews Thekiso\'s expertise, core philosophy, and clear call-to-actions.',
    overview: 'The hero grid uses balanced typography pairing (Space Grotesk headers and clean Inter body) offset by substantial negative space. A bold, modern gradient accents key phrases to signify creative technical output.',
    functionalities: [
      {
        trigger: 'Hover on Main Action Button',
        action: 'Micro-scale Spring Response',
        behavior: 'Scales item up by 1.05 with a subtle spring tension motion backdrop, creating high-contrast click incentive.'
      },
      {
        trigger: 'Click on Download CV',
        action: 'Dynamic File Retrospection',
        behavior: 'Triggers active loading state, displays file compile sequence, and initiates PDF file stream.'
      },
      {
        trigger: 'Hover on Social Nodes',
        action: 'Glitch Color Highlight',
        behavior: 'Changes icon fills to brand colors (GitHub, LinkedIn) and slides up info hint.'
      }
    ],
    designTokens: {
      layout: 'Grid Columns (12-cols or Flex Column on mobile), Centered Content alignment',
      padding: 'pt-32 pb-24 md:pt-48 md:pb-36 px-6 md:px-12',
      typography: 'font-display text-4xl md:text-6xl tracking-tight leading-none, text-zinc-400 subtext',
      colors: 'bg-zinc-950 raw dark accents (gradient code: text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400)',
      animations: 'Framer Motion: Initial opacity-0, translateY-20 sliding gracefully to original'
    },
    codeSnippet: `import React, { useState } from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  const [downloading, setDownloading] = useState(false);

  const triggerDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 1500); // Simulate PDF preparation
  };

  return (
    <section className="min-h-screen bg-zinc-950 text-white flex flex-col justify-center px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto z-10 w-full">
        <p className="font-mono text-xs text-teal-400 mb-4 tracking-widest uppercase">
          WELCOME TO MY ARCHITECTURE Showroom
        </p>
        
        <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl mb-6 tracking-tight leading-[1.1]">
          I build robust digital products as a{' '}
          <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Full Stack Engineer
          </span>
        </h1>

        <p className="font-sans text-md sm:text-lg text-zinc-400 max-w-2xl mb-10 leading-relaxed">
          Hi, I'm Matthews Thekiso. I construct responsive web designs, complex data architectures, and 
          highly fluid front-end systems using modern, elegant paradigms.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a href="#projects" className="px-6 py-3.5 bg-teal-500 hover:bg-teal-400 text-zinc-950 font-medium font-sans text-sm rounded-lg flex items-center gap-2 transition-colors">
            Explore Work
            <ArrowRight size={16} />
          </a>
          
          <button onClick={triggerDownload} className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700 font-sans text-sm rounded-lg flex items-center gap-2 transition-all">
            {downloading ? (
              <>
                <span className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin"></span>
                Bundling PDF...
              </>
            ) : (
              <>
                <Download size={16} />
                Download CV
              </>
            )}
          </button>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5 mt-16 text-zinc-500">
          {[
            { icon: <Github size={20} />, href: 'https://github.com' },
            { icon: <Linkedin size={20} />, href: 'https://linkedin.com' },
            { icon: <Mail size={20} />, href: 'mailto:sefellethekiso@gmail.com' }
          ].map((soc, i) => (
            <a key={i} href={soc.href} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
              {soc.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'about',
    name: 'About Section',
    title: 'Bento Grid Profile & Quantitative Metrics',
    concept: 'A multi-faceted block replacing standard bio walls with a dynamic bento-box layout housing qualitative declarations and professional performance stats.',
    overview: 'The system aggregates key info into three balanced asymmetrical shapes: a detailed structural biography, a "Current Focus" tracker, and a quantitative summary panel emphasizing statistics like repository pushes or coffee loops.',
    functionalities: [
      {
        trigger: 'Entering Section Bounds',
        action: 'Staggered Card Slide-up',
        behavior: 'Staggers layout display nodes from initial position, letting each Bento node rise with an incremental 150ms delay.'
      },
      {
        trigger: 'Hover on Metric Stat Cards',
        action: 'Numeric Value Bump',
        behavior: 'Slightly pivots the stat text and increases scale to draw focus quickly.'
      }
    ],
    designTokens: {
      layout: 'Grid System, columns: 1 md:3, gap spacing: 6 (24px)',
      padding: 'py-20 px-6 md:px-12',
      typography: 'font-display uppercase card titles, dense monospace stats text',
      colors: 'bg-zinc-900 border-zinc-800 cards, bright text-white, teal highlights',
      animations: '150ms staggered child node transitions'
    },
    codeSnippet: `import React from 'react';
import { ShieldCheck, Cpu, Code2, Heart } from 'lucide-react';

export default function About() {
  const stats = [
    { value: '4+', label: 'Years Code Experience' },
    { value: '25+', label: 'Shipped Deployments' },
    { value: '99.9%', label: 'API Gateway Uptime' },
    { value: '1,400+', label: 'GitHub Contributions' }
  ];

  return (
    <section id="about" className="py-24 bg-zinc-950 text-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-xs text-teal-400 tracking-widest uppercase mb-2">ABOUT PLATFORM</p>
        <h2 className="font-display font-medium text-3xl md:text-5xl mb-12 tracking-tight">System Specifications</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bio Bento Box */}
          <div className="lg:col-span-2 p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800/60 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-semibold text-lg mb-4 text-white">Biographical Construct</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                I approach web applications with a dedication to structural rigor, responsive visual aesthetics,
                and performance latency. Having written countless lines of custom JavaScript, TypeScript, and Python,
                I focus heavily on bridging frontend beauty with backend capability.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                When I\\'m not mapping database blueprints, I\\'m investigating responsive animation cycles (Motion), 
                improving server file hierarchies, and studying high-performance layouts.
              </p>
            </div>
            <div className="flex gap-4 mt-8 pt-6 border-t border-zinc-800/50">
              <div className="flex items-center gap-2 text-zinc-400 text-xs"><ShieldCheck className="text-teal-400" size={16} /> Quality Driven</div>
              <div className="flex items-center gap-2 text-zinc-400 text-xs"><Cpu className="text-teal-400" size={16} /> System Focused</div>
              <div className="flex items-center gap-2 text-zinc-400 text-xs"><Code2 className="text-teal-400" size={16} /> Clean Code</div>
            </div>
          </div>

          {/* Core Focus Bento Box */}
          <div className="p-8 bg-zinc-900/50 rounded-2xl border border-zinc-800/60 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-semibold text-lg mb-4 text-white">Current Focus</h3>
              <div className="space-y-4">
                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                  <p className="text-xs text-teal-400 font-mono">CRITICAL PATHWAY</p>
                  <p className="text-xs text-white mt-1">Refining Edge Server Compilation Routines</p>
                </div>
                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                  <p className="text-xs text-zinc-400 font-mono">SUPPORTIVE STUDY</p>
                  <p className="text-xs text-white mt-1">UI Usability Engineering on Touch Gestures</p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span>STATUS: ONLINE</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
          </div>

          {/* Stats Container (Spans full width on Grid) */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {stats.map((st, i) => (
              <div key={i} className="p-6 bg-zinc-900/30 rounded-xl border border-zinc-800/40 text-center">
                <div className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">{st.value}</div>
                <div className="font-sans text-xs text-zinc-400 uppercase tracking-wider">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'skills',
    name: 'Skills Deck',
    title: 'Technology Grid with interactive detail drawers',
    concept: 'A comprehensive, modular stack explorer dividing capabilities into responsive categoric decks with quantitative familiarity levels.',
    overview: 'Skills are structured using a categoric split: Frontend Core, Backend & Storage, design systems, and operations. It provides interactive details allowing inspects on hover to check years written and framework specifics.',
    functionalities: [
      {
        trigger: 'Select Category Tab',
        action: 'List Deck Filtering',
        behavior: 'Performs instant layout reshuffling, hiding other cards and revealing selected category cards with spring layout physics.'
      },
      {
        trigger: 'Click Skill Badge',
        action: 'Insight popover display',
        behavior: 'Reveals a localized contextual box listing specific libraries used (e.g., React -> Redux toolkit, Custom Hooks).'
      }
    ],
    designTokens: {
      layout: 'Grid items auto-fill (minmax 120px), group layouts via tab filters',
      padding: 'py-20 px-6 md:px-12',
      typography: 'font-sans font-medium text-xs skill names, tracking-wide uppercase group labels',
      colors: 'bg-zinc-900 border border-zinc-800 node capsules, text-emerald-400 highlights',
      animations: 'instant layout filter re-render transition grids'
    },
    codeSnippet: `import React, { useState } from 'react';
import { Code, Server, AppWindow, Wrench } from 'lucide-react';

interface TechItem {
  name: string;
  level: number;
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<'all' | 'front' | 'back' | 'tools'>('all');

  const categoricSkills: Record<'front' | 'back' | 'tools', TechItem[]> = {
    front: [
      { name: 'TypeScript', level: 90 },
      { name: 'React / Next.js', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Redux Toolkit', level: 82 }
    ],
    back: [
      { name: 'Node.js / Express', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Redis', level: 75 },
      { name: 'Python', level: 78 }
    ],
    tools: [
      { name: 'Git & Deployment', level: 88 },
      { name: 'Docker', level: 78 },
      { name: 'Figma to Code', level: 90 },
      { name: 'CI/CD Pipelines', level: 80 }
    ]
  };

  const getFilteredSkills = () => {
    if (activeTab === 'all') {
      return [...categoricSkills.front, ...categoricSkills.back, ...categoricSkills.tools];
    }
    return categoricSkills[activeTab];
  };

  return (
    <section id="skills" className="py-24 bg-zinc-950 text-white px-6 md:px-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-xs text-teal-400 tracking-widest uppercase mb-2">EXPERT MATRIX</p>
        <h2 className="font-display font-medium text-3xl md:text-5xl mb-10 tracking-tight">Capacitor Inventory</h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-zinc-900 pb-6">
          {(['all', 'front', 'back', 'tools'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={\`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-md border transition-all \${
                activeTab === tab
                  ? 'bg-teal-500/10 border-teal-500 text-teal-400'
                  : 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }\`}
            >
              {tab === 'all' ? 'All Units' : tab === 'front' ? 'Frontend Core' : tab === 'back' ? 'Backend & Data' : 'Infrastructure'}
            </button>
          ))}
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {getFilteredSkills().map((skill) => (
            <div key={skill.name} className="p-5 bg-zinc-900/40 rounded-xl border border-zinc-800/80 hover:border-zinc-700/80 transition-all group">
              <div className="flex justify-between items-center mb-3">
                <span className="font-sans font-medium text-sm text-zinc-100">{skill.name}</span>
                <span className="font-mono text-xs text-teal-400 group-hover:scale-110 transition-transform">{skill.level}%</span>
              </div>
              <div className="w-full bg-zinc-950 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded-full transition-all duration-1000 origin-left"
                  style={{ width: \`\${skill.level}%\` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'projects',
    name: 'Projects Showcase',
    title: 'Multi-perspective Interactive Projects Catalog',
    concept: 'A dynamic catalog of works, prioritizing fast search, content category filtering, and immediate detail-expanding overlay views.',
    overview: 'Projects are represented inside grid blocks. Tapping a project card doesn\'t immediately launch offsite; instead, it launches an aesthetic localized details dialogue summarizing challenges, solutions, and stack layouts.',
    functionalities: [
      {
        trigger: 'Hover Card Node',
        action: 'Smooth Glassmorphism overlay fade',
        behavior: 'Hides summary specs and displays live repository buttons surrounded by a blur layer.'
      },
      {
        trigger: 'Tab Category Swap',
        action: 'Spring List Reordering',
        behavior: 'Staggers out decommissioned cards and staggers in active collection, utilizing layout animations.'
      }
    ],
    designTokens: {
      layout: 'Grid Layout 12 columns, spans 4 cols (3 per row) on desktop, columns: 1 on mobile',
      padding: 'py-20 px-6 md:px-12',
      typography: 'font-display uppercase titles, list stacks formatted in mono fonts',
      colors: 'light glass backdrop filters, deep container charcoal backgrounds',
      animations: '0.4s cubic-bezier cards scale, instant filters animate'
    },
    codeSnippet: `import React, { useState } from 'react';
import { ExternalLink, Github, FolderClosed } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'IntellectStore — E-Commerce Engine',
      category: 'Full Stack',
      desc: 'Robust digital marketplace featuring automated product search, multi-currency checkout, and integrated real-time invoice creation.',
      tags: ['React', 'Next.js', 'PostgreSQL', 'Stripe']
    },
    {
      title: 'FlowSync Core API Gateway',
      category: 'Backend',
      desc: 'A distributed service gateway that handles telemetry logging, rate-limiting, and gRPC payload proxying with sub-millisecond overhead.',
      tags: ['Node.js', 'Express', 'Redis', 'Docker']
    },
    {
      title: 'Aura — Ambient Audio Synthesizer',
      category: 'Client Core',
      desc: 'Web Audio API workspace generating customizable background frequencies and meditative rhythmic white-noise looping tracks.',
      tags: ['TypeScript', 'Vite', 'Web Audio', 'Motion']
    }
  ];

  return (
    <section id="projects" className="py-24 bg-zinc-950 text-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-xs text-teal-400 tracking-widest uppercase mb-2">PORTFOLIO INDEX</p>
        <h2 className="font-display font-medium text-3xl md:text-5xl mb-12 tracking-tight">Active Deployments</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800/80 rounded-2xl flex flex-col justify-between overflow-hidden group hover:border-zinc-700 transition-all">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-teal-400">
                    <FolderClosed size={20} />
                  </div>
                  <span className="text-[10px] font-mono uppercase bg-zinc-950 px-2.5 py-1 rounded-full border border-zinc-800 text-zinc-400">
                    {proj.category}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg mb-3 tracking-tight group-hover:text-teal-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {proj.desc}
                </p>
              </div>

              <div className="px-6 pb-6 mt-auto">
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.tags.map((tg) => (
                    <span key={tg} className="text-[10px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900">
                      {tg}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-zinc-800/60 text-xs text-zinc-400">
                  <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <Github size={14} /> Source Code
                  </a>
                  <a href="#" className="flex items-center gap-1.5 text-teal-400 hover:text-teal-300 transition-colors">
                    <ExternalLink size={14} /> Live View
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'experience',
    name: 'Experience Timeline',
    title: 'Timeline Explorer for work history metrics',
    concept: 'A structured record of previous software positions mapping deliverables on a responsive timeline tree containing achievements and technology vectors.',
    overview: 'This timeline allows clean scrolling through professional achievements. Rather than simple point notes, every role maps technical challenges faced, metrics accomplished, and tools configured.',
    functionalities: [
      {
        trigger: 'Milestone Scroll Highlight',
        action: 'Active node state toggle',
        behavior: 'Highlights the chronological node index with a glowing teal ring once it climbs past 50% scroll viewport height.'
      },
      {
        trigger: 'Hover achievements list',
        action: 'Translate markers rightwards',
        behavior: 'Displaces Bullet lines slightly to signify sub-item focus.'
      }
    ],
    designTokens: {
      layout: 'Single Axis timeline, nodes relative offset margin blocks',
      padding: 'py-20 px-6 md:px-12',
      typography: 'font-display uppercase company tags, font-sans descriptions',
      colors: 'teal highlights, timeline bar zinc-800, background zinc-950',
      animations: 'scrolling-driven highlights on chronological markers'
    },
    codeSnippet: `import React from 'react';
import { Briefcase } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      company: 'Apex Digital Systems',
      role: 'Lead Full-Stack Developer',
      period: '2023 - PRESENT',
      points: [
        'Engineered and scaled custom API middlewares, reducing cross-service payload delays by 32%.',
        'Configured automated CI/CD deployment charts, boosting dev team productivity.'
      ]
    },
    {
      company: 'Nexus Software Solutions',
      role: 'Software Engineer',
      period: '2021 - 2023',
      points: [
        'Refactored legacy template layouts into highly responsive React components, improving WebVitals scores by 25%.',
        'Designed a relational schema module mapping historical metrics.'
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-zinc-950 text-white px-6 md:px-12 border-t border-zinc-900">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-xs text-teal-400 tracking-widest uppercase mb-2">CHRONOLOGY</p>
        <h2 className="font-display font-medium text-3xl md:text-5xl mb-16 tracking-tight">Timeline Chronograph</h2>

        <div className="relative border-l border-zinc-800 pl-8 ml-4 space-y-16">
          {experiences.map((exp, i) => (
            <div key={i} className="relative group">
              {/* Timeline Icon Badge */}
              <span className="absolute -left-[45px] top-1.5 p-2 bg-zinc-950 border border-zinc-800 text-zinc-500 group-hover:text-teal-400 group-hover:border-teal-400 rounded-full transition-colors z-10 bg-zinc-950">
                <Briefcase size={14} />
              </span>

              <div className="absolute top-1 right-0 text-xs font-mono text-zinc-500 tracking-wider">
                {exp.period}
              </div>

              <div>
                <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">{exp.company}</span>
                <h3 className="font-display font-semibold text-xl text-white mt-1 mb-6">
                  {exp.role}
                </h3>

                <ul className="space-y-4 text-zinc-400 text-sm leading-relaxed max-w-2xl">
                  {exp.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 items-start group-hover:text-zinc-300 transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0"></span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'contact',
    name: 'Contact Form',
    title: 'Interactive Form with validation feedback',
    concept: 'A high-fidelity layout providing real-time feedback and detailed animations mapping to client dispatch requests.',
    overview: 'The contact unit connects active user input text fields directly with form validators. Instead of direct generic submission, it maps inputs into unified structured representations before simulating the API payload delivery.',
    functionalities: [
      {
        trigger: 'Input Focus State',
        action: 'Visual Capsule glow transition',
        behavior: 'Rotates border bounds and updates element borders to glowing teal with dynamic hints.'
      },
      {
        trigger: 'Click Submit Action',
        action: 'Async dispatch simulation',
        behavior: 'Shows sending statuses inside button nodes, creates real confetti responses once complete, and renders success messages.'
      }
    ],
    designTokens: {
      layout: 'Grid system Split columns: 5 (visuals) to 7 (input fields container)',
      padding: 'py-20 px-6 md:px-12',
      typography: 'font-display form labels text, monospace info states',
      colors: 'glass inputs borders bg-zinc-900 text-zinc-100',
      animations: '100mc spring border focus shifts, button dispatch states'
    },
    codeSnippet: `import React, { useState } from 'react';
import { Send, CheckCircle, Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950 text-white px-6 md:px-12 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs text-teal-400 tracking-widest uppercase mb-2">GET IN TOUCH</p>
        <h2 className="font-display font-medium text-3xl md:text-5xl mb-12 tracking-tight">Dispatch Node</h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Card left metrics */}
          <div className="lg:col-span-2 space-y-8">
            <h3 className="font-display font-medium text-xl text-white mb-4">Direct Coordinates</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
              Want to compile a project together? Or have simple architectural questions? Leave a brief payload dispatch.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-zinc-400">
                <div className="p-3 bg-zinc-900 border border-zinc-800 text-teal-400 rounded-lg">
                  <Mail size={18} />
                </div>
                <span>sefellethekiso@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-zinc-400">
                <div className="p-3 bg-zinc-900 border border-zinc-800 text-teal-400 rounded-lg">
                  <MapPin size={18} />
                </div>
                <span>South Africa</span>
              </div>
            </div>
          </div>

          {/* Form wrapper */}
          <div className="lg:col-span-3 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-8">
            {status === 'success' ? (
              <div className="text-center py-10 space-y-4">
                <div className="inline-flex p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full">
                  <CheckCircle size={36} />
                </div>
                <h3 className="font-display font-semibold text-lg text-white">Transmission Successful</h3>
                <p className="text-zinc-400 text-sm max-w-sm mx-auto">
                  Your payload message was compiled on the stack. I will follow up shortly!
                </p>
                <button onClick={() => setStatus('idle')} className="text-xs font-mono text-teal-400 underline hover:text-white transition-colors pt-4">
                  Send new transmission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2">Sender Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-400 transition-colors"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2">Gateway Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-400 transition-colors"
                    placeholder="name@domain.com"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2">Payload Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-teal-400 transition-colors resize-none"
                    placeholder="How can I assist your pipeline?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 bg-teal-500 hover:bg-teal-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-medium text-sm font-sans rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></span>
                      Transmitting...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Transmit Payload
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}`
  }
];
