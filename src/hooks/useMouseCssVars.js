import { useEffect } from "preact/hooks";

const useMouseCssVars = () =>
  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }) => {
      const root = document.body.parentElement;
      root.style.setProperty("--mouse-x", clientX);
      root.style.setProperty("--mouse-y", clientY);
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

export default useMouseCssVars;
