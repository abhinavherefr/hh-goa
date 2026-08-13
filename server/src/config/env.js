import dotenv from "dotenv";

dotenv.config();

function required(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export const env = {
  nodeEnv:      process.env.NODE_ENV || "development",
  port:         process.env.PORT || 4000,
  mongoUri:     process.env.MONGO_URI || "",
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  publicBaseUrl:(process.env.PUBLIC_BASE_URL || "http://localhost:4000").replace(/\/$/, ""),
  shareTtlHours:Number(process.env.SHARE_TTL_HOURS || 720),

  // Cloudinary — required for image hosting on Vercel (no persistent disk).
  // Set these in your Vercel project's Environment Variables dashboard.
  cloudinaryCloudName: required("CLOUDINARY_CLOUD_NAME"),
  cloudinaryApiKey:    required("CLOUDINARY_API_KEY"),
  cloudinaryApiSecret: required("CLOUDINARY_API_SECRET"),
};
