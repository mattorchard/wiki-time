import { useEffect, useState } from "preact/hooks";
import firebase from "firebase/app";
import "firebase/firestore";
import { noCleanup } from "./hookUtils";
import { capitalizeAsTitle } from "../helpers/textHelpers";

const formatEntitySnaps = callback => querySnapshot =>
  callback(
    querySnapshot.docs.map(snap => ({
      id: snap.id,
      name: capitalizeAsTitle(snap.id.replace(/_/g, " ")),
      ...snap.data(),
    }))
  );

const useTimeline = uid => {
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
    return firebase
      .firestore()
      .collection("timelines")
      .doc(uid)
      .collection("entities")
      .orderBy("id")
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
