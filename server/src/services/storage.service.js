import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.js";

// Configure once on module load. Credentials come from Vercel env vars.
cloudinary.config({
  cloud_name: env.cloudinaryCloudName,
  api_key:    env.cloudinaryApiKey,
  api_secret: env.cloudinaryApiSecret,
  secure:     true,
});

/**
 * Uploads a raw image buffer to Cloudinary and returns the public URL.
 * Returns { url: string, publicId: string }.
 *
 * This replaces the previous local-disk adapter (fs.writeFile) which can't
 * work on Vercel's read-only / ephemeral filesystem.
 */
export async function saveBuffer(filename, buffer) {
  // Strip the extension — Cloudinary uses publicId as the identifier.
  const publicId = `hh-goa-2026/${filename.replace(/\.[^/.]+$/, "")}`;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id:     publicId,
        resource_type: "image",
        format:        "png",
        overwrite:     true,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
}