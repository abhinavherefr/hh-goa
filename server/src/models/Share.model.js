import mongoose from "mongoose";

const shareSchema = new mongoose.Schema(
  {
    shareId: { type: String, required: true, unique: true, index: true },
    imageFilename: { type: String, required: true },
    imageUrl: { type: String, required: true },
    format: { type: String, enum: ["pfp", "card"], required: true },
    width: Number,
    height: Number,
    expiresAt: { type: Date, index: { expires: 0 } }, // TTL index — Mongo auto-deletes past this
  },
  { timestamps: true }
);

export const Share = mongoose.model("Share", shareSchema);
