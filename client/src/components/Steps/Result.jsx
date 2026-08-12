import React from "react";

export default function Result({ 
  format, download, shareToX, copyToClipboard, 
  shareStatus, shareError, onReset 
}) {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#1D4A2A] p-4 lg:p-12 relative">
      
      {/* Top Meta Info */}
      <div className="text-center mb-10 mt-8">
        <p className="text-[#EA3378] font-bold tracking-widest mb-2 uppercase">GENERATED • HH-26-0983</p>
        <h1 className="text-6xl font-black text-[#F5DC3E] drop-shadow-[4px_4px_0px_#15281B] mb-2 uppercase">
          YOUR ID IS READY
        </h1>
        <p className="text-[#FFFBF2] font-bold tracking-widest uppercase">
          LANDSCAPE FRAME • GOA-READY. WEAR IT. PRINT IT. POST IT.
        </p>
      </div>

      {/* Frame Presentation Window (Mocking the yellow border container) */}
      <div className="bg-[#F5DC3E] border-4 border-black p-4 rounded-xl shadow-[12px_12px_0px_#000] mb-8 w-full max-w-4xl relative">
        <div className="bg-[#EA3378] border-4 border-black rounded-lg aspect-[16/9] w-full flex items-center justify-center overflow-hidden">
          {/* 
            Since you are generating a Canvas, the easiest way to display the final 
            result here is to either mount CanvasRenderer again (read-only) OR 
            just let the user rely on the generated output. 
            For exact UI match, we put a placeholder block where the canvas sits. 
          */}
          <p className="font-black text-black text-2xl">FINAL CANVAS RENDERS HERE</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 z-10">
        <button 
          onClick={() => download(format === "card" ? "hh-goa-builder-card.png" : "hh-goa-pfp.png")}
          className="bg-[#F5DC3E] text-black font-black px-6 py-3 border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
        >
          Download PNG ↓
        </button>

        <button 
          onClick={shareToX}
          className="bg-[#FFFBF2] text-black font-black px-6 py-3 border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
        >
          X Share to X ↗
        </button>

        <button 
          onClick={() => window.print()}
          className="bg-[#FFFBF2] text-black font-black px-6 py-3 border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
        >
          Print card 🖨
        </button>

        <button 
          onClick={copyToClipboard}
          className="bg-[#4CB99F] text-black font-black px-6 py-3 border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
        >
          {shareStatus === "copied" ? "Copied!" : "Copy share link 🔗"}
        </button>
      </div>

      {shareError && (
        <p className="text-red-400 font-bold mt-4 bg-black p-2 rounded border border-red-500">
          Error sharing: {shareError}
        </p>
      )}

      {/* Back Button */}
      <button 
        onClick={onReset}
        className="absolute top-8 right-8 text-[#FFFBF2] font-bold hover:text-[#F5DC3E] transition-colors"
      >
        ← BACK TO START
      </button>

    </div>
  );
}