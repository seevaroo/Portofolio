'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, LinkedInAppIcon, InstagramAppIcon } from './SocialIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#02050e]/80 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon.png" alt="SV Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-lg text-white tracking-wide">
              seevaroo<span className="text-sky-400">.dev</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 font-light max-w-sm">
            Crafted with Next.js, React, TypeScript, Tailwind CSS &amp; Three.js.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          {/* GitHub */}
          <a
            href="https://github.com/seevaroo"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 flex items-center justify-center transition-all duration-300 group cursor-pointer overflow-hidden shadow-sm hover:shadow-white/5 active:scale-95"
            aria-label="GitHub"
          >
            <span className="text-slate-300 transition-opacity duration-200 group-hover:opacity-0 flex items-center justify-center">
              <GithubIcon className="w-4 h-4" />
            </span>
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/tech/github.png" alt="GitHub" className="w-4.5 h-4.5 object-contain" />
            </span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/seevaroo"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-[#0A66C2]/15 hover:border-[#0A66C2]/40 flex items-center justify-center transition-all duration-300 group cursor-pointer overflow-hidden shadow-sm hover:shadow-[#0A66C2]/10 active:scale-95"
            aria-label="LinkedIn"
          >
            <span className="text-slate-300 transition-opacity duration-200 group-hover:opacity-0 flex items-center justify-center">
              <LinkedinIcon className="w-4 h-4" />
            </span>
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-105">
              <LinkedInAppIcon className="w-4.5 h-4.5 rounded-[3px] shadow-sm" />
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/seevaroo"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-gradient-to-tr hover:from-amber-500/15 hover:via-rose-500/20 hover:to-purple-500/20 hover:border-pink-500/40 flex items-center justify-center transition-all duration-300 group cursor-pointer overflow-hidden shadow-sm hover:shadow-pink-500/10 active:scale-95"
            aria-label="Instagram"
          >
            <span className="text-slate-300 transition-opacity duration-200 group-hover:opacity-0 flex items-center justify-center">
              <InstagramIcon className="w-4 h-4" />
            </span>
            <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-105">
              <InstagramAppIcon className="w-4.5 h-4.5 rounded-[4px] shadow-sm" />
            </span>
          </a>
        </div>

        {/* Back to top & copyright */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-slate-500">
            © 2026 Alvaro Raka Pratama
          </span>

          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
