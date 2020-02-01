import useGlobalEvent from "./useGlobalEvent";

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
  useGlobalEvent("mousemove", handleMouseMove);
  useGlobalEvent("touchmove", handleTouchMove);
  useGlobalEvent("touchstart", handleTouchMove);
  useGlobalEvent("touchend", handleTouchMove);
};
export default useMouseCssVars;
