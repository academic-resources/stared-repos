import React from "react";
import Greeting from "./greeting/greeting_container";
import { Route } from "react-router-dom";
import LoginForm from "../components/session/login_form_container";
import SignupForm from "../components/session/signup_form_container";
import { AuthRoute } from "../util/route_util";

const App = () => {
  return (
    <div>
      <header>
        <h1>Bench BnB</h1>
        <Greeting />
      </header>

      <AuthRoute path="/login" component={LoginForm} />
      <AuthRoute path="/signup" component={SignupForm} />
    </div>
  );
};

export default App;
