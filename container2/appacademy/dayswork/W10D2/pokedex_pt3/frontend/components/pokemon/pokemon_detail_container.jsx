import React from 'react'
import { connect } from 'react-redux'
import PokemonDetail from './pokemon_detail.jsx'
import { requestSinglePokemon } from '../../actions/pokemon_actions'

const mstp = (state, ownProps) => {
  const id = ownProps.match.params.pokemonId
  const poke = state.entities.pokemon[id] || {}
  return {
    pokemon: poke,
    id,
    items: Object.values(state.entities.items)
  }
}

const mdtp = dispatch => {
  return {
    requestSinglePokemon: id => dispatch(requestSinglePokemon(id))
  }
}

export default connect(
  mstp,
  mdtp
)(PokemonDetail)
