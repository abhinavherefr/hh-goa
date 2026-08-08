import mongoose from "mongoose";
import { env } from "./env.js";

let isConnecting = false;

export async function connectDb() {
  if (mongoose.connection.readyState === 1 || isConnecting) return;
  isConnecting = true;

  mongoose.connection.on("error", (err) => {
    console.error("[mongo] connection error:", err.message);
  });

  try {
    await mongoose.connect(env.mongodbUri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log("[mongo] connected");
  } catch (err) {
    console.error(
      "[mongo] failed to connect. Sharing (X link previews) will not work until MONGODB_URI is valid:",
      err.message
    );
    // Deliberately don't crash the whole server on a bad/dummy Mongo URI —
    // the core upload/compose/download flow doesn't touch the database at all.
  } finally {
    isConnecting = false;
  }
}
