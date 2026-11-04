'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, LinkedInAppIcon, InstagramAppIcon } from './SocialIcons';
import AnimatedContent from './AnimatedContent';
import SpotlightCard from './SpotlightCard';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 900);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <AnimatedContent distance={35} direction="vertical" duration={0.8} threshold={0.15} className="flex flex-col items-center text-center mb-16">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
          Contact Me
        </h2>
      </AnimatedContent>

      <AnimatedContent distance={45} direction="vertical" duration={0.8} threshold={0.1} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Info & Social Channels */}
        <SpotlightCard
          theme="dark"
          spotlightColor="#ffffff"
          intensity={0.15}
          spotlightSize={260}
          softness={0.7}
          borderGlow={0.6}
          proximity={80}
          smoothing={0.25}
          className="lg:col-span-5 p-6 sm:p-8 backdrop-blur-md rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
          style={{
            '--spotlight-card-surface': 'rgba(5, 9, 23, 0.75)',
            '--spotlight-card-border': 'rgba(255, 255, 255, 0.08)',
          } as React.CSSProperties}
        >
          <h3 className="text-xl font-bold text-white mb-2">Contact Details</h3>
          <p className="text-sm text-slate-400 font-light mb-8">
            Feel free to reach out directly via email or connect through professional networks.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">Email</span>
                <a
                  href="mailto:alvarorkpratama@gmail.com"
                  className="text-slate-200 font-medium hover:text-sky-300 transition-colors text-sm sm:text-base break-all"
                >
                  alvarorkpratama@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">Location</span>
                <span className="text-slate-200 font-medium text-sm sm:text-base">
                  Jakarta, Indonesia (UTC+7) • Available Worldwide
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4 sm:col-span-2 md:col-span-1 lg:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">Status</span>
                <span className="text-emerald-300 font-medium text-sm sm:text-base">
                  Available for Select Projects &amp; Full-Time Roles
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-4">
              Professional Profiles
            </span>
            <div className="flex flex-wrap items-center gap-3">
              {/* GitHub */}
              <a
                href="https://github.com/seevaroo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-white/5 active:scale-98"
              >
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  <span className="text-slate-400 transition-opacity duration-200 group-hover:opacity-0 flex items-center justify-center">
                    <GithubIcon className="w-3.5 h-3.5" />
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-110">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/tech/github.png" alt="GitHub" className="w-4 h-4 object-contain" />
                  </span>
                </div>
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/seevaroo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/15 text-xs font-medium text-slate-300 hover:text-white transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-[#0A66C2]/10 active:scale-98"
              >
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  <span className="text-slate-400 transition-opacity duration-200 group-hover:opacity-0 flex items-center justify-center">
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-110">
                    <LinkedInAppIcon className="w-4 h-4 rounded-[3px] shadow-sm" />
                  </span>
                </div>
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/seevaroo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/40 hover:bg-gradient-to-r hover:from-amber-500/10 hover:via-rose-500/15 hover:to-purple-500/15 text-xs font-medium text-slate-300 hover:text-white transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-pink-500/10 active:scale-98"
              >
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  <span className="text-slate-400 transition-opacity duration-200 group-hover:opacity-0 flex items-center justify-center">
                    <InstagramIcon className="w-3.5 h-3.5" />
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-90 group-hover:scale-110">
                    <InstagramAppIcon className="w-4 h-4 rounded-[4px] shadow-sm" />
                  </span>
                </div>
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>
        </SpotlightCard>

        {/* Right Column: Contact Message Form */}
        <SpotlightCard
          theme="dark"
          spotlightColor="#ffffff"
          intensity={0.15}
          spotlightSize={320}
          softness={0.7}
          borderGlow={0.6}
          proximity={80}
          smoothing={0.25}
          className="lg:col-span-7 p-6 sm:p-8 backdrop-blur-md rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
          style={{
            '--spotlight-card-surface': 'rgba(5, 9, 23, 0.75)',
            '--spotlight-card-border': 'rgba(255, 255, 255, 0.08)',
          } as React.CSSProperties}
        >
          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Message Dispatched!</h4>
              <p className="text-sm text-slate-400 max-w-md mb-6 font-light">
                Thank you for reaching out. I have received your message and will get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 text-sm text-white placeholder-slate-600 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 text-sm text-white placeholder-slate-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project Inquiry / Job Opportunity"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 text-sm text-white placeholder-slate-600 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project, timeline, and goals..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 text-sm text-white placeholder-slate-600 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 hover:from-blue-500 hover:to-sky-400 text-white font-semibold text-sm tracking-wide transition-all shadow-lg shadow-blue-500/20 active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </SpotlightCard>
      </AnimatedContent>
    </section>
  );
}
