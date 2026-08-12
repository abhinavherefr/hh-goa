import React from "react";
import CanvasRenderer from "../Canvas/CanvasRenderer";
// You might need to import your existing FormatToggle, ThemeSelector, etc. here if you want to use them.

export default function FormStep({ 
  fields, setFields, format, setFormat, theme, setTheme, 
  role, setRole, image, handleImageReady, canvasRef, 
  resolvedFields, onGenerate 
}) {

  // Simple file input handler adapted for your custom handleImageReady hook
  const onFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageReady({ file });
    }
  };

  return (
    <div className="min-h-screen bg-[#1D4A2A] p-4 lg:p-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Form */}
        <div className="w-full lg:w-1/3 bg-[#FBEB8F] border-4 border-black p-6 rounded-2xl shadow-[12px_12px_0px_#000] text-black">
          <h2 className="text-4xl font-black mb-6 uppercase leading-tight">Build Your Builder ID</h2>
          <p className="font-medium mb-8 border-b-4 border-black pb-6">
            Your details, your frame, your collectible badge. No sign-up needed — everything renders right here.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block font-black mb-2 text-sm uppercase">Full Name</label>
              <input 
                type="text" 
                value={fields.name}
                onChange={(e) => setFields({...fields, name: e.target.value})}
                className="w-full p-3 border-4 border-black rounded bg-[#E4EBF5] font-bold focus:outline-none focus:ring-2 focus:ring-[#EA3378]"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-black mb-2 text-sm uppercase">Role</label>
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 border-4 border-black rounded bg-transparent font-bold appearance-none cursor-pointer"
                >
                  <option value="BUILDER">Builder</option>
                  <option value="SPEAKER">Speaker</option>
                  <option value="HACKER">Hacker</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-black mb-2 text-sm uppercase">Stack / Tech</label>
              <input 
                type="text" 
                value={fields.stack}
                onChange={(e) => setFields({...fields, stack: e.target.value})}
                className="w-full p-3 border-4 border-black rounded bg-transparent font-bold"
                placeholder="e.g. React, Backend, Design"
              />
            </div>

            <div className="p-4 border-4 border-black border-dashed rounded-xl bg-transparent flex flex-col items-center justify-center text-center cursor-pointer relative hover:bg-black/5 transition-colors">
              <input 
                type="file" 
                accept="image/*" 
                onChange={onFileInput} 
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <span className="font-black underline">UPLOAD PHOTO</span>
              <span className="text-xs font-bold mt-1">JPG, PNG, WEBP</span>
            </div>
          </div>

          <button 
            onClick={onGenerate}
            disabled={!image}
            className="w-full mt-8 bg-[#F5DC3E] text-black text-xl font-black py-4 border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            CHOOSE MY FRAME ✨
          </button>
        </div>

        {/* Right Column: Canvas Preview */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <div className="bg-[#2C663A] border-4 border-black rounded-2xl shadow-[12px_12px_0px_#000] flex-1 flex items-center justify-center p-8 overflow-hidden relative">
             {image ? (
                <div className="relative w-full max-w-[400px] aspect-[2/3] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  {/* Re-using your existing CanvasRenderer component here */}
                  <CanvasRenderer 
                    ref={canvasRef}
                    format={format}
                    image={image}
                    fields={resolvedFields}
                    theme={theme}
                    role={role}
                  />
                </div>
             ) : (
                <div className="text-center font-bold text-[#F5DC3E] border-4 border-dashed border-[#F5DC3E] p-12 rounded-xl">
                   <p className="text-2xl mb-2">PREVIEW</p>
                   <p className="opacity-80">Upload a photo to see your ID</p>
                </div>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}