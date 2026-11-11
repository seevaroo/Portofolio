'use client';

import React, { useState, useEffect } from 'react';
import {
  Code2,
  Award,
  Trophy,
  Cpu,
  ExternalLink,
  X,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import AnimatedContent from './AnimatedContent';
import SpotlightCard from './SpotlightCard';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  githubUrl?: string;
  figmaUrl?: string;
  previewUrl?: string;
  image?: string;
}

const TECH_LOGOS: Record<string, string> = {
  'react': '/tech/react.png',
  'next.js': '/next.svg',
  'nextjs': '/next.svg',
  'tailwind css': '/tech/tailwinnd css.png',
  'tailwind': '/tech/tailwinnd css.png',
  'javascript': '/tech/javascript.png',
  'js': '/tech/javascript.png',
  'typescript': '/tech/javascript.png',
  'html5': '/tech/html5.png',
  'html': '/tech/html5.png',
  'css3': '/tech/css3.png',
  'css': '/tech/css3.png',
  'php': '/tech/php.png',
  'laravel': '/tech/laravel.png',
  'mysql': '/tech/mysql.png',
  'supabase': '/tech/supabase.png',
  'github': '/tech/github.png',
  'figma': '/tech/figma.png',
  'netlify': '/tech/netlify.png',
  'flutter': '/tech/flutter.png',
  'dart': '/tech/dart.png',
  'xampp': '/tech/xampp.png',
  'laragon': '/tech/laragon.png',
};

const getTechLogo = (tag: string): string | null => {
  const normalized = tag.toLowerCase().trim();
  return TECH_LOGOS[normalized] || null;
};

const PROJECTS: Project[] = [
  {
    title: 'LinguaNova APK',
    description: 'Aplikasi android Learning Language / LinguaNova sebagai alat belajar bahasa asing .',
    longDescription:
      'LinguaNova adalah aplikasi pembelajaran bahasa berbasis Android yang dirancang sebagai alat interaktif untuk membantu Anda menguasai berbagai bahasa asing secara efektif, kapan saja dan di mana saja.',
    tags: ['Flutter', 'Dart', 'Supabase'],
    githubUrl: 'https://github.com/seevaroo/LinguaNova-APK',
    image: '/projects/LinguaNova.png',
  },
  {
    title: 'Kalkulator Geometri APK',
    description:
      'Aplikasi kalkulator geometri untuk menghitung luas, keliling, Luas Permukaan dan volume berbagai bangun geometri.',
    longDescription:
      'Aplikasi mobile berbasis Flutter yang dirancang untuk memudahkan pelajar dan profesional dalam menghitung luas serta keliling berbagai bangun datar secara cepat, akurat, dan efisien. Solusi digital praktis untuk perhitungan rumus geometri dasar. Dilengkapi dengan fitur riwayat perhitungan untuk mendukung kemudahan belajar matematika.',
    tags: ['Flutter', 'Dart'],
    githubUrl: 'https://github.com/seevaroo/kalkulator-Geometry-APK',
    image: '/projects/kalkulator-geometry.png',
  },
  {
    title: 'Biccas – SaaS Productivity & Task Management Redesign',
    description:
      'Desain landing page platform SaaS produktivitas tim dengan tampilan modern dan alur navigasi intuitif di Figma.',
    longDescription:
      'Biccas adalah platform SaaS berbasis dashboard yang dirancang untuk membantu tim dan profesional mengelola pekerjaan harian secara efisien. Proyek ini bertujuan untuk merancang landing page yang tidak hanya menarik secara visual, tetapi juga efektif dalam menyampaikan value proposition produk kepada calon pengguna.',
    tags: ['Figma'],
    figmaUrl: 'https://www.figma.com/design/XzC8di46hNkgj7OiryZqG1/ALVARO-RAKA-PRATAMA?node-id=0-1&t=PVqvNMp2T1iD8SXx-1',
    image: '/projects/biccas.png',
  },
];

interface Certificate {
  title: string;
  image: string;
}

const CERTIFICATES: Certificate[] = [
  {
    title: 'Full Stack Web Development Professional',
    image: '/certificates/cert.png',
  },
  {
    title: 'Cloud Architecture & DevOps Essentials',
    image: '/certificates/cert-2.svg',
  },
  {
    title: 'React & Next.js Advanced Specialist',
    image: '/certificates/cert-3.svg',
  },
  {
    title: 'Cybersecurity & Network Defense Essentials',
    image: '/certificates/cert-4.svg',
  },
];

interface Achievement {
  title: string;
  image: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Intro to Vibe Coding',
    image: '/achievements/vibe coding.png',
  },
  {
    title: 'Problem Solving with AI',
    image: '/achievements/Problem-Solving.png',
  },
  {
    title: 'Gemini App Builder Specialist',
    image: '/achievements/gemini.png',
  },
  {
    title: 'Gemini Applications with NotebookLM',
    image: '/achievements/gemini notebook.png',
  },
  {
    title: 'Build student inquiry skills',
    image: '/achievements/Build student inquiry skills.png',
  },
];

interface TechStackItem {
  id: string;
  name: string;
  icon: string; // Path ke file gambar (misal: '/tech/react.svg' atau '/tech/react.png')
}

const TECH_STACK_ITEMS: TechStackItem[] = [
  { id: 'react', name: 'React', icon: '/tech/react.png' },
  { id: 'javascript', name: 'JavaScript', icon: '/tech/javascript.png' },
  { id: 'html5', name: 'HTML5', icon: '/tech/html5.png' },
  { id: 'css3', name: 'CSS3', icon: '/tech/css3.png' },
  { id: 'php', name: 'PHP', icon: '/tech/php.png' },
  { id: 'laravel', name: 'Laravel', icon: '/tech/laravel.png' },
  { id: 'mysql', name: 'MySQL', icon: '/tech/mysql.png' },
  { id: 'supabase', name: 'Supabase', icon: '/tech/supabase.png' },
  { id: 'xampp', name: 'XAMPP', icon: '/tech/xampp.png' },
  { id: 'laragon', name: 'Laragon', icon: '/tech/laragon.png' },
  { id: 'github', name: 'GitHub', icon: '/tech/github.png' },
  { id: 'netlify', name: 'Netlify', icon: '/tech/netlify.png' },
  { id: 'figma', name: 'Figma', icon: '/tech/figma.png' },
  { id: 'Flutter', name: 'Flutter', icon: '/tech/flutter.png' },
  { id: 'Tailwind Css', name: 'Tailwind Css', icon: '/tech/tailwinnd css.png' },
  { id: 'Dart', name: 'Dart', icon: '/tech/dart.png' },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'achievements' | 'tech-stack'>('projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const handleSelectProject = (project: Project | null) => {
    setSelectedProject(project);
    setIsDescriptionExpanded(false);
  };

  const isAnyModalOpen = Boolean(selectedProject || selectedCert || selectedAchievement);

  // Sembunyikan Navbar dan kunci scroll saat modal detail terbuka
  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('modal-state-change', { detail: { open: true } }));
    } else {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('modal-state-change', { detail: { open: false } }));
    }

    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('modal-state-change', { detail: { open: false } }));
    };
  }, [isAnyModalOpen]);

  // Dukungan switch tab dari navbar (misal klik "Tech Stack" atau "Portfolio")
  useEffect(() => {
    const handleSwitchTab = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab: 'projects' | 'certificates' | 'achievements' | 'tech-stack' }>;
      if (customEvent.detail?.tab) {
        setActiveTab(customEvent.detail.tab);
      }
    };
    window.addEventListener('switch-portfolio-tab', handleSwitchTab);
    return () => window.removeEventListener('switch-portfolio-tab', handleSwitchTab);
  }, []);

  const handleTabChange = (tabId: 'projects' | 'certificates' | 'achievements' | 'tech-stack') => {
    setActiveTab(tabId);
    window.dispatchEvent(new CustomEvent('portfolio-tab-changed', { detail: { tab: tabId } }));
  };

  // Dukungan tombol Escape untuk menutup semua modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSelectProject(null);
        setSelectedCert(null);
        setSelectedAchievement(null);
      }
    };
    if (isAnyModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAnyModalOpen]);

  const TABS = [
    { id: 'projects', label: 'Projects', icon: Code2 },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'tech-stack', label: 'Tech Stack', icon: Cpu },
  ] as const;

  return (
    <section id="portfolio" className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Title */}
      <AnimatedContent distance={30} direction="vertical" duration={0.8} threshold={0.15} className="flex flex-col items-center text-center mb-8">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
          Portfolio
        </h2>
      </AnimatedContent>

      {/* Sub-navbar / Tab Switcher Capsule (Mirip Gambar 2) */}
      <AnimatedContent distance={25} direction="vertical" duration={0.7} threshold={0.15} className="flex items-center justify-center mb-10 sm:mb-14">
        <div className="w-full max-w-xl sm:max-w-2xl lg:max-w-3xl p-1.5 rounded-2xl border border-white/10 bg-[#040816]/80 backdrop-blur-md shadow-2xl shadow-black/80 grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center justify-center gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-medium tracking-tight transition-all duration-200 cursor-pointer w-full ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </AnimatedContent>

      {/* TAB CONTENT 1: PROJECTS */}
      {activeTab === 'projects' && (
        <AnimatedContent
          distance={40}
          direction="vertical"
          duration={0.8}
          stagger={0.06}
          threshold={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto"
        >
          {PROJECTS.map((project, idx) => (
            <SpotlightCard
              key={project.title || idx}
              onClick={() => handleSelectProject(project)}
              spotlightColor="#ffffff"
              intensity={0.18}
              spotlightSize={240}
              softness={0.7}
              borderGlow={0.6}
              proximity={70}
              smoothing={0.2}
              className="p-4 sm:p-5 backdrop-blur-md flex flex-col justify-between group transition-all duration-300 rounded-2xl sm:rounded-3xl cursor-pointer hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/10"
              style={{
                '--spotlight-card-surface': 'rgba(5, 9, 23, 0.85)',
                '--spotlight-card-border': 'rgba(255, 255, 255, 0.08)',
              } as React.CSSProperties}
            >
              <div>
                {/* Visual Image / Mockup Frame (Mirip Gambar 2) */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-white/10 bg-black/60 shadow-inner">
                  {project.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#091124] p-3 flex flex-col justify-between" />
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white transition-colors mb-2 tracking-wide">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 font-light line-clamp-3 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              {/* Action Button: Details (sama seperti View Certificate) */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectProject(project);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-medium transition-all shadow-xl shadow-blue-500/30 active:scale-95 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Details</span>
                </button>
              </div>
            </SpotlightCard>
          ))}
        </AnimatedContent>
      )}

      {/* TAB CONTENT 2: CERTIFICATES */}
      {activeTab === 'certificates' && (
        <AnimatedContent
          distance={40}
          direction="vertical"
          duration={0.8}
          stagger={0.06}
          threshold={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {CERTIFICATES.map((cert, idx) => (
            <div
              key={cert.title || idx}
              onClick={() => setSelectedCert(cert)}
              className="group relative w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/50 bg-[#050917] shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
            >
              {/* Certificate Image - Clean Display */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Overlay with "View Certificate" Button (Mirip Gambar Referensi) */}
              <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCert(cert);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm shadow-xl shadow-blue-500/30 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer active:scale-95"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </AnimatedContent>
      )}

      {/* TAB CONTENT 3: ACHIEVEMENTS */}
      {activeTab === 'achievements' && (
        <AnimatedContent
          distance={40}
          direction="vertical"
          duration={0.8}
          stagger={0.06}
          threshold={0.1}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {ACHIEVEMENTS.map((ach, idx) => (
            <div
              key={ach.title || idx}
              onClick={() => setSelectedAchievement(ach)}
              className="group relative w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/50 bg-gradient-to-b from-[#0a122c]/90 to-[#040817]/95 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer flex items-center justify-center p-4 sm:p-6"
            >
              {/* Achievement Image - Clean Display */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ach.image}
                alt={ach.title}
                className="max-h-full max-w-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Overlay with "View Certificate" Button (Mirip Gambar Referensi) */}
              <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAchievement(ach);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm shadow-xl shadow-blue-500/30 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 cursor-pointer active:scale-95"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </AnimatedContent>
      )}

      {/* TAB CONTENT 4: TECH STACK */}
      {activeTab === 'tech-stack' && (
        <AnimatedContent
          distance={40}
          direction="vertical"
          duration={0.8}
          stagger={0.04}
          threshold={0.1}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 max-w-6xl mx-auto"
        >
          {TECH_STACK_ITEMS.map((tech) => (
            <SpotlightCard
              key={tech.id}
              theme="dark"
              spotlightColor="#ffffff"
              intensity={0.18}
              spotlightSize={170}
              softness={0.7}
              borderGlow={0.6}
              proximity={60}
              smoothing={0.2}
              className="group p-5 sm:p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-105 cursor-pointer aspect-square rounded-2xl sm:rounded-3xl hover:shadow-xl hover:shadow-white/5"
              style={{
                '--spotlight-card-surface': 'rgba(6, 11, 25, 0.85)',
                '--spotlight-card-border': 'rgba(255, 255, 255, 0.08)',
              } as React.CSSProperties}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-full h-full object-contain filter drop-shadow-sm select-none pointer-events-none"
                  loading="lazy"
                />
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white transition-colors text-center tracking-wide">
                {tech.name}
              </span>
            </SpotlightCard>
          ))}
        </AnimatedContent>
      )}

      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#02050e] overflow-y-auto animate-in fade-in duration-200 selection:bg-sky-500/30 selection:text-white">
          {/* Ambient Lighting Background */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 min-h-screen">
            {/* Top Navigation Bar: Back button + Breadcrumb (Persis Gambar Referensi) */}
              <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
                <button
                  type="button"
                  onClick={() => handleSelectProject(null)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/25 text-slate-200 hover:text-white text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4 text-sky-400" />
                  <span>Back</span>
                </button>

                <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-400 overflow-hidden">
                  <span
                    onClick={() => handleSelectProject(null)}
                    className="hover:text-sky-400 cursor-pointer transition-colors"
                  >
                    Projects
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span className="text-white font-medium truncate">
                    {selectedProject.title}
                  </span>
                </div>
              </div>

              {/* Main 2-Column Grid: Left Info, Right Showcase Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
                {/* Left Column: Project Title, Description, Technologies & Action Buttons */}
                <div className="lg:col-span-5 flex flex-col">
                  {/* Giant Title */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-5 leading-[1.15]">
                    {selectedProject.title}
                  </h1>

                  {/* Description with Expandable Toggle ("Lihat selengkapnya") */}
                  <div className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-6">
                    <p className="whitespace-pre-line">
                      {isDescriptionExpanded
                        ? selectedProject.longDescription
                        : selectedProject.longDescription.length > 220
                        ? `${selectedProject.longDescription.slice(0, 220)}...`
                        : selectedProject.longDescription}
                    </p>

                    {selectedProject.longDescription.length > 220 && (
                      <button
                        type="button"
                        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                        className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300 text-xs sm:text-sm font-medium mt-2 cursor-pointer transition-colors"
                      >
                        <span>{isDescriptionExpanded ? 'Tampilkan lebih sedikit' : 'Lihat selengkapnya'}</span>
                        {isDescriptionExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Technologies Used Section */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-white mb-3">
                      <Code2 className="w-4 h-4 text-sky-400" />
                      <span>Technologies Used</span>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {selectedProject.tags.map((tag) => {
                        const logo = getTechLogo(tag);
                        return (
                          <div
                            key={tag}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 hover:border-sky-500/30 hover:bg-sky-500/10 transition-all text-xs font-mono text-slate-200"
                          >
                            {logo ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={logo}
                                alt={tag}
                                className="w-4 h-4 object-contain"
                              />
                            ) : (
                              <Code2 className="w-3.5 h-3.5 text-sky-400" />
                            )}
                            <span>{tag}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Button: Preview / Source Code */}
                  {(selectedProject.figmaUrl || selectedProject.githubUrl) && (
                    <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                      {selectedProject.figmaUrl && (
                        <a
                          href={selectedProject.figmaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/15 hover:border-white/35 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all group cursor-pointer active:scale-95 shadow-sm hover:shadow-white/5"
                        >
                          <div className="w-4 h-4 flex items-center justify-center shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src="/tech/figma.png"
                              alt="Figma"
                              className="w-4 h-4 object-contain group-hover:scale-110 transition-transform duration-200"
                            />
                          </div>
                          <span>Preview</span>
                        </a>
                      )}

                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/15 hover:border-white/35 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all group cursor-pointer active:scale-95 shadow-sm hover:shadow-white/5"
                        >
                          <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                            <span className="text-slate-300 transition-opacity duration-200 group-hover:opacity-0 flex items-center justify-center">
                              <GithubIcon className="w-3.5 h-3.5" />
                            </span>
                            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-110">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src="/tech/github.png"
                                alt="GitHub"
                                className="w-4 h-4 object-contain"
                              />
                            </span>
                          </div>
                          <span>Source Code</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Right Column: Project Showcase Image */}
                <div className="lg:col-span-7 flex flex-col">
                  {selectedProject.image ? (
                    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black/40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-500">
                      No Preview Available
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
      )}

      {/* MODAL 2: CERTIFICATE PREVIEW (HANYA GAMBAR PERSIS GAMBAR REFERENSI 1) */}
      {selectedCert && (
        <div
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[88vh] flex items-center justify-center"
          >
            {/* Blue X Close Button Top Right (Persis Tombol Biru di Gambar 1) */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-20 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/40 transition-all cursor-pointer active:scale-95 flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Certificate Image - Clean Display Only */}
            <div className="w-full max-h-[85vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-white border border-white/20 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-full h-auto max-h-[85vh] object-contain block"
              />
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ACHIEVEMENT PREVIEW (HANYA GAMBAR PERSIS SEPERTI SERTIFIKAT) */}
      {selectedAchievement && (
        <div
          onClick={() => setSelectedAchievement(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[88vh] flex items-center justify-center"
          >
            {/* Blue X Close Button Top Right */}
            <button
              onClick={() => setSelectedAchievement(null)}
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-20 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/40 transition-all cursor-pointer active:scale-95 flex items-center justify-center"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Achievement Image - Clean Display Only */}
            <div className="w-full max-h-[85vh] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-[#0a122c] to-[#040817] border border-sky-500/30 p-4 sm:p-8 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedAchievement.image}
                alt={selectedAchievement.title}
                className="max-h-[80vh] max-w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

