import AccountBadge from "./AccountBadge";
import "./AppHeader.css";

const AppHeader = () => (
  <header className="app-header">
    <h1 className="app-header__brand">Early Empire</h1>
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
        <a href="#quiz-timeline" className="app-header__nav__link">
          Order
        </a>
      </nav>
      <AccountBadge />
    </div>
  </header>
);

export default AppHeader;
