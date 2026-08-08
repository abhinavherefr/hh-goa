import { useCallback } from "react";
import { canvasToBlob } from "../lib/imageUtils";

export function useCanvasExport(canvasRef) {
  const getBlob = useCallback(async () => {
    const canvas = canvasRef.current?.getCanvas?.();
    if (!canvas) throw new Error("Nothing to export yet.");
    return canvasToBlob(canvas, "image/png", 0.95);
  }, [canvasRef]);

  const download = useCallback(
    async (filename = "hh-goa-2026.png") => {
      const blob = await getBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    },
    [getBlob]
  );

  return { getBlob, download };
}
