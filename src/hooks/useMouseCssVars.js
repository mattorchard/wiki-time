import useDocumentEvent from "./useDocumentEvent";

const setMousePosition = ({ clientX, clientY }) => {
  const root = document.body.parentElement;
  root.style.setProperty("--mouse-x", clientX);
  root.style.setProperty("--mouse-y", clientY);
};

const handleMouseMove = event => setMousePosition(event);

const handleTouchMove = event => {
  const [position] = event.touches;
  setMousePosition(position);
};

const useMouseCssVars = () => {
  useDocumentEvent("mousemove", handleMouseMove);
  useDocumentEvent("touchmove", handleTouchMove);
  useDocumentEvent("touchstart", handleTouchMove);
  useDocumentEvent("touchend", handleTouchMove);
};
export default useMouseCssVars;
