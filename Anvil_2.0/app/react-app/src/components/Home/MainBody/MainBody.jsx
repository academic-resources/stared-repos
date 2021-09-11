import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory, Link } from "react-router-dom";
import { EditFolder, NewFolder, NewFile } from "../../Forms";
import TextEditor from "./TextEditor";
import { editUserFile } from "../../../store/reducers/user";

const MainBody = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [content, setContent] = useState({});
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(undefined);
  const [fileTypeId, setFileTypeId] = useState(1);
  const [fileId, setFileId] = useState(undefined);

  const currentFolder = useSelector((state) => state.user.selectedFolder);
  const defaultFolder = useSelector((state) => state.user.folders[0]);

  useEffect(() => {
    if (defaultFolder) {
      setFolderId(defaultFolder.id);
    }
  }, [defaultFolder, setFolderId]);
  const saveFile = () => {
    const contentString = JSON.stringify(content);
    console.log(contentString);
    dispatch(editUserFile({ fileId, name, contentString, folderId }));
    history.push("/home");
  };

  return (
    <div
      id="forms-and-notes"
      className="flex h-full w-full items-center justify-center"
    >
      <Switch>
        <Route exact path="/home">
          <div>
            <ul>
              {currentFolder &&
                currentFolder.files &&
                currentFolder.files.map((file) => (
                  <Link
                    key={file.id}
                    to={`/home/file/edit/${file.id}`}
                    className="font-jetbrainstext text-xl cursor-pointer font-jetbrains text-accentOne m-2 p-2 hover:underline"
                    onClick={() => {
                      setFileId(file.id);
                      setName(file.name);
                    }}
                  >
                    {file.name}
                  </Link>
                ))}
            </ul>
          </div>
        </Route>
        <Route path="/home/folder/edit/:id">
          <div>
            <EditFolder />
          </div>
        </Route>
        <Route path="/home/folder/new">
          <div>
            <NewFolder />
          </div>
        </Route>
        <Route path="/home/file/new">
          <NewFile
            name={name}
            setName={setName}
            folderId={folderId}
            setFolderId={setFolderId}
            url={url}
            setUrl={setUrl}
            fileTypeId={fileTypeId}
            setFileTypeId={setFileTypeId}
          />
        </Route>
        <Route path="/home/file/edit/:id">
          <div className="flex justify-center items-center flex-col w-full h-full p-3">
            <TextEditor
              content={content}
              setContent={setContent}
              fileId={fileId}
            />
            <div
              className="bg-accentThree text-main text-xl font-bold m-2 rounded-md text-center p-2 font-jetbrains cursor-pointer transform hover:scale-105 w-20"
              onClick={saveFile}
            >
              <button type="submit" onClick={saveFile}>
                Save
              </button>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default MainBody;
