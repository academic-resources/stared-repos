import React from 'react'
import { Link } from 'react-router-dom' 

export const PokemonIndexItem = ({pokemon}) => {
  return (
    <li key={pokemon.id}>
      <Link to={`/pokemon/${pokemon.id}`}>
        {pokemon.name}
        <img src={pokemon.image_url}
          alt={pokemon.name}
          width={300}
          height={300} />
      </Link>
    </li>
  )
}