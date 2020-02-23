import { Fragment } from "preact";
import "./StudyPage.css";
import useTimelineFilter from "../hooks/useTimelineFilter";
import { useMemo } from "preact/hooks";
import EntityIndex from "./EntityIndex";
import useMediaQuery from "../hooks/useMediaQuery";

const getClosestAncestorWithAttribute = (element, attribute) =>
  element.closest
    ? element.closest(`[${attribute}]`)
    : element.parentElement.closest(`[${attribute}]`);

const formatYear = year => `${Math.abs(year)} ${year > 0 ? "CE" : "BCE"}`;

const formatRange = (startYear, endYear) => {
  if (startYear > 0 === endYear > 0) {
    return `${Math.abs(startYear)} - ${formatYear(endYear)}`;
  }
  return `${formatYear(startYear)} - ${formatYear(endYear)}`;
};

const TimelineSection = ({ entities, startYear, endYear, onSelectEntity }) => {
  const { events, ranges } = useTimelineFilter(entities);

  const groupedEvents = useMemo(() => {
    const groupMap = new Map();
    events.forEach(event => {
      if (!groupMap.has(event.startYear)) {
        groupMap.set(event.startYear, []);
      }
      groupMap.get(event.startYear).push(event);
    });
    return [...groupMap.entries()];
  }, [events]);

  const ticks = useMemo(
    () =>
      new Array(endYear - startYear)
        .fill(null)
        .map((value, index) => startYear + index),
    [startYear, endYear]
  );

  const handleClick = event => {
    const ancestorElement = getClosestAncestorWithAttribute(
      event.target,
      "data-entity-id"
    );
    if (!ancestorElement) {
      return;
    }
    event.preventDefault();
    const { entityId } = ancestorElement.dataset;
    onSelectEntity(entityId);
  };

  return (
    <section
      onClick={handleClick}
      className="timeline-section"
      style={{ "--start-year": startYear, "--end-year": endYear }}
    >
      {ticks.map(year => (
        <div
          className="timeline__year-marker"
          style={{
            gridRowStart: year,
          }}
        >
          {formatYear(year)}
        </div>
      ))}
      {groupedEvents.map(([startYear, events]) => (
        <div
          className="timeline__event-group"
          style={{
            gridColumnStart: 2,
            gridRowStart: Math.floor(startYear),
          }}
        >
          {events.map(event => (
            <a
              key={event.id}
              className="timeline__event-item"
              href="#"
              data-entity-id={event.id}
            >
              {event.name}
            </a>
          ))}
        </div>
      ))}
      {ranges.map(range => (
        <a
          href="#"
          className="timeline__range"
          data-entity-id={range.id}
          style={{
            gridRowStart: Math.floor(range.startYear),
            gridRowEnd: Math.floor(range.endYear),
          }}
        >
          <span className="timeline-range__name">{range.name}</span>
          <span className="timeline-range__year">
            {formatRange(range.startYear, range.endYear)}
          </span>
        </a>
      ))}
    </section>
  );
};

const StudyPage = ({ entities, startYear, endYear }) => {
  const sideBySide = useMediaQuery("(min-width: 1000px)");
  return (
    <Fragment>
      <main
        className="entity-list-wrappers"
        style={{ "--index-width": sideBySide ? "25vw" : "100vw" }}
      >
        <TimelineSection
          startYear={startYear}
          endYear={endYear}
          entities={entities}
          onSelectEntity={console.log}
        />
        <EntityIndex entities={entities} onSelect={console.log} />
      </main>
    </Fragment>
  );
};

export default StudyPage;
