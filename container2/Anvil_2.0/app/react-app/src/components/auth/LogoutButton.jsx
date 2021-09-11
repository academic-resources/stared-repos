import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/reducers/user";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = (e) => {
    dispatch(logout());
    history.push("/");
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
