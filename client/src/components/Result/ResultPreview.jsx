import { useState } from "react";
import DownloadButton from "./DownloadButton";
import ShareToXButton from "./ShareToXButton";

export default function ResultPreview({
  onDownload,
  onShare,
  onCopy,
  onNativeShare,
  shareStatus,
  shareError,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await onCopy();
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="result-preview">
      <div className="result-preview__actions">
        <ShareToXButton onShare={onShare} status={shareStatus} />
        <DownloadButton onDownload={onDownload} />

        <button
          type="button"
          className="btn btn--secondary btn--copy"
          onClick={handleCopy}
        >
          {copied ? "✓ Copied to Clipboard!" : "📋 Copy Image"}
        </button>

        {typeof navigator !== "undefined" && navigator.share && (
          <button
            type="button"
            className="btn btn--secondary btn--share-app"
            onClick={onNativeShare}
          >
            📲 Share to App
          </button>
        )}
      </div>

      {shareStatus === "error" && shareError && (
        <p className="result-preview__error" role="alert">
          {shareError}
        </p>
      )}
      {shareStatus === "done" && (
        <p className="result-preview__success">
          Opened X with your graphic linked (#FrameInGoa) — post away!
        </p>
      )}
    </div>
  );
}
