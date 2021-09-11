import React from 'react'
import { PokemonIndexItem } from './pokemon_index_item'
import { Route } from 'react-router-dom'
import PokemonDetail from './pokemon_detail_container'

class PokemonIndex extends React.Component {

  componentDidMount() {
    this.props.requestAllPokemon();
  }
  
  render() {
    const pokemonLis = this.props.pokemon.map((pokemonLi) => {
      return <PokemonIndexItem key={pokemonLi.id} pokemon={pokemonLi} />
    })

    return (
      <div>
        <Route component={PokemonDetail} path='/pokemon/:pokemonId' />
        <ul>
          {pokemonLis}
        </ul>
      </div>
    );
  }
}

export default PokemonIndex