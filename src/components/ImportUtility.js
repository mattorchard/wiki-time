import { useState } from "preact/hooks";
import "./ImportUtility.css";
import InputField from "./InputField";
import { saveEntity } from "../helpers/entityHelpers";
import firebase from "firebase/app";
import "firebase/auth";

const bcePattern = new RegExp("(BC)", "i");

const parseLine = line => {
  let [, id, startYear, startYearBars, endYear, endYearBars, era] = line.match(
    /^([^0-9]+?)\s*(?:([0-9]{1,3})(?:\/([0-9]{1,3}))?)?(?:-([0-9]{1,3})(?:\/([0-9]{1,3}))?)?( (?:BC)|(?:AD))?$/
  );
  id = id.trimStart().trimEnd();
  startYear = parseInt(startYear);
  startYearBars = parseInt(startYearBars);
  endYear = parseInt(endYear);
  endYearBars = parseInt(endYearBars);
  if (startYearBars) {
    startYear = (startYear + startYearBars) / 2;
  }
  if (endYearBars) {
    endYear = (endYear + endYearBars) / 2;
  }
  if (bcePattern.test(era)) {
    startYear = -startYear;
    endYear = -endYear;
  }
  return {
    id,
    startYear: startYear || null,
    endYear: endYear || null,
  };
};

const importEntities = (overrides, rawData) => {
  const { uid } = firebase.auth().currentUser;
  const entities = rawData
    .split(/\r?\n/)
    .map(line => line.trimStart().trimEnd())
    .filter(Boolean)
    .map(line => parseLine(line))
    .map(entity => ({ ...entity, ...overrides }));
  Promise.all(
    entities
      .map(saveEntity(uid))
      .map(promise => promise.then(() => null).catch(error => error))
  )
    .then(results => console.log("All entities finished", results))
    .catch(console.error);
};

const ImportUtility = () => {
  const [lecture, setLecture] = useState("");
  const [rawData, setRawData] = useState("");
  const handleSubmit = event => {
    event.preventDefault();
    const lectureNumber = parseInt(lecture);
    if (!lectureNumber) {
      throw new Error(`Must have a lecture number`);
    }
    return importEntities({ lectureNumber }, rawData);
  };
  return (
    <form onSubmit={handleSubmit} className="import-utility">
      <label className="import-utility__raw-data__label">
        Raw Data:
        <textarea
          className="textarea"
          value={rawData}
          onInput={event => setRawData(event.currentTarget.value)}
        />
      </label>
      <InputField
        label="Lecture #"
        type="number"
        value={lecture}
        digits={2}
        onInput={event => setLecture(event.target.value)}
      />
      <button className="btn" type="submit">
        Create Entities
      </button>
    </form>
  );
};

export default ImportUtility;
