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
  port: Number(process.env.PORT || 4000),
  mongodbUri: required(
    "MONGODB_URI",
    "mongodb+srv://dummy_user:dummy_password@cluster0.mongodb.net/hhg-frame-tool"
  ),
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  publicBaseUrl: (process.env.PUBLIC_BASE_URL || "http://localhost:4000").replace(/\/$/, ""),
  shareTtlHours: Number(process.env.SHARE_TTL_HOURS || 720),
};
