import Spinner from "../common/Spinner";

export default function ShareToXButton({ onShare, status }) {
  const isBusy = status === "uploading";

  return (
    <button type="button" className="btn btn--primary" disabled={isBusy} onClick={onShare}>
      {isBusy ? <Spinner label="Preparing…" /> : "Share to X"}
    </button>
  );
}
