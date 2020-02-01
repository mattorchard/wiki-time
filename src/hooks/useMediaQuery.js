import { useEffect, useState } from "preact/hooks";

const useMediaQuery = query => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const handleMatchChanged = ({ matches }) => setMatches(matches);
    const target = window.matchMedia(query);
    target.addEventListener("change", handleMatchChanged);
    return () => target.removeEventListener("change", handleMatchChanged);
  });

  return matches;
};

export default useMediaQuery;
