import { useState, useEffect, useRef, useCallback } from "preact/hooks";

const useElementSize = () => {
  const [size, setSize] = useState(null);
  const [refreshToken, setRefreshToken] = useState(0);
  const nodeRef = useRef(null);

  // Handle new refs
  const ref = useCallback(node => {
    if (node !== null) {
      const { width, height } = node.getBoundingClientRect();
      setSize({ width, height });
      setRefreshToken(count => count + 1);
      nodeRef.current = node;
    }
  }, []);

  useEffect(() => {
    if (!nodeRef.current) {
      // No Cleanup
      return () => {};
    }
    const resizeObserver = new ResizeObserver(() => {
      const { width, height } = nodeRef.current.getBoundingClientRect();
      setSize({ width, height });
    });
    resizeObserver.observe(nodeRef.current);
    return () => resizeObserver.disconnect();
  }, [refreshToken]);

  return [size, ref];
};

export default useElementSize;
