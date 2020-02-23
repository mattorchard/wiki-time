import { Fragment, render } from "preact";
import firebase from "firebase/app";
import "firebase/firestore";
import "./styles/reset.css";
import "./styles/global.css";
import publicFirebaseConfig from "./public-firebase-config";
import AppHeader from "./components/AppHeader";
import useAuthState from "./hooks/useAuthState";
import useTimeline from "./hooks/useTimeline";
import Spinner from "./components/Spinner";
import useHash from "./helpers/useHash";
import useMouseCssVars from "./hooks/useMouseCssVars";
import OrderQuiz from "./components/OrderQuiz";
import MatchQuiz from "./components/MatchQuiz";
import ImportPage from "./components/ImportPage";
import StudyPage from "./components/StudyPage";
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

firebase.initializeApp(publicFirebaseConfig);
firebase
  .firestore()
  .enablePersistence()
  .then(() => console.log("Offline firestore enabled"))
  .catch(error => console.error("Failed to enable offline firestore", error));

const routes = new Set(["order-quiz", "match-quiz", "import"]);

const getLectureNumber = () => {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("minLectureNumber")) || null;
};

const App = () => {
  useMouseCssVars();
  const { loggedIn, currentUser } = useAuthState();
  const { loading, startYear, endYear, entities } = useTimeline(
    currentUser.uid,
    getLectureNumber()
  );
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
              <StudyPage
                startYear={startYear}
                endYear={endYear}
                entities={entities}
              />
            )}
            {route === "order-quiz" && <OrderQuiz entities={entities} />}
            {route === "match-quiz" && <MatchQuiz entities={entities} />}
            {route === "import" && <ImportPage />}
          </Fragment>
        ))}
    </Fragment>
  );
};

const AppWrapper = <App />;

render(AppWrapper, document.querySelector("#appRoot"));
