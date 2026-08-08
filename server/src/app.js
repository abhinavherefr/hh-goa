import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { env } from "./config/env.js";
import apiRoutes from "./routes/index.js";
import sharePageRoutes from "./routes/sharePage.routes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";
import { getUploadsDir } from "./services/storage.service.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.set("trust proxy", 1); // needed for correct client IPs behind a reverse proxy (rate limiting)

  app.use(
    cors({
      origin: env.clientOrigin,
      methods: ["GET", "POST"],
    })
  );

  // Serve generated images. Cached aggressively since filenames are content-addressed (random IDs),
  // never reused, so a long cache lifetime is always safe.
  app.use(
    "/uploads",
    express.static(getUploadsDir(), {
      maxAge: "30d",
      immutable: true,
    })
  );

  app.get("/health", (req, res) => res.json({ ok: true }));

  app.use("/api", apiRoutes);
  app.use("/s", sharePageRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
