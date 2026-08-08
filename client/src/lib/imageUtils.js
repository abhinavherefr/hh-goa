import { ACCEPTED_TYPES, MAX_UPLOAD_MB } from "./constants";

export class ImageValidationError extends Error {}

export function validateFile(file) {
  if (!file) throw new ImageValidationError("No file selected.");

  const isHeicByName = /\.hei[cf]$/i.test(file.name || "");
  const isKnownType = ACCEPTED_TYPES.includes(file.type);

  if (!isKnownType && !isHeicByName) {
    throw new ImageValidationError(
      "That file type isn't supported. Use JPG, PNG, WEBP, or HEIC."
    );
  }

  const sizeMb = file.size / (1024 * 1024);
  if (sizeMb > MAX_UPLOAD_MB) {
    throw new ImageValidationError(`File is too large. Keep it under ${MAX_UPLOAD_MB}MB.`);
  }

  return { isHeic: isHeicByName || file.type === "image/heic" || file.type === "image/heif" };
}

/**
 * Decodes a File/Blob into an ImageBitmap with EXIF orientation applied.
 * createImageBitmap({ imageOrientation: 'from-image' }) is the modern, dependency-free
 * way to avoid the classic "sideways iPhone photo" bug without a manual EXIF parser.
 */
export async function decodeToBitmap(fileOrBlob) {
  if ("createImageBitmap" in window) {
    try {
      return await createImageBitmap(fileOrBlob, { imageOrientation: "from-image" });
    } catch (err) {
      // Some older browsers throw on the option object — retry without it.
      return await createImageBitmap(fileOrBlob);
    }
  }
  // Very old Safari fallback: load via <img> + object URL.
  return decodeViaImgElement(fileOrBlob);
}

function decodeViaImgElement(fileOrBlob) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(fileOrBlob);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

/** Draws an ImageBitmap/Image "cover" style into a rect, honoring pan (offsetX/Y in -1..1) and zoom. */
export function drawImageCover(ctx, img, { x, y, w, h, zoom = 1, offsetX = 0, offsetY = 0 }) {
  const imgW = img.width;
  const imgH = img.height;
  const targetRatio = w / h;
  const imgRatio = imgW / imgH;

  let drawW, drawH;
  if (imgRatio > targetRatio) {
    drawH = h * zoom;
    drawW = drawH * imgRatio;
  } else {
    drawW = w * zoom;
    drawH = drawW / imgRatio;
  }

  // offsetX/offsetY range roughly -1..1, representing how far the image can pan
  // within the extra space created by zoom, in each direction.
  const maxPanX = Math.max(0, (drawW - w) / 2);
  const maxPanY = Math.max(0, (drawH - h) / 2);

  const drawX = x - (drawW - w) / 2 + offsetX * maxPanX;
  const drawY = y - (drawH - h) / 2 + offsetY * maxPanY;

  ctx.drawImage(img, drawX, drawY, drawW, drawH);
}

export async function canvasToBlob(canvas, type = "image/png", quality = 0.95) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Canvas export failed."))),
      type,
      quality
    );
  });
}
