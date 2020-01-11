import EntityForm from "./EntityForm";
import Spinner from "./Spinner";
import useTimeline from "../hooks/useTimeline";

const MainPage = ({ uid }) => {
  const { loading, timeline, entities } = useTimeline(uid);
  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      {/*<EntityForm />*/}
      {/*<pre>{JSON.stringify(entities, null, 2)}</pre>*/}
      {/*<TimeLine/>*/}
      {/*<EntityIndex/>*/}
    </main>
  );
};

export default MainPage;
