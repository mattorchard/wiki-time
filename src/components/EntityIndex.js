import { useState } from "preact/hooks";
import useDebouncedValue from "../hooks/useDebouncedValue";
import useEntitySearch from "../hooks/useEntitySearch";
import "./EntityIndex.css";

const EntityIndex = ({ entities }) => {
  const [rawQuery, setRawQuery] = useState("");
  const query = useDebouncedValue(rawQuery);
  const searchResults = useEntitySearch(entities, query);
  return (
    <div className="entity-index">
      <form className="entity-index__search-form">
        <input
          aria-label="Search entities"
          placeholder="Search entities"
          type="search"
          className="entity-index__search-form__search-input"
          value={rawQuery}
          onInput={event => setRawQuery(event.currentTarget.value)}
        />
      </form>
      {query && searchResults.length === 0 && "No Results"}
      <ol className="entity-index__results">
        {searchResults.map(entity => (
          <li className="entity-index__result" key={entity.id}>
            {entity.name}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default EntityIndex;
