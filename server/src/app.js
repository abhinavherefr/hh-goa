import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { env } from "./config/env.js";
import apiRoutes from "./routes/index.js";
import sharePageRoutes from "./routes/sharePage.routes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.set("trust proxy", 1); // needed for correct client IPs behind a reverse proxy (rate limiting)

  // Allow requests from the deployed frontend origin AND localhost for local dev.
  // CLIENT_ORIGIN is set to the Vercel deployment URL in production.
  const allowedOrigins = new Set([
    env.clientOrigin,
    "http://localhost:5173",
    "http://localhost:4000",
  ]);

  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow same-origin requests (e.g. the EJS share page) and whitelisted origins.
        if (!origin || allowedOrigins.has(origin)) return callback(null, true);
        callback(new Error(`CORS: origin ${origin} not allowed`));
      },
      methods: ["GET", "POST"],
    })
  );

  app.get("/health", (req, res) => res.json({ ok: true }));

  app.use("/api", apiRoutes);
  app.use("/s", sharePageRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
