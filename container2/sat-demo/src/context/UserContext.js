import { useState, createContext, useContext } from "react";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const UserContextWrapper = ({ children }) => {
  const [user, setUser] = useState({
    id: 1,
    name: "James",
    age: 27,
    favBrews: [],
    favFood: "tacos",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextWrapper;
