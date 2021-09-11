import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

import taten from "./taten-pic.png";
import matthew from "./matthew-pic.jpeg";
import johnny from "./johnny-pic.jpeg";
import william from "./william-pic.jpeg";

const AboutPage = () => {
  return (
    <div className="m-4">
      <div className="text-center pt-4 bg-main mb-2 pb-4">
        <h1 className="text-6xl text-accentDark">About Us</h1>
        <div className="flex justify-center">
          <NavLink
            to="/"
            className="transform hover:scale-105 text-accentDark text-2xl p-2 cursor-pointer"
          >
            Home
          </NavLink>
        </div>
      </div>

      <div className="bg-main mt-2 mb-4 p-4">
        <p className="text-xl text-accentDark m-2 p-2">
          We decided to build this app because all of us were in need of an
          updated resume and many online resume builders are paid, full of ads,
          and will email you every five seconds after you do anything on thier
          site. None of these were very attractive to us and so we set out to
          build our own. We wanted a minimal look and feel, as well as a
          streamlined approach to resume building with templates taking care of
          the design of the resume and only wanting the user to supply the
          relevant content.
        </p>

        <p className="text-xl text-accentDark m-2 p-2">
          We used flask on the backend and react on the frontend. For our
          database we chose to use postgres and SQLachemy/alembic. We chose to
          use tailwind for our css for the benefit of having the freedom of
          vanilla css and the conveince of preset alias and our own custom
          aliases.
        </p>
      </div>

      <div
        id="contributors"
        className="bg-main mt-2 mb-4 p-4 grid grid-cols-2 grid-rows-2"
      >
        <div className="bg-accentLight45 p-4 m-2 flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center p-2">
            <h1 className="text-accentDark text-2xl p-2">Taten Knight</h1>
            <a
              href="https://www.linkedin.com/in/taten-knight/"
              className="text-2xl text-accentDark p-2"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://github.com/Potaten2015"
              className="text-2xl text-accentDark p-2"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>

          <div>
            <img src={taten} alt="taten profile"></img>
          </div>
        </div>

        <div className="bg-accentLight45 p-4 m-2 flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center p-2">
            <h1 className="text-accentDark text-2xl p-2">Matthew Hasan</h1>
            <a className="text-2xl text-accentDark p-2">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://github.com/MattMav21"
              className="text-2xl text-accentDark p-2"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>

          <div>
            <img src={matthew} alt="matthew profile"></img>
          </div>
        </div>

        <div className="bg-accentLight45 p-4 m-2 flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center p-2">
            <h1 className="text-accentDark text-2xl p-2">Johnny Tran</h1>
            <a
              href="https://www.linkedin.com/in/johnny-tran-8760601bb/"
              className="text-2xl text-accentDark p-2"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://github.com/TranJohnny"
              className="text-2xl text-accentDark p-2"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
          <div>
            <img src={johnny} alt="johnny profile"></img>
          </div>
        </div>

        <div className="bg-accentLight45 p-4 m-2 flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center p-2">
            <h1 className="text-accentDark text-2xl p-2">William Vincent</h1>

            <a
              href="https://github.com/WJVincent"
              className="text-2xl text-accentDark p-2"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://www.linkedin.com/in/william-vincent-5658851ba/"
              className="text-2xl text-accentDark p-2"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
          <div>
            <img src={william} alt="william profile"></img>
          </div>
        </div>
      </div>
      <div id="site-description"></div>
    </div>
  );
};

export default AboutPage;
