import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/reducers/user";

const DemoUserButton = ({ setLocation }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loginDemo = async (e) => {
    dispatch(login({ email: "demo@aa.io", password: "password" }));
    setLocation("/");
    history.push("/");
  };

  return (
    <button className="hover:underline" onClick={loginDemo}>
      Demo User
    </button>
  );
};

export default DemoUserButton;
