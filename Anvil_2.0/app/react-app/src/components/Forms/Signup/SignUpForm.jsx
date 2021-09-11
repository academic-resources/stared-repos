import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../../store/reducers/user";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const dispatch = useDispatch();
  const loggedIn = useSelector((state) =>
    state.user.id ? state.user.id : null
  );

  const onSignUp = (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      dispatch(signup({ username, email, password }));
    }
  };

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSignUp} className="bg-secondTransparent">
      <div>
        <input
          type="text"
          name="username"
          placeholder="=> Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="bg-secondTransparent text-xl text-left pl-3 pb-3 pt-3 text-accentOne outline-none placeholder-accentOne border-2 border-accentThree ml-2"
        ></input>
      </div>
      <div>
        <input
          type="text"
          name="email"
          placeholder="=> Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="bg-secondTransparent text-xl text-left pl-3 pb-3 pt-3 text-accentOne outline-none placeholder-accentOne border-2 border-accentThree ml-2 mt-2"
        ></input>
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="=> Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="bg-secondTransparent text-xl text-left pl-3 pb-3 pt-3 text-accentOne outline-none placeholder-accentOne border-2 border-accentThree ml-2 mt-2"
        ></input>
      </div>
      <div>
        <input
          type="password"
          name="repeat_password"
          placeholder="=> Confirm Password"
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          required={true}
          className="bg-secondTransparent text-xl text-left pl-3 pb-3 pt-3 text-accentOne outline-none placeholder-accentOne border-2 border-accentThree ml-2 mt-2"
        ></input>
      </div>
      <div className="bg-accentThree text-main text-xl font-bold m-2 rounded-md text-center p-2 transform hover:scale-105">
        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
