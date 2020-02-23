import { Fragment, render } from "preact";
import { useState } from "preact/hooks";
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
  const [headerHeight, setHeaderHeight] = useState(40);
  const { loggedIn, currentUser } = useAuthState();
  const { loading, startYear, endYear, entities } = useTimeline(
    currentUser.uid,
    getLectureNumber()
  );
  const hash = useHash();
  const route = routes.has(hash) ? hash : "main";

  return (
    <div style={{ "--header-height": headerHeight }}>
      <AppHeader onSizeChange={({ height }) => setHeaderHeight(height)} />
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
    </div>
  );
};

const AppWrapper = <App />;

render(AppWrapper, document.querySelector("#appRoot"));
