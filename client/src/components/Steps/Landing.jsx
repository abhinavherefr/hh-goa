import { motion } from "framer-motion";

export default function Landing({ onNext }) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-[#368b44] overflow-hidden">
      {/* Background wavy pattern placeholder */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FBEB8F] to-transparent pointer-events-none" />

      {/* Top Right Buttons */}
      <div className="absolute top-6 right-8 flex gap-4 z-50">
        <button className="bg-[#FBEB8F] text-black font-black px-6 py-2 border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all">
          CHECK HYPE ↗
        </button>
        <button 
          onClick={onNext}
          className="bg-[#F5DC3E] text-black font-black px-6 py-2 border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all"
        >
          CREATE ↗
        </button>
      </div>

      {/* Floating Elements (Animated with Framer Motion) */}
      <motion.div 
        animate={{ y: [0, -20, 0] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-10 top-32 w-32 h-32 bg-[#EA3378] border-4 border-black rounded-full shadow-[6px_6px_0px_#000]"
      />
      <motion.div 
        animate={{ y: [0, 20, 0] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-20 bottom-32 w-40 h-24 bg-[#FFFBF2] border-4 border-black shadow-[6px_6px_0px_#000]"
      />

      {/* Main Title */}
      <div className="z-10 text-center flex flex-col items-center">
        <h1 className="text-[10vw] leading-none font-black text-transparent bg-clip-text" style={{ WebkitTextStroke: '3px #F5DC3E', color: 'transparent' }}>
          HACKER HOUSE
        </h1>
        <div className="relative">
          <h2 className="text-[12vw] leading-none font-black text-[#F5DC3E] drop-shadow-[8px_8px_0px_#15281B]">
            GOA 2026
          </h2>
          <span className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-5xl font-black text-[#EA3378] -rotate-12 drop-shadow-[4px_4px_0px_#15281B]">
            गोवा
          </span>
        </div>
      </div>

      {/* Footer tags */}
      <div className="absolute bottom-10 flex flex-col items-center gap-4 z-10 font-bold">
        <div className="bg-[#F5DC3E] text-black px-6 py-2 border-4 border-black shadow-[4px_4px_0px_#000] rounded-full">
          #FRAMEINGOA
        </div>
        <div className="bg-[#15281B] text-[#F5DC3E] px-8 py-3 rounded-full border-2 border-black">
          GOA, INDIA • 28 - 31 OCT 2026
        </div>
      </div>
    </div>
  );
}