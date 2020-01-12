import { useState } from "preact/hooks";
import useDebouncedValue from "../hooks/useDebouncedValue";
import { Fragment } from "preact";
import useEntitySearch from "../hooks/useEntitySearch";

const EntityIndex = ({ entities }) => {
  const [rawQuery, setRawQuery] = useState("");
  const query = useDebouncedValue(rawQuery);
  const searchResults = useEntitySearch(entities, query);
  return (
    <Fragment>
      <form>
        <input
          aria-label="Search"
          type="search"
          value={rawQuery}
          onInput={event => setRawQuery(event.currentTarget.value)}
        />
      </form>
      <ol>
        {searchResults.map(entity => (
          <li key={entity.id}>{entity.name}</li>
        ))}
      </ol>
    </Fragment>
  );
};

export default EntityIndex;
