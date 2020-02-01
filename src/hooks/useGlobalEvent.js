import { useCallback, useEffect } from "preact/hooks";

const useGlobalEvent = (eventType, callback) => {
  const depSafeCallback = useCallback(callback, []);
  useEffect(() => {
    document.addEventListener(eventType, depSafeCallback);
    return () => document.removeEventListener(eventType, depSafeCallback);
  }, [eventType, depSafeCallback]);
};

export default useGlobalEvent;
