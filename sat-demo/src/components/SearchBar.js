import { useState } from "react";
import { useHistory } from "react-router-dom";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/explore/${query}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        placeholder="Search Breweries"
        onChange={(e) => setQuery(e.target.value)}
      ></input>
    </form>
  );
};

export default Searchbar;
