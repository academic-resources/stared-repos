import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/reducers/user";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const loggedIn = useSelector((state) =>
    state.user.id ? state.user.id : null
  );

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await dispatch(login({ email, password }));
    if (user.errors) {
      setErrors(user.errors);
    }
  };

  if (loggedIn !== null) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onLogin} className="bg-secondTransparent">
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
      <div>
        <input
          name="email"
          type="text"
          placeholder="=> Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-secondTransparent text-xl text-left pl-3 pb-3 pt-3 text-accentOne outline-none placeholder-accentOne border-2 border-accentThree ml-2 font-jetbrains"
        />
      </div>
      <div>
        <input
          name="password"
          type="password"
          placeholder="=> Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-secondTransparent text-xl text-left pl-3 pb-3 pt-3 text-accentOne border-2 border-accentThree mt-2 ml-2 placeholder-accentOne font-jetbrains"
        />
        <div className="bg-accentThree text-main text-xl font-bold m-2 rounded-md text-center p-2 font-jetbrains transform hover:scale-105">
          <button type="submit">Log In</button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
