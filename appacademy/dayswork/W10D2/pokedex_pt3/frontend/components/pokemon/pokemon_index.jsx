import React from 'react'
import PokemonIndexItem from './pokemon_index_item'
import { Route } from 'react-router-dom'
import PokemonDetailContainer from './pokemon_detail_container'

class PokemonIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.requestAllPokemon()
  }

  render() {
    const pokemonLIs = this.props.pokemon.map(poke => {
      return <PokemonIndexItem poke={poke} key={poke.id} />
    })
    return (
      <section className="pokedex">
        <ul className="pokemon-index">{pokemonLIs}</ul>
        <Route path="/pokemon/:pokemonId" component={PokemonDetailContainer} />
      </section>
    )
  }
}

export default PokemonIndex
