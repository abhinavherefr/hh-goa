import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import cors from 'cors';
import 'dotenv/config'; // Automatically loads variables from .env

const app = express();
app.use(cors());
app.use(express.json());

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer for temp storage
const upload = multer({ dest: 'uploads/' });

// API Endpoint: Generate Frame
app.post('/api/generate-frame', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No photo uploaded' });
    }

    // 1. Upload user image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: 'hh_goa_2026',
    });

    // 2. Generate transformed URL with HH Goa Frame Overlay
    // Note: Make sure your event frame/overlay is uploaded to Cloudinary named 'hh_goa_frame'
    const framedImageUrl = cloudinary.url(uploadResult.public_id, {
      transformation: [
        { width: 1080, height: 1080, crop: 'fill', gravity: 'face' },
        { overlay: 'hh_goa_frame', width: 1080, height: 1080, flags: 'layer_apply' }
      ]
    });

    res.json({
      success: true,
      imageUrl: framedImageUrl,
      shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out my HH Goa 2026 badge! #FrameInGoa')}&url=${encodeURIComponent(framedImageUrl)}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));