import firebase from "firebase/app";
import "firebase/firestore";

const formatId = id =>
  id
    .trimStart()
    .trimEnd()
    .toLowerCase()
    .replace(/\s+/g, "_");

export const formatYear = (year, commonEra = true) =>
  Number(year) * (commonEra ? 1 : -1);

export const saveEntity = uid => async ({
  id,
  description,
  startYear,
  endYear,
  lectureNumber,
}) => {
  const entity = {
    lectureNumber,
    id: formatId(id),
    description: description || "",
    startYear: startYear || null,
    endYear: endYear || null,
  };

  console.log("Saving entity", entity);

  return firebase
    .firestore()
    .collection("timelines")
    .doc(uid)
    .collection("entities")
    .doc(entity.id)
    .set(entity);
};
