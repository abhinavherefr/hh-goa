import React from 'react';
import { EVENT } from '../mock';

/**
 * FrameCard - renders a builder ID card in one of many styles.
 * Props: frame (obj), name, role, title, team, photo (dataUrl), builderId, zoom (1..2), variant='preview'|'thumb'
 */
const FrameCard = ({ frame, name = 'AARAV', role = 'BUILDER', title = '', team = '', photo, builderId = 'HH-26-0000', zoom = 1, className = '', thumb = false }) => {
  const displayName = (name || 'AARAV').toUpperCase();
  const displayRole = (role || 'BUILDER').toUpperCase();

  if (!frame) return null;

  const commonHeader = (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-1.5">
        <div className="w-6 h-6 bg-hh-yellow rounded-sm border border-hh-green-deep flex items-center justify-center font-display text-[8px] text-hh-green-deep">HH</div>
        <div className="font-mono text-[7px] leading-tight text-hh-yellow">
          <div className="font-bold tracking-wider">HACKER HOUSE GOA 2026</div>
          <div className="text-hh-cream/70 text-[6px]">BUILDER ID</div>
        </div>
      </div>
      <div className="font-mono text-[6px] text-hh-cream/70">{builderId}</div>
    </div>
  );

  const commonFooter = (
    <div className="flex items-center justify-between font-mono text-[6px] text-hh-cream/70 mt-2 pt-2 border-t border-hh-cream/20">
      <span>{EVENT.hashtag} · 28–31 OCT 2026</span>
      <span>GOA, INDIA</span>
    </div>
  );

  const photoEl = (shape = 'rect', extraClass = '') => (
    <div className={`relative overflow-hidden ${extraClass} bg-hh-green-light border-2 border-hh-yellow ${shape === 'circle' ? 'rounded-full' : shape === 'arch' ? 'rounded-t-full rounded-b-md' : 'rounded-md'}`}>
      {photo ? (
        <img src={photo} alt="user" className="w-full h-full object-cover" style={{ transform: `scale(${zoom})` }} />
      ) : (
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-70">
          <circle cx="50" cy="40" r="18" fill="#f5edb7" />
          <path d="M20 100 Q50 65 80 100 Z" fill="#f5edb7" />
        </svg>
      )}
    </div>
  );

  // ARCH BADGE
  if (frame.id === 'arch') {
    return (
      <div className={`relative w-full aspect-[3/4] p-3 rounded-xl bg-hh-green-deep border-2 border-hh-yellow shadow-[4px_4px_0_#ec2f89] ${className}`}>
        {commonHeader}
        {photoEl('arch', 'w-full h-[55%] mx-auto')}
        <div className="mt-2 text-center">
          <div className="font-display text-hh-yellow text-lg leading-none stroked-green" style={{ WebkitTextStroke: '1px #0a3d24' }}>{displayName}</div>
          <div className="inline-block mt-1 bg-hh-yellow text-hh-green-deep px-2 py-0.5 rounded font-mono text-[8px] font-bold">{displayRole}</div>
        </div>
        {commonFooter}
      </div>
    );
  }

  // PORTRAIT FRAME
  if (frame.id === 'portrait') {
    return (
      <div className={`relative w-full aspect-[3/4] p-3 rounded-xl bg-hh-green-deep border-2 border-hh-cream ${className}`}>
        {commonHeader}
        {photoEl('rect', 'w-full h-[60%]')}
        <div className="mt-2 text-center">
          <div className="font-display text-hh-yellow text-lg leading-none">{displayName}</div>
          <div className="font-mono text-[8px] text-hh-cream/70 mt-0.5">{displayRole}</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-hh-pink rounded-b-xl" />
      </div>
    );
  }

  // ORNATE BADGE
  if (frame.id === 'ornate') {
    return (
      <div className={`relative w-full aspect-[3/4] p-3 rounded-xl bg-hh-green-deep border-4 border-double border-hh-yellow ${className}`}>
        {commonHeader}
        <div className="relative w-full h-[55%] p-1.5 border border-hh-yellow/60 rounded-md">
          {photoEl('rect', 'w-full h-full')}
        </div>
        <div className="mt-2 text-center">
          <div className="font-display text-hh-yellow text-lg leading-none">{displayName}</div>
          <div className="font-mono text-[8px] text-hh-cream/70 mt-0.5">✦ {displayRole} ✦</div>
        </div>
        {commonFooter}
      </div>
    );
  }

  // SLIM BADGE
  if (frame.id === 'slim') {
    return (
      <div className={`relative w-full aspect-[3/4] p-3 rounded-xl bg-hh-green-deep border-2 border-hh-cream/40 ${className}`}>
        {commonHeader}
        {photoEl('arch', 'w-full h-[58%]')}
        <div className="mt-2 text-center">
          <div className="font-display text-hh-yellow text-base leading-none">{displayName}</div>
          <div className="font-mono text-[7px] text-hh-cream/60 mt-0.5">{displayRole}</div>
        </div>
      </div>
    );
  }

  // LANDSCAPE FRAME
  if (frame.id === 'landscape') {
    return (
      <div className={`relative w-full aspect-[16/10] p-3 rounded-xl overflow-hidden ${className}`} style={{ background: 'linear-gradient(180deg, #f27e2b 0%, #ec2f89 100%)' }}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 bg-hh-yellow rounded-sm border border-hh-green-deep flex items-center justify-center font-display text-[8px] text-hh-green-deep">HH</div>
            <div className="font-mono text-[7px] leading-tight text-white">
              <div className="font-bold tracking-wider">HACKER HOUSE GOA 2026</div>
              <div className="text-white/80 text-[6px]">BUILDER ID</div>
            </div>
          </div>
          <div className="font-mono text-[6px] text-white/80">{builderId}</div>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex-1">
            {/* Sun */}
            <svg viewBox="0 0 60 60" className="w-12 h-12">
              <circle cx="30" cy="30" r="12" fill="#f9df32" stroke="#0a3d24" strokeWidth="2" />
              {[0,45,90,135,180,225,270,315].map(a => (
                <line key={a} x1="30" y1="30" x2={30 + 22 * Math.cos((a * Math.PI) / 180)} y2={30 + 22 * Math.sin((a * Math.PI) / 180)} stroke="#f9df32" strokeWidth="3" strokeLinecap="round" />
              ))}
            </svg>
            <div className="font-display text-white text-base leading-tight mt-1">{displayName}</div>
            <div className="inline-block mt-1 bg-hh-yellow text-hh-green-deep px-2 py-0.5 rounded font-mono text-[7px] font-bold">{displayRole}</div>
            <svg viewBox="0 0 200 20" className="w-full mt-2" preserveAspectRatio="none">
              <path d="M0 10 Q25 0 50 10 T100 10 T150 10 T200 10" stroke="#f9df32" strokeWidth="2" fill="none" />
              <path d="M0 15 Q25 5 50 15 T100 15 T150 15 T200 15" stroke="#f9df32" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="w-[38%] aspect-[3/4] rounded-md border-2 border-hh-yellow overflow-hidden bg-hh-green-deep">
            {photo ? <img src={photo} alt="u" className="w-full h-full object-cover" style={{ transform: `scale(${zoom})` }} /> :
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-70"><circle cx="50" cy="40" r="18" fill="#f5edb7"/><path d="M20 100 Q50 65 80 100 Z" fill="#f5edb7"/></svg>
            }
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-[#c4d84a] px-3 py-1.5">
          <div className="flex items-center justify-between font-mono text-[6px] text-hh-green-deep">
            <span>{EVENT.hashtag} · 28–31 OCT 2026 · GOA, INDIA</span>
            <span>HH OCT 2026</span>
          </div>
          <div className="font-display text-hh-green-deep text-lg leading-none text-center opacity-70">GOA 2026</div>
        </div>
      </div>
    );
  }

  // CIRCLE PFP
  if (frame.id === 'circle') {
    return (
      <div className={`relative w-full aspect-square p-3 rounded-xl bg-hh-green-deep border-2 border-hh-yellow ${className}`}>
        {commonHeader}
        <div className="relative w-[70%] mx-auto aspect-square my-2">
          <div className="absolute inset-0 rounded-full border-4 border-hh-yellow" />
          {photoEl('circle', 'w-full h-full')}
          <svg viewBox="0 0 100 100" className="absolute -bottom-1 left-0 right-0 w-full"><path d="M0 50 Q25 45 50 50 T100 50" stroke="#f9df32" strokeWidth="1" fill="none" /></svg>
        </div>
        <div className="text-center mt-1">
          <div className="font-display text-hh-yellow text-base leading-none">{displayName}</div>
          <div className="font-mono text-[8px] text-hh-cream/70 mt-0.5">{displayRole}</div>
        </div>
      </div>
    );
  }

  // TALL PFP
  if (frame.id === 'tall') {
    return (
      <div className={`relative w-full aspect-[3/4] p-3 rounded-xl bg-hh-green-deep border-2 border-hh-yellow ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="w-2 h-2 rounded-full bg-hh-pink" />
          <div className="font-mono text-[7px] text-hh-yellow">HH · TALL</div>
          <div className="w-2 h-2 rounded-full bg-hh-yellow" />
        </div>
        {photoEl('arch', 'w-full h-[70%]')}
        <div className="mt-2 text-center">
          <div className="font-display text-hh-yellow text-lg leading-none">{displayName}</div>
          <div className="font-mono text-[8px] text-hh-cream/70 mt-0.5">{displayRole}</div>
        </div>
      </div>
    );
  }

  return null;
};

export default FrameCard;