import firebase from "firebase/app";
import "firebase/firestore";

const formatId = id =>
  id
    .trimStart()
    .trimEnd()
    .toLowerCase()
    .replace(/\s+/g, "_");

export const formatYear = (year, commonEra = true) =>
  parseInt(year) * (commonEra ? 1 : -1);

export const saveEntity = uid => async ({
  id,
  description,
  startYear,
  endYear,
}) => {
  const entity = {
    id: formatId(id),
    description: description.trimStart().trimEnd(),
    startYear: startYear || null,
    endYear: endYear || null,
  };

  return firebase
    .firestore()
    .collection("timelines")
    .doc(uid)
    .collection("entities")
    .doc(entity.id)
    .set(entity);
};
