export default function Spinner({ label }) {
  return (
    <span className="spinner" role="status">
      <span className="spinner__dot" />
      {label && <span className="spinner__label">{label}</span>}
    </span>
  );
}
