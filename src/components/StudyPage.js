import "./StudyPage.css";
import EntityIndex from "./EntityIndex";
import EntityTimeline from "./EntityTimeline";

const StudyPage = ({ entities, startYear, endYear }) => {
  return (
    <main className="study-page">
      <EntityTimeline
        startYear={startYear}
        endYear={endYear}
        entities={entities}
        onSelect={console.log}
      />
      <EntityIndex entities={entities} onSelect={console.log} />
    </main>
  );
};

export default StudyPage;
