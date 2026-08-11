import { useCallback, useRef, useState } from "react";
import { validateFile, ImageValidationError } from "../../lib/imageUtils";
import { convertHeicToJpeg } from "./heicConverter";

export default function UploadDropzone({ onImageReady, onError }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const uploadToCloudinary = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await fetch("http://localhost:4000/api/generate-frame", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        // Pass result data back to parent component
        onImageReady(data);
      } else {
        onError(data.message || "Failed to generate graphic.");
      }
    } catch (err) {
      onError("Server connection error. Ensure your backend server is running.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFile = useCallback(
    async (file) => {
      try {
        const { isHeic } = validateFile(file);
        let workingFile = file;

        if (isHeic) {
          setIsConverting(true);
          workingFile = await convertHeicToJpeg(file);
          setIsConverting(false);
        }

        // Send converted file to Cloudinary backend API
        await uploadToCloudinary(workingFile);
      } catch (err) {
        setIsConverting(false);
        if (err instanceof ImageValidationError) {
          onError(err.message);
        } else {
          onError("Couldn't read that photo. Try a different file.");
        }
      }
    },
    [onImageReady, onError]
  );

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className={`dropzone${isDragging ? " dropzone--active" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = ""; // allow re-selecting the same file later
        }}
      />

      {isConverting ? (
        <p className="dropzone__label">Converting your photo…</p>
      ) : isUploading ? (
        <p className="dropzone__label">Generating your HH Goa 2026 frame…</p>
      ) : (
        <>
          <p className="dropzone__label">Drop a photo, or tap to choose one</p>
          <p className="dropzone__hint">JPG, PNG, WEBP, or iPhone HEIC · up to 20MB</p>
        </>
      )}
    </div>
  );
}