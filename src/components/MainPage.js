import EntityForm from "./EntityForm";
import Spinner from "./Spinner";
import useTimeline from "../hooks/useTimeline";
import Timeline from "./Timeline";
import EntityIndex from "./EntityIndex";

const MainPage = ({ uid }) => {
  const { loading, timeline, entities } = useTimeline(uid);
  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <EntityForm />
      <EntityIndex entities={entities} />
      <Timeline
        start={timeline.start}
        end={timeline.end}
        entities={entities}
        increment={10}
      />
    </main>
  );
};

export default MainPage;
