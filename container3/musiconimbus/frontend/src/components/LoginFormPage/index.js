import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import './LoginForm.css'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/dashboard" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(sessionActions.loginUser(credential, password))
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  }

  const demoSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(sessionActions.loginDemo())
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      });
  }

  return (
    <div className="main">
      <form className="form vertical-center" onSubmit={handleSubmit}>
        <h2 className="form__title">Log In</h2>
        {errors.length > 0 && <ul className="errors">
          {errors.map((error, idx) => <li className="errors--li" key={idx}>{error}</li>)}
        </ul>}
        <label htmlFor="credential">
          Email
        </label>
        <input
          id="credential"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        <label htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="button-container">
          <button type="submit" className="btn btn--primary">Log In</button>
          <button type="button" onClick={demoSubmit} className="btn btn--primary">Demo</button>
        </div>
        <p className="signup">Don't have an account? <Link className="signup__link" to="/signup">Sign up here</Link>.</p>
      </form>
    </div>
  );
}


export default LoginFormPage;
