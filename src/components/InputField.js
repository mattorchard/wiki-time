import "./InputField.css";

const InputField = ({
  label,
  value,
  onInput,
  placeholder,
  type = "text",
  digits = 6,
}) => (
  <label className={`input-field__label input-field__label--${type}`}>
    {label}
    <input
      className="input-field__input"
      style={{ "--digits": digits }}
      type={type}
      value={value}
      onInput={onInput}
      placeholder={placeholder}
    />
  </label>
);

export default InputField;
