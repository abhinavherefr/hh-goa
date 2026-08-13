import multer from "multer";

const ALLOWED_MIME = new Set(["image/png", "image/jpeg", "image/webp"]);
const MAX_FILE_MB = 15; // the client already exports an optimized PNG, this is a safety ceiling

const storage = multer.memoryStorage();

export const uploadImage = multer({
  storage,
  limits: { fileSize: MAX_FILE_MB * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_MIME.has(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported image type. Expected the canvas-exported PNG/JPEG/WEBP."));
    }
  },
}).single("image");
