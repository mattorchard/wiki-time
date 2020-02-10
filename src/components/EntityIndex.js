import { useState } from "preact/hooks";
import useDebouncedValue from "../hooks/useDebouncedValue";
import useEntitySearch from "../hooks/useEntitySearch";
import "./EntityIndex.css";
import createBubbleHandler from "../helpers/handleBubble";

const EntityIndex = ({ entities, onSelect }) => {
  const [rawQuery, setRawQuery] = useState("");
  const query = useDebouncedValue(rawQuery);
  const searchResults = useEntitySearch(entities, query);

  return (
    <div className="entity-index">
      <div>
        <form
          className="entity-index__search-form"
          onSubmit={event => event.preventDefault()}
        >
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
        <ol
          className="entity-index__results"
          onClick={createBubbleHandler("entity-id", onSelect)}
        >
          {searchResults.map(entity => (
            <li
              className={`entity-index__result ${entity.description ||
                "entity-index__result--empty"}`}
              key={entity.id}
              data-entity-id={entity.id}
            >
              <button
                className=" non-btn entity-index__result__button"
                type="button"
              >
                {entity.name}
              </button>
            </li>
          ))}
        </ol>
        {query && (
          <div>
            Showing {searchResults.length} of {entities.length} entities
          </div>
        )}
      </div>
    </div>
  );
};

export default EntityIndex;
