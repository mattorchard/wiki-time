import { useState, useEffect } from "preact/hooks";

const useDebouncedValue = (value, delay = 500) => {
  const [state, setState] = useState(value);
  useEffect(() => {
    let timeoutId = setTimeout(() => setState(value), delay);
    return () => clearTimeout(timeoutId);
  }, [value, delay]);
  return state;
};

export default useDebouncedValue;
