import React, { useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Upload,
  Download,
  Share2,
  Copy,
  ArrowLeft,
  X,
  Sparkles,
  Edit3,
} from "lucide-react";
import FrameCard from "../components/FrameCard";
import {
  THEMES,
  PASS_LEVELS,
  FORMAT_OPTIONS,
  generateBuilderTitle,
} from "../lib/constants";

const SoloBuilder = () => {
  const [format, setFormat] = useState("card"); // "pfp" or "card"
  const [theme, setTheme] = useState("ocean"); // ocean, sunset, forest, cyber
  const [role, setRole] = useState("BUILDER");
  const [name, setName] = useState("UNNAMED BUILDER");
  const [stack, setStack] = useState("Full-Stack Builder");
  const [customTitle, setCustomTitle] = useState("");
  const [photo, setPhoto] = useState(null);
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState("");

  const fileRef = useRef(null);
  const cardRef = useRef(null);

  // Auto-generate title if not manually entered by user
  const effectiveTitle = useMemo(() => {
    if (customTitle && customTitle.trim()) {
      return customTitle.trim().toUpperCase();
    }
    return generateBuilderTitle(stack, role, name);
  }, [customTitle, stack, role, name]);

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result);
      setZoom(1.0);
      setPan({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
  };

  // --- ACTIONS ---
  const handleDownload = () => {
    const canvas = cardRef.current?.getCanvas?.();
    if (!canvas) {
      alert("Canvas is still loading...");
      return;
    }
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const filename = `HHGOA26-${format.toUpperCase()}-${(name || "BUILDER")
        .replace(/[^a-zA-Z0-9]/g, "_")
        .toLowerCase()}.png`;
      link.download = filename;
      link.href = url;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
    }, "image/png");
  };

  const handleCopyImage = async () => {
    const canvas = cardRef.current?.getCanvas?.();
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        if (navigator.clipboard && window.ClipboardItem) {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob }),
          ]);
          setCopiedStatus("image");
          setTimeout(() => setCopiedStatus(""), 2500);
        } else {
          alert("Clipboard image copy not supported in this browser.");
        }
      }, "image/png");
    } catch (err) {
      console.error("Failed to copy image to clipboard", err);
      alert("Could not copy image to clipboard.");
    }
  };

  const handleShareToX = async () => {
    const canvas = cardRef.current?.getCanvas?.();
    if (!canvas) return;

    try {
      setIsUploading(true);
      const dataUrl = canvas.toDataURL("image/png", 0.95);
      const formData = new FormData();
      formData.append("file", dataUrl);
      formData.append("upload_preset", "hhg_server");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/le7lnbsq/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      const imageUrl = data?.secure_url || "";
      openTwitter(imageUrl);
    } catch {
      openTwitter("");
    } finally {
      setIsUploading(false);
    }
  };

  const openTwitter = (imageUrl) => {
    const text = encodeURIComponent(
      `Check out my Hacker House Goa 2026 ${
        format === "pfp" ? "PFP" : "Builder ID"
      }! 🌴💻 #FrameInGoa`
    );
    const urlParam = imageUrl ? `&url=${encodeURIComponent(imageUrl)}` : "";
    window.open(
      `https://twitter.com/intent/tweet?text=${text}${urlParam}`,
      "_blank"
    );
  };

  const handleShareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Hacker House Goa 2026",
          text: `Check out my Hacker House Goa 2026 ${
            format === "pfp" ? "PFP" : "Builder ID"
          }! #FrameInGoa`,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedStatus("link");
      setTimeout(() => setCopiedStatus(""), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#07170E] text-[#F7F3E8] relative flex flex-col justify-between selection:bg-[#EA3378] selection:text-white">
      {/* Background Subtle Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(245, 220, 62, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(245, 220, 62, 0.1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 flex-1 flex flex-col">
        {/* Top Header */}
        <div className="flex items-start justify-between mb-6 pb-4 border-b border-[#F7F3E8]/10">
          <div>
            <div className="font-mono text-[11px] tracking-[0.2em] text-[#8FBF6E] font-bold uppercase mb-1">
              02 — CUSTOMIZE
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans">
              Make it yours.
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handlePhoto}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="px-4 py-2 rounded-lg border border-[#F7F3E8]/20 bg-[#0C2417] text-[#F7F3E8] font-mono text-xs tracking-wider font-bold hover:bg-[#143825] hover:border-[#F5DC3E]/50 transition-colors flex items-center gap-2"
            >
              {photo ? (
                <>
                  <X className="w-3.5 h-3.5 text-[#EA3378]" /> CHANGE PHOTO
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5 text-[#F5DC3E]" /> UPLOAD PHOTO
                </>
              )}
            </button>
            <Link
              to="/create"
              className="px-3 py-2 rounded-lg border border-[#F7F3E8]/10 text-[#F7F3E8]/70 hover:text-white font-mono text-xs tracking-wider"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="space-y-5 mb-8">
          {/* FORMAT & STYLE */}
          <div>
            <div className="font-mono text-[10px] tracking-[0.18em] text-[#8FBF6E] font-bold uppercase mb-2">
              FORMAT & STYLE
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FORMAT_OPTIONS.map((f) => {
                const active = format === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormat(f.id)}
                    className={`p-4 rounded-xl text-left border-2 transition-all relative ${
                      active
                        ? "border-[#F5DC3E] bg-[#0E2C1D] shadow-[0_0_20px_rgba(245,220,62,0.15)]"
                        : "border-[#F7F3E8]/15 bg-[#0A1F14]/70 hover:border-[#F7F3E8]/30"
                    }`}
                  >
                    <div className="font-sans font-bold text-base text-white">
                      {f.name}
                    </div>
                    <div className="font-mono text-xs text-[#F7F3E8]/60 mt-1">
                      {f.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STYLE THEME & PASS LEVEL (Side by side on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* STYLE THEME */}
            <div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-[#8FBF6E] font-bold uppercase mb-2">
                STYLE THEME
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.values(THEMES).map((t) => {
                  const active = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTheme(t.id)}
                      className={`px-3.5 py-2 rounded-lg border font-mono text-xs tracking-wider flex items-center gap-2 transition-all ${
                        active
                          ? "border-[#F5DC3E] bg-[#123623] text-white font-bold shadow-[0_0_12px_rgba(245,220,62,0.15)]"
                          : "border-[#F7F3E8]/15 bg-[#0A1F14]/70 text-[#F7F3E8]/80 hover:border-[#F7F3E8]/40"
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{ backgroundColor: t.dot }}
                      />
                      {t.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PASS LEVEL */}
            <div>
              <div className="font-mono text-[10px] tracking-[0.18em] text-[#8FBF6E] font-bold uppercase mb-2">
                PASS LEVEL
              </div>
              <div className="flex flex-wrap gap-2">
                {PASS_LEVELS.map((lvl) => {
                  const active = role === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setRole(lvl)}
                      className={`px-3.5 py-2 rounded-lg border font-mono text-xs tracking-wider font-bold transition-all ${
                        active
                          ? "border-[#F5DC3E] bg-[#123623] text-[#F5DC3E] shadow-[0_0_12px_rgba(245,220,62,0.15)]"
                          : "border-[#F7F3E8]/15 bg-[#0A1F14]/70 text-[#F7F3E8]/60 hover:text-[#F7F3E8] hover:border-[#F7F3E8]/40"
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* EDIT DETAILS TOGGLE */}
          <div className="bg-[#0A1F14]/60 border border-[#F7F3E8]/10 rounded-xl p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#F5DC3E] font-bold">
                  BUILDER DETAILS:
                </span>
                <span className="font-sans font-bold text-sm text-white">
                  {name || "UNNAMED BUILDER"}
                </span>
                <span className="text-xs text-[#F7F3E8]/40">·</span>
                <span className="font-mono text-xs text-[#EA3378] font-bold">
                  {effectiveTitle}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingDetails(!isEditingDetails)}
                className="font-mono text-[10px] tracking-wider text-[#8FBF6E] hover:text-[#F5DC3E] flex items-center gap-1 font-bold"
              >
                <Edit3 className="w-3 h-3" />
                {isEditingDetails ? "CLOSE" : "EDIT TEXT"}
              </button>
            </div>

            {isEditingDetails && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-[#F7F3E8]/10">
                <div>
                  <label className="block font-mono text-[9px] text-[#F7F3E8]/60 uppercase mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="UNNAMED BUILDER"
                    className="w-full bg-[#07170E] border border-[#F7F3E8]/20 rounded px-2.5 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-[#F5DC3E]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] text-[#F7F3E8]/60 uppercase mb-1">
                    Stack / Tech
                  </label>
                  <input
                    type="text"
                    value={stack}
                    onChange={(e) => setStack(e.target.value)}
                    placeholder="Full-Stack Builder, Rust, AI"
                    className="w-full bg-[#07170E] border border-[#F7F3E8]/20 rounded px-2.5 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-[#F5DC3E]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[9px] text-[#F7F3E8]/60 uppercase mb-1">
                    Custom Title (Optional — auto-generated if blank)
                  </label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder={`e.g. ${effectiveTitle}`}
                    className="w-full bg-[#07170E] border border-[#F7F3E8]/20 rounded px-2.5 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-[#F5DC3E]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center Preview Stage */}
        <div className="flex-1 flex flex-col items-center justify-center my-2">
          <div className="w-full max-w-2xl flex items-center justify-between font-mono text-[10px] text-[#F7F3E8]/50 tracking-[0.2em] mb-3">
            <span>PREVIEW</span>
            <span>DRAG · PINCH · FRAME</span>
          </div>

          <div
            className={`w-full flex items-center justify-center ${
              format === "pfp"
                ? "max-w-[340px] sm:max-w-[380px]"
                : "max-w-[320px] sm:max-w-[380px]"
            }`}
          >
            <FrameCard
              ref={cardRef}
              format={format}
              name={name || "UNNAMED BUILDER"}
              role={role}
              stack={stack}
              title={effectiveTitle}
              photo={photo}
              zoom={zoom}
              pan={pan}
              onPanChange={setPan}
              theme={theme}
            />
          </div>

          {/* Zoom Slider */}
          <div className="w-full max-w-sm mt-4 px-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] text-[#F7F3E8]/60 font-bold">
                Zoom
              </span>
              <input
                type="range"
                min="1"
                max="2.5"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1 accent-[#F5DC3E] cursor-pointer h-1.5 bg-[#0E2C1D] rounded-lg"
              />
            </div>
            <p className="font-mono text-[9px] text-[#F7F3E8]/40 text-center mt-1.5">
              Drag or pinch the photo to reposition & zoom
            </p>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="mt-8 pt-6 border-t border-[#F7F3E8]/10 space-y-3">
          {/* Main Actions (Row 1) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            <button
              type="button"
              onClick={handleShareToX}
              disabled={isUploading}
              className="py-3.5 px-6 rounded-xl font-sans font-black text-sm uppercase text-[#07170E] flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "linear-gradient(90deg, #F5DC3E 0%, #EA3378 100%)",
              }}
            >
              <Share2 className="w-4 h-4" />
              {isUploading ? "PREPARING FOR X..." : "Share to X"}
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="py-3.5 px-6 rounded-xl font-sans font-bold text-sm text-[#F7F3E8] bg-[#0E2C1D] border border-[#F7F3E8]/20 flex items-center justify-center gap-2 hover:bg-[#143C28] hover:border-[#F5DC3E]/40 transition-colors"
            >
              <Download className="w-4 h-4 text-[#8FBF6E]" />
              Download image
            </button>
          </div>

          {/* Secondary Actions (Row 2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            <button
              type="button"
              onClick={handleCopyImage}
              className="py-3 px-6 rounded-xl font-mono text-xs text-[#F7F3E8]/80 bg-[#0A1F14] border border-[#F7F3E8]/10 flex items-center justify-center gap-2 hover:text-white hover:border-[#F7F3E8]/30 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-[#F5DC3E]" />
              {copiedStatus === "image" ? "Copied to Clipboard!" : "Copy Image"}
            </button>

            <button
              type="button"
              onClick={handleShareApp}
              className="py-3 px-6 rounded-xl font-mono text-xs text-[#F7F3E8]/80 bg-[#0A1F14] border border-[#F7F3E8]/10 flex items-center justify-center gap-2 hover:text-white hover:border-[#F7F3E8]/30 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2DD4BF]" />
              {copiedStatus === "link" ? "Link Copied!" : "Share to App"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoloBuilder;