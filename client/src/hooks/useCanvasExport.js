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

  const copyToClipboard = useCallback(async () => {
    const blob = await getBlob();
    if (!navigator.clipboard || !window.ClipboardItem) {
      throw new Error("Clipboard copy is not supported in this browser.");
    }
    await navigator.clipboard.write([
      new ClipboardItem({ [blob.type]: blob }),
    ]);
  }, [getBlob]);

  const nativeShare = useCallback(
    async (title = "HH Goa 2026 Graphic", text = "Check out my HH Goa 2026 graphic! #FrameInGoa") => {
      const blob = await getBlob();
      const file = new File([blob], "hh-goa-2026.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title,
          text,
          files: [file],
        });
        return true;
      } else if (navigator.share) {
        await navigator.share({
          title,
          text,
          url: window.location.href,
        });
        return true;
      }
      return false;
    },
    [getBlob]
  );

  return { getBlob, download, copyToClipboard, nativeShare };
}
