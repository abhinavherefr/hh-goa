import { Router } from "express";
import { getSharePage } from "../controllers/share.controller.js";

const router = Router();

router.get("/:shareId", getSharePage);

export default router;
