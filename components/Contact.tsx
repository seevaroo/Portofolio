'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  User,
  Mail,
  MessageSquare,
  Image as ImageIcon,
  CheckCircle2,
  ArrowUpRight,
  X
} from 'lucide-react';
import { InstagramAppIcon, TikTokAppIcon, GitHubAppIcon, LinkedInAppIcon } from './SocialIcons';
import AnimatedContent from './AnimatedContent';

interface CommentItem {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar?: string | null;
  timestamp?: number;
}

function formatRelativeTime(dateString: string | number): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Baru saja';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} jam lalu`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} hari lalu`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  } catch {
    return 'Baru saja';
  }
}

export default function Contact() {
  // Contact Direct Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  // Comments State
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [commentName, setCommentName] = useState('');
  const [commentMessage, setCommentMessage] = useState('');
  const [commentAvatar, setCommentAvatar] = useState<string | null>(null);
  const [avatarFileName, setAvatarFileName] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Helper to fetch Supabase REST API (supports both JWT anon keys and new sb_publishable_ keys)
  const fetchSupabase = async (url: string, key: string, options: RequestInit = {}) => {
    let res = await fetch(url, {
      ...options,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        ...(options.headers || {}),
      },
    });

    if (res.status === 401) {
      res = await fetch(url, {
        ...options,
        headers: {
          apikey: key,
          ...(options.headers || {}),
        },
      });
    }

    return res;
  };

  // Fetch comments directly from Supabase
  const fetchComments = async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      setComments([]);
      return;
    }

    try {
      const res = await fetchSupabase(
        `${supabaseUrl.replace(/\/$/, '')}/rest/v1/comments?select=*&order=created_at.desc`,
        supabaseAnonKey
      );

      if (res && res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          const mapped: CommentItem[] = data.map((item: any) => ({
            id: item.id || 'c-' + Math.random(),
            name: item.name || 'Anonim',
            message: item.message || '',
            time: formatRelativeTime(item.created_at || Date.now()),
            avatar: item.avatar || null,
            timestamp: new Date(item.created_at || Date.now()).getTime(),
          }));
          setComments(mapped);
        }
      }
    } catch {
      // ignore network errors
    }
  };

  // Clear any old dummy comments from localStorage and sync with Supabase
  useEffect(() => {
    try {
      localStorage.removeItem('alvaro_portfolio_comments');
    } catch {
      // ignore
    }
    fetchComments();
    const interval = setInterval(fetchComments, 10000);
    return () => clearInterval(interval);
  }, []);

  // Handle direct contact form submit via Web3Forms
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) return;

    setIsSubmittingContact(true);
    setContactError(null);
    setContactSuccess(false);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!accessKey) {
      setIsSubmittingContact(false);
      setContactError(
        'Access Key Web3Forms belum diisi di .env.local. Masukkan access key Anda agar pesan otomatis masuk ke Gmail.'
      );
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: contactName.trim(),
          email: contactEmail.trim(),
          message: contactMessage.trim(),
          subject: `Pesan Portofolio Baru dari ${contactName.trim()}`,
          from_name: 'Portofolio Alvaro Raka',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setContactSuccess(true);
        setContactName('');
        setContactEmail('');
        setContactMessage('');
        setTimeout(() => {
          setContactSuccess(false);
        }, 6000);
      } else {
        setContactError(data.message || 'Gagal mengirim pesan. Silakan coba beberapa saat lagi.');
      }
    } catch {
      setContactError('Terjadi kendala koneksi saat mengirim email. Silakan coba lagi.');
    } finally {
      setIsSubmittingContact(false);
    }
  };

  // Handle avatar photo selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file melebihi 5 MB. Harap pilih foto lain yang lebih kecil.');
      return;
    }

    setAvatarFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCommentAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setCommentAvatar(null);
    setAvatarFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle comment submit (Post to Supabase & local state)
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentMessage.trim()) return;

    setIsSubmittingComment(true);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const newCommentLocal: CommentItem = {
      id: 'c-' + Date.now(),
      name: commentName.trim(),
      message: commentMessage.trim(),
      time: 'Baru saja',
      avatar: commentAvatar,
      timestamp: Date.now(),
    };

    // If Supabase is configured, insert to remote database
    if (supabaseUrl && supabaseAnonKey) {
      try {
        const res = await fetchSupabase(
          `${supabaseUrl.replace(/\/$/, '')}/rest/v1/comments`,
          supabaseAnonKey,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Prefer: 'return=representation',
            },
            body: JSON.stringify({
              name: commentName.trim(),
              message: commentMessage.trim(),
              avatar: commentAvatar,
            }),
          }
        );

        if (res && res.ok) {
          const inserted = await res.json();
          if (Array.isArray(inserted) && inserted.length > 0) {
            newCommentLocal.id = inserted[0].id;
          }
        }
      } catch {
        // Continue with local update if network issue
      }
    }

    setComments((prev) => [newCommentLocal, ...prev]);

    setIsSubmittingComment(false);
    setCommentSuccess(true);
    setCommentName('');
    setCommentMessage('');
    setCommentAvatar(null);
    setAvatarFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setTimeout(() => {
      setCommentSuccess(false);
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Support uppercase anchor #Contact */}
      <div id="Contact" className="absolute -top-24 pointer-events-none" />

      {/* Section Header */}
      <AnimatedContent distance={30} direction="vertical" duration={0.8} threshold={0.15} className="flex flex-col items-center text-center mb-12 sm:mb-16">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-2">
          Contact Me
        </h2>
      </AnimatedContent>

      <AnimatedContent distance={40} direction="vertical" duration={0.8} threshold={0.1} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Hubungi Direct Form + FIND ME Social Cards */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Card 1: Hubungi Form */}
          <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#040816]/85 backdrop-blur-md shadow-2xl shadow-black/80">
            <h3 className="text-2xl font-bold text-sky-400 mb-2 tracking-wide">
              Hubungi
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-light mb-6 leading-relaxed">
              Ada yang mau didiskusikan? Langsung kirim pesan aja ya...
            </p>

            {contactSuccess && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-400 text-xs sm:text-sm animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Pesan berhasil dikirim dan masuk ke Gmail Alvaro! Terima kasih.</span>
              </div>
            )}

            {contactError && (
              <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-rose-400 text-xs sm:text-sm animate-in fade-in">
                <X className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{contactError}</span>
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4">
              {/* Nama */}
              <div>
                <label htmlFor="contact-name" className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                  Nama
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Nama Anda"
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#030612]/90 border border-white/10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 text-xs sm:text-sm text-white placeholder-slate-500 transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="Email Anda"
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl bg-[#030612]/90 border border-white/10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 text-xs sm:text-sm text-white placeholder-slate-500 transition-colors"
                  />
                </div>
              </div>

              {/* Pesan */}
              <div>
                <label htmlFor="contact-message" className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                  Pesan
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Pesan Anda"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#030612]/90 border border-white/10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 text-xs sm:text-sm text-white placeholder-slate-500 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Tombol Kirim Pesan */}
              <button
                type="submit"
                disabled={isSubmittingContact}
                className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {isSubmittingContact ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Pesan</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Card 2: FIND ME Social Cards */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold tracking-wider text-slate-300 uppercase mb-3 px-1">
              FIND ME
            </h4>
            <div className="space-y-2.5">

              <a
                href="https://instagram.com/seevaroo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-[#040816]/85 border border-white/10 hover:border-pink-500/40 hover:bg-white/[0.04] transition-all group cursor-pointer shadow-md"
              >
                <div className="flex items-center gap-3">
                  <InstagramAppIcon className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shadow-sm" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-semibold text-white group-hover:text-pink-300 transition-colors">
                      Instagram
                    </h5>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-mono">
                      @seevaroo
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

            
              <a
                href="https://www.linkedin.com/in/seevaroo/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-[#040816]/85 border border-white/10 hover:border-sky-500/40 hover:bg-white/[0.04] transition-all group cursor-pointer shadow-md"
              >
                <div className="flex items-center gap-3">
                  <LinkedInAppIcon className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shadow-sm" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                      linkedin
                    </h5>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-mono">
                      @seevaroo
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              
              <a
                href="https://github.com/seevaroo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-[#040816]/85 border border-white/10 hover:border-white/30 hover:bg-white/[0.04] transition-all group cursor-pointer shadow-md"
              >
                <div className="flex items-center gap-3">
                  <GitHubAppIcon className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shadow-sm" />
                  <div>
                    <h5 className="text-xs sm:text-sm font-semibold text-white group-hover:text-slate-200 transition-colors">
                      GitHub
                    </h5>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-mono">
                      @seevaroo
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Komentar Form & Dynamic Interactive Feed    */}
        {/* ========================================================= */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#040816]/85 backdrop-blur-md shadow-2xl shadow-black/80">
            {/* Header: Icon + Komentar (Total Count) */}
            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-sky-400">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Komentar ({comments.length})
              </h3>
            </div>

            {commentSuccess && (
              <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-400 text-xs sm:text-sm animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Komentar Anda berhasil dipublikasikan!</span>
              </div>
            )}

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              {/* Nama */}
              <div>
                <label htmlFor="comment-name" className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                  Nama
                </label>
                <input
                  id="comment-name"
                  type="text"
                  required
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="Masukkan nama kamu"
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-[#030612]/90 border border-white/10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 text-xs sm:text-sm text-white placeholder-slate-500 transition-colors"
                />
              </div>

              {/* Komentar */}
              <div>
                <label htmlFor="comment-text" className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                  Komentar
                </label>
                <textarea
                  id="comment-text"
                  required
                  rows={3}
                  value={commentMessage}
                  onChange={(e) => setCommentMessage(e.target.value)}
                  placeholder="Tulis komentar kamu di sini..."
                  className="w-full px-4 py-3 rounded-xl bg-[#030612]/90 border border-white/10 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 text-xs sm:text-sm text-white placeholder-slate-500 transition-colors resize-none min-h-[90px]"
                />
              </div>

              {/* Foto Profil (opsional) */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                  Foto Profil (opsional)
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {commentAvatar ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.04] border border-white/15">
                    <div className="flex items-center gap-3 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={commentAvatar}
                        alt="Preview Avatar"
                        className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0"
                      />
                      <span className="text-xs text-slate-300 truncate font-mono">
                        {avatarFileName}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2.5 sm:py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-xs sm:text-sm text-slate-300 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                  >
                    <ImageIcon className="w-4 h-4 text-slate-400" />
                    <span>Pilih Foto Profil</span>
                  </button>
                )}

                <p className="text-[11px] text-slate-500 text-center mt-1.5 font-light">
                  Ukuran file maksimal 5 MB
                </p>
              </div>

              {/* Tombol Kirim Komentar */}
              <button
                type="submit"
                disabled={isSubmittingComment}
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
              >
                {isSubmittingComment ? (
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Kirim Komentar</span>
                  </>
                )}
              </button>
            </form>

            {/* ========================================================= */}
            {/* Feed Komentar Realtime (Scrollable List)                 */}
            {/* ========================================================= */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="max-h-[460px] overflow-y-auto space-y-3.5 pr-1.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {comments.length === 0 ? (
                  <div className="py-10 text-center text-slate-500 text-xs sm:text-sm font-light">
                    Belum ada komentar. Jadilah yang pertama berkomentar!
                  </div>
                ) : (
                  comments.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all flex items-start gap-3.5 group"
                    >
                      {/* User Avatar */}
                      {item.avatar ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-white/15 shrink-0 shadow-sm"
                        />
                      ) : (
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 shrink-0">
                          <User className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      )}

                      {/* Comment Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h5 className="text-xs sm:text-sm font-semibold text-white truncate">
                            {item.name}
                          </h5>
                          <span className="text-[11px] text-slate-500 font-mono shrink-0">
                            {item.time}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed whitespace-pre-line break-words">
                          {item.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </AnimatedContent>
    </section>
  );
}
