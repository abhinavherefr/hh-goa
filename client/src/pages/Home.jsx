import { useMemo, useRef, useState } from "react";
import UploadDropzone from "../components/Upload/UploadDropzone";
import FormatToggle from "../components/Editor/FormatToggle";
import CropStage from "../components/Editor/CropStage";
import BuilderFieldsForm from "../components/Editor/BuilderFieldsForm";
import ThemeSelector from "../components/Editor/ThemeSelector";
import RoleSelector from "../components/Editor/RoleSelector";
import CanvasRenderer from "../components/Canvas/CanvasRenderer";
import ResultPreview from "../components/Result/ResultPreview";
import ErrorBanner from "../components/common/ErrorBanner";
import Spinner from "../components/common/Spinner";
import { useImageUpload } from "../hooks/useImageUpload";
import { useCanvasExport } from "../hooks/useCanvasExport";
import { useShareFlow } from "../hooks/useShareFlow";
import { generateBuilderTitle, BRAND } from "../lib/constants";

export default function Home() {
  const {
    image,
    transform,
    setTransform,
    loadFile,
    isDecoding,
    reset,
  } = useImageUpload();

  const [cloudinaryResult, setCloudinaryResult] = useState(null);
  const [format, setFormat] = useState("pfp");
  const [theme, setTheme] = useState("ocean");
  const [role, setRole] = useState("BUILDER");
  const [fields, setFields] = useState({
    name: "",
    stack: "",
  });
  const [error, setError] = useState(null);

  const canvasRef = useRef(null);

  const { getBlob, download, copyToClipboard, nativeShare } = useCanvasExport(canvasRef);

  const {
    shareToX,
    status: shareStatus,
    error: shareError,
  } = useShareFlow(getBlob, format);

  const resolvedFields = useMemo(
    () => ({
      ...fields,
      builderTitle: generateBuilderTitle(fields.stack),
    }),
    [fields]
  );

  const handleFormatChange = (nextFormat) => {
    setFormat(nextFormat);
    setError(null);
  };

  // Cloudinary Integration Handler
  // Replace handleImageReady in client/src/pages/Home.jsx with this:

  const handleImageReady = (payload) => {
    if (payload?.file) {
      setCloudinaryResult(payload.cloudinary);
      loadFile(payload.file); // Load raw file directly into local canvas hook!
    } else if (payload instanceof File || payload instanceof Blob) {
      loadFile(payload);
    }
  };

  const handleReset = () => {
    setCloudinaryResult(null);
    reset();
  };

  return (
    <main className="page">
      {/* =========================================================
          HERO / HEADER
      ========================================================== */}
      <header className="page__hero">
        <div className="page__hero-decoration" aria-hidden="true">
          <span className="page__sun" />
          <span className="page__leaf page__leaf--one" />
          <span className="page__leaf page__leaf--two" />
        </div>

        <div className="page__topbar">
          <div className="page__brand">
            <img
              src="/LOGO.PNG"
              alt={`${BRAND.eventName} logo`}
              className="page__logo"
            />

            <div className="page__brand-meta">
              <span>{BRAND.eventName}</span>
              <span>{BRAND.year}</span>
            </div>
          </div>

          <span className="page__studio">
            {BRAND.studioTag}
          </span>
        </div>

        <div className="page__hero-copy">
          <p className="eyebrow">
            {BRAND.location} · {BRAND.dates}
          </p>

          <h1 className="page__title">
            FRAME
            <br />
            <span>YOURSELF</span>
            <br />
            <em>IN.</em>
          </h1>

          <p className="page__subtitle">
            Make your mark for{" "}
            <strong>
              {BRAND.eventName} {BRAND.year}
            </strong>
            . Drop a photo, build your identity, and take it to the internet.
          </p>

          <div className="page__hero-stamp" aria-hidden="true">
            <span>GOA</span>
            <span>·</span>
            <span>2026</span>
          </div>
        </div>

        <div className="page__hero-rule">
          <span>01</span>
          <span>BUILD YOUR FRAME</span>
          <span>{BRAND.hashtag}</span>
        </div>
      </header>

      {/* =========================================================
          MAIN WORKSPACE
      ========================================================== */}
      <div className="page__content">
        <ErrorBanner
          message={error}
          onDismiss={() => setError(null)}
        />

        {!image && (
          <section
            className="builder"
            aria-label="Upload your photo"
          >
            <div className="builder__intro">
              <div>
                <p className="step-label">
                  01 — Start here
                </p>

                <h2 className="builder__heading">
                  Bring a photo.
                  <br />
                  <span>We'll bring the Goa.</span>
                </h2>
              </div>

              <p className="builder__description">
                One photo is all you need. Portrait, landscape,
                off-center — we'll handle the crop.
              </p>
            </div>

            <div className="upload-panel">
              <div className="upload-panel__number">
                01
              </div>

              <UploadDropzone
                onImageReady={handleImageReady}
                onError={setError}
              />

              {isDecoding && (
                <div className="upload-panel__loading">
                  <Spinner label="Reading your photo…" />
                </div>
              )}

              <div className="upload-panel__footer">
                <span>JPG · PNG · WEBP · HEIC</span>
                <span>MAX 20MB</span>
              </div>
            </div>

            <div className="builder__notes">
              <span>NO LOGIN</span>
              <span>·</span>
              <span>NO SIGNUP</span>
              <span>·</span>
              <span>ONE PASS</span>
            </div>
          </section>
        )}

        {image && (
          <section
            className="editor"
            aria-label="Customize and generate your graphic"
          >
            {/* Editor header */}
            <div className="editor__header">
              <div>
                <p className="step-label">
                  02 — Customize
                </p>

                <h2 className="editor__heading">
                  Make it yours.
                </h2>
              </div>

              <button
                type="button"
                className="editor__reset"
                onClick={handleReset}
              >
                <span>×</span>
                Change photo
              </button>
            </div>

            {/* Format selector */}
            <div className="editor__format">
              <div className="editor__section-label">
                <span>FORMAT & STYLE</span>
                <span>CUSTOMIZE FRAME & LEVEL</span>
              </div>

              <FormatToggle
                value={format}
                onChange={handleFormatChange}
              />

              <div className="editor__selectors">
                <ThemeSelector value={theme} onChange={setTheme} />
                <RoleSelector value={role} onChange={setRole} />
              </div>
            </div>

            {/* Builder card fields */}
            {format === "card" && (
              <div className="editor__fields">
                <div className="editor__section-label">
                  <span>IDENTITY</span>
                  <span>BUILDER DETAILS</span>
                </div>

                <BuilderFieldsForm
                  fields={fields}
                  onChange={setFields}
                />
              </div>
            )}

            {/* Canvas / crop stage */}
            <div className="editor__preview">
              <div className="editor__section-label">
                <span>PREVIEW</span>
                <span>DRAG · PINCH · FRAME</span>
              </div>

              <CropStage
                transform={transform}
                onChange={setTransform}
              >
                <CanvasRenderer
                  ref={canvasRef}
                  format={format}
                  image={image}
                  transform={transform}
                  fields={resolvedFields}
                  theme={theme}
                  role={role}
                />
              </CropStage>
            </div>

            {/* Result actions */}
            <div className="editor__result">
              <ResultPreview
                onDownload={() =>
                  download(
                    format === "card"
                      ? "hh-goa-builder-card.png"
                      : "hh-goa-pfp.png"
                  )
                }
                onShare={() => {
                  if (cloudinaryResult?.shareUrl) {
                    window.open(cloudinaryResult.shareUrl, "_blank");
                  } else {
                    shareToX();
                  }
                }}
                onCopy={copyToClipboard}
                onNativeShare={nativeShare}
                shareStatus={shareStatus}
                shareError={shareError}
              />
            </div>

            <div className="editor__footer">
              <span>
                {BRAND.eventName} · {BRAND.year}
              </span>

              <span>
                {BRAND.hashtag}
              </span>
            </div>
          </section>
        )}
      </div>

      {/* =========================================================
          FOOTER
      ========================================================== */}
      <footer className="page__footer">
        <div className="page__footer-mark">
          <span>{BRAND.eventName}</span>
          <strong>{BRAND.year}</strong>
        </div>

        <div className="page__footer-copy">
          <p>
            Built for builders, by builders.
            <br />
            See you in Goa.
          </p>

          <span>
            {BRAND.location} · {BRAND.dates}
          </span>
        </div>

        <div className="page__footer-hashtag">
          {BRAND.hashtag}
        </div>
      </footer>
    </main>
  );
}