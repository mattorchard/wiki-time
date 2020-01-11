import { Fragment, render } from "preact";
import firebase from "firebase/app";
import "./styles/reset.css";
import "./styles/global.css";
import publicFirebaseConfig from "./public-firebase-config";
import AppHeader from "./components/AppHeader";
import MainPage from "./components/MainPage";
import useAuthState from "./hooks/useAuthState";

firebase.initializeApp(publicFirebaseConfig);

const App = () => {
  const { loggedIn, currentUser } = useAuthState();
  return (
    <Fragment>
      <AppHeader />
      {loggedIn && <MainPage uid={currentUser.uid} />}
    </Fragment>
  );
};

const AppWrapper = <App />;

render(AppWrapper, document.querySelector("#appRoot"));
