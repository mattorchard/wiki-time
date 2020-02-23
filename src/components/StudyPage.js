import "./StudyPage.css";
import EntityIndex from "./EntityIndex";
import useMediaQuery from "../hooks/useMediaQuery";
import EntityTimeline from "./EntityTimeline";

const StudyPage = ({ entities, startYear, endYear }) => {
  const sideBySide = useMediaQuery("(min-width: 1000px)");
  return (
    <main
      className="study-page"
      style={{ "--index-width": sideBySide ? "25vw" : "100vw" }}
    >
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
