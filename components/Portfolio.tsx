'use client';

import React, { useState, useEffect } from 'react';
import {
  Code2,
  Award,
  Trophy,
  Cpu,
  ExternalLink,
  Star,
  CheckCircle2,
  X,
  ShieldCheck,
  Calendar,
  Building2,
  ArrowRight
} from 'lucide-react';
import { GithubIcon, GoogleIcon } from './SocialIcons';
import AnimatedContent from './AnimatedContent';
import SpotlightCard from './SpotlightCard';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
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
    id: 'detektor-tangan',
    title: 'DETEKTOR TANGAN',
    category: 'python',
    description: 'Ini adalah program Simulasi Partikel Interaktif menggunakan Detektor Tangan berbasis AI. Hanya dengan menggerakkan jari di depan kamera, posisi ribuan titik di layar akan mengikuti perintah tangan kita secara halus. Jika tangan mengepal akan membentuk planet, satu jari membentuk hati, dua jari memunculkan teks, dan telapak tangan terbuka akan membuat partikel melayang acak.',
    longDescription:
      'Ini adalah program Simulasi Partikel Interaktif menggunakan Detektor Tangan berbasis AI. Hanya dengan menggerakkan jari di depan kamera, posisi ribuan titik di layar akan mengikuti perintah tangan kita secara halus. Jika tangan mengepal akan membentuk planet, satu jari membentuk hati, dua jari memunculkan teks, dan telapak tangan terbuka akan membuat partikel melayang acak.',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'PHP', 'MySQL'],
    githubUrl: 'https://github.com/seevaroo/detektor-tangan',
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
      'Aplikasi dashboard otomatisasi pembuatan artikel berbasis AI untuk menghasilkan, mengelola, dan memantau proses pembuatan serta publikasi artikel secara efisien pada website.',
    longDescription:
      'Sistem otomatisasi penulisan konten berbasis Large Language Model dengan integrasi semantic outline, scoring kata kunci SEO secara realtime, serta integrasi webhook CMS otomatis untuk publikasi instan.',
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
    title: 'Database Siswa',
    category: 'Web Platform',
    description:
      'Aplikasi Dashboard Data Siswa merupakan platform berbasis website untuk memantau data siswa secara terpusat.',
    longDescription:
      'Sistem informasi akademik terpadu untuk institusi pendidikan, mencakup pengelolaan rekam jejak siswa, data kehadiran real-time, grafik performa nilai ujian, serta hak akses multi-level (Admin, Guru, Wali Murid).',
    tags: ['PHP', 'Laravel', 'MySQL', 'Tailwind CSS', 'XAMPP'],
    githubUrl: 'https://github.com/alvaroraka/database-siswa',
    liveUrl: 'https://alfari.my.id',
    metrics: 'Enterprise Grade Data',
    previewType: 'school',
    image: '/projects/database-siswa.svg',
  },
  {
    id: 'lanyard-3d-lab',
    title: 'DevPass 3D Interactive',
    category: '3D & WebGL',
    description:
      'Simulasi kartu identitas developer interaktif 3D dengan Three.js, fisika tali Verlet, dan efek foil holografik.',
    longDescription:
      'Eksplorasi grafis web interaktif yang menggabungkan simulasi fisika tali lanyard secara real-time, dynamic normal mapping, foil sheen shader, serta interaktivitas drag & toss 60 FPS.',
    tags: ['React', 'JavaScript', 'HTML5', 'CSS3', 'GitHub'],
    githubUrl: 'https://github.com/alvaroraka/devpass-3d',
    liveUrl: '#home',
    featured: true,
    metrics: '60 FPS Physics Simulation',
    previewType: 'lanyard',
    image: '/projects/devpass-3d.svg',
  },
];

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  skills: string[];
  description: string;
  image: string; // Path gambar (misal '/certificates/cert-1.svg' atau '/certificates/cert-1.png' atau URL)
  verifyUrl: string; // Link verifikasi sertifikat online
}

const CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Full Stack Web Development Professional',
    issuer: 'Dicoding Indonesia / Kemendikbud',
    issueDate: 'Januari 2024',
    credentialId: 'DCD-FSW-2024-8891',
    skills: ['Next.js', 'React', 'Node.js', 'REST APIs', 'PostgreSQL'],
    description:
      'Sertifikasi komprehensif mencakup arsitektur modern web front-to-back, API security, automated testing, dan database relational.',
    image: '/certificates/cert-1.svg',
    verifyUrl: 'https://www.dicoding.com/certificates/DCD-FSW-2024-8891',
  },
  {
    id: 'cert-2',
    title: 'Cloud Architecture & DevOps Essentials',
    issuer: 'AWS Academy / Dicoding',
    issueDate: 'November 2023',
    credentialId: 'AWS-ACAD-67210',
    skills: ['AWS Services', 'Docker', 'CI/CD Pipelines', 'Linux'],
    description:
      'Kompetensi dalam perancangan infrastruktur cloud elastis, containerization aplikasi dengan Docker, dan monitoring server.',
    image: '/certificates/cert-2.svg',
    verifyUrl: 'https://aws.amazon.com/training/digital/',
  },
  {
    id: 'cert-3',
    title: 'React & Next.js Advanced Specialist',
    issuer: 'Meta / Coursera',
    issueDate: 'Agustus 2023',
    credentialId: 'META-RNXT-99412',
    skills: ['React 19', 'Next.js 16', 'SSR/SSG', 'Performance Audit'],
    description:
      'Keahlian tingkat lanjut dalam optimasi performa rendering client/server, state synchronization, dan dynamic import WebGL.',
    image: '/certificates/cert-3.svg',
    verifyUrl: 'https://www.coursera.org/verify/professional-cert',
  },
  {
    id: 'cert-4',
    title: 'Cybersecurity & Network Defense Essentials',
    issuer: 'Cisco Networking Academy',
    issueDate: 'Maret 2023',
    credentialId: 'CSCO-NET-45120',
    skills: ['Network Security', 'Threat Analysis', 'Packet Inspection'],
    description:
      'Fundamental pertahanan siber, audit kerentanan sistem, pengamanan endpoint, dan protokol enkripsi modern.',
    image: '/certificates/cert-4.svg',
    verifyUrl: 'https://www.credly.com/org/cisco',
  },
];

interface Achievement {
  id: string;
  title: string;
  event: string;
  year: string;
  rank: string;
  description: string;
  image: string; // Path gambar dokumentasi/piala (misal '/achievements/ach-1.svg' atau URL)
  verifyUrl?: string; // Link online dokumentasi/event/publikasi
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Intro to Vibe Coding',
    event: 'Google AI Educator Series',
    year: '2026',
    rank: 'Foundational',
    description:
      'Sertifikasi resmi Google AI Educator Series dalam penguasaan teknik Vibe Coding, prompt-driven engineering, dan integrasi kecerdasan buatan Gemini untuk pembuatan aplikasi modern.',
    image: '/achievements/vibe coding.png',
    verifyUrl:
      'https://api.accredible.com/v1/auth/invite?code=e2472eba9c084956f917&credential_id=34107fe5-3580-4773-8159-ccbda5336428&url=https%3A%2F%2Fedu.google.accredible.com%2F34107fe5-3580-4773-8159-ccbda5336428&ident=5e81fe13-629e-444f-8188-6f3d9b243f26',
  },
  {
    id: 'ach-2',
    title: 'Problem Solving with AI',
    event: 'Google AI Educator Series',
    year: '2026',
    rank: 'Foundational',
    description:
      'Kompetensi terverifikasi dalam logika komputasi terstruktur, algoritma pemecahan masalah teknis (Problem Solving), serta implementasi AI tools untuk optimasi kode.',
    image: '/achievements/Problem-Solving.png',
    verifyUrl:
      'https://api.accredible.com/v1/auth/invite?code=879159c58f82754cf8b6&credential_id=e1315057-d123-4989-ae78-35c02a27bc5a&url=https%3A%2F%2Fedu.google.accredible.com%2Fe1315057-d123-4989-ae78-35c02a27bc5a&ident=5e81fe13-629e-444f-8188-6f3d9b243f26',
  },
  {
    id: 'ach-3',
    title: 'Gemini App Builder Specialist',
    event: 'Google AI Educator Series',
    year: '2026',
    rank: 'Foundational',
    description:
      'Penguasaan penuh dalam ekosistem Gemini App Builder, mencakup AI Prompt Engineering, integrasi LLM (Large Language Model), dan deployment aplikasi berbasis AI modern.',
    image: '/achievements/gemini.png',
    verifyUrl: 'https://api.accredible.com/v1/auth/invite?code=1df82f72b1e3c4b30a03&credential_id=1a705157-4a0f-49b8-8357-a3c0155a7646&url=https%3A%2F%2Fedu.google.accredible.com%2F1a705157-4a0f-49b8-8357-a3c0155a7646&ident=5e81fe13-629e-444f-8188-6f3d9b243f26',
  },
  {
    id: 'ach-4',
    title: 'Gemini Applications with NotebookLM',
    event: 'Google AI Educator Series',
    year: '2026',
    rank: 'Foundational',
    description:
      'Penguasaan penuh dalam membangun aplikasi modern yang didukung oleh AI, memanfaatkan teknologi Gemini dan platform produktivitas berbasis kecerdasan buatan NotebookLM.',
    image: '/achievements/gemini notebook.png',
    verifyUrl: 'https://api.accredible.com/v1/auth/invite?code=1e05c5e09dff43c3500d&credential_id=2c49f358-b752-404a-af22-759a5b1e6288&url=https%3A%2F%2Fedu.google.accredible.com%2F2c49f358-b752-404a-af22-759a5b1e6288&ident=5e81fe13-629e-444f-8188-6f3d9b243f26',
  },
  {
    id: 'ach-5',
    title: 'Build student inquiry skills',
    event: 'Google AI Educator Series',
    year: '2026',
    rank: 'Foundational',
    description:
      'Kompetensi dalam merancang dan memfasilitasi pengalaman belajar berbasis investigasi (inquiry-based learning) yang efektif, memberdayakan peserta didik untuk bertanya, mengeksplorasi, dan menemukan pengetahuan secara mandiri.',
    image: '/achievements/Build student inquiry skills.png',
    verifyUrl: 'https://api.accredible.com/v1/auth/invite?code=cf3ceda2f7c4344abdd1&credential_id=f4190093-e857-4847-8581-2bbbb765acbe&url=https%3A%2F%2Fedu.google.accredible.com%2Ff4190093-e857-4847-8581-2bbbb765acbe&ident=5e81fe13-629e-444f-8188-6f3d9b243f26',
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
  { id: 'vercel', name: 'Vercel', icon: '/tech/vercel.png' },
  { id: 'flutter', name: 'Flutter', icon: '/tech/flutter.png' },
  { id: 'Tailwind Css', name: 'Tailwind Css', icon: '/tech/tailwinnd css.png' },
  { id: 'Dart', name: 'Dart', icon: '/tech/dart.png' },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates' | 'achievements' | 'tech-stack'>('projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

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
        setSelectedProject(null);
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
        <div className="w-full max-w-sm sm:max-w-md p-1.5 rounded-2xl border border-white/10 bg-[#040816]/80 backdrop-blur-md shadow-2xl shadow-black/80 grid grid-cols-4 gap-1 sm:gap-1.5">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex flex-col items-center justify-center py-2 sm:py-2.5 px-1 rounded-xl text-[11px] sm:text-xs font-medium tracking-tight transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-400/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 mb-1" />
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
          {PROJECTS.map((project) => (
            <SpotlightCard
              key={project.id}
              onClick={() => setSelectedProject(project)}
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
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors mb-2 tracking-wide">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 font-light line-clamp-3 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              {/* Action Button: Details -> (Mirip Gambar 2) */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-all group-hover:border-sky-400/40 group-hover:bg-sky-500/10 active:scale-95 cursor-pointer shadow-sm"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto"
        >
          {CERTIFICATES.map((cert) => (
            <SpotlightCard
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              spotlightColor="#ffffff"
              intensity={0.18}
              spotlightSize={200}
              softness={0.7}
              borderGlow={0.6}
              proximity={60}
              smoothing={0.2}
              className="p-4 backdrop-blur-md flex flex-col justify-between group transition-all duration-300 rounded-2xl sm:rounded-3xl cursor-pointer hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/10"
              style={{
                '--spotlight-card-surface': 'rgba(5, 9, 23, 0.85)',
                '--spotlight-card-border': 'rgba(255, 255, 255, 0.08)',
              } as React.CSSProperties}
            >
              <div>
                {/* Certificate Image Frame */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-3.5 border border-white/10 bg-black/50">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Verified</span>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-sky-300 transition-colors mb-1 truncate">
                  {cert.title}
                </h3>
                <p className="text-xs text-sky-400/90 font-mono truncate mb-3">
                  {cert.issuer}
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCert(cert);
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-all group-hover:border-sky-400/40 group-hover:bg-sky-500/10 active:scale-95 cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </SpotlightCard>
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
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto"
        >
          {ACHIEVEMENTS.map((ach) => (
            <SpotlightCard
              key={ach.id}
              onClick={() => setSelectedAchievement(ach)}
              spotlightColor="#ffffff"
              intensity={0.18}
              spotlightSize={200}
              softness={0.7}
              borderGlow={0.6}
              proximity={60}
              smoothing={0.2}
              className="p-4 backdrop-blur-md flex flex-col justify-between group transition-all duration-300 rounded-2xl sm:rounded-3xl cursor-pointer hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-500/10"
              style={{
                '--spotlight-card-surface': 'rgba(5, 9, 23, 0.85)',
                '--spotlight-card-border': 'rgba(255, 255, 255, 0.08)',
              } as React.CSSProperties}
            >
              <div>
                {/* Badge Image Frame */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3 border border-sky-500/20 bg-gradient-to-b from-[#0a122c]/90 to-[#040817]/95 p-3 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0%,transparent_70%)] pointer-events-none" />
                  <img
                    src={ach.image}
                    alt={ach.title}
                    className="max-h-full max-w-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <h3 className="text-xs sm:text-sm font-semibold text-white truncate mb-1">
                  {ach.title}
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-white font-mono truncate mb-3">
                  {ach.event.toLowerCase().includes('google') ? (
                    <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
                  ) : (
                    <Building2 className="w-3.5 h-3.5 shrink-0 text-slate-300" />
                  )}
                  <span className="truncate">{ach.event}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAchievement(ach);
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-all group-hover:border-sky-400/40 group-hover:bg-sky-500/10 active:scale-95 cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </SpotlightCard>
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

      {/* MODAL 1: PROJECT DETAILS */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#050917] border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl max-h-[88vh] overflow-y-auto"
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
              {selectedProject.longDescription}
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
                      ) : (
                        <Code2 className="w-3.5 h-3.5 text-sky-400" />
                      )}
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

      {/* MODAL 2: CERTIFICATE DETAILS */}
      {selectedCert && (
        <div
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto bg-[#050917] border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl"
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Image Preview in Modal */}
            <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/15 bg-black/70 shadow-inner">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-sky-400 font-mono">{selectedCert.issuer}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{selectedCert.title}</h3>

            <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
              {selectedCert.description}
            </p>

            {/* Info Table */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2.5 mb-6 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">ID KREDENSIAL</span>
                <span className="text-slate-200 select-all font-semibold">{selectedCert.credentialId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">TANGGAL TERBIT</span>
                <span className="text-slate-200">{selectedCert.issueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">STATUS</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Credential</span>
                </span>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Keahlian Terkait
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedCert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-sky-500/10 border border-sky-500/20 text-sky-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
              <a
                href={selectedCert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Buka Kredensial Online</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setSelectedCert(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-all cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ACHIEVEMENT DETAILS */}
      {selectedAchievement && (
        <div
          onClick={() => setSelectedAchievement(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto bg-[#050917] border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl"
          >
            <button
              onClick={() => setSelectedAchievement(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Achievement Image Preview in Modal */}
            <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-sky-500/20 bg-gradient-to-b from-[#0a122c] to-[#040817] p-6 flex items-center justify-center shadow-inner relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15)_0%,transparent_70%)] pointer-events-none" />
              <img
                src={selectedAchievement.image}
                alt={selectedAchievement.title}
                className="max-h-48 sm:max-h-56 max-w-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
              />
            </div>

            <div className="flex items-center gap-2 mb-2.5">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-mono font-semibold">
                Foundational
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
                {selectedAchievement.year}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{selectedAchievement.title}</h3>

            <div className="text-xs text-white font-mono mb-4 flex items-center gap-2">
              {selectedAchievement.event.toLowerCase().includes('google') ? (
                <GoogleIcon className="w-4 h-4 shrink-0" />
              ) : (
                <Building2 className="w-3.5 h-3.5 shrink-0 text-slate-300" />
              )}
              <span className="text-white/95 font-medium">{selectedAchievement.event}</span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed font-light mb-6">
              {selectedAchievement.description}
            </p>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
              {selectedAchievement.verifyUrl && (
                <a
                  href={selectedAchievement.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3 px-5 rounded-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs tracking-wide transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Buka Bukti / Publikasi Online</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              <button
                onClick={() => setSelectedAchievement(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-all cursor-pointer"
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

