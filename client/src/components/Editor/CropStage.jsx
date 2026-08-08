import { useCallback, useRef, useState } from "react";

/**
 * A generic pan/zoom control surface. It doesn't render the image itself —
 * CanvasRenderer already draws the live composited preview — this component
 * just captures pointer gestures over that preview and reports back a
 * transform ({ zoom, offsetX, offsetY }) that the compositors consume.
 *
 * offsetX/offsetY are normalized to roughly -1..1 (fraction of available pan room),
 * independent of canvas resolution, so it works the same on a 1200px and a 300px preview.
 */
export default function CropStage({ transform, onChange, children }) {
  const surfaceRef = useRef(null);
  const dragState = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = useCallback(
    (e) => {
      surfaceRef.current?.setPointerCapture(e.pointerId);
      dragState.current = {
        startX: e.clientX,
        startY: e.clientY,
        startOffsetX: transform.offsetX,
        startOffsetY: transform.offsetY,
      };
      setIsDragging(true);
    },
    [transform.offsetX, transform.offsetY]
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!dragState.current) return;
      const rect = surfaceRef.current.getBoundingClientRect();
      const dx = (e.clientX - dragState.current.startX) / rect.width;
      const dy = (e.clientY - dragState.current.startY) / rect.height;

      onChange({
        ...transform,
        offsetX: clamp(dragState.current.startOffsetX - dx * 2, -1, 1),
        offsetY: clamp(dragState.current.startOffsetY - dy * 2, -1, 1),
      });
    },
    [onChange, transform]
  );

  const endDrag = useCallback((e) => {
    surfaceRef.current?.releasePointerCapture?.(e.pointerId);
    dragState.current = null;
    setIsDragging(false);
  }, []);

  return (
    <div className="crop-stage">
      <div
        ref={surfaceRef}
        className={`crop-stage__surface${isDragging ? " crop-stage__surface--grabbing" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {children}
      </div>

      <label className="crop-stage__zoom">
        <span>Zoom</span>
        <input
          type="range"
          min="1"
          max="2.5"
          step="0.01"
          value={transform.zoom}
          onChange={(e) => onChange({ ...transform, zoom: Number(e.target.value) })}
        />
      </label>
      <p className="crop-stage__hint">Drag the photo to reposition it</p>
    </div>
  );
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}
