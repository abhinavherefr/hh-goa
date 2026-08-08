import { useCallback, useState } from "react";
import { decodeToBitmap } from "../lib/imageUtils";

const DEFAULT_TRANSFORM = { zoom: 1, offsetX: 0, offsetY: 0 };

export function useImageUpload() {
  const [image, setImage] = useState(null); // ImageBitmap | HTMLImageElement
  const [transform, setTransform] = useState(DEFAULT_TRANSFORM);
  const [isDecoding, setIsDecoding] = useState(false);

  const loadFile = useCallback(async (fileOrBlob) => {
    setIsDecoding(true);
    try {
      const bitmap = await decodeToBitmap(fileOrBlob);
      setImage(bitmap);
      setTransform(DEFAULT_TRANSFORM);
    } finally {
      setIsDecoding(false);
    }
  }, []);

  const reset = useCallback(() => {
    setImage(null);
    setTransform(DEFAULT_TRANSFORM);
  }, []);

  return { image, transform, setTransform, loadFile, isDecoding, reset };
}
