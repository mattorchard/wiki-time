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
import useMouseCssVars from "./hooks/useMouseCssVars";
import OrderQuiz from "./components/OrderQuiz";

firebase.initializeApp(publicFirebaseConfig);

const routes = new Set(["order-quiz", "quiz-definitions", "import"]);

const App = () => {
  useMouseCssVars();
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
            {route === "order-quiz" && <OrderQuiz entities={entities} />}
            {route === "quiz-definitions" && "definitions"}
            {route === "import" && "import"}
          </Fragment>
        ))}
    </Fragment>
  );
};

const AppWrapper = <App />;

render(AppWrapper, document.querySelector("#appRoot"));
