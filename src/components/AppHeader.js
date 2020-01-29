import AccountBadge from "./AccountBadge";
import "./AppHeader.css";

const AppHeader = () => (
  <header className="app-header">
    <h1 className="app-header__brand">Early Empire</h1>
    <div className="app-header__actions">
      <AccountBadge />
    </div>
  </header>
);

export default AppHeader;
