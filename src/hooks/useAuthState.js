import { useEffect, useState } from "preact/hooks";
import firebase from "firebase/app";
import "firebase/auth";

const useAuthState = () => {
  const [currentUser, setCurrentUser] = useState(
    firebase.auth().currentUser || undefined
  );
  useEffect(() => firebase.auth().onAuthStateChanged(setCurrentUser), []);
  return {
    currentUser: currentUser || {},
    loggedIn: Boolean(currentUser),
    loading: currentUser === undefined,
  };
};

export default useAuthState;
