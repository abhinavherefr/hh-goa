import sharp from "sharp";

/**
 * Fallback HEIC handling for the rare case a raw .heic buffer reaches the server
 * (e.g. a non-browser client, or a browser without createImageBitmap/heic2any support).
 * In the normal flow, the client already converts HEIC -> JPEG before ever composing
 * or uploading, so this path should almost never execute.
 *
 * NOTE: sharp's HEIC support depends on the libvips build it ships with (it needs
 * libheif) and is not guaranteed on every platform/host. If this throws in production,
 * treat it as "unsupported format" and surface a clear error rather than failing silently —
 * do NOT swap in a synchronous/blocking conversion here.
 */
export async function convertHeicBufferToPng(buffer) {
  try {
    return await sharp(buffer, { failOn: "none" }).png().toBuffer();
  } catch (err) {
    throw new Error(
      "This server build can't decode HEIC directly. Convert to JPEG/PNG before uploading."
    );
  }
}
