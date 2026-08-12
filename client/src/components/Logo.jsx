import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ sub = 'GOA 2026', mini }) => (
  <Link to="/" className="inline-flex items-center gap-3 group">
    <div className="w-12 h-12 flex items-center justify-center bg-hh-yellow rounded-md border-2 border-hh-green-deep font-display text-hh-green-deep text-xl shadow-[3px_3px_0_#0a3d24] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-transform">
      HH
    </div>
    <div className="leading-tight">
      <div className="font-mono font-bold text-[11px] tracking-[0.15em] text-hh-yellow">HACKER HOUSE</div>
      <div className="font-mono text-[10px] tracking-[0.15em] text-hh-cream/80">{sub}</div>
      {mini && <div className="font-mono text-[9px] tracking-[0.15em] text-hh-cream/60">{mini}</div>}
    </div>
  </Link>
);

export default Logo;