import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPenSquare } from "@fortawesome/free-solid-svg-icons";

import { deleteUserFolder } from "../../../../store/reducers/user";

const Folder = ({ folder, selectedItem, setSelectedItem, setLocation }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const SubmitDelete = (folderId) => {
    dispatch(deleteUserFolder(folderId));
  };

  return (
    <li
      key={folder.id}
      className="font-jetbrainstext text-xl cursor-pointer font-jetbrains"
    >
      <p
        className="relative inline-block hover:underline"
        style={
          selectedItem === folder.id
            ? { color: "#50fa7b" }
            : { color: "#8be9fd" }
        }
        onClick={() => {
          selectedItem !== folder.id
            ? setSelectedItem(folder.id)
            : setSelectedItem(null);
          return history.push("/home");
        }}
      >
        {selectedItem === folder.id ? `v ${folder.name}` : `> ${folder.name}`}
      </p>
      <div
        style={
          selectedItem === folder.id
            ? { display: "block" }
            : { display: "none" }
        }
        className="hidden relative w-20 h-10 text-2xl"
      >
        <div className="flex flex-row justify-between pt-2 pl-4">
          <button
            className="text-accentTwo transform hover:scale-105"
            onClick={() => setLocation(window.location.pathname)}
          >
            <Link to={`/home/folder/edit/${folder.id}`}>
              <FontAwesomeIcon icon={faPenSquare} />
            </Link>
          </button>

          <button
            onClick={() => SubmitDelete(folder.id)}
            className="pl-1 text-accentFour transform hover:scale-105"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default Folder;
