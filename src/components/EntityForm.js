import ToggleSwitch from "./ToggleSwitch";

import InputField from "./InputField";
import useAuthState from "../hooks/useAuthState";
import useFormState from "../hooks/useFormState";
import { formatYear, saveEntity } from "../helpers/entityHelpers";
import "./EntityForm.css";

const handleSubmit = ({ uid, state }) => event => {
  event.preventDefault();
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
  const endYear = formatYear(state.endYear, state.endYear);
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
  startYearCe: true,
  endYear: "",
  endYearCe: true,
  lectureNumber: "",
};

const EntityForm = () => {
  const { currentUser } = useAuthState();
  const [state, onInputFactory] = useFormState(initialState);
  return (
    <form
      className="entity-form"
      onSubmit={handleSubmit({ uid: currentUser.uid, state })}
    >
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
        <button
          className="btn btn--secondary"
          type="reset"
          onClick={event => event.preventDefault()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EntityForm;
