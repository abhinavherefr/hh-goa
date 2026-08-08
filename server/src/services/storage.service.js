import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.resolve(__dirname, "../../uploads");

/**
 * Local-disk storage adapter. Swap this file's implementation for an S3/Cloudinary/GCS
 * client if deploying somewhere with an ephemeral filesystem (most serverless/PaaS
 * targets wipe local disk between deploys or instances) — the interface
 * (saveBuffer/getPublicPath) is what the rest of the app depends on, not the internals.
 */
export async function saveBuffer(filename, buffer) {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  const filepath = path.join(UPLOADS_DIR, filename);
  await fs.writeFile(filepath, buffer);
  return filepath;
}

export function getUploadsDir() {
  return UPLOADS_DIR;
}
