import React from 'react';
import { Check } from 'lucide-react';
import { STEPS } from '../mock';

const Stepper = ({ current = 0 }) => {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
      {STEPS.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={s.key}>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 font-mono text-[11px] font-bold tracking-widest uppercase transition-all ${
              done ? 'bg-hh-pink text-white border-hh-pink' :
              active ? 'bg-hh-yellow text-hh-green-deep border-hh-green-deep shadow-[3px_3px_0_#0a3d24]' :
              'bg-transparent text-hh-cream/60 border-hh-cream/30'
            }`}>
              {done ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : <span className="font-display">{String(i+1).padStart(2,'0')}</span>}
              <span>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`hidden sm:block w-10 h-[3px] rounded ${i < current ? 'bg-hh-pink' : 'bg-hh-cream/25'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;