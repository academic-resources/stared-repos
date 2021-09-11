import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { ReactComponent as Logo } from "../images/musiconimbus2.svg"

export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div className="sessionLinks">
          <NavLink to="/login">
            <button className="btn btn--nav">Log In</button>
          </NavLink>
          <NavLink to="/signup">
            <button className="btn btn--nav">Sign Up</button>
          </NavLink>
        </div>
        <div className="mobile">
        <ProfileButton />
        </div>
      </>
    );
  }

  return (
    <nav>
      <ul>
        <li>
          {sessionUser && <NavLink exact to="/dashboard">
            <div className="nav__logo">
              <Logo className="nav__logo--img"/>
              <h1 className="nav__logo--title">MusicoNimbus</h1>
            </div>
          </NavLink>
          }
          {!sessionUser && <NavLink exact to="/">
            <div className="nav__logo">
                <Logo className="nav__logo--img"/>
                <h1 className="nav__logo--title">MusicoNimbus</h1>
              </div>
            </NavLink>
          }
        </li>
        <li>
          <div className="nav__links">
            {isLoaded && sessionLinks}
          </div>
        </li>
      </ul>
    </nav>
  );
}
