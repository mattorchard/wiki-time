import { useMemo } from "preact/hooks";

const tokenize = text => text.split(/[^a-z]+/gi);

const getScore = (entity, keywords) => {
  const tokens = tokenize(entity.id);
  return keywords.reduce(
    (score, keyword) => tokens.some(token => token.startsWith(keyword)),
    0
  );
};

const entitySearch = (entities, query) => {
  const keywords = tokenize(query);
  if (!query || keywords.length === 0) {
    return entities;
  }
  return entities
    .map(entity => [getScore(entity, keywords), entity])
    .sort((a, b) => (b[0] !== a[0] ? b[0] - a[0] : b[1] - a[1]))
    .map(entry => entry[1]);
};

const useEntitySearch = (entities, query) =>
  useMemo(() => entitySearch(entities, query), [entities, query]);

export default useEntitySearch;
