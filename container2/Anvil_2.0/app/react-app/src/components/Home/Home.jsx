import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCode } from "@fortawesome/free-solid-svg-icons";

import PromptArea from "./PromptArea";
import MainBody from "./MainBody";
import FolderList from "./FolderList";
import LogoutButton from "../auth/LogoutButton";
import Logo from "./Logo";

import { getUserFolder, removeSelectedFolder } from "../../store/reducers/user";

const Home = () => {
  const dispatch = useDispatch();

  const [location, setLocation] = useState(window.location.pathname);
  const [selectedItem, setSelectedItem] = useState(null);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    selectedItem
      ? dispatch(getUserFolder(selectedItem))
      : dispatch(removeSelectedFolder());
  }, [dispatch, selectedItem]);

  return (
    <div id="full-screen" className="bg-main h-screen">
      <div id="page-body" className=" flex flex-col h-full pr-80">
        <div
          id="prompt-area"
          className="flex flex-row h-16 ml-10 mr-10 justify-between pt-10 mb-10 font-jetbrains"
        >
          <PromptArea location={location} setLocation={setLocation} />
        </div>
        <div
          id="container"
          className="h-full mb-10 ml-10 mr-10 mt-5 bg-secondTransparent2 border-2 border-accentThree shadow-lg overflow-hidden"
        >
          <MainBody />
        </div>
      </div>
      <div
        id="sideNav"
        className="bg-secondary flex flex-col fixed right-0 top-0 h-screen w-80 "
      >
        <Logo />
        <div id="folder-area" className="grid grid-rows-5 h-full overflow-auto">
          <FolderList
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
            user={user}
            setLocation={setLocation}
          />
          <div
            id="logout-div"
            className="flex flex-col justify-center items-center"
          >
            <div className="bg-accentThree text-main text-xl font-bold rounded-md text-center p-2 font-jetbrains cursor-pointer transform hover:scale-105">
              <LogoutButton />
            </div>
            <div className="flex flex-row justify-between w-1/2 mt-6 text-accentOne text-2xl">
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
        </div>
      </div>
    </div>
  );
};

export default Home;
