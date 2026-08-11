import { ROLES } from "../../lib/constants";

export default function RoleSelector({ value, onChange }) {
  return (
    <div className="role-selector">
      <span className="role-selector__label">PASS LEVEL</span>
      <div className="role-selector__options">
        {ROLES.map((r) => (
          <button
            key={r.id}
            type="button"
            className={`role-pill${value === r.id ? " role-pill--active" : ""}`}
            onClick={() => onChange(r.id)}
          >
            {r.id}
          </button>
        ))}
      </div>
    </div>
  );
}
