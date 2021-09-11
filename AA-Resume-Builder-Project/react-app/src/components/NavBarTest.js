import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

export default function NavbarTest({ setAuthenticated, authenticated }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-accentLight mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <NavLink
              to="/"
              exact={true}
              activeClassName="active"
              className="px-3 py-2 flex items-center text- uppercase font-bold leading-snug text-white hover:opacity-75"
            >
              Resume Builder
            </NavLink>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <span className="block relative w-6 h-px rounded-sm bg-white"></span>
              <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
              <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
            </button>
          </div>
          <div
            className={'lg:flex flex-grow items-center' + (navbarOpen ? ' flex' : ' hidden')}
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {authenticated && (
                <li className="nav-item">
                  <NavLink
                    to="/"
                    exact={true}
                    activeClassName="active"
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  >
                    Home
                  </NavLink>
                </li>
              )}
              {authenticated && (
                <li className="nav-item">
                  <NavLink
                    to="/templates"
                    exact={true}
                    activeClassName="active"
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  >
                    Templates
                  </NavLink>
                </li>
              )}
              {authenticated && (
                <li className="nav-item">
                  <NavLink
                    to="/resumes"
                    exact={true}
                    activeClassName="active"
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  >
                    My Resumes
                  </NavLink>
                </li>
              )}
              {authenticated && (
                <li className="nav-item">
                  <NavLink
                    to="/about"
                    exact={true}
                    activeClassName="active"
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  >
                    About Us
                  </NavLink>
                </li>
              )}
              {authenticated && (
                <li className="nav-item">
                  <LogoutButton setAuthenticated={setAuthenticated} />
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
