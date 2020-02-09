import { useState } from "preact/hooks";
import "./ImportUtility.css";
import InputField from "./InputField";
import { saveEntity } from "../helpers/entityHelpers";
import firebase from "firebase/app";
import "firebase/auth";

const bcePattern = new RegExp("(BC)", "i");

const parseLine = line => {
  const groups = line.match(
    /^([^0-9]+?)\s*(?:([0-9]{1,3})(?:\/([0-9]{1,3}))?)?(?:-([0-9]{1,3})(?:\/([0-9]{1,3}))?)?( (?:BC)|(?:AD))?$/
  );
  if (!groups) {
    throw new Error(`Failed to parse line ${line}`);
  }
  let [, id, startYear, startYearBars, endYear, endYearBars, era] = groups;
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

const importEntities = async (overrides, rawData) => {
  const { uid } = firebase.auth().currentUser;
  if (!rawData) {
    console.log("No raw data");
    return;
  }
  const entities = rawData
    .split(/\r?\n/)
    .map(line => line.trimStart().trimEnd())
    .filter(Boolean)
    .map(line => parseLine(line))
    .map(entity => ({ ...entity, ...overrides }));

  console.log("Creating entities", entities);

  return Promise.all(
    entities.map(entity =>
      saveEntity(uid)(entity)
        .then(() => `Saved ${entity.id} successfully`)
        .catch(error => {
          console.error("Failed to save entity", entity, error);
          return `Error with ${entity.id}, failed to save`;
        })
    )
  );
};

const ImportUtility = () => {
  const [lecture, setLecture] = useState("");
  const [rawData, setRawData] = useState("");
  const [results, setResults] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    const lectureNumber = parseInt(lecture);
    if (!lectureNumber) {
      throw new Error(`Must have a lecture number`);
    }
    const results = await importEntities({ lectureNumber }, rawData);
    setResults(results);
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
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </form>
  );
};

export default ImportUtility;
