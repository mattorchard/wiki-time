import AccountBadge from "./AccountBadge";
import "./AppHeader.css";
import useMediaQuery from "../hooks/useMediaQuery";
import { useEffect, useRef } from "preact/hooks";
import usePopover from "../hooks/usePopOver";
import useWindowEvent from "../hooks/useWindowEvent";
import CandyBox from "./CandyBox";

const AppHeader = () => {
  const actionsRef = useRef(null);
  const needsOverflow = useMediaQuery("(max-width: 1200px)");
  const [isOverflowOpen, openOverflow, closeOverflow] = usePopover(actionsRef);
  useWindowEvent("hashchange", closeOverflow);
  useEffect(closeOverflow, [needsOverflow]);

  const showActions = !needsOverflow || isOverflowOpen;

  return (
    <header className="app-header">
      <h1 className="app-header__brand">Early Empire</h1>
      <div className="app-header__actions-container" ref={actionsRef}>
        {needsOverflow && (
          <button
            onClick={isOverflowOpen ? closeOverflow : openOverflow}
            type="button"
            className="app-header__overflow-button btn"
          >
            <CandyBox />
          </button>
        )}
        {showActions && (
          <div className="app-header__actions">
            <nav className="app-header__nav">
              <a href="#" className="app-header__nav__link">
                Home
              </a>
              <a href="#import" className="app-header__nav__link">
                Import
              </a>
              <a href="#quiz-definitions" className="app-header__nav__link">
                Match
              </a>
              <a href="#order-quiz" className="app-header__nav__link">
                Order
              </a>
            </nav>
            <AccountBadge />
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
