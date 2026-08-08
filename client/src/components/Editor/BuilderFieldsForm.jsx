import { generateBuilderTitle } from "../../lib/constants";

export default function BuilderFieldsForm({ fields, onChange }) {
  const title = generateBuilderTitle(fields.stack);

  return (
    <div className="builder-form">
      <label className="field">
        <span>Name</span>
        <input
          type="text"
          maxLength={28}
          placeholder="e.g. Asha Rao"
          value={fields.name}
          onChange={(e) => onChange({ ...fields, name: e.target.value })}
        />
      </label>

      <label className="field">
        <span>Stack / role</span>
        <input
          type="text"
          maxLength={32}
          placeholder="e.g. React, Backend, Design"
          value={fields.stack}
          onChange={(e) => onChange({ ...fields, stack: e.target.value, builderTitle: undefined })}
        />
      </label>

      <div className="builder-form__title-preview">
        <span className="eyebrow">Generated title</span>
        <p>{title}</p>
      </div>
    </div>
  );
}
