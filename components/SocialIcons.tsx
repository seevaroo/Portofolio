import React from 'react';

export function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function GoogleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25A11.97 11.97 0 0 0 0 12c0 1.92.45 3.74 1.25 5.42l4.03-3.15Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
      />
    </svg>
  );
}

export function LinkedInAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect width="24" height="24" rx="4.5" fill="#0A66C2" />
      <path
        fill="#FFFFFF"
        d="M19 19h-3.13v-4.9c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.59V19H9.23V9h3v1.37h.04c.42-.8 1.45-1.64 2.99-1.64 3.2 0 3.79 2.11 3.79 4.85V19zM5.34 7.63c-1 0-1.81-.82-1.81-1.82 0-1 .81-1.81 1.81-1.81s1.82.81 1.82 1.81c0 1-.82 1.82-1.82 1.82zM6.9 19H3.77V9H6.9v10z"
      />
    </svg>
  );
}

export function InstagramAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="ig-app-gradient" cx="20%" cy="115%" r="135%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="5.5" fill="url(#ig-app-gradient)" />
      <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="4.5" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.1" fill="none" stroke="#FFFFFF" strokeWidth="1.8" />
      <circle cx="16.3" cy="7.7" r="1.1" fill="#FFFFFF" />
    </svg>
  );
}

export function TikTokAppIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <div className={`rounded-xl bg-[#010101] border border-white/10 flex items-center justify-center p-2 shrink-0 ${className}`}>
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" aria-hidden="true">
        <path
          fill="#25F4EE"
          d="M16.6 8.2c-.8-.5-1.4-1.3-1.6-2.2H12v10.5a2.5 2.5 0 1 1-2.5-2.5c.3 0 .7.1 1 .2V11a5.5 5.5 0 1 0 4.5 5.4V9.8c1 .7 2.2 1.1 3.5 1.1V8c-1.4 0-2.6-.6-3.4-1.6l-.5 1.8z"
          opacity="0.8"
          transform="translate(-0.8, -0.8)"
        />
        <path
          fill="#FE2C55"
          d="M16.6 8.2c-.8-.5-1.4-1.3-1.6-2.2H12v10.5a2.5 2.5 0 1 1-2.5-2.5c.3 0 .7.1 1 .2V11a5.5 5.5 0 1 0 4.5 5.4V9.8c1 .7 2.2 1.1 3.5 1.1V8c-1.4 0-2.6-.6-3.4-1.6l-.5 1.8z"
          opacity="0.8"
          transform="translate(0.8, 0.8)"
        />
        <path
          fill="#FFFFFF"
          d="M16.6 8.2c-.8-.5-1.4-1.3-1.6-2.2H12v10.5a2.5 2.5 0 1 1-2.5-2.5c.3 0 .7.1 1 .2V11a5.5 5.5 0 1 0 4.5 5.4V9.8c1 .7 2.2 1.1 3.5 1.1V8c-1.4 0-2.6-.6-3.4-1.6l-.5 1.8z"
        />
      </svg>
    </div>
  );
}

export function GitHubAppIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <div className={`rounded-xl bg-[#161b22] border border-white/10 flex items-center justify-center p-2 shrink-0 ${className}`}>
      <svg viewBox="0 0 24 24" className="w-full h-full text-white" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    </div>
  );
}

