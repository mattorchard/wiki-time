import { useCallback, useEffect } from "preact/hooks";

const useWindowEvent = (eventType, callback) => {
  const depSafeCallback = useCallback(callback, []);
  useEffect(() => {
    window.addEventListener(eventType, depSafeCallback);
    return () => window.removeEventListener(eventType, depSafeCallback);
  }, [eventType, depSafeCallback]);
};

export default useWindowEvent;
