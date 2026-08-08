import rateLimit from "express-rate-limit";

// No login wall means no per-user identity to throttle against, so this limits
// by IP instead. Generous enough for a real person sharing a couple of graphics,
// tight enough to blunt a script hammering /api/share.
export const shareRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many shares from this device. Try again in a few minutes." },
});
