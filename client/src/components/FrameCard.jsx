import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import CanvasRenderer from "./Canvas/CanvasRenderer";

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

// Loads a plain <img> element from a data URL / URL for canvas drawImage
function useHtmlImage(src) {
  const [img, setImg] = useState(null);

  useEffect(() => {
    if (!src) {
      setImg(null);
      return undefined;
    }
    let cancelled = false;
    const image = new Image();
    image.onload = () => {
      if (!cancelled) setImg(image);
    };
    image.onerror = () => {
      if (!cancelled) setImg(null);
    };
    image.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  return img;
}

/**
 * FrameCard — canvas-backed builder ID card / PFP.
 */
const FrameCard = forwardRef(function FrameCard(
  {
    format = "card",
    name = "UNNAMED BUILDER",
    role = "BUILDER",
    title = "",
    stack = "",
    photo,
    zoom = 1,
    pan = { x: 0, y: 0 },
    onPanChange,
    theme = "ocean",
    builderId = "HH-26-0983",
    className = "",
    thumb = false,
  },
  ref
) {
  const canvasRendererRef = useRef(null);
  const surfaceRef = useRef(null);
  const image = useHtmlImage(photo);

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRendererRef.current?.getCanvas?.() ?? null,
  }));

  const isInteractive = Boolean(onPanChange && photo && !thumb);

  const handlePointerDown = (e) => {
    if (!isInteractive) return;
    e.preventDefault();

    const rect = surfaceRef.current.getBoundingClientRect();
    const startX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const startY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    const startPan = { x: pan?.x || 0, y: pan?.y || 0 };

    const handleMove = (moveEvent) => {
      const curX = moveEvent.clientX ?? (moveEvent.touches && moveEvent.touches[0] ? moveEvent.touches[0].clientX : 0);
      const curY = moveEvent.clientY ?? (moveEvent.touches && moveEvent.touches[0] ? moveEvent.touches[0].clientY : 0);
      const dx = (curX - startX) / (rect.width || 1);
      const dy = (curY - startY) / (rect.height || 1);

      onPanChange({
        x: clamp(startPan.x + dx * 2, -1, 1),
        y: clamp(startPan.y + dy * 2, -1, 1),
      });
    };

    const handleUp = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleUp);
  };

  const aspectClass = format === "pfp" ? "aspect-square" : "aspect-[2/3]";

  return (
    <div
      ref={surfaceRef}
      onMouseDown={handlePointerDown}
      onTouchStart={handlePointerDown}
      className={`relative w-full ${aspectClass} overflow-hidden flex items-center justify-center ${
        isInteractive ? "cursor-grab active:cursor-grabbing select-none" : ""
      } ${className}`}
    >
      <CanvasRenderer
        ref={canvasRendererRef}
        format={format}
        image={image}
        transform={{ zoom, offsetX: pan?.x || 0, offsetY: pan?.y || 0 }}
        fields={{ name, stack: stack || role, builderTitle: title || undefined }}
        theme={theme}
        role={role}
        builderId={builderId}
      />
    </div>
  );
});

export default FrameCard;