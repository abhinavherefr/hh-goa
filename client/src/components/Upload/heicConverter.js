/**
 * Converts a HEIC/HEIF File (common from iPhones) into a JPEG Blob the browser
 * can actually decode. heic2any is loaded lazily so non-iPhone users never pay
 * for the (fairly large) WASM decoder in their bundle.
 */
export async function convertHeicToJpeg(file) {
  const heic2any = (await import("heic2any")).default;
  const result = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.92,
  });
  // heic2any can return an array if the HEIC contains multiple images (rare, e.g. Live Photos)
  return Array.isArray(result) ? result[0] : result;
}
