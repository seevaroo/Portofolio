'use client';

import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  phase: number;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const count = 160;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const w = canvas.width;
      const h = canvas.height;
      for (let i = 0; i < count; i++) {
        const size = Math.random() < 0.85 ? Math.random() * 1.4 + 0.6 : Math.random() * 2.2 + 1.2;
        const baseAlpha = Math.random() * 0.5 + 0.2;
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const twinkle = Math.sin(time * s.twinkleSpeed * 10 + s.phase);
        s.alpha = Math.max(0.1, Math.min(1, s.baseAlpha + twinkle * 0.35));

        ctx.fillStyle = `rgba(224, 242, 254, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle bloom for larger stars
        if (s.size > 1.8) {
          ctx.fillStyle = `rgba(56, 189, 248, ${s.alpha * 0.25})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener('resize', resize);
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Deep space cosmic radial glows */}
      <div className="absolute -top-[15%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px]" />
      <div className="absolute top-[35%] -right-[10%] w-[550px] h-[550px] bg-sky-500/8 rounded-full blur-[140px]" />
      <div className="absolute -bottom-[10%] left-[25%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px]" />
      <canvas ref={canvasRef} className="w-full h-full block opacity-85" />
    </div>
  );
}

