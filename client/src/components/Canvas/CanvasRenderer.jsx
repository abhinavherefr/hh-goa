import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { renderPfpFrame, PFP_SIZE } from "./frameCompositor";
import { renderBuilderCard, CARD_W, CARD_H } from "./badgeCompositor";

/**
 * Owns the actual <canvas> element. Re-renders synchronously whenever transform
 * or field values change, so the preview always matches what will be exported —
 * no separate "preview vs export" render path to keep in sync.
 */
const CanvasRenderer = forwardRef(function CanvasRenderer(
  { format, image, transform, fields, theme = "ocean", role = "BUILDER" },
  ref
) {
  const canvasRef = useRef(null);
  const [logoImage, setLogoImage] = useState(null);
  const [bgImage, setBgImage] = useState(null); // 1. Add state for the new background
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const dims = format === "card" ? { w: CARD_W, h: CARD_H } : { w: PFP_SIZE, h: PFP_SIZE };

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
  }));

  useEffect(() => {
    // Load Logo
    const logo = new Image();
    logo.onload = () => setLogoImage(logo);
    logo.onerror = () => setLogoImage(null);
    logo.src = "/LOGO.PNG";

    // 2. Load the new Goa Sunset Background
    const bg = new Image();
    bg.onload = () => setBgImage(bg);
    bg.onerror = () => setBgImage(null);
    // Make sure this matches the exact filename in your public folder!
    bg.src = "/ChatGPT Image Aug 12, 2026, 10_06_57 AM.png"; 

    if (document.fonts) {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const ctx = canvas.getContext("2d");

    if (format === "card") {
      // 3. Pass the loaded bgImage into the compositor
      renderBuilderCard(ctx, { image, bgImage, ...transform, ...fields, logoImage, theme, role });
    } else {
      renderPfpFrame(ctx, { image, ...transform, theme, role });
    }
  }, [format, image, transform, fields, logoImage, bgImage, fontsLoaded, theme, role]);

  return (
    <canvas
      ref={canvasRef}
      width={dims.w}
      height={dims.h}
      className="preview-canvas"
      aria-label="HH Goa 2026 generated graphic preview"
    />
  );
});

export default CanvasRenderer;