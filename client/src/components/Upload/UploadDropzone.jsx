import { useCallback, useRef, useState } from "react";
import { validateFile, ImageValidationError } from "../../lib/imageUtils";
import { convertHeicToJpeg } from "./heicConverter";

export default function UploadDropzone({ onImageReady, onError }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

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

        onImageReady(workingFile);
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
      ) : (
        <>
          <p className="dropzone__label">Drop a photo, or tap to choose one</p>
          <p className="dropzone__hint">JPG, PNG, WEBP, or iPhone HEIC · up to 20MB</p>
        </>
      )}
    </div>
  );
}
