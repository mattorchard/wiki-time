import EntityIndex from "./EntityIndex";
import EntityTimeline from "./EntityTimeline";
import { useState } from "preact/hooks";
import "./StudyPage.css";
import EntityForm from "./EntityForm";

const StudyPage = ({ entities, startYear, endYear }) => {
  const [selectedEntity, setSelectedEntity] = useState(null);
  const handleOnSelect = entityId =>
    setSelectedEntity(entities.find(entity => entity.id === entityId));

  return (
    <main className="study-page">
      {selectedEntity && (
        <EntityForm
          selectedEntity={selectedEntity}
          onRequestClose={() => setSelectedEntity(null)}
        />
      )}
      <EntityTimeline
        startYear={startYear}
        endYear={endYear}
        entities={entities}
        onSelect={handleOnSelect}
      />
      <EntityIndex entities={entities} onSelect={handleOnSelect} />
    </main>
  );
};

export default StudyPage;
