import EntityForm from "./EntityForm";
import Spinner from "./Spinner";
import useTimeline from "../hooks/useTimeline";
import Timeline from "./Timeline";

const MainPage = ({ uid }) => {
  const { loading, timeline, entities } = useTimeline(uid);
  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <EntityForm />
      {/*<pre>{JSON.stringify(entities, null, 2)}</pre>*/}
      <Timeline
        start={timeline.start}
        end={timeline.end}
        entities={entities}
        increment={10}
      />
      {/*<EntityIndex/>*/}
    </main>
  );
};

export default MainPage;
