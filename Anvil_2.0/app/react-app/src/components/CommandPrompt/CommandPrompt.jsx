import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CommandPrompt = ({ location, setLocation }) => {
  const [promptText, setPromptText] = useState("");

  useEffect(() => {
    switch (location) {
      case "/":
        setPromptText(
          'Where "Hello World" meets "It was a dark and stormy night. "'
        );
        break;
      case String(location.match(/\/home\/folder\/edit\/\d+/)):
        setPromptText(" sudo mv folder-name new-folder-name ");
        break;
      case "/home/folder/new":
        setPromptText("mkdir new-folder ");
        break;
      case "/home/file/new":
        setPromptText("touch new-file");
        break;
      case "/home":
        setPromptText(
          ' ~/ sweet ~/  => echo "Windows users wouldn\'t understand "'
        );
        break;
      case "/login":
        setPromptText("Papers please");
        break;
      case "/sign-up":
        setPromptText("Welcome to the dark side, we have cookies :) ");
        break;
      default:
        setPromptText("Something isn't right here.... ");
        break;
    }
  }, [location]);

  const username = useSelector((state) =>
    state.user ? state.user.username : null
  );

  return (
    <h1 className="font-jetbrains font-medium text-lg flex flex-row pb-5">
      <span className="text-accentTwo">
        {" "}
        {location !== "/" &&
        location !== "/login" &&
        location !== "/sign-up" ? (
          <div className="transform hover:scale-105">
            <Link
              to={username ? "/home" : "/"}
              onClick={() => setLocation("/home")}
            >
              {" "}
              {username ? `${username}@Anvil:` : "null@Anvil:"}{" "}
            </Link>
          </div>
        ) : username ? (
          `${username}@Anvil:`
        ) : (
          "null@Anvil:"
        )}{" "}
      </span>{" "}
      <span className="text-accentThree"> [{location}] $ </span>{" "}
      <span className="text-white text-md pl-3">
        {" "}
        {"  "} {promptText}{" "}
      </span>{" "}
      <div className="bg-white w-2.5 h-5 animate-pulse-fast"> </div>{" "}
    </h1>
  );
};

export default CommandPrompt;
