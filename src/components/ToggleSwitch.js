import "./ToggleSwitch.css";

const ToggleSwitch = ({ onLabel, offLabel, value, onChange }) => (
  <label
    className={`toggle-switch__label toggle-switch__label--${
      value ? "on" : "off"
    }`}
  >
    <span className="toggle-switch__off-label">{offLabel}</span>
    <input
      type="checkbox"
      className="toggle-switch__input"
      checked={value}
      onChange={onChange}
    />
    <span className="toggle-switch__on-label">{onLabel}</span>
  </label>
);

export default ToggleSwitch;
