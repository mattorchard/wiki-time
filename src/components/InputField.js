import "./InputField.css";

const InputField = ({ label, value, onInput, placeholder, type = "text" }) => (
  <label className={`input-field__label input-field__label--${type}`}>
    {label}
    <input
      className="input-field__input"
      type={type}
      value={value}
      onInput={onInput}
      placeholder={placeholder}
    />
  </label>
);

export default InputField;
