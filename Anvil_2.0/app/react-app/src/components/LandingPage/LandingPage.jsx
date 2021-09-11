import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";

import { LoginForm, SignUpForm } from "../Forms";
import CommandPrompt from "../CommandPrompt";
import NavBar from "./NavBar";

const LandingPage = () => {
  const [location, setLocation] = useState(window.location.pathname);

  return (
    <div className="bg-main bg-cover h-screen">
      <NavBar setLocation={setLocation} />
      <div className="grid grid-cols-2 h-5/6 mt-8 ml-10 mr-10 mb-8">
        <div className="col-start-1 col-end-1 m-2 p-2 border-2 border-accentThree">
          <CommandPrompt location={location} />
          <div className="w-1/2 h-1/2 ml-6">
            <img
              src="https://anvil-file-bucket.s3.amazonaws.com/images/name-ascii.png"
              alt="hidden"
              className="pt-10 "
            />
            <img
              src="https://anvil-file-bucket.s3.amazonaws.com/images/anvil-ascii.png"
              alt="hidden"
            />
          </div>
        </div>

        <div className="grid grid-row-6 h-full">
          <div className="row-start-1 row-end-2 m-2 p-2 border-2 border-accentThree">
            <CommandPrompt location={location} />
            <div className="mt-12 ml-12">
              <p className="text-accentOne text-xl mb-2">Welcome to Anvil!</p>
              <hr className="w-1/5 mb-2" />
              <p className="text-accentOne text-xl">
                Developers love terminals right? Well here is an editor, that
                looks like a terminal, in your browser, to handle all of your
                editing needs!
              </p>
            </div>
          </div>

          <div className="row-start-2 row-end-7 m-2 p-2 border-2 border-accentThree">
            <CommandPrompt location={location} />
            <div className="flex justify-center items-center h-5/6 overflow-hidden">
              <Switch>
                <Route exact path="/login">
                  <div>
                    <LoginForm />
                  </div>
                </Route>
                <Route exact path="/sign-up">
                  <div>
                    <SignUpForm />
                  </div>
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between w-1/2 m-auto text-accentOne text-3xl">
        <button className="transform hover:scale-105">
          <a href="https://www.linkedin.com/in/william-vincent-5658851ba/">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </button>
        <button className="transform hover:scale-105">
          <a href="https://github.com/WJVincent">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </button>

        <button className="transform hover:scale-105">
          <a href="https://github.com/WJVincent/Anvil">
            <FontAwesomeIcon icon={faCode} />
          </a>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
