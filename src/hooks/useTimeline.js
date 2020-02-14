import { useEffect, useState } from "preact/hooks";
import firebase from "firebase/app";
import "firebase/firestore";
import { noCleanup } from "./hookUtils";
import { capitalizeAsTitle } from "../helpers/textHelpers";

const idComparator = (a, b) => {
  if (a.id === b.id) {
    return 0;
  } else if (a.id < b.id) {
    return -1;
  } else {
    return 1;
  }
};

const formatEntitySnaps = callback => querySnapshot =>
  callback(
    querySnapshot.docs
      .map(snap => ({
        id: snap.id,
        name: capitalizeAsTitle(snap.id.replace(/_/g, " ")),
        ...snap.data(),
      }))
      .sort(idComparator)
  );

const getTimelineBounds = entities => {
  const allYears = entities
    .flatMap(entity => [entity.startYear, entity.endYear])
    .filter(Boolean);

  return {
    startYear: Math.floor(Math.min(...allYears)) - 1,
    endYear: Math.max(Math.max(...allYears)) + 1,
  };
};

const useTimeline = (uid, minLectureNumber) => {
  const [meta, setMeta] = useState({ startYear: null, endYear: null });
  const [entities, setEntities] = useState(null);

  useEffect(() => {
    if (!uid) {
      return noCleanup;
    }
    const handleSnap = formatEntitySnaps(entities => {
      setEntities(entities);
      setMeta(getTimelineBounds(entities));
    });

    const collectionRef = firebase
      .firestore()
      .collection("timelines")
      .doc("early-empire")
      .collection("entities");
    if (minLectureNumber) {
      return collectionRef
        .where("lectureNumber", ">=", minLectureNumber)
        .onSnapshot(handleSnap);
    }
    return collectionRef.onSnapshot(handleSnap);
  }, [uid]);

  return {
    ...meta,
    entities,
    loading: entities === null,
  };
};

export default useTimeline;
