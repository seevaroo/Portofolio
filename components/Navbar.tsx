'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import GooeyNav, { GooeyNavItem } from './GooeyNav';

const NAV_ITEMS: GooeyNavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Listen to modal state from Portfolio / Projects (sembunyikan navbar saat modal terbuka)
  useEffect(() => {
    const handleModalState = (e: Event) => {
      const customEvent = e as CustomEvent<{ open: boolean }>;
      const open = Boolean(customEvent.detail?.open);
      setIsModalOpen(open);
      if (open) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('modal-state-change', handleModalState);
    return () => {
      window.removeEventListener('modal-state-change', handleModalState);
    };
  }, []);

  // Synchronize Scroll Spy with active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      if (isClickScrolling.current) return;

      const sectionIds = ['home', 'about', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  const handleNavSelect = (index: number, item: GooeyNavItem) => {
    setActiveIndex(index);
    if (item.href && item.href.startsWith('#')) {
      const targetId = item.href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        isClickScrolling.current = true;
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          isClickScrolling.current = false;
        }, 850);
        element.scrollIntoView({ behavior: 'smooth' });
      }
      if (targetId === 'home') {
        window.dispatchEvent(new CustomEvent('reset-lanyard'));
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[92%] sm:w-auto ${
          scrolled ? 'scale-[0.98]' : 'scale-100'
        } ${
          isModalOpen
            ? 'opacity-0 -translate-y-16 pointer-events-none'
            : 'opacity-100 translate-y-0 pointer-events-auto'
        }`}
      >
        {/* Desktop Navbar Capsule (Cukup Home, About, Portfolio, Contact tanpa brand & get in touch) */}
        <div className="hidden md:flex items-center justify-center">
          <GooeyNav
            items={NAV_ITEMS}
            activeIndex={activeIndex}
            onChange={handleNavSelect}
            theme="dark"
            size="md"
            frame={true}
            color="#0284c7"
            colors={['#38bdf8', '#0284c7', '#2563eb']}
            activeTextColor="#ffffff"
            particleCount={16}
            spread={65}
            animationTime={600}
            timeVariance={300}
            gooeyness={0.5}
            wobble={0.5}
            hoverEffect={true}
            style={
              {
                '--gn-frame': 'rgba(4, 8, 22, 0.88)',
                '--gn-frame-edge': 'rgba(255, 255, 255, 0.14)',
                '--gn-frame-highlight': 'rgba(255, 255, 255, 0.08)',
                '--gn-frame-shadow': '0 24px 48px -18px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.08)',
                '--gn-ink': '#ffffff',
                '--gn-muted': 'rgba(203, 213, 225, 0.85)',
                '--gn-pad': '6px',
                '--gn-gap': '4px',
                '--gn-font': '14.5px',
                '--gn-x': '18px',
                '--gn-y': '8.5px',
              } as React.CSSProperties
            }
          />
        </div>

        {/* Mobile Navigation Bar (< 768px Phones) */}
        <div className="md:hidden flex items-center justify-between px-5 py-3 rounded-full border border-white/10 bg-[#030712]/85 backdrop-blur-md shadow-2xl shadow-black/70">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavSelect(0, NAV_ITEMS[0]);
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden border border-white/20 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon.png" alt="SV Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-sm tracking-wider text-slate-100">
              seevaroo<span className="text-sky-400">.dev</span>
            </span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Dropdown (< 768px Phones) */}
      {mobileMenuOpen && !isModalOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md md:hidden flex flex-col justify-start pt-24 px-5 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#050917]/95 border border-white/15 rounded-2xl p-4 shadow-2xl flex flex-col gap-2 max-w-sm w-full mx-auto"
          >
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavSelect(index, item)}
                  className={`w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-colors flex items-center justify-between text-left cursor-pointer ${
                    isActive
                      ? 'bg-blue-600/25 text-sky-400 border border-blue-500/40 shadow-inner'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />}
                </button>
              );
            })}

            <div className="pt-2 mt-1 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white shadow-lg shadow-blue-500/25 active:scale-98 transition-all cursor-pointer"
              >
                <span>Get In Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
