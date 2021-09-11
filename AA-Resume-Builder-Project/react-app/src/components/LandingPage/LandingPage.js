import React, { useState } from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';
import { LoginForm, SignUpForm } from '../auth';
import { demoLogin } from '../../services/auth';
import { useDispatch } from 'react-redux';
import * as UserActions from '../../store/user';

import splashImage from './splash.jpg';
import testerResume from './test-img.png';

const LandingPage = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  if (authenticated) {
    return <Redirect to="/main" />;
  }

  const loginDemo = async (e) => {
    const user = await demoLogin();
    setAuthenticated(true);
    dispatch(UserActions.saveUser(user));
  };

  return (
    <div className="m-4">
      <div className="text-center pt-4 bg-main mb-2 pb-4 ">
        <h1 className="text-6xl text-accentDark">Resume Builder</h1>
        <div className="flex flex-row space-around justify-center text-accentDark text-2xl">
          <NavLink to="/about" className="p-2 transform hover:scale-105 cursor-pointer">
            About Us
          </NavLink>
          <p className="pt-2"> | </p>
          <a href="#forms" className="p-2 transform hover:scale-105 cursor-pointer">
            Log In
          </a>
        </div>
      </div>
      <div id="splash">
        <div className="w-full overflow-hidden">
          <img src={splashImage} alt="This is a splash image" />
        </div>
      </div>
      <div id="interaction-box" className="grid grid-cols-3 bg-main mt-2 mb-4 p-4">
        <div id="forms-and-description" className="grid grid-rows-2">
          <div
            id="project-description"
            className="bg-accentLight45 p-4 m-2 flex flex-col justify-center items-center"
          >
            <div>
              <p className="text-4xl text-accentDark font-semibold mb-5 text-center">
                Welcome Job Hunters!
              </p>
              <p className="text-xl text-accentDark p-4 ml-2 mr-2">
                We built this application to streamline the admittedly terrible experience of online
                resume builders.
              </p>
              <p className="text-xl text-accentDark p-4 ml-2 mr-2">
                We aren't going to charge you, email you, or spam ads at you :)
              </p>
              <p className="text-xl text-accentDark p-4 ml-2 mr-2">
                This is totally free and open source; built by job hunters for job hunters. We hope
                you find it helpful!
              </p>
              <p className="p-2 transform hover:scale-105 cursor-pointer text-center text-accentDark text-2xl font-medium">
                About Us
              </p>
            </div>
          </div>
          <div
            id="forms"
            className="bg-accentLight45 col-start-1 col-end-2 p-4 m-2 flex flex-col justify-center items-center"
          >
            <Switch>
              <Route path="/login" exact>
                <LoginForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
              </Route>
              <Route path="/sign-up" exact>
                <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
              </Route>
            </Switch>
            <div className="flex flex-row m-2 text-lg text-accentDark font-bold">
              <NavLink
                to="/sign-up"
                exact={true}
                className="p-2 transform hover:scale-105 cursor-pointer"
              >
                Sign Up
              </NavLink>
              <p className="pt-2"> | </p>
              <NavLink
                to="/login"
                exact={true}
                className="p-2 transform hover:scale-105 cursor-pointer"
              >
                Log In
              </NavLink>
              <p className="pt-2"> | </p>
              <NavLink
                to="/login"
                exact={true}
                className="p-2 transform hover:scale-105 cursor-pointer"
                disabled={true}
                onClick={loginDemo}
              >
                Demo User
              </NavLink>
            </div>
          </div>
        </div>

        <div id="style-wheel" className="bg-accentLight45 p-4 m-2 col-start-2 col-end-4">
          <h1 className="text-4xl text-accentDark font-semibold mb-3 text-center">
            Some of our Resume style Templates!
          </h1>
          <div className="flex justify-center">
            <img src={testerResume} alt="This is a test image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
