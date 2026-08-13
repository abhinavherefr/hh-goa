// Vercel Serverless entry point.
// Vercel discovers this file automatically at /api/index.js and invokes it
// as a serverless function for every route matched in vercel.json.

import { createApp } from "../server/src/app.js";
import { connectDb } from "../server/src/config/db.js";

let app;
let dbConnected = false;

async function getApp() {
  if (!app) {
    if (!dbConnected) {
      await connectDb().catch((err) => {
        // Non-fatal: share page still works without Mongo because the
        // Cloudinary image URL is returned directly from the upload response.
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