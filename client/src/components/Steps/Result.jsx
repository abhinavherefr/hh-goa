import React, { useRef } from "react";
import FrameCard from "../FrameCard";

export default function Result({
  format = "card",
  name = "Aarav Sharma",
  role = "Builder",
  stack = "Fullstack",
  title = "THE UNHINGED FULLSTACK DEVELOPER",
  photo = null,
  zoom = 1,
  pan = { x: 0, y: 0 },
  theme = "ocean",
  builderId = "HH-26-0983",
  download,
  shareToX,
  copyToClipboard,
  copyImage,
  shareStatus,
  shareError,
  isUploading,
  onReset,
}) {
  const cardRef = useRef(null);

  const handleLocalDownload = () => {
    if (download) {
      download(format === "card" ? `${builderId}.png` : `${builderId}-pfp.png`);
    } else {
      const canvas = cardRef.current?.getCanvas?.();
      if (!canvas) return;
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${builderId}.png`;
        link.href = url;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1500);
      }, "image/png");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-hh-green dotted-bg p-4 lg:p-12 relative text-hh-cream">
      {/* Top Meta Info */}
      <div className="text-center mb-8 mt-4">
        <p className="chip chip-pink mb-3 uppercase tracking-widest font-mono text-[11px]">
          GENERATED • {builderId}
        </p>
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl stroked-yellow leading-tight mb-2 uppercase">
          YOUR ID IS READY
        </h1>
        <p className="text-hh-cream/90 font-mono text-xs sm:text-sm tracking-widest uppercase">
          {format === "pfp" ? "PFP FRAME" : "BUILDER PASS"} • GOA-READY. WEAR IT. PRINT IT. POST IT.
        </p>
      </div>

      {/* Frame Presentation Container */}
      <div className="bg-hh-yellow border-4 border-hh-green-deep p-4 rounded-2xl shadow-[10px_10px_0px_#0a3d24] mb-8 w-full max-w-lg relative">
        <div className="bg-hh-green-deep border-2 border-hh-green-deep rounded-xl p-3 flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-[360px]">
            <FrameCard
              ref={cardRef}
              format={format}
              name={name}
              role={role}
              stack={stack}
              title={title}
              photo={photo}
              zoom={zoom}
              pan={pan}
              theme={theme}
              builderId={builderId}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-3 z-10 max-w-2xl">
        <button
          type="button"
          onClick={handleLocalDownload}
          className="btn-yellow px-6 py-3 rounded-lg text-sm flex items-center gap-2"
        >
          Download PNG ↓
        </button>

        <button
          type="button"
          onClick={shareToX}
          disabled={isUploading}
          className="btn-yellow px-6 py-3 rounded-lg text-sm flex items-center gap-2 disabled:opacity-50"
        >
          {isUploading ? "Uploading to X..." : "Share to X ↗"}
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="btn-outline px-6 py-3 rounded-lg text-sm flex items-center gap-2"
        >
          Print card 🖨
        </button>

        {copyImage && (
          <button
            type="button"
            onClick={copyImage}
            className="btn-outline px-6 py-3 rounded-lg text-sm flex items-center gap-2"
          >
            {shareStatus === "copied-image" ? "Image Copied!" : "Copy Image 📋"}
          </button>
        )}

        <button
          type="button"
          onClick={copyToClipboard}
          className="btn-outline px-6 py-3 rounded-lg text-sm flex items-center gap-2"
        >
          {shareStatus === "copied" ? "Link Copied!" : "Copy share link 🔗"}
        </button>
      </div>

      {shareError && (
        <p className="text-red-300 font-mono text-xs font-bold mt-4 bg-red-950/80 p-2 rounded border border-red-500">
          Error sharing: {shareError}
        </p>
      )}

      {/* Back Button */}
      <button
        type="button"
        onClick={onReset}
        className="mt-8 font-mono text-xs tracking-widest text-hh-cream/80 hover:text-hh-yellow flex items-center gap-1.5 transition-colors"
      >
        ← BACK TO EDIT DETAILS
      </button>
    </div>
  );
}