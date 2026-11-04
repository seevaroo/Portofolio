'use client';

import dynamic from 'next/dynamic';
import React, { CSSProperties, ComponentType } from 'react';

export interface LanyardProps {
  frontImage?: string;
  backImage?: string;
  imageFit?: 'cover' | 'contain';
  cardColor?: string;
  orientation?: 'portrait' | 'landscape';
  finish?: 'glossy' | 'matte' | 'holographic' | 'metallic';
  cornerRadius?: number;
  size?: number;
  anchor?: 'left' | 'center' | 'right';
  strapLength?: number;
  strapImage?: string;
  strapColor?: string;
  strapWidth?: number;
  metal?: 'graphite' | 'silver' | 'gold';
  gravity?: number;
  damping?: number;
  elasticity?: number;
  breeze?: number;
  interactive?: boolean;
  intro?: boolean;
  className?: string;
  style?: CSSProperties;
}

const DynamicLanyard: ComponentType<any> = dynamic(() => import('./Lanyard'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3">
      <div className="w-10 h-10 rounded-full border-2 border-sky-400/20 border-t-sky-400 animate-spin" />
      <span className="text-xs font-mono text-slate-400 tracking-widest uppercase">Loading 3D Pass...</span>
    </div>
  ),
});

export default function LanyardCard(props: LanyardProps) {
  return <DynamicLanyard {...props} />;
}
