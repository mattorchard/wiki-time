import firebase from "firebase/app";
import "firebase/auth";

const GOOGLE_PROVIDER = new firebase.auth.GoogleAuthProvider();

export const login = async () =>
  firebase.auth().signInWithRedirect(GOOGLE_PROVIDER);

export const logout = async () => firebase.auth().signOut();
