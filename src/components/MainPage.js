import EntityForm from "./EntityForm";
import Spinner from "./Spinner";
import useTimeline from "../hooks/useTimeline";
import Timeline from "./Timeline";
import EntityIndex from "./EntityIndex";
import "./MainPage.css";

const MainPage = ({ uid }) => {
  const { loading, timeline, entities } = useTimeline(uid);
  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <div className="entity-form__container">
        <EntityForm />
      </div>
      <div className="entity-lists">
        <Timeline
          start={timeline.start}
          end={timeline.end}
          entities={entities}
          increment={10}
        />
        <EntityIndex entities={entities} />
      </div>
    </main>
  );
};

export default MainPage;
