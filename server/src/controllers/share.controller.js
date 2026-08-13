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

    // saveBuffer uploads to Cloudinary and returns { url, publicId }.
    const stored = await saveBuffer(filename, buffer);

    const expiresAt = new Date(Date.now() + env.shareTtlHours * 60 * 60 * 1000);

    // If Mongo isn't reachable, don't hard-fail — the Cloudinary URL is the
    // source of truth; getSharePage falls back to the stored imageUrl field.
    try {
      await Share.create({
        shareId,
        imageFilename: filename,
        imageUrl: stored.url,   // persisted so getSharePage can serve it without Cloudinary API calls
        format,
        width,
        height,
        expiresAt,
      });
    } catch (dbErr) {
      req.app.locals.logger?.warn?.("Share record not persisted (DB unavailable):", dbErr.message);
    }

    const shareUrl = `${env.publicBaseUrl}/s/${shareId}`;

    res.status(201).json({ shareId, shareUrl, imageUrl: stored.url });
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

    if (!record) {
      return res.status(404).send("Share not found or has expired.");
    }

    // imageUrl is the Cloudinary https:// URL stored at creation time.
    const imageUrl = record.imageUrl;
    const format = record.format || "pfp";

    // The card (1080x1620 portrait) and pfp (1080x1080 square) have different
    // aspect ratios — a wrong og:image:width/height hint can make X crop the
    // preview oddly. Use the real stored dimensions, with sane per-format
    // fallbacks only for records that predate this field.
    const imageWidth  = record.width  || 1080;
    const imageHeight = record.height || (format === "card" ? 1620 : 1080);

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