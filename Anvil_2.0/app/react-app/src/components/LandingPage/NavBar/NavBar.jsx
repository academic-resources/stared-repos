import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { LogoutButton, DemoUserButton } from "../../auth";

const NavBar = ({ setLocation }) => {
  const currentUser = useSelector((state) =>
    state.user.id ? state.user.id : null
  );

  return (
    <nav className="bg-secondary shadow-custom-shadow flex flex-row justify-between">
      {!currentUser && (
        <div className="text-accentOne text-xl flex p-2">
          <div className="pl-3 hover:underline">
            <Link to="/login" onClick={() => setLocation("/login")}>
              Login
            </Link>
          </div>
          <p className="pl-2"> | </p>
          <div className="pl-2 hover:underline">
            <Link to="/sign-up" onClick={() => setLocation("/sign-up")}>
              Sign Up
            </Link>
          </div>
          <p className="pl-2"> | </p>
          <div className="pl-2">
            <DemoUserButton setLocation={setLocation} />
          </div>
        </div>
      )}
      {currentUser && (
        <div className="text-accentOne text-xl flex p-2 pl-3">
          <div className="pl-2">
            <LogoutButton />
          </div>
          <p className="pl-2"> | </p>
          <div className="pl-2">
            <Link to="/home">Home</Link>
          </div>
        </div>
      )}
      <p className="text-accentOne text-xl flex pt-2 pr-5">
        A text editor for developers
      </p>
    </nav>
  );
};

export default NavBar;
