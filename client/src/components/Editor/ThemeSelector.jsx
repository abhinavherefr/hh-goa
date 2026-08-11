import { THEMES } from "../../lib/constants";

export default function ThemeSelector({ value, onChange }) {
  const themesList = Object.values(THEMES);

  return (
    <div className="theme-selector">
      <span className="theme-selector__label">STYLE THEME</span>
      <div className="theme-selector__options">
        {themesList.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`theme-pill${value === t.id ? " theme-pill--active" : ""}`}
            onClick={() => onChange(t.id)}
          >
            <span
              className="theme-pill__swatch"
              style={{
                background: `linear-gradient(135deg, ${t.accent1}, ${t.accent2})`,
              }}
            />
            <span>{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
