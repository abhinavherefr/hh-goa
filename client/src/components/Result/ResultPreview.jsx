import DownloadButton from "./DownloadButton";
import ShareToXButton from "./ShareToXButton";

/**
 * Renders the action bar for the live preview. The canvas itself lives inside
 * <CropStage> (it needs to be directly under the pointer handlers for drag-to-pan),
 * this component only owns download/share and their status messaging.
 */
export default function ResultPreview({ onDownload, onShare, shareStatus, shareError }) {
  return (
    <div className="result-preview">
      <div className="result-preview__actions">
        <ShareToXButton onShare={onShare} status={shareStatus} />
        <DownloadButton onDownload={onDownload} />
      </div>

      {shareStatus === "error" && shareError && (
        <p className="result-preview__error" role="alert">
          {shareError}
        </p>
      )}
      {shareStatus === "done" && (
        <p className="result-preview__success">Opened X with your graphic linked — post away.</p>
      )}
    </div>
  );
}
