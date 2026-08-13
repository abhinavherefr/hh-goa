import sharp from "sharp";

/**
 * The client sends an already-fully-composited PNG (frame/badge baked in) —
 * this just re-encodes it for the web: caps dimensions, strips metadata,
 * and picks a size that loads fast enough for X's crawler and for humans on mobile data.
 */
export async function optimizeForShare(buffer) {
  const image = sharp(buffer, { failOn: "none" });
  const metadata = await image.metadata();

  const MAX_DIMENSION = 1600;
  const needsResize =
    (metadata.width && metadata.width > MAX_DIMENSION) ||
    (metadata.height && metadata.height > MAX_DIMENSION);

  let pipeline = image.rotate(); // normalize orientation, strip EXIF
  if (needsResize) {
    pipeline = pipeline.resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const outBuffer = await pipeline.png({ compressionLevel: 8 }).toBuffer();
  const outMeta = await sharp(outBuffer).metadata();

  return { buffer: outBuffer, width: outMeta.width, height: outMeta.height };
}
