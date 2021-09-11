import React from "react"
import { Link } from "react-router-dom"

const PokemonIndexItem = ({ pokemon }) => {
  return (
    <li>
      <Link to={`/pokemon/${pokemon.id}`} className="pokemon-single">
        <div className="simple-text">{pokemon.id}</div>
        <div className="simple-text">{pokemon.name}</div>
        <img src={pokemon.image_url} alt="pokemon" width="30" />
      </Link>
    </li>
  )
}

export default PokemonIndexItem
