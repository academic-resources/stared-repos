import { useHistory } from "react-router-dom";
import { useUser } from "../context/UserContext";

const barry = {
  id: 2,
  name: "Barry",
  age: 25,
  favBrews: [],
  favFood: "pizza",
};

const james = {
  id: 1,
  name: "James",
  age: 27,
  favBrews: [],
  favFood: "tacos",
};

const Profile = () => {
  const { user, setUser } = useUser();
  const history = useHistory();

  const increaseAge = () => {
    const newAge = user.age + 1;
    setUser({ ...user, age: newAge });
  };

  const changeUser = () => setUser(user.id === 1 ? barry : james);

  const changeUserAndGoHome = () => {
    setUser(user.id === 1 ? barry : james);
    history.push("/");
  };

  const unFavoriteBrewery = (brewery) => {
    const newFavorites = user.favBrews.filter((brew) => brew.id !== brewery.id);
    setUser({ ...user, favBrews: newFavorites });
  };
  return (
    <>
      <div> This is user {user.id}'s Profile Page</div>
      <div> His name is {user.name}</div>
      <div>He is {user.age} years old</div>
      <div>
        His favorite food{" "}
        {user.favFood[user.favFood.length - 1] === "s" ? "are " : "is "}
        {user.favFood}
      </div>
      <button onClick={increaseAge}>Increase Age</button>
      <button onClick={changeUser}>Change User</button>
      <button onClick={changeUserAndGoHome}>Swap user and go home</button>
      <h1>{user.name}'s Favorite Brews:</h1>
      {user.favBrews.length === 0
        ? "Search for brews to add to your favorites"
        : user.favBrews.map((brewery) => {
            console.log(brewery);
            const { id, city, name, phone, website_url } = brewery;

            return (
              <div key={id}>
                <h2>{name}</h2>
                <div>City: {city}</div>
                <div>Name: {name}</div>
                <div>Phone number: {phone}</div>
                <a href={website_url}>{website_url}</a>
                <button
                  style={{ display: "block" }}
                  onClick={() => unFavoriteBrewery(brewery)}
                >
                  Unfavorite
                </button>
              </div>
            );
          })}
    </>
  );
};

export default Profile;
