import { useEffect, useState } from "preact/hooks";
import firebase from "firebase/app";
import "firebase/firestore";
import { noCleanup } from "./hookUtils";

const formatDocumentSnapshot = callback => snap =>
  callback({
    id: snap.id,
    ...snap.data(),
  });

const formatQueryDocumentSnapshot = callback => querySnap =>
  callback(querySnap.docs.map(snap => ({ id: snap.id, ...snap.data() })));

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
      .onSnapshot(formatDocumentSnapshot(setTimeline));
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
      .onSnapshot(formatQueryDocumentSnapshot(setEntities));
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
