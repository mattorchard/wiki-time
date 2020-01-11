import { render } from "preact";
import firebase from "firebase/app";
import EntityForm from "./components/EntityForm";
import "./styles/reset.css";
import "./styles/global.css";
import publicFirebaseConfig from "./public-firebase-config";
import AppHeader from "./components/AppHeader";

firebase.initializeApp(publicFirebaseConfig);

const App = (
  <div>
    <AppHeader />
    <section>
      <EntityForm />
    </section>
  </div>
);
render(App, document.querySelector("#appRoot"));
