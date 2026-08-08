import { useState } from "react";

export default function DownloadButton({ onDownload }) {
  const [isSaving, setIsSaving] = useState(false);

  return (
    <button
      type="button"
      className="btn btn--secondary"
      disabled={isSaving}
      onClick={async () => {
        setIsSaving(true);
        try {
          await onDownload();
        } finally {
          setIsSaving(false);
        }
      }}
    >
      {isSaving ? "Saving…" : "Download image"}
    </button>
  );
}
