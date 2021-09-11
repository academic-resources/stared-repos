import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

const Explore = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUser();
  const { searchParam } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://api.openbrewerydb.org/breweries/search?query=${searchParam}`
        );
        const data = await res.json();
        setResults(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [searchParam]);

  const favoriteBrewery = (brewery) => {
    const newFavorites = [...user.favBrews, brewery];
    setUser({ ...user, favBrews: newFavorites });
  };

  const unFavoriteBrewery = (brewery) => {
    const newFavorites = user.favBrews.filter((brew) => brew.id !== brewery.id);
    setUser({ ...user, favBrews: newFavorites });
  };

  if (loading) return <h1> Loading...</h1>;
  if (results.length === 0) {
    return <h1>No results found</h1>;
  }
  return (
    <div>
      {results.map((brewery) => {
        const { name, state, website_url, phone, id } = brewery;
        const isFav = user.favBrews.some((brew) => brew.id === id);

        return (
          <div
            key={id}
            style={{
              padding: "10px",
              display: "flex",
              width: "400px",
              flexFlow: "column",
            }}
          >
            <h1>{name}</h1>
            <div>State: {state}</div>
            <div> Phone Number: {phone}</div>
            <a href={website_url}>{website_url}</a>

            <button
              style={{ width: "200px" }}
              onClick={() =>
                isFav ? unFavoriteBrewery(brewery) : favoriteBrewery(brewery)
              }
            >
              {isFav ? "Unfavorite Brewery!" : "Favorite Brewery!"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Explore;
