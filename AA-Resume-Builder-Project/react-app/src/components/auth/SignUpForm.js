import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signUp } from "../../services/auth";

const SignUpForm = ({ authenticated, setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1 className="text-4xl text-accentDark font-semibold mb-3">Sign Up</h1>
      <form onSubmit={onSignUp} className="text-xl">
        <div>
          <input
            type="text"
            name="username"
            placeholder="User Name"
            onChange={updateUsername}
            value={username}
            className="p-1 mt-2 mb-2 outline-none text-accentDark placeholder-accentLight"
          ></input>
        </div>
        <div>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={updateEmail}
            value={email}
            className="p-1 mt-2 mb-2 outline-none text-accentDark placeholder-accentLight"
          ></input>
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={updatePassword}
            value={password}
            className="p-1 mt-2 mb-2 outline-none text-accentDark placeholder-accentLight"
          ></input>
        </div>
        <div>
          <input
            type="password"
            name="repeat_password"
            placeholder="Confirm Password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            className="p-1 mt-2 mb-2 outline-none text-accentDark placeholder-accentLight"
          ></input>
        </div>
        <button
          type="submit"
          className="transform hover:scale-105 cursor-pointer text-accentDark font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
