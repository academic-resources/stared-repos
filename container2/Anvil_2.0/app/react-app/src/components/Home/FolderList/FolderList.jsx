import Folder from "./Folder";
import "./Folder.css";
const FolderList = ({ selectedItem, setSelectedItem, user, setLocation }) => {
  return (
    <div
      id="folders"
      className="overflow-y-scroll row-start-1 pt-3 pb-2 pl-2 row-end-5"
    >
      <ul>
        {user.folders &&
          user.folders.map((folder) => (
            <Folder
              key={folder.id}
              folder={folder}
              setSelectedItem={setSelectedItem}
              selectedItem={selectedItem}
              setLocation={setLocation}
            />
          ))}
      </ul>
    </div>
  );
};

export default FolderList;
