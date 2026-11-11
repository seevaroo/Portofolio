'use client';

import React from 'react';
import { Code2, Cpu, Layers, ShieldCheck, GraduationCap, Award, Trophy } from 'lucide-react';
import AnimatedContent from './AnimatedContent';
import SpotlightCard from './SpotlightCard';

interface EducationItem {
  school: string;
  period: string;
  level?: string;
  major?: string;
  description?: string;
  logo?: string;
  image?: string;
}

const EDUCATION: EducationItem[] = [
  {
    school: 'SMKN 20 Jakarta',
    level: 'SEKOLAH MENENGAH KEJURUAN',
    period: '2024 - Sekarang',
    description: "berijazah",
    logo: '/smkn20.png',
  },
  {
    school: 'SMPN 12 Jakarta',
    level: 'SEKOLAH MENENGAH PERTAMA',
    description: "berijazah",
    period: '2021 - 2024',
    logo: '/smpn12.png',
  },
  {
    school: 'SDN 15 Pagi Cipete Utara',
    level: 'SEKOLAH DASAR',
    period: '2015 - 2021',
    description: "berijazah",
    logo: '/sdn15.png',
  },
];
interface StatItem {
  value: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const STATS: StatItem[] = [
  {
    value: '3',
    label: 'Projects',
    description: 'Karya yang dibuat',
    icon: Code2,
  },
  {
    value: '4',
    label: 'Certificates',
    description: 'Skill yang divalidasi',
    icon: Award,
  },
  {
    value: '5',
    label: 'Awards',
    description: 'Pencapaian diraih',
    icon: Trophy,
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <AnimatedContent distance={35} direction="vertical" duration={0.8} threshold={0.15} className="flex flex-col items-center text-center mb-16">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
          About Me
        </h2>
      </AnimatedContent>

      {/* Main Story & Education Grid */}
      <AnimatedContent distance={45} direction="vertical" duration={0.8} threshold={0.15} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Story Card */}
        <SpotlightCard
          spotlightColor="#ffffff"
          intensity={0.12}
          spotlightSize={280}
          softness={0.7}
          borderGlow={0.5}
          proximity={80}
          smoothing={0.3}
          ambient={false}
          flare={true}
          className="lg:col-span-7 p-6 sm:p-8 backdrop-blur-md rounded-2xl sm:rounded-3xl transition-all duration-300"
          style={{
            '--spotlight-card-surface': 'rgba(5, 9, 23, 0.85)',
            '--spotlight-card-border': 'rgba(255, 255, 255, 0.08)',
          } as React.CSSProperties}
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            The Journey &amp; Engineering Philosophy
          </h3>
          <div className="space-y-4 text-slate-300 leading-relaxed font-light text-base">
            <p>
              I am <strong className="text-white font-medium">Alvaro Raka Pratama</strong>, a full stack developer dedicated to crafting digital tools that solve genuine problems while delighting users with thoughtful design.
            </p>
            <p>
              My journey in software engineering stems from a passion for exploring how complex logic transforms into elegant visual interfaces. I believe software should be as resilient on the server as it is frictionless in the browser.
            </p>
            <p>
              Whether orchestrating complex state machines, optimizing database queries, or rendering real-time physics in WebGL, my focus remains constant: code readability, measurable performance, and timeless design.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Production Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-sky-400" />
              <span>Modern Tech Native</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" />
              <span>Full-Cycle Development</span>
            </div>
          </div>
        </SpotlightCard>

        {/* Education Column (SMK & SMP) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {EDUCATION.map((edu) => (
            <SpotlightCard
              key={edu.school}
              spotlightColor="#ffffff"
              intensity={0.15}
              spotlightSize={220}
              softness={0.7}
              borderGlow={0.6}
              proximity={70}
              smoothing={0.25}
              ambient={false}
              flare={true}
              className="p-6 backdrop-blur-md transition-all duration-300 rounded-2xl group hover:shadow-xl hover:shadow-white/5"
              style={{
                '--spotlight-card-surface': 'rgba(5, 9, 23, 0.85)',
                '--spotlight-card-border': 'rgba(255, 255, 255, 0.08)',
              } as React.CSSProperties}
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    {edu.logo ? (
                      <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={edu.logo} alt={edu.school} className="w-full h-full object-contain drop-shadow-lg" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      {edu.level && (
                        <span className="text-xs font-mono font-bold text-sky-400 tracking-wider block">
                          {edu.level}
                        </span>
                      )}
                      <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {edu.school}
                      </h4>
                      {edu.major && (
                        <p className="text-xs text-sky-400/90 font-mono mt-0.5">
                          {edu.major}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full shrink-0">
                    {edu.period}
                  </span>
                </div>

                {edu.image && (
                  <div className="mt-3.5 rounded-xl overflow-hidden border border-white/10 h-32 w-full bg-black/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={edu.image} alt={edu.school} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}

                {edu.description && (
                  <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mt-3 pt-3 border-t border-white/5">
                    {edu.description}
                  </p>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </AnimatedContent>

      {/* 3 Stats Cards: Projects, Certificates, Awards */}
      <AnimatedContent distance={40} direction="vertical" duration={0.8} stagger={0.12} threshold={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {STATS.map((item) => {
          const Icon = item.icon;
          return (
            <SpotlightCard
              key={item.label}
              spotlightColor="#ffffff"
              intensity={0.16}
              spotlightSize={220}
              softness={0.7}
              borderGlow={0.6}
              proximity={70}
              smoothing={0.25}
              ambient={false}
              flare={true}
              className="p-6 sm:p-7 backdrop-blur-md transition-all duration-300 rounded-2xl sm:rounded-3xl group hover:shadow-xl hover:shadow-white/5"
              style={{
                '--spotlight-card-surface': 'rgba(5, 9, 23, 0.85)',
                '--spotlight-card-border': 'rgba(255, 255, 255, 0.08)',
              } as React.CSSProperties}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-sky-500/20 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono">
                  {item.value}
                </div>
              </div>
              <h4 className="text-lg font-bold text-white mb-1">
                {item.label}
              </h4>
              <p className="text-sm text-slate-400 font-light leading-relaxed">
                {item.description}
              </p>
            </SpotlightCard>
          );
        })}
      </AnimatedContent>
    </section>
  );
}

