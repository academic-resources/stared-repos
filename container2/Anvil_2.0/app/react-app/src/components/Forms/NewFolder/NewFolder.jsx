import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../store/reducers/categories";
import { createUserFolder } from "../../../store/reducers/user";

const NewFolder = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(1);

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.id);
  const categoryList = useSelector((state) => state.categories.all);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFolderData = {
      name: name,
      userId: currentUser,
      categoryId: Number(category),
    };
    dispatch(createUserFolder(newFolderData));
    return newFolderData;
  };

  return (
    <div>
      <h1 className="text-accentOne text-3xl mb-6 font-jetbrains">
        New Folder
      </h1>
      <form
        onSubmit={onSubmit}
        className="bg-secondTransparent flex flex-col w-96"
      >
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="=> folder name"
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
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
        </select>
        <div className="bg-accentThree text-main text-xl font-bold m-2 rounded-md text-center p-2 font-jetbrains cursor-pointer transform hover:scale-105">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewFolder;
