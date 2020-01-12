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
  const handleSelectEntity = entityId =>
    console.log(
      "Selected entity:",
      entities.filter(entity => entity.id === entityId)
    );
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
          increment={1}
          onSelect={handleSelectEntity}
        />
        <EntityIndex entities={entities} onSelect={handleSelectEntity} />
      </div>
    </main>
  );
};

export default MainPage;
