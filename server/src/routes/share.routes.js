import { Router } from "express";
import { uploadImage } from "../middleware/upload.middleware.js";
import { shareRateLimiter } from "../middleware/rateLimiter.js";
import { createShare } from "../controllers/share.controller.js";

const router = Router();

router.post("/share", shareRateLimiter, uploadImage, createShare);

export default router;
