import { useRef, useEffect, useMemo, useState } from "preact/hooks";

// Modified to utilize Preact without needing compat layer
// From:
// https://github.com/ZeeCoder/use-resize-observer/blob/master/src/index.js

function useResizeObserver({ ref, onResize } = {}) {
  // `defaultRef` Has to be non-conditionally declared here whether or not it'll
  // be used as that's how hooks work.
  // @see https://reactjs.org/docs/hooks-rules.html#explanation
  const defaultRef = useRef(null);
  ref = ref || defaultRef;
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  // Using a ref to track the previous width / height to avoid unnecessary renders
  const previous = useRef({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (
      typeof ref !== "object" ||
      ref === null ||
      !(ref.current instanceof Element)
    ) {
      return;
    }

    const element = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries)) {
        return;
      }

      // Since we only observe the one element, we don't need to loop over the
      // array
      if (!entries.length) {
        return;
      }

      const entry = entries[0];

      // `Math.round` is in line with how CSS resolves sub-pixel values
      const newWidth = Math.round(entry.contentRect.width);
      const newHeight = Math.round(entry.contentRect.height);
      if (
        previous.current.width !== newWidth ||
        previous.current.height !== newHeight
      ) {
        const newSize = { width: newWidth, height: newHeight };
        if (onResize) {
          onResize(newSize);
        } else {
          previous.current.width = newWidth;
          previous.current.height = newHeight;
          setSize(newSize);
        }
      }
    });

    resizeObserver.observe(element);

    return () => resizeObserver.unobserve(element);
  }, [ref, onResize]);

  return useMemo(() => ({ ref, ...size }), [
    ref,
    size ? size.width : null,
    size ? size.height : null,
  ]);
}

export default useResizeObserver;
