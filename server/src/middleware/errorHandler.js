import { logger } from "../utils/logger.js";

export function notFoundHandler(req, res) {
  res.status(404).json({ message: "Not found." });
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  logger.error(err.message, err.stack);

  if (err.message?.includes("Unsupported image type")) {
    return res.status(415).json({ message: err.message });
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ message: "That image is too large to share." });
  }

  res.status(err.status || 500).json({
    message: err.publicMessage || "Something broke on our end. Try again in a moment.",
  });
}
