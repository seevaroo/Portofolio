'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink, FolderGit2, Star, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import AnimatedContent from './AnimatedContent';
import SpotlightCard from './SpotlightCard';

interface Project {
  id: string;
  title: string;
  category: 'Full Stack' | '3D & WebGL' | 'AI & Tools';
  description: string;
  longDescription?: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
  metrics?: string;
  previewType?: 'cyber' | 'article' | 'school' | 'lanyard';
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
  'vercel': '/tech/vercel.png',
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
    id: 'cyber-gyzn',
    title: 'Cyber Gyzn',
    category: 'Full Stack',
    description:
      'A comprehensive cybersecurity dashboard for real-time phishing URL detection, domain reputation analysis, and threat intelligence monitoring with automated incident alerting.',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'PHP', 'MySQL'],
    githubUrl: 'https://github.com/alvaroraka/cyber-gyzn',
    liveUrl: 'https://alfari.my.id',
    featured: true,
    metrics: '99.4% Detection Accuracy',
    previewType: 'cyber',
    image: '/projects/cyber-gyzn.svg',
  },
  {
    id: 'bot-generate-artikel',
    title: 'Bot Generate Artikel',
    category: 'AI & Tools',
    description:
      'An automated AI-driven content generation and editorial publishing suite featuring semantic outline generation, automated SEO keyword scoring, and direct CMS webhooks.',
    tags: ['React', 'PHP', 'Laravel', 'Tailwind CSS', 'MySQL'],
    githubUrl: 'https://github.com/alvaroraka/bot-generate-artikel',
    liveUrl: 'https://alfari.my.id',
    featured: true,
    metrics: '10x Faster Content Flow',
    previewType: 'article',
    image: '/projects/bot-generate-artikel.svg',
  },
  {
    id: 'database-siswa',
    title: 'Database Siswa Platform',
    category: 'Full Stack',
    description:
      'Centralized educational institution information platform managing student academic records, attendance logs, performance metrics, and role-based permissions.',
    tags: ['PHP', 'Laravel', 'MySQL', 'Tailwind CSS', 'XAMPP'],
    githubUrl: 'https://github.com/alvaroraka/database-siswa',
    liveUrl: 'https://alfari.my.id',
    metrics: 'Enterprise Grade Data',
    previewType: 'school',
    image: '/projects/database-siswa.svg',
  },
  {
    id: 'lanyard-3d-lab',
    title: 'DevPass 3D Interactive Lanyard',
    category: '3D & WebGL',
    description:
      'Interactive 3D developer identification simulation using Three.js, Verlet physics, dynamic normal mapping, and iridescent custom foil shaders.',
    tags: ['React', 'JavaScript', 'HTML5', 'CSS3', 'GitHub'],
    githubUrl: 'https://github.com/alvaroraka/devpass-3d',
    liveUrl: '#home',
    featured: true,
    metrics: '60 FPS Physics Simulation',
    previewType: 'lanyard',
    image: '/projects/devpass-3d.svg',
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Full Stack' | '3D & WebGL' | 'AI & Tools'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Sembunyikan Navbar dan kunci scroll saat modal detail terbuka
  useEffect(() => {
    if (selectedProject) {
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
  }, [selectedProject]);

  // Dukungan tombol Escape untuk menutup modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <AnimatedContent distance={35} direction="vertical" duration={0.8} threshold={0.15} className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/10 text-sky-300 text-xs font-mono uppercase tracking-widest mb-3">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>PORTFOLIO SHOWCASE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
          Featured Engineering Works
        </h2>
        <p className="text-slate-400 max-w-2xl text-base sm:text-lg font-light">
          A curated selection of web applications, system architectures, and 3D digital experiences.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {(['All', 'Full Stack', '3D & WebGL', 'AI & Tools'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                activeFilter === filter
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50 shadow-sm'
                  : 'bg-white/5 text-slate-400 border border-white/5 hover:text-white hover:bg-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </AnimatedContent>

      {/* Projects Grid: 3 Baris / Kolom (seperti Certificate) */}
      <AnimatedContent
        distance={40}
        direction="vertical"
        duration={0.8}
        stagger={0.06}
        threshold={0.1}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto"
      >
        {filteredProjects.map((project) => (
          <SpotlightCard
            key={project.id}
            onClick={() => setSelectedProject(project)}
            spotlightColor="#ffffff"
            intensity={0.18}
            spotlightSize={220}
            softness={0.7}
            borderGlow={0.6}
            proximity={70}
            smoothing={0.2}
            className="p-3.5 sm:p-4 backdrop-blur-md flex flex-col justify-between group transition-all duration-300 rounded-2xl cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-sky-500/10 hover:border-sky-500/40"
            style={{
              '--spotlight-card-surface': 'rgba(5, 9, 23, 0.85)',
              '--spotlight-card-border': 'rgba(255, 255, 255, 0.08)',
            } as React.CSSProperties}
          >
            <div>
              {/* Visual Image / Mockup Frame (Mirip Certificate) */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-3 border border-white/10 bg-black/60 shadow-inner">
                {project.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  /* Visual UI Mockup Screen */
                  <div className="w-full h-full bg-gradient-to-b from-[#091124] to-[#040713] p-3 flex flex-col justify-between group-hover:scale-105 transition-transform duration-500">
                    <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                        <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-black/50">
                        {project.id}.dev
                      </span>
                    </div>

                    {project.previewType === 'cyber' && (
                      <div className="flex-1 flex flex-col justify-center gap-1.5 py-1">
                        <div className="bg-sky-500/10 border border-sky-500/20 rounded p-1.5 text-center">
                          <span className="text-[9px] text-sky-300 block font-mono">PHISHING LOGS</span>
                          <span className="text-xs font-bold text-white font-mono">2,419 DETECTED</span>
                        </div>
                        <div className="h-6 bg-black/60 rounded flex items-center px-2 border border-white/5 justify-between">
                          <span className="text-[10px] font-mono text-emerald-400">● Intelligence Active</span>
                        </div>
                      </div>
                    )}

                    {project.previewType === 'article' && (
                      <div className="flex-1 flex flex-col justify-center gap-1.5 py-1">
                        <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded p-1.5">
                          <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-[10px]">
                            AI
                          </div>
                          <span className="text-[11px] font-mono text-slate-200">Semantic Generator v2.4</span>
                        </div>
                        <div className="space-y-1">
                          <div className="w-3/4 h-1.5 bg-slate-700/60 rounded" />
                          <div className="w-full h-1.5 bg-slate-800/60 rounded" />
                        </div>
                      </div>
                    )}

                    {project.previewType === 'school' && (
                      <div className="flex-1 flex flex-col justify-center gap-1.5 py-1">
                        <div className="bg-blue-500/10 border border-blue-500/20 rounded p-1.5 flex items-center justify-between">
                          <span className="text-[11px] font-mono text-blue-300">Data Siswa Terpusat</span>
                          <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">Aktif</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1 text-center">
                          <div className="bg-black/50 rounded py-0.5 text-[9px] text-slate-300">Hadir: 100%</div>
                          <div className="bg-black/50 rounded py-0.5 text-[9px] text-slate-300">Rata2: 89.4</div>
                          <div className="bg-black/50 rounded py-0.5 text-[9px] text-emerald-400">Valid</div>
                        </div>
                      </div>
                    )}

                    {project.previewType === 'lanyard' && (
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="w-14 h-16 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-sky-400/40 shadow-lg flex flex-col items-center justify-center p-1 group-hover:rotate-6 transition-transform">
                          <div className="w-3 h-0.5 rounded-full bg-sky-400 mb-1" />
                          <span className="text-[8px] font-bold text-sky-300 font-mono">3D PASS</span>
                          <span className="text-[6px] text-slate-400 font-mono mt-0.5">THREE.JS</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Badges on top */}
                <div className="absolute top-2 right-2 flex items-center gap-1.5">
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-500/30">
                      <Star className="w-2.5 h-2.5 fill-amber-300" />
                      <span>Featured</span>
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-sky-300 bg-sky-500/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-sky-500/30">
                    {project.category}
                  </span>
                </div>

                {/* Hover Overlay "Lihat Detail" */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 text-center">
                  <span className="text-xs font-semibold text-white bg-sky-500/80 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 group-hover:scale-105 transition-transform">
                    <span>Lihat Detail</span>
                    <ArrowRight className="w-3 h-3 text-white" />
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="px-1">
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors mb-1 truncate">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 font-light line-clamp-2 leading-relaxed mb-3">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Tech Stack Logos (Bukan Tulisan, Tanpa Kanvas Pembungkus) */}
            <div className="px-1 pt-2.5 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                {project.tags.map((tag) => {
                  const logo = getTechLogo(tag);
                  return logo ? (
                    <div
                      key={tag}
                      title={tag}
                      className="w-5 h-5 flex items-center justify-center shrink-0 hover:scale-125 transition-transform duration-200 cursor-pointer"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={logo} alt={tag} className="w-full h-full object-contain drop-shadow" />
                    </div>
                  ) : (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300"
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>

              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          </SpotlightCard>
        ))}
      </AnimatedContent>

      {/* Modal Details */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#050917] border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Project Image Preview in Modal (Sama seperti Sertifikat) */}
            {selectedProject.image && (
              <div className="w-full aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden mb-5 sm:mb-6 border border-white/15 bg-black/70 shadow-inner">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-mono uppercase tracking-wider mb-3">
              {selectedProject.category}
            </div>
            <h3 className="text-xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">{selectedProject.title}</h3>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-6">
              {selectedProject.description}
            </p>

            {selectedProject.metrics && (
              <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Metric Highlight</span>
                  <span className="text-sm font-semibold text-white">{selectedProject.metrics}</span>
                </div>
              </div>
            )}

            {/* Technologies & Libraries: Menggunakan Logo Tech Stack */}
            <div className="mb-8">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
                Technologies &amp; Libraries
              </span>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {selectedProject.tags.map((tag) => {
                  const logo = getTechLogo(tag);
                  return (
                    <div
                      key={tag}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-sky-500/40 hover:bg-sky-500/10 transition-all group"
                    >
                      {logo ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={logo} alt={tag} className="w-4 h-4 object-contain group-hover:scale-110 transition-transform" />
                      ) : null}
                      <span className="text-xs font-mono font-medium text-slate-200 group-hover:text-white">
                        {tag}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-6 border-t border-white/10">
              <a
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
              >
                <span>Live Preview</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto relative px-6 py-2.5 rounded-full border border-white/15 hover:border-white/35 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-95 shadow-sm hover:shadow-white/5"
              >
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  <span className="text-slate-300 transition-opacity duration-200 group-hover:opacity-0 flex items-center justify-center">
                    <GithubIcon className="w-3.5 h-3.5" />
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-110">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/tech/github.png" alt="GitHub" className="w-4 h-4 object-contain" />
                  </span>
                </div>
                <span>Source Code</span>
              </a>

              <button
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-all cursor-pointer active:scale-95 text-center"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
