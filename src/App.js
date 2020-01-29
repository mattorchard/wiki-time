import { Fragment, render } from "preact";
import firebase from "firebase/app";
import "./styles/reset.css";
import "./styles/global.css";
import publicFirebaseConfig from "./public-firebase-config";
import AppHeader from "./components/AppHeader";
import MainPage from "./components/MainPage";
import useAuthState from "./hooks/useAuthState";
import useTimeline from "./hooks/useTimeline";
import Spinner from "./components/Spinner";
import useHash from "./helpers/useHash";

firebase.initializeApp(publicFirebaseConfig);

const routes = new Set(["quiz-timeline", "quiz-definitions", "import"]);

const App = () => {
  const { loggedIn, currentUser } = useAuthState();
  const { loading, timeline, entities } = useTimeline(currentUser.uid);
  const hash = useHash();
  const route = routes.has(hash) ? hash : "main";
  return (
    <Fragment>
      <AppHeader />
      {loggedIn &&
        (loading ? (
          <Spinner />
        ) : (
          <Fragment>
            {route === "main" && (
              <MainPage timeline={timeline} entities={entities} />
            )}
            {route === "quiz-timeline" && "timeline"}
            {route === "quiz-definitions" && "definitions"}
            {route === "import" && "import"}
          </Fragment>
        ))}
    </Fragment>
  );
};

const AppWrapper = <App />;

render(AppWrapper, document.querySelector("#appRoot"));
