import EntityForm from "./EntityForm";
import Spinner from "./Spinner";
import useTimeline from "../hooks/useTimeline";
import Timeline from "./Timeline";
import EntityIndex from "./EntityIndex";
import "./MainPage.css";
import { useState } from "preact/hooks";

const MainPage = ({ uid }) => {
  const { loading, timeline, entities } = useTimeline(uid);
  const [selectedEntity, setSelectedEntity] = useState(null);
  if (loading) {
    return <Spinner />;
  }
  const handleSelectEntity = entityId =>
    setSelectedEntity(entities.find(entity => entity.id === entityId) || null);

  return (
    <main>
      <div className="entity-form__container">
        <EntityForm selectedEntity={selectedEntity} />
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
