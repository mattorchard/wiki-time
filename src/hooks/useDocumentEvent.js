import { useEffect } from "preact/hooks";

const useDocumentEvent = (eventType, callback, deps) => {
  useEffect(() => {
    document.addEventListener(eventType, callback);
    return () => document.removeEventListener(eventType, callback);
  }, [eventType, ...deps]);
};

export default useDocumentEvent;
