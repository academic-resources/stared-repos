import React from 'react'
import { connect } from 'react-redux'
import { createPokemon } from '../../actions/pokemon_actions'

const mdtp = dispatch => {
  return {
    createPokemon: poke => dispatch(createPokemon(poke))
  }
}

export default connect(null, mdtp)(PokemonForm)