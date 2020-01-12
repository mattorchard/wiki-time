import { useMemo } from "preact/hooks";

const filterEntities = entities =>
  entities.reduce(
    (accumulator, entity) => {
      if (entity.endYear || entity.endYear === 0) {
        accumulator.ranges.push(entity);
      } else if (entity.startYear || entity.startYear === 0) {
        accumulator.events.push(entity);
      }
      return accumulator;
    },
    { events: [], ranges: [] }
  );

const useTimelineFilter = entities =>
  useMemo(() => filterEntities(entities), [entities]);

export default useTimelineFilter;
