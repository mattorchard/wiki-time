import "./InputField.css";

const InputField = ({ label, type = "text", digits = 6, ...rest }) => (
  <label className={`input-field__label input-field__label--${type}`}>
    {label}
    <input
      className="input-field__input"
      style={{ "--digits": digits }}
      type={type}
      {...rest}
    />
  </label>
);

export default InputField;
