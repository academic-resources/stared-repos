import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Searchbar from "./SearchBar";

const Navbar = () => {
  const { user } = useUser();
  return (
    <ul style={{ display: "flex", listStyle: "none" }}>
      <li style={{ padding: "5px" }}>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      <li style={{ padding: "5px" }}>
        <NavLink to={`/profile/${user.id}`}>Profile</NavLink>
      </li>
      <Searchbar />
    </ul>
  );
};

export default Navbar;
