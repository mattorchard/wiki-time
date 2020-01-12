import { useCallback, useState } from "preact/hooks";

const useZoom = initialZoom => {
  const [zoom, setZoom] = useState(initialZoom);
  const handleWheel = useCallback(
    event => {
      if (event.ctrlKey && event.deltaY) {
        event.preventDefault();
        const deltaScroll = -1 * event.deltaY;
        setZoom(zoom => Math.max(0, zoom + deltaScroll));
      }
    },
    [setZoom]
  );
  return [zoom, handleWheel];
};

export default useZoom;
