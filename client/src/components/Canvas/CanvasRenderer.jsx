import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { renderPfpFrame, PFP_SIZE } from "./frameCompositor";
import { renderBuilderCard, CARD_W, CARD_H } from "./badgeCompositor";

const CanvasRenderer = forwardRef(function CanvasRenderer(
  {
    format = "card",
    image,
    transform = { zoom: 1, offsetX: 0, offsetY: 0 },
    fields = {},
    theme = "ocean",
    role = "BUILDER",
  },
  ref
) {
  const canvasRef = useRef(null);
  const [bgImage, setBgImage] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const dims =
    format === "card"
      ? { w: CARD_W, h: CARD_H }
      : { w: PFP_SIZE, h: PFP_SIZE };

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
  }));

  // Attempt to load custom background image from /backgrounds/card-bg.png or /goa-bg.png
  useEffect(() => {
    let cancelled = false;
    const bg1 = new Image();
    bg1.onload = () => {
      if (!cancelled) setBgImage(bg1);
    };
    bg1.onerror = () => {
      const bg2 = new Image();
      bg2.onload = () => {
        if (!cancelled) setBgImage(bg2);
      };
      bg2.onerror = () => {
        if (!cancelled) setBgImage(null);
      };
      bg2.src = "/goa-bg.png";
    };
    bg1.src = "/backgrounds/card-bg.png";

    return () => {
      cancelled = true;
    };
  }, []);

  // Wait for web fonts if available
  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  // Composite canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (format === "card") {
      renderBuilderCard(ctx, {
        image,
        bgImage,
        ...transform,
        ...fields,
        theme,
        role,
      });
    } else {
      renderPfpFrame(ctx, {
        image,
        ...transform,
        theme,
        role,
      });
    }
  }, [
    format,
    image,
    bgImage,
    transform,
    fields,
    fontsLoaded,
    theme,
    role,
  ]);

  return (
    <canvas
      ref={canvasRef}
      width={dims.w}
      height={dims.h}
      className="preview-canvas w-full h-full object-contain block"
      aria-label="HH Goa 2026 generated graphic preview"
    />
  );
});

export default CanvasRenderer;
