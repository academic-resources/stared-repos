import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import * as userActions from "../../store/user";
import { useDispatch } from "react-redux";

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const { saveUser } = userActions;
  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(saveUser(user));
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/main" />;
  }

  return (
    <div>
      <h1 className="text-4xl text-accentDark font-semibold mb-3">Log In</h1>
      <form onSubmit={onLogin} className="text-xl">
        <div>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </div>
        <div>
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}
            className="p-1 mt-2 mb-2 outline-none text-accentDark placeholder-accentLight"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword}
            className="p-1 mt-2 mb-2 outline-none text-accentDark placeholder-accentLight"
          />
          <br />
          <button
            type="submit"
            className="transform hover:scale-105 cursor-pointer text-accentDark font-bold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
