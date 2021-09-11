import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCategories } from "../../../store/reducers/categories";
import { editUserFolder, getUserFolder } from "../../../store/reducers/user";

const EditFolder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const categoryList = useSelector((state) => state.categories.all);
  const userFolder = useSelector((state) => state.user.selectedFolder);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserFolder(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (userFolder) {
      setName(userFolder.name);
      setCategory(userFolder.category.id);
    }
  }, [userFolder]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFolderData = {
      id: id,
      name: name,
      category: category,
    };
    dispatch(editUserFolder(newFolderData));
  };

  return (
    <div>
      <h1 className="text-accentOne text-2xl mb-6 font-jetbrains">
        Edit <span className="text-accentThree">"{name}"</span> Folder
      </h1>
      {userFolder && (
        <form
          onSubmit={onSubmit}
          className="bg-secondTransparent flex flex-col w-96"
        >
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            value={name}
            className="bg-secondTransparent text-xl text-left pl-3 pb-3 pt-3 text-accentOne outline-none placeholder-accentOne border-2 border-accentThree font-jetbrains"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="font-jetbrains text-xl mt-4 mb-6 text-accentOne m-auto w-full h-12 bg-secondary outline-none"
          >
            {categoryList &&
              categoryList.map((category) => (
                <option
                  className="select-options"
                  value={category.id}
                  key={category.id}
                >
                  {category.name}
                </option>
              ))}
          </select>
          <div className="bg-accentThree text-main text-xl font-bold m-2 rounded-md text-center p-2 font-jetbrains cursor-pointer transform hover:scale-105">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditFolder;
