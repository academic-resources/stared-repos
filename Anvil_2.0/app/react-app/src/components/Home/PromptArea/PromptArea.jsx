import { Link } from "react-router-dom";

import CommandPrompt from "../../CommandPrompt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faFileCode } from "@fortawesome/free-solid-svg-icons";

const PromptArea = ({ location, setLocation }) => {
  return (
    <>
      <CommandPrompt location={location} setLocation={setLocation} />

      <div className="pr-5">
        <button
          className=" text-accentTwo text-3xl pr-2 transform hover:scale-105"
          onClick={() => setLocation(window.location.pathname)}
        >
          <Link to="/home/file/new">
            <FontAwesomeIcon icon={faFileCode} />
          </Link>
        </button>
        <button
          className=" text-accentTwo text-3xl pl-2 transform hover:scale-105"
          onClick={() => setLocation(window.location.pathname)}
        >
          <Link to="/home/folder/new">
            <FontAwesomeIcon icon={faFolderPlus} />
          </Link>
        </button>
      </div>
    </>
  );
};

export default PromptArea;
