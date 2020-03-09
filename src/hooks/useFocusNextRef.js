import { useCallback, useRef } from "preact/hooks";

const useFocusNextRef = (initialValue = false, timeoutAmount = 200) => {
  const shouldFocus = useRef(initialValue);
  const timeoutId = useRef(null);

  const elementRef = useCallback(element => {
    if (shouldFocus.current && element) {
      requestAnimationFrame(() => element.focus());
    }
  }, []);

  const focusNextRef = useCallback(() => {
    shouldFocus.current = true;
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(
      () => (shouldFocus.current = false),
      timeoutAmount
    );
  }, []);
  return [elementRef, focusNextRef];
};

export default useFocusNextRef;
