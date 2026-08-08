import { Router } from "express";
import shareRoutes from "./share.routes.js";

const router = Router();

router.use("/", shareRoutes);

export default router;
