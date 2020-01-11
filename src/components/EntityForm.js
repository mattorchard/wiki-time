import ToggleSwitch from "./ToggleSwitch";

import InputField from "./InputField";
import useAuthState from "../hooks/useAuthState";
import useFormState from "../hooks/useFormState";
import { formatYear, saveEntity } from "../helpers/entityHelpers";
import "./EntityForm.css";

const handleSubmit = ({ uid, state }) => event => {
  event.preventDefault(event);
  if (!uid) {
    throw new Error(`Must be logged in`);
  }
  const id = state.id.trim();
  if (!id) {
    throw new Error(`Entity must have an ID`);
  }
  const description = state.description.trim();
  if (!description) {
    throw new Error(`Entity must have a description`);
  }
  const startYear = formatYear(state.startYear, state.startYearCe);
  if (state.startYear && isNaN(startYear)) {
    throw new Error(`Invalid start year`);
  }
  const endYear = formatYear(state.endYear, state.endYear);
  if (state.endYear && isNaN(endYear)) {
    throw new Error(`Invalid end year`);
  }
  if (endYear <= startYear) {
    throw new Error(`End year must be after start year`);
  }
  return saveEntity(uid)({
    id,
    description,
    startYear,
    endYear,
  });
};

const initialState = {
  id: "",
  description: "",
  startYear: "",
  startYearCe: true,
  endYear: "",
  endYearCe: true,
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
      <label>
        Description
        <textarea
          value={state.description}
          onInput={onInputFactory("description")}
        />
      </label>
      <fieldset className="date-fieldset">
        <legend className="date-fieldset__legend">Start Date</legend>
        <div className="date-fieldset__inputs">
          <InputField
            placeholder="1984"
            label="Start Year"
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
            placeholder="2011"
            label="End Year"
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
      <button className="btn" type="submit">
        Save
      </button>
    </form>
  );
};

export default EntityForm;
