// Vercel Serverless entry point.
// Vercel looks for a file at api/index.js (relative to the project root),
// exports a default handler, and passes it Node's req/res objects.
// We just hand those to our Express app.

import { createApp } from "../src/app.js";
import { connectDb } from "../src/config/db.js";

let app;
let dbConnected = false;

async function getApp() {
  if (!app) {
    // connectDb is safe to call multiple times — subsequent calls are no-ops
    // if Mongoose is already connected.
    if (!dbConnected) {
      await connectDb().catch((err) => {
        // Non-fatal: share upload still works without Mongo (it falls back
        // to serving images directly from Cloudinary URLs).
        console.warn("[startup] DB connect failed, continuing without Mongo:", err.message);
      });
      dbConnected = true;
    }
    app = createApp();
  }
  return app;
}

export default async function handler(req, res) {
  const expressApp = await getApp();
  return expressApp(req, res);
}