import { useCallback, useEffect, useState } from "preact/hooks";

const isAncestor = (child, potentialAncestor) => {
  // If initial values are the same node
  if (child === potentialAncestor) {
    return true;
  }
  let node = child;
  while (node.parentElement !== null) {
    // Loop through parents
    node = node.parentElement;
    if (node === potentialAncestor) {
      return true;
    }
  }
  return false;
};

const usePopover = (containerRef, initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const requestOpen = useCallback(() => setIsOpen(true), []);
  const requestClose = useCallback(() => setIsOpen(false), []);
  useEffect(() => {
    if (!isOpen) {
      return () => {}; // no cleanup
    }
    const handleMouseUp = ({ target }) => {
      if (
        target &&
        containerRef.current &&
        !isAncestor(target, containerRef.current)
      ) {
        requestClose();
      }
    };
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isOpen]);
  return [isOpen, requestOpen, requestClose];
};

export default usePopover;
