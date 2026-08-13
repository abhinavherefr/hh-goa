import { useEffect, useState } from "react";

export default function Processing({ onComplete }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Step through the checklist
    const timer1 = setTimeout(() => setStep(1), 800);
    const timer2 = setTimeout(() => setStep(2), 1600);
    const timer3 = setTimeout(() => setStep(3), 2400);
    const timer4 = setTimeout(() => {
      setStep(4);
      setTimeout(onComplete, 600); // Complete after final bar fill
    }, 3200);

    return () => {
      clearTimeout(timer1); clearTimeout(timer2);
      clearTimeout(timer3); clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1D4A2A] p-4">
      <div className="bg-[#FFFBF2] text-[#15281B] p-10 rounded-2xl border-4 border-black shadow-[12px_12px_0px_#000] w-full max-w-md">
        <p className="text-[#EA3378] font-bold text-sm tracking-widest mb-2 uppercase">Building your ID</p>
        <h2 className="text-4xl font-black mb-8 uppercase text-[#2C663A]">
          PRESSING IT TO GOA...
        </h2>
        
        <ul className="space-y-4 font-black text-xl mb-8 font-mono">
          <li className={`flex items-center gap-4 ${step >= 1 ? "opacity-100 text-[#EA3378]" : "opacity-30"}`}>
            <div className={`w-6 h-6 border-4 border-black rounded-md flex items-center justify-center ${step >= 1 ? "bg-[#EA3378]" : ""}`}>
              {step >= 1 && <span className="text-white text-sm">✓</span>}
            </div>
            PHOTO
          </li>
          <li className={`flex items-center gap-4 ${step >= 2 ? "opacity-100 text-[#F5DC3E]" : "opacity-30"}`}>
            <div className={`w-6 h-6 border-4 border-black rounded-md flex items-center justify-center ${step >= 2 ? "bg-[#F5DC3E]" : ""}`}>
              {step >= 2 && <span className="text-black text-sm">✓</span>}
            </div>
            FRAME
          </li>
          <li className={`flex items-center gap-4 ${step >= 3 ? "opacity-100" : "opacity-30"}`}>
            <div className={`w-6 h-6 border-4 border-black rounded-md flex items-center justify-center ${step >= 3 ? "bg-black" : ""}`}>
              {step >= 3 && <span className="text-white text-sm">✓</span>}
            </div>
            GOA
          </li>
          <li className={`flex items-center gap-4 ${step >= 4 ? "opacity-100" : "opacity-30"}`}>
             <div className={`w-6 h-6 border-4 border-black rounded-md flex items-center justify-center ${step >= 4 ? "bg-black" : ""}`}>
              {step >= 4 && <span className="text-white text-sm">✓</span>}
            </div>
            BUILDER
          </li>
        </ul>

        {/* Diagonal striped progress bar */}
        <div className="w-full h-4 bg-transparent border-4 border-black rounded-full overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-[#EA3378] transition-all duration-300 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}