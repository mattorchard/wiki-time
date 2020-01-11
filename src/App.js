import { render } from "preact";
import firebase from "firebase/app";
import EntityForm from "./components/EntityForm";
import "./styles/reset.css";
import "./styles/global.css";
import AccountBadge from "./components/AccountBadge";
import publicFirebaseConfig from "./public-firebase-config";
firebase.initializeApp(publicFirebaseConfig);

const App = (
  <div>
    <header>
      <h1>Wiki Time</h1>
      <AccountBadge />
    </header>
    <section>
      <EntityForm />
    </section>
  </div>
);
render(App, document.querySelector("#appRoot"));
