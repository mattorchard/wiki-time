const wordsNotToCapitalize = new Set([
  "a",
  "an",
  "and",
  "the",
  "for",
  "nor",
  "but",
  "yet",
  "so",
  "at",
  "around",
  "by",
  "from",
  "of",
  "on",
  "to",
  "with",
  "without",
]);

const capitalizeFirst = word => {
  const [first, ...rest] = word;
  return first.toUpperCase() + rest.join("");
};

export const capitalizeAsTitle = text => {
  const words = text.toLowerCase().split(/\b/);
  return words
    .map((word, index) =>
      wordsNotToCapitalize.has(word) && index !== 0
        ? word
        : capitalizeFirst(word)
    )
    .join("");
};
