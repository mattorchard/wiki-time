import firebase from "firebase/app";
import "firebase/firestore";

const idToWikiTag = id =>
  id
    .trimStart()
    .trimEnd()
    .replace(/\s+/g, "_");

const wikiTagToId = id => id.replace(/_/g, " ");

export const formatYear = (year, commonEra = true) =>
  parseInt(year) * (commonEra ? 1 : -1);

export const saveEntity = uid => async ({
  id,
  description,
  startYear,
  endYear,
}) => {
  const entity = {
    id: idToWikiTag(id),
    description: description.trimStart().trimEnd(),
    startYear: startYear || null,
    endYear: endYear || null,
  };

  return firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("entities")
    .doc(entity.id)
    .set(entity);
};
