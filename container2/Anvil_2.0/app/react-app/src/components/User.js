import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteUserFolder } from "../store/reducers/user";

function User() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const submitDelete = (id) => {
    dispatch(deleteUserFolder(id));
  };

  return (
    <>
      <ul>
        <li>
          <strong>User Id</strong> {user.id}
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
      </ul>

      <ul>
        {user.folders &&
          user.folders.map((folder) => (
            <li key={folder.id}>
              {folder.name}{" "}
              <button onClick={() => submitDelete(folder.id)}>Delete</button>
              <button>
                <NavLink to={`/folder/edit/${folder.id}`}>Edit</NavLink>
              </button>
            </li>
          ))}
      </ul>
    </>
  );
}
export default User;
