import React from 'react';

// Simple SVG decorations that give the retro tropical vibe
export const PalmTree = ({ className = '', flip = false }) => (
  <svg viewBox="0 0 120 200" className={className} style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
    <path d="M60 200 Q56 130 60 80" stroke="#5a3a1f" strokeWidth="6" fill="none" />
    <path d="M60 80 Q20 60 5 90 Q30 70 60 80" fill="#2f8f4a" stroke="#0a3d24" strokeWidth="2" />
    <path d="M60 80 Q100 55 115 85 Q85 65 60 80" fill="#2f8f4a" stroke="#0a3d24" strokeWidth="2" />
    <path d="M60 80 Q40 40 15 45 Q45 55 60 80" fill="#2f8f4a" stroke="#0a3d24" strokeWidth="2" />
    <path d="M60 80 Q85 35 110 40 Q80 55 60 80" fill="#2f8f4a" stroke="#0a3d24" strokeWidth="2" />
    <circle cx="52" cy="82" r="3" fill="#f9df32" />
    <circle cx="66" cy="85" r="3" fill="#f9df32" />
  </svg>
);

export const House = ({ className = '', color = '#ec2f89' }) => (
  <svg viewBox="0 0 120 100" className={className}>
    <path d="M10 45 L60 15 L110 45 L110 90 L10 90 Z" fill={color} stroke="#0a3d24" strokeWidth="2.5" />
    <rect x="40" y="55" width="18" height="20" fill="#f9df32" stroke="#0a3d24" strokeWidth="2" />
    <rect x="70" y="55" width="18" height="20" fill="#f9df32" stroke="#0a3d24" strokeWidth="2" />
    <path d="M5 45 L60 10 L115 45" stroke="#0a3d24" strokeWidth="2.5" fill="none" />
  </svg>
);

export const Scooter = ({ className = '' }) => (
  <svg viewBox="0 0 140 80" className={className}>
    <circle cx="30" cy="60" r="14" fill="#0a3d24" stroke="#f9df32" strokeWidth="2" />
    <circle cx="110" cy="60" r="14" fill="#0a3d24" stroke="#f9df32" strokeWidth="2" />
    <circle cx="30" cy="60" r="5" fill="#f9df32" />
    <circle cx="110" cy="60" r="5" fill="#f9df32" />
    <path d="M30 60 L60 30 L95 30 L110 60 Z" fill="#ec2f89" stroke="#0a3d24" strokeWidth="2" />
    <path d="M95 30 L100 15 L108 15" stroke="#0a3d24" strokeWidth="3" fill="none" />
  </svg>
);

export const Cloud = ({ className = '' }) => (
  <svg viewBox="0 0 100 50" className={className}>
    <ellipse cx="25" cy="30" rx="18" ry="15" fill="#1a6a3f" />
    <ellipse cx="50" cy="25" rx="22" ry="18" fill="#1a6a3f" />
    <ellipse cx="75" cy="30" rx="18" ry="14" fill="#1a6a3f" />
  </svg>
);

export const Camera = ({ className = '' }) => (
  <svg viewBox="0 0 100 80" className={className}>
    <rect x="5" y="20" width="90" height="55" rx="6" fill="#ec2f89" stroke="#0a3d24" strokeWidth="2" />
    <rect x="30" y="12" width="30" height="10" fill="#0a3d24" />
    <circle cx="50" cy="48" r="18" fill="#f9df32" stroke="#0a3d24" strokeWidth="2" />
    <circle cx="50" cy="48" r="10" fill="#0a3d24" />
    <circle cx="80" cy="32" r="3" fill="#f9df32" />
  </svg>
);

export const Sun = ({ className = '' }) => (
  <svg viewBox="0 0 60 60" className={className}>
    <circle cx="30" cy="30" r="14" fill="#f9df32" stroke="#0a3d24" strokeWidth="2" />
    {[0,45,90,135,180,225,270,315].map(a => (
      <line key={a} x1="30" y1="30" x2={30 + 24 * Math.cos((a * Math.PI) / 180)} y2={30 + 24 * Math.sin((a * Math.PI) / 180)} stroke="#f9df32" strokeWidth="3" strokeLinecap="round" />
    ))}
  </svg>
);

export const Bird = ({ className = '' }) => (
  <svg viewBox="0 0 40 20" className={className}>
    <path d="M2 12 Q10 2 20 12 Q30 2 38 12" stroke="#0a3d24" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

export const Wave = ({ className = '', color = '#1a6a3f' }) => (
  <svg viewBox="0 0 400 40" className={className} preserveAspectRatio="none">
    <path d="M0 20 Q50 0 100 20 T200 20 T300 20 T400 20 L400 40 L0 40 Z" fill={color} />
  </svg>
);

export const Zigzag = ({ className = '', color = '#ec2f89' }) => (
  <svg viewBox="0 0 200 20" className={className} preserveAspectRatio="none">
    <path d="M0 10 L20 0 L40 20 L60 0 L80 20 L100 0 L120 20 L140 0 L160 20 L180 0 L200 10" stroke={color} strokeWidth="4" fill="none" />
  </svg>
);

export const Coconut = ({ className = '' }) => (
  <svg viewBox="0 0 40 40" className={className}>
    <circle cx="20" cy="20" r="14" fill="#5a3a1f" stroke="#0a3d24" strokeWidth="2" />
    <path d="M15 15 Q18 12 22 14" stroke="#f5edb7" strokeWidth="2" fill="none" />
  </svg>
);

// Background decoration for entire pages
export const PageDecor = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <Cloud className="absolute top-20 left-10 w-24 animate-bob-slow" />
    <Cloud className="absolute top-40 right-16 w-32 animate-bob" />
    <Cloud className="absolute top-64 left-1/3 w-20 animate-bob-slow" />
    <PalmTree className="absolute top-8 right-2 w-24 opacity-90" />
    <PalmTree className="absolute top-24 left-0 w-20 opacity-70" flip />
    <Bird className="absolute top-32 left-1/4 w-8" />
    <Bird className="absolute top-20 right-1/3 w-6" />
    <House className="absolute top-72 right-8 w-28 animate-bob-slow" />
    <House className="absolute top-96 left-4 w-24" color="#f27e2b" />
    <Scooter className="absolute bottom-32 left-8 w-32 animate-bob" />
    <Camera className="absolute bottom-24 right-10 w-24 animate-bob-slow" />
    <Coconut className="absolute top-1/2 left-1/4 w-6" />
    <Coconut className="absolute bottom-1/3 right-1/4 w-5" />
    <div className="absolute bottom-0 left-0 right-0 h-24">
      <Wave className="w-full h-full" color="#1a6a3f" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-16">
      <Wave className="w-full h-full" color="#22894b" />
    </div>
  </div>
);