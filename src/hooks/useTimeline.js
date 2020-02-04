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

const useTimeline = (uid, lectureNumber) => {
  const [timeline, setTimeline] = useState(null);
  const [entities, setEntities] = useState(null);

  useEffect(() => {
    if (!uid) {
      return noCleanup;
    }
    return firebase
      .firestore()
      .collection("timelines")
      .doc(uid)
      .onSnapshot(snap => setTimeline(snap.data()));
  }, [uid]);

  useEffect(() => {
    if (!uid) {
      return noCleanup;
    }
    if (lectureNumber) {
      return firebase
        .firestore()
        .collection("timelines")
        .doc(uid)
        .collection("entities")
        .where("lectureNumber", "<=", lectureNumber)
        .onSnapshot(formatEntitySnaps(setEntities));
    }
    return firebase
      .firestore()
      .collection("timelines")
      .doc(uid)
      .collection("entities")
      .onSnapshot(formatEntitySnaps(setEntities));
  }, [uid]);

  const loadingTimeline = timeline === null;
  const loadingEntities = entities === null;
  const loading = loadingTimeline || loadingEntities;

  return {
    timeline,
    entities,
    loadingTimeline,
    loadingEntities,
    loading,
  };
};

export default useTimeline;
