import path from "node:path";
import { Share } from "../models/Share.model.js";
import { optimizeForShare } from "../services/imageProcessing.service.js";
import { saveBuffer } from "../services/storage.service.js";
import { generateShareId } from "../utils/generateShareId.js";
import { env } from "../config/env.js";
import { BRAND } from "../constants.js";

export async function createShare(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image was attached." });
    }
    const format = req.body.format === "card" ? "card" : "pfp";

    const { buffer, width, height } = await optimizeForShare(req.file.buffer);

    const shareId = generateShareId();
    const filename = `${shareId}.png`;
    await saveBuffer(filename, buffer);

    const expiresAt = new Date(Date.now() + env.shareTtlHours * 60 * 60 * 1000);

    // If Mongo isn't reachable (e.g. still using the dummy URI), don't hard-fail the
    // whole share — the image is already saved to disk and servable; we just won't
    // have a DB record backing cleanup/analytics. The share page below reads the
    // file directly off disk as a fallback so it still works.
    try {
      await Share.create({ shareId, imageFilename: filename, format, width, height, expiresAt });
    } catch (dbErr) {
      req.app.locals.logger?.warn?.("Share record not persisted (DB unavailable):", dbErr.message);
    }

    const shareUrl = `${env.publicBaseUrl}/s/${shareId}`;
    const imageUrl = `${env.publicBaseUrl}/uploads/${filename}`;

    res.status(201).json({ shareId, shareUrl, imageUrl });
  } catch (err) {
    next(err);
  }
}

export async function getSharePage(req, res, next) {
  try {
    const { shareId } = req.params;
    const safeId = /^[A-Za-z0-9]{6,20}$/.test(shareId) ? shareId : null;
    if (!safeId) return res.status(400).send("Invalid share link.");

    const record = await Share.findOne({ shareId: safeId }).lean().catch(() => null);

    // Fall back to guessing the filename from the ID if the DB record is missing
    // (e.g. it was created while Mongo was down) — the file itself is the source of truth.
    const filename = record?.imageFilename || `${safeId}.png`;
    const imageUrl = `${env.publicBaseUrl}/uploads/${filename}`;
    const format = record?.format || "pfp";

    // The card (1080x1620 portrait) and pfp (1080x1080 square) have different
    // aspect ratios — a wrong og:image:width/height hint can make X crop the
    // preview oddly. Use the real stored dimensions, with sane per-format
    // fallbacks only for the (rare) case a record predates this field.
    const imageWidth = record?.width || 1080;
    const imageHeight = record?.height || (format === "card" ? 1620 : 1080);

    res.render("sharePage", {
      brand: BRAND,
      shareUrl: `${env.publicBaseUrl}/s/${safeId}`,
      imageUrl,
      imageWidth,
      imageHeight,
      format,
      clientOrigin: env.clientOrigin,
    });
  } catch (err) {
    next(err);
  }
}