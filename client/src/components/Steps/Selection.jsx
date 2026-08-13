import { motion } from "framer-motion";

export default function Selection({ onNext }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1D4A2A] p-8">
      <div className="text-center mb-12">
        <p className="text-[#EA3378] font-bold tracking-widest mb-2">BUILD YOUR ID</p>
        <h1 className="text-6xl font-black text-[#F5DC3E] drop-shadow-[4px_4px_0px_#15281B]">
          WHAT ARE YOU BUILDING?
        </h1>
        <p className="mt-4 text-[#FFFBF2] font-bold">Build your collectible Hacker House Goa identity.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        {/* Solo Card */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex-1 bg-[#FBEB8F] border-4 border-black p-8 rounded-2xl shadow-[12px_12px_0px_#000] relative"
        >
          <div className="w-full h-48 bg-[#4CB99F] border-4 border-black rounded-xl mb-8 flex items-center justify-center shadow-inner">
             {/* Placeholder for the graphic */}
             <div className="w-20 h-20 bg-[#FFFBF2] rounded-full border-4 border-black flex items-center justify-center">
                <div className="w-10 h-4 bg-black rounded-full" />
             </div>
          </div>
          <h2 className="text-4xl font-black text-black mb-2">BUILD SOLO</h2>
          <p className="text-[#EA3378] font-bold mb-4">ONE BUILDER. ONE IDENTITY.</p>
          <p className="text-black font-medium mb-8">Create your personal Hacker House Goa Builder ID — pick a frame, fit your photo, generate a collectible badge.</p>
          <button 
            onClick={onNext}
            className="w-full bg-[#F5DC3E] text-black font-black text-xl py-4 border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all"
          >
            Build my ID →
          </button>
        </motion.div>

        {/* Squad Card (Disabled/Dummy for now) */}
        <div className="flex-1 bg-[#2C663A] border-4 border-black p-8 rounded-2xl shadow-[12px_12px_0px_#000] opacity-80">
          <div className="w-full h-48 bg-[#1D4A2A] border-4 border-black rounded-xl mb-8 flex items-center justify-center" />
          <h2 className="text-4xl font-black text-[#F5DC3E] mb-2">BUILD YOUR SQUAD</h2>
          <p className="text-[#EA3378] font-bold mb-4">ONE TEAM. EVERY BUILDER.</p>
          <p className="text-[#FFFBF2] font-medium mb-8">Create IDs for your entire team in one go. Add everyone, choose one frame, generate the full set together.</p>
          <button className="w-full bg-[#F5DC3E] text-black font-black text-xl py-4 border-4 border-black shadow-[4px_4px_0px_#000] cursor-not-allowed">
            Build my squad →
          </button>
        </div>
      </div>
    </div>
  );
}