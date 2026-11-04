'use client';

import React from 'react';
import { Code, Server, Database, Box, Wrench, Sparkles } from 'lucide-react';
import AnimatedContent from './AnimatedContent';

const SKILL_CATEGORIES = [
  {
    icon: Code,
    title: 'Frontend Development',
    description: 'Building modern, fast, accessible interfaces with React ecosystem',
    skills: [
      { name: 'React 19', level: 'Advanced' },
      { name: 'Next.js 16 (App Router)', level: 'Advanced' },
      { name: 'TypeScript', level: 'Advanced' },
      { name: 'Tailwind CSS v4', level: 'Advanced' },
      { name: 'State Management (Zustand/Redux)', level: 'Proficient' },
      { name: 'HTML5 & Modern CSS3', level: 'Advanced' },
    ],
  },
  {
    icon: Server,
    title: 'Backend Engineering',
    description: 'Scalable services, secure authentication, and robust APIs',
    skills: [
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Express.js', level: 'Advanced' },
      { name: 'RESTful API Architecture', level: 'Advanced' },
      { name: 'GraphQL APIs', level: 'Proficient' },
      { name: 'JWT & OAuth Authentication', level: 'Advanced' },
      { name: 'Microservices & Webhooks', level: 'Proficient' },
    ],
  },
  {
    icon: Database,
    title: 'Databases & Cloud',
    description: 'Data models, ORM pipelines, and serverless hosting',
    skills: [
      { name: 'PostgreSQL', level: 'Advanced' },
      { name: 'Prisma ORM', level: 'Advanced' },
      { name: 'MongoDB', level: 'Proficient' },
      { name: 'Redis Caching', level: 'Intermediate' },
      { name: 'Docker Containers', level: 'Proficient' },
      { name: 'Vercel / Cloudflare', level: 'Advanced' },
    ],
  },
  {
    icon: Box,
    title: '3D Graphics & Creative',
    description: 'Immersive WebGL simulations, shaders, and UI motion',
    skills: [
      { name: 'Three.js', level: 'Advanced' },
      { name: 'WebGL & GLSL Shaders', level: 'Proficient' },
      { name: 'Verlet & Rigid Physics', level: 'Proficient' },
      { name: 'Figma to Code', level: 'Advanced' },
      { name: 'Canvas API & 2D Context', level: 'Advanced' },
      { name: 'Framer Motion', level: 'Proficient' },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <AnimatedContent distance={35} direction="vertical" duration={0.8} threshold={0.15} className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/10 text-sky-300 text-xs font-mono uppercase tracking-widest mb-3">
          <Wrench className="w-3.5 h-3.5" />
          <span>TECHNICAL COMPETENCIES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
          Tech Stack &amp; Tooling
        </h2>
        <p className="text-slate-400 max-w-2xl text-base sm:text-lg font-light">
          A disciplined toolkit curated for speed, reliability, and elegant software craft.
        </p>
      </AnimatedContent>

      {/* Skills Grid */}
      <AnimatedContent distance={45} direction="vertical" duration={0.8} stagger={0.1} threshold={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SKILL_CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.title}
              className="bg-[#050917]/70 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-sky-500/30"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{category.title}</h3>
                  <p className="text-xs text-slate-400 font-light">{category.description}</p>
                </div>
              </div>

              {/* Skills List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-6">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition-colors group flex flex-col justify-between"
                  >
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-sky-300 transition-colors">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-wider">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </AnimatedContent>
    </section>
  );
}

