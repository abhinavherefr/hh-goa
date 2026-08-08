const OPTIONS = [
  { value: "pfp", label: "PFP Frame", hint: "Ready-to-use X profile picture" },
  { value: "card", label: "Builder Card", hint: "Name, role, and a generated title" },
];

export default function FormatToggle({ value, onChange }) {
  return (
    <div className="format-toggle" role="radiogroup" aria-label="Graphic format">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          className={`format-toggle__option${value === opt.value ? " format-toggle__option--active" : ""}`}
          onClick={() => onChange(opt.value)}
        >
          <span className="format-toggle__label">{opt.label}</span>
          <span className="format-toggle__hint">{opt.hint}</span>
        </button>
      ))}
    </div>
  );
}
