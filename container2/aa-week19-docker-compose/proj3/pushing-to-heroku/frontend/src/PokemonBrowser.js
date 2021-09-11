import React, { useContext, useEffect } from "react";
import { NavLink, Route } from "react-router-dom";
import { imageUrl } from "./config";
import PokemonDetail from "./PokemonDetail";
import { PokemonContext } from "./PokemonContext";

const PokemonBrowser = () => {
  const { pokemon, loadPokemon } = useContext(PokemonContext);
  // console.log(pokemon);

  useEffect(() => {
    // console.log(pokemon.length)
    if (pokemon.length === 0) loadPokemon();
  }, [loadPokemon, pokemon.length]);
  
  if (!pokemon) return null;

  return (
    <main>
      <nav>
        {pokemon.map((poke) => {
          return (
            <NavLink key={poke.name} to={`/pokemon/${poke.id}`}>
              <div className="nav-entry">
                <div className="nav-entry-image"
                  style={{
                    backgroundImage: `url('${imageUrl}${poke.imageUrl}')`
                  }} />
                <h1>{poke.name}</h1>
              </div>
            </NavLink>
          );
        })}
      </nav>
      <Route
        path="/pokemon/:id"
        render={(props) => <PokemonDetail {...props} />}
      />
    </main>
  );
};

export default PokemonBrowser;
