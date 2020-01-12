import ToggleSwitch from "./ToggleSwitch";

import InputField from "./InputField";
import useAuthState from "../hooks/useAuthState";
import useFormState from "../hooks/useFormState";
import { formatYear, saveEntity } from "../helpers/entityHelpers";
import "./EntityForm.css";
import { useEffect } from "preact/hooks";

const submitSaveEntity = ({ uid, state }) => {
  if (!uid) {
    throw new Error(`Must be logged in`);
  }
  const errors = [];
  const id = state.id.trim();
  if (!id) {
    errors.push(`Must have an ID`);
  }
  const description = state.description.trimStart().trimEnd() || "";
  const lectureNumber = parseInt(state.lectureNumber);
  if (!lectureNumber) {
    errors.push(`Must have a lecture number`);
  }
  if (isNaN(lectureNumber) || lectureNumber < 1) {
    errors.push(`Invalid lecture number`);
  }
  const startYear = formatYear(state.startYear, state.startYearCe);
  if (state.startYear && isNaN(startYear)) {
    errors.push(`Invalid start year`);
  }
  const endYear = formatYear(state.endYear, state.endYearCe);
  if (state.endYear && isNaN(endYear)) {
    errors.push(`Invalid end year`);
  }
  if (startYear && endYear && endYear <= startYear) {
    errors.push(`End year must be after start year`);
  }
  if (errors.length > 0) {
    throw new Error(errors.join(", "));
  }
  return saveEntity(uid)({
    id,
    description,
    startYear,
    endYear,
    lectureNumber,
  });
};

const initialState = {
  id: "",
  description: "",
  startYear: "",
  startYearCe: false,
  endYear: "",
  endYearCe: false,
  lectureNumber: "",
};

const EntityForm = ({ selectedEntity }) => {
  const { currentUser } = useAuthState();
  const [state, setState, onInputFactory] = useFormState(initialState);

  useEffect(
    () => void setState(selectedEntity ? selectedEntity : initialState),
    [selectedEntity]
  );

  const handleSubmit = event => {
    event.preventDefault();
    submitSaveEntity({ uid: currentUser.uid, state })
      .then(() => {
        console.log("Saved Entity");
        setState(initialState);
      })
      .catch(console.error);
  };
  const handleReset = event => {
    event.preventDefault();
    setState(selectedEntity);
  };

  return (
    <form className="entity-form" onSubmit={handleSubmit} onReset={handleReset}>
      <InputField
        label="ID"
        placeholder="Lorem Ipsum"
        value={state.id}
        onInput={onInputFactory("id")}
      />
      <label className="description__label">
        Description
        <textarea
          className="description__field"
          value={state.description}
          onInput={onInputFactory("description")}
        />
      </label>
      <fieldset className="date-fieldset">
        <legend className="date-fieldset__legend">Start Date</legend>
        <div className="date-fieldset__inputs">
          <InputField
            label="Year"
            type="number"
            step={0.5}
            value={state.startYear}
            onInput={onInputFactory("startYear")}
          />
          <ToggleSwitch
            offLabel="BCE"
            onLabel="CE"
            value={state.startYearCe}
            onChange={onInputFactory("startYearCe")}
          />
        </div>
      </fieldset>
      <fieldset className="date-fieldset">
        <legend className="date-fieldset__legend">End Date</legend>
        <div className="date-fieldset__inputs">
          <InputField
            label="Year"
            type="number"
            step={0.5}
            value={state.endYear}
            onInput={onInputFactory("endYear")}
          />
          <ToggleSwitch
            offLabel="BCE"
            onLabel="CE"
            value={state.endYearCe}
            onChange={onInputFactory("endYearCe")}
          />
        </div>
      </fieldset>
      <InputField
        digits="2"
        label="Lecture #"
        type="number"
        value={state.lectureNumber}
        onInput={onInputFactory("lectureNumber")}
      />
      <div role="group" className="form-actions">
        <button className="btn" type="submit">
          Save
        </button>
        <button className="btn btn--secondary" type="reset">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EntityForm;
