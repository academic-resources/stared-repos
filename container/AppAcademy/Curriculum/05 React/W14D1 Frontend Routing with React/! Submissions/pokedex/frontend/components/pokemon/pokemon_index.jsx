import React from 'react'
import { PokemonIndexItem } from './pokemon_index_item';

class PokemonIndex extends React.Component {

  componentDidMount() {
    this.props.requestAllPokemon();
  }
  
  render() {
    debugger
    const pokemonLis = this.props.pokemon.map((pokemonLi) => {
      debugger
      return <PokemonIndexItem key={pokemonLi.id} pokemon={pokemonLi} />
    })

    return (
      <ul>
        {pokemonLis}
      </ul>
    );
  }
}

export default PokemonIndex