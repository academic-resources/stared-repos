
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';

export default function ProfileButton({user}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
      if (!showMenu) return;

      const closeMenu = () => {
        setShowMenu(false);
      };

      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = async (e) => {
      e.preventDefault();
      dispatch(sessionActions.logoutUser());
      history.push("/");
    };

    return (
      <>
        <button className="btn btn--hamburger" onClick={openMenu}>
          <i className="fas fa-bars"></i>
        </button>
        {showMenu && user && (
        <ul className="dropdown">
          <li className="dropdown__li dropdown__header dropdown__header--background">{user.firstName} {user.lastName}</li>
          <li className="dropdown__li dropdown__header--email dropdown__header--background">{user.email}</li>
          <li className="dropdown__li">
            <Link to="/dashboard">
              <button className="btn--dropdown" >
                Dashboard
              </button>
            </Link>
          </li>
          <li className="dropdown__li">
            <Link to="/albums/new">
              <button className="btn--dropdown" >
                Upload Music
              </button>
            </Link>
          </li>
          <li className="dropdown__li">
            <Link to="/explore">
              <button className="btn--dropdown" >
                Explore
              </button>
            </Link>
          </li>
          <li className="dropdown__li">
            <button className="btn--dropdown" onClick={logout}>Log Out</button>
          </li>
        </ul>
        )}
        {showMenu && !user && (
        <ul className="dropdown">
          <li className="dropdown__li">
            <Link to="/login">
              <button className="btn--dropdown" >
                Log In
              </button>
            </Link>
          </li>
          <li className="dropdown__li">
            <Link to="/signup">
              <button className="btn--dropdown" >
                Sign Up
              </button>
            </Link>
          </li>
        </ul>
        )}
      </>
    )
}
