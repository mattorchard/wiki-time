import Debug from "./Debug";
import { useState } from "preact/hooks";
import firebase from "firebase/app";
import "firebase/firestore";

const deleteEntity = entityId => {
  console.log("Trying to delete", entityId);
  return firebase
    .firestore()
    .collection("timelines")
    .doc("early-empire")
    .collection("entities")
    .doc(entityId)
    .delete();
};

const bulkDelete = async minLectureNumber => {
  const collectionSnap = await firebase
    .firestore()
    .collection("timelines")
    .doc("early-empire")
    .collection("entities")
    .where("lectureNumber", ">=", minLectureNumber)
    .get();
  return Promise.all(
    collectionSnap.docs.map(doc => deleteEntity(doc.id).catch(error => error))
  );
};

const BulkDeleteTool = () => {
  const [state, setState] = useState(null);
  return (
    <div>
      <Debug value={state} />
      <button
        type="button"
        onClick={() =>
          bulkDelete(3)
            .then(setState)
            .catch(setState)
        }
      >
        Delete Em
      </button>
    </div>
  );
};
export default BulkDeleteTool;
