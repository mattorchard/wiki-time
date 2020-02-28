import useDocumentEvent from "./useDocumentEvent";

const setMousePosition = ({ clientX, clientY, movementX, movementY }) => {
  const root = document.body.parentElement;
  root.style.setProperty("--mouse-x", clientX);
  root.style.setProperty("--mouse-y", clientY);
  root.style.setProperty("--mouse-speed-x", movementX || 0.01);
  root.style.setProperty("--mouse-speed-y", movementY || 0.01);
  const speed = Math.sqrt(movementX ** 2 + movementY ** 2) || 0.01;
  root.style.setProperty("--mouse-speed", speed.toString());
};

const handleMouseMove = event => setMousePosition(event);

const handleTouchMove = event => {
  const [position] = event.touches;
  setMousePosition(position);
};

const useMouseCssVars = () => {
  useDocumentEvent("mousemove", handleMouseMove, []);
  useDocumentEvent("touchmove", handleTouchMove, []);
  useDocumentEvent("touchstart", handleTouchMove, []);
  useDocumentEvent("touchend", handleTouchMove, []);
};
export default useMouseCssVars;
