import { useCallback, useState } from "react";
import { createShare } from "../lib/api";
import { SHARE_CAPTION_TEMPLATES } from "../lib/constants";

export function useShareFlow(getBlob, format) {
  const [status, setStatus] = useState("idle"); // idle | uploading | done | error
  const [error, setError] = useState(null);

  // const shareToX = useCallback(async () => {
  //   setStatus("uploading");
  //   setError(null);
  //   try {
  //     const blob = await getBlob();
  //     const { shareUrl } = await createShare(blob, { format: format === "card" ? "card" : "pfp" });

  //     const caption = format === "card" ? SHARE_CAPTION_TEMPLATES.card : SHARE_CAPTION_TEMPLATES.pfp;
  //     const intentUrl = new URL("https://twitter.com/intent/tweet");
  //     intentUrl.searchParams.set("text", caption);
  //     intentUrl.searchParams.set("url", shareUrl);

  //     window.open(intentUrl.toString(), "_blank", "noopener,noreferrer");
  //     setStatus("done");
  //   } catch (err) {
  //     setStatus("error");
  //     setError(
  //       err?.response?.data?.message || "Couldn't prep the share link. Check your connection and try again."
  //     );
  //   }
  // }, [getBlob, format]);

  const shareToX = useCallback(async () => {
  setStatus("uploading");
  setError(null);

  // Open the window immediately while we're still inside the user click.
  const shareWindow = window.open("about:blank", "_blank");

  if (!shareWindow) {
    setStatus("error");
    setError("Your browser blocked the share window. Please allow popups for this site.");
    return;
  }

  try {
    const blob = await getBlob();

    const { shareUrl } = await createShare(blob, {
      format: format === "card" ? "card" : "pfp",
    });

    const caption =
      format === "card"
        ? SHARE_CAPTION_TEMPLATES.card
        : SHARE_CAPTION_TEMPLATES.pfp;

    const intentUrl = new URL("https://twitter.com/intent/tweet");
    intentUrl.searchParams.set("text", caption);
    intentUrl.searchParams.set("url", shareUrl);

    shareWindow.location.href = intentUrl.toString();

    setStatus("done");
  } catch (err) {
    shareWindow.close();

    setStatus("error");
    setError(
      err?.response?.data?.message ||
        "Couldn't prep the share link. Check your connection and try again."
    );
  }
}, [getBlob, format]);

  return { shareToX, status, error };
}
