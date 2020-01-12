import "./Timeline.css";
import useTimelineFilter from "../hooks/useTimelineFilter";
import { Fragment } from "preact";
import useZoom from "../hooks/useZoom";
import createBubbleHandler from "../helpers/handleBubble";

const TimelineMarkers = ({ start, end, increment }) => (
  <ol className="timeline-markers">
    {new Array(Math.ceil((end - start) / increment)).fill().map((_, index) => {
      const year = index * increment + start;
      return (
        <li className="timeline-marker" key={index}>
          {Math.abs(year)} {year >= 0 ? "CE" : "BCE"}
        </li>
      );
    })}
  </ol>
);

const TimelineRanges = ({ ranges }) => (
  <Fragment>
    {ranges.map(entity => (
      <div
        key={entity.id}
        id={`timeline-${entity.id}`}
        data-entity-id={entity.id}
        className="timeline-range"
        style={{
          "--range-start": entity.startYear,
          "--range-end": entity.endYear,
        }}
      >
        {entity.name}
      </div>
    ))}
  </Fragment>
);

const TimelineEvents = ({ events }) => (
  <Fragment>
    {events.map(entity => (
      <div
        key={entity.id}
        id={`timeline-${entity.id}`}
        data-entity-id={entity.id}
        className="timeline-event"
        style={{
          "--event-start": entity.startYear,
        }}
      >
        {entity.name}
      </div>
    ))}
  </Fragment>
);

const Timeline = ({ start, end, increment, entities, onSelect }) => {
  const { events, ranges } = useTimelineFilter(entities);
  const [zoom, handleWheel] = useZoom(2000);
  return (
    <div
      className="timeline"
      onWheel={handleWheel}
      onClick={createBubbleHandler("entity-id", onSelect)}
      style={{
        "--timeline-scale": zoom,
        "--timeline-start": start,
        "--timeline-end": end,
        "--timeline-increment": increment,
      }}
    >
      <section className="timeline-section">
        <TimelineMarkers start={start} end={end} increment={increment} />
      </section>
      <section className="timeline-section">
        <TimelineRanges ranges={ranges} />
      </section>
      <section className="timeline-section">
        <TimelineEvents events={events} />
      </section>
    </div>
  );
};

export default Timeline;
