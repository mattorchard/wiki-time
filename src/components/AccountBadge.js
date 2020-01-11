import { login } from "../helpers/authHelpers";
import useAuthState from "../hooks/useAuthState";
import Spinner from "./Spinner";
import "./AccountBadge.css";

const AccountBadge = () => {
  const { currentUser, loggedIn, loading } = useAuthState();
  if (loading) {
    return (
      <div className="account-badge">
        <Spinner color="black" />
      </div>
    );
  } else if (!loggedIn) {
    return (
      <button className="btn" type="button" onClick={login}>
        Login
      </button>
    );
  }
  if (currentUser.photoURL) {
    return (
      <div className="account-badge">
        <img
          className="account-badge__photo"
          alt={currentUser.displayName}
          src={currentUser.photoURL}
        />
      </div>
    );
  }
  const letter = currentUser.displayName.substring(0, 1).toUpperCase();
  return <div className="account-badge">{letter}</div>;
};

export default AccountBadge;
