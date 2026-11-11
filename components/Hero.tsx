'use client';

import React, { useState, useEffect } from 'react';
import { Send, Code2, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, LinkedInAppIcon, InstagramAppIcon } from './SocialIcons';
import LanyardCard from './lanyard/LanyardWrapper';
import AnimatedContent from './AnimatedContent';
import TextType from './TextType';
import TechText from './TechText';

// Link share Google Drive CV PDF Anda (silakan ganti dengan link Google Drive file Anda)
const CV_GOOGLE_DRIVE_URL = 'https://drive.google.com/drive/folders/1BDIvMcFCYV_H-mwdDirJ09j6D0buAYDi';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

/**
 * =========================================================================
 * KONFIGURASI UKURAN DAN POSISI LANYARD (BISA DIATUR SENDIRI DI SINI)
 * =========================================================================
 * 1. size: Besar/kecilnya kartu 3D (Rekomendasi: 0.40 s/d 0.75)
 *    - Nilai makin besar = Kartu semakin besar
 *    - Nilai makin kecil = Kartu semakin kecil/ramping
 *
 * 2. strapLength: Panjang tali gantungan (Rekomendasi: 0.20 s/d 0.55)
 *    - Nilai makin kecil = Tali lebih pendek (kartu menggantung lebih ke atas)
 *    - Nilai makin besar = Tali lebih panjang (kartu menggantung lebih ke bawah)
 *
 * 3. anchor: Posisi horizontal gantungan tali ('center' | 'right' | 'left')
 *
 * 4. spacerHeight: Tinggi ruang kosong di atas teks di HP & Tablet
 *    agar tulisan "Hi, I'm Alvaro..." tidak tertabrak atau bertumpuk dengan kartu.
 * =========================================================================
 */
export const LANYARD_CONFIG = {
  // === 1. TAMPILAN HP / MOBILE (< 768px, misal: iPhone SE, iPhone 14/15, Samsung) ===
  mobile: {
    size: 0.5,                            // Ukuran kartu di HP (default: 0.55)
    strapLength: 0.1,                     // Panjang tali di HP (default: 0.32)
    anchor: 'center' as const,             // Letak tali di tengah
    spacerHeight: 'h-[560px] xs:h-[590px]', // Jarak spasi di atas teks di HP
  },

  // === 2. TAMPILAN TABLET / IPAD (768px - 1179px, misal: iPad Mini, iPad Air, iPad Pro) ===
  tablet: {
    size: 0.4,                            // Ukuran kartu di Tablet (default: 0.62)
    strapLength: 0.36,                     // Panjang tali di Tablet (default: 0.36)
    anchor: 'center' as const,             // Letak tali di tengah
    spacerHeight: 'h-[850px] md:h-[890px]', // Jarak spasi di atas teks di Tablet
  },

  // === 3. TAMPILAN DESKTOP / LAPTOP (>= 1180px, layar lebar / PC) ===
  desktop: {
    size: 0.55,                            // Ukuran kartu di Desktop (default: 0.65)
    strapLength: 0.50,                     // Panjang tali di Desktop (default: 0.50)
    anchor: 'right' as const,              // Letak tali di sebelah kanan teks
    spacerHeight: '',                      // Di desktop layout 2 kolom berdampingan
  },
};

export default function Hero() {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // 1. Mobile: layar di bawah 768px (semua tipe HP)
      if (w < 768) {
        setDeviceType('mobile');
      }
      // 2. Tablet: layar 768px - 1179px atau dalam orientasi portrait (iPad Mini, iPad Air, iPad Pro)
      else if (w < 1180 || h > w) {
        setDeviceType('tablet');
      }
      // 3. Desktop: layar lebar >= 1180px dalam orientasi landscape (Laptop / PC)
      else {
        setDeviceType('desktop');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentConfig = LANYARD_CONFIG[deviceType];
  const isStacked = deviceType !== 'desktop';

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-start xl:justify-center items-center pt-0 pb-12 sm:pb-16 overflow-hidden"
    >
      {/* 1. FULL-SCREEN 3D LANYARD VIEWPORT (MOBILE, TABLET & DESKTOP - BEBAS KANVAS PEMBUNGKUS) */}
      {mounted && (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden">
          <div className="w-full h-full pointer-events-auto">
            <LanyardCard
              frontImage="/card-front.png"
              backImage="/card-back.png"
              strapImage="/band.png"
              cardColor="#080c1b"
              strapColor="#080c1d"
              finish="glossy"
              metal="silver"
              orientation="portrait"
              size={currentConfig.size}
              anchor={currentConfig.anchor}
              strapLength={currentConfig.strapLength}
              strapWidth={0.65}
              gravity={1.1}
              damping={0.45}
              elasticity={0.55}
              breeze={0.3}
              interactive={true}
              intro={true}
            />
          </div>
        </div>
      )}

      {/* 2. HERO CONTENT GRID */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-12 items-center relative z-20 pointer-events-none pt-0 xl:pt-20">
        {/* 3D LANYARD CARD SPACER (MOBILE & TABLET: PEMBERI RUANG KARTU MELAYANG TANPA KANVAS KOTAK, DESKTOP: DI KANAN) */}
        <div className="order-1 xl:order-2 xl:col-span-5 flex flex-col items-center justify-center relative w-full pointer-events-none">
          {/* Memberikan ruang vertikal alami di mobile & tablet agar kartu melayang bebas tanpa kanvas pembungkus */}
          {isStacked && (
            <div className={`w-full pointer-events-none select-none transition-all duration-300 ${currentConfig.spacerHeight}`} />
          )}
        </div>

        {/* HERO TEXT COLUMN (MOBILE & TABLET: DI BAWAH LANYARD, DESKTOP: DI KIRI) */}
        <div className="order-2 xl:order-1 xl:col-span-7 flex flex-col justify-center items-center text-center xl:items-start xl:text-left pt-0 pointer-events-auto">
          <AnimatedContent
            trigger="scroll"
            distance={40}
            direction="vertical"
            duration={0.9}
            ease="power3.out"
            stagger={0.08}
            className="w-full flex flex-col items-center xl:items-start"
          >
            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2 sm:mb-3 leading-[1.15]">
              Hi, I&apos;m <span className="text-sky-400">Alvaro</span>
              <span className="block text-sky-400">Raka Pratama</span>
            </h1>
            {/* Profession */}
            <div className="flex items-center justify-center xl:justify-start gap-3 mb-4 sm:mb-6 min-h-[32px] sm:min-h-[40px]">
              <TextType
                as="h2"
                text={[
                  'Full Stack Developer',
                  'Frontend Developer',
                  'Backend Developer',
                  'Software Engineer',
                ]}
                typingSpeed={75}
                pauseDuration={1500}
                deletingSpeed={50}
                deleteMode="backspace"
                typeEffect="fade"
                cursorStyle="underscore"
                cursorColor="#38bdf8"
                cursorGlide
                showCursor
                loop={true}
                className="text-lg sm:text-2xl md:text-3xl font-semibold text-slate-200 tracking-tight"
              />
            </div>

            {/* Short Description */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300/90 leading-relaxed max-w-2xl mb-6 sm:mb-8 font-light text-center xl:text-left">
              Halo! Saya Alvaro, seseorang yang tertarik dengan dunia teknologi dan pengembangan web. Saat ini saya sedang terus belajar, mengeksplorasi berbagai teknologi, dan mengembangkan kemampuan melalui berbagai project yang saya kerjakan.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
              {/* View Project Button (Sama seperti View Certificate dengan ikon Navbar Project) */}
              <button
                onClick={() => handleScrollTo('portfolio')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm tracking-wide transition-all duration-300 shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Code2 className="w-4 h-4" />
                <span>View Project</span>
              </button>

              {/* View CV Button (Warna biru sama seperti View Certificate, link ke Google Drive PDF) */}
              <a
                href={CV_GOOGLE_DRIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm tracking-wide transition-all duration-300 shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <FileText className="w-4 h-4" />
                <span>View CV</span>
              </a>

              {/* Contact Me Button */}
              <button
                onClick={() => handleScrollTo('contact')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-medium text-sm tracking-wide transition-all duration-300 backdrop-blur-sm active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Social Media Links & Status */}
            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-4 sm:gap-6 pt-4 border-t border-white/10 w-full">
              <div className="flex items-center gap-3">
                {/* GitHub */}
                <a
                  href="https://github.com/seevaroo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 flex items-center justify-center transition-all duration-300 group cursor-pointer overflow-hidden shadow-sm hover:shadow-white/5 active:scale-95"
                  aria-label="GitHub Profile"
                >
                  <span className="text-slate-300 transition-opacity duration-200 group-hover:opacity-0 flex items-center justify-center">
                    <GithubIcon className="w-4 h-4" />
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-105">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/tech/github.png" alt="GitHub" className="w-5 h-5 object-contain" />
                  </span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/seevaroo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-[#0A66C2]/15 hover:border-[#0A66C2]/40 flex items-center justify-center transition-all duration-300 group cursor-pointer overflow-hidden shadow-sm hover:shadow-[#0A66C2]/10 active:scale-95"
                  aria-label="LinkedIn Profile"
                >
                  <span className="text-slate-300 transition-opacity duration-200 group-hover:opacity-0 flex items-center justify-center">
                    <LinkedinIcon className="w-4 h-4" />
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-105">
                    <LinkedInAppIcon className="w-5 h-5 rounded-[4px] shadow-sm" />
                  </span>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/seevaroo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-gradient-to-tr hover:from-amber-500/15 hover:via-rose-500/20 hover:to-purple-500/20 hover:border-pink-500/40 flex items-center justify-center transition-all duration-300 group cursor-pointer overflow-hidden shadow-sm hover:shadow-pink-500/10 active:scale-95"
                  aria-label="Instagram Profile"
                >
                  <span className="text-slate-300 transition-opacity duration-200 group-hover:opacity-0 flex items-center justify-center">
                    <InstagramIcon className="w-4 h-4" />
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-105">
                    <InstagramAppIcon className="w-5 h-5 rounded-[5px] shadow-sm" />
                  </span>
                </a>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
