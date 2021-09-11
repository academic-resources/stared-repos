import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { imageUrl } from './config';
import { PokemonContext } from './PokemonContext';

const PokemonDetail = () => {
  const { id } = useParams();
  const { singlePokemon: pokemon, getOnePokemon } = useContext(PokemonContext);
  // console.log(pokemon);

  useEffect(() => {
    if (!pokemon) {
      getOnePokemon(id);
    } else if (pokemon.id !== parseInt(id, 10)) {
      getOnePokemon(id);
    }

  }, [getOnePokemon, pokemon, id]);

  if (!pokemon) return null;

  return (
    <div className="pokemon-detail">
      <h1 className="bigger">{pokemon.name}</h1>
      <div className="pokemon-detail-image-background">
        <div
          className="pokemon-detail-image"
          style={{ backgroundImage: `url('${imageUrl}${pokemon.imageUrl}')` }}
        ></div>
      </div>
      <div className="pokemon-detail-lists">
        <h2>Information</h2>
        <ul>
          <li>
            <b>Type</b> {pokemon.type}
          </li>
          <li>
            <b>Attack</b> {pokemon.attack}
          </li>
          <li>
            <b>Defense</b> {pokemon.defense}
          </li>
          <li>
            <b>Moves</b>
            <ul>
              {pokemon.moves.map((move) => (
                <li key={move}>{move}</li>
              ))}
            </ul>
          </li>
        </ul>
        <h2>Items</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Happiness</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {pokemon.items.map((item) => (
              <tr key={item.name}>
                <td>
                  <img
                    className="item-image"
                    alt={item.imageUrl}
                    src={`${imageUrl}${item.imageUrl}`}
                  />
                </td>
                <td>{item.name}</td>
                <td className="centered">{item.happiness}</td>
                <td className="centered">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PokemonDetail;
