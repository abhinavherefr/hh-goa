import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import JsBarcode from "jsbarcode";
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
    builderId = "HH-26-0983",
  },
  ref
) {
  const canvasRef = useRef(null);
  const [bgImage, setBgImage] = useState(null);
  const [barcodeImage, setBarcodeImage] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const dims =
    format === "card"
      ? { w: CARD_W, h: CARD_H }
      : { w: PFP_SIZE, h: PFP_SIZE };

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
  }));

  // Load custom background image from candidate paths
  useEffect(() => {
    let cancelled = false;
    const paths = [
      "/backgrounds/goa-bg.png",
      "/backgrounds/card-bg.png",
      "/background/goa-bg.png",
      "/background/card-bg.png",
      "/goa-bg.png",
      "/card-bg.png",
    ];

    let currentIdx = 0;
    const tryNext = () => {
      if (currentIdx >= paths.length || cancelled) return;
      const img = new Image();
      img.onload = () => {
        if (!cancelled) setBgImage(img);
      };
      img.onerror = () => {
        currentIdx++;
        tryNext();
      };
      img.src = paths[currentIdx];
    };

    tryNext();

    return () => {
      cancelled = true;
    };
  }, []);

  // Generate scannable verification barcode
  useEffect(() => {
    const canvas = document.createElement("canvas");
    try {
      const codeValue = (builderId || "HH-26-0983").toUpperCase().trim();
      JsBarcode(canvas, codeValue, {
        format: "CODE128",
        width: 2.2,
        height: 48,
        displayValue: false,
        margin: 6,
        background: "#FFFDF8",
        lineColor: "#0C1711",
      });
      setBarcodeImage(canvas);
    } catch {
      setBarcodeImage(null);
    }
  }, [builderId]);

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
        barcodeImage,
        uniqueId: builderId || "HH-26-0983",
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
    barcodeImage,
    builderId,
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
