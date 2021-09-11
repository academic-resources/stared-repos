import React from 'react'
import { connect } from 'react-redux'
import { createPokemon } from '../../actions/pokemon_actions'
import PokemonForm from './pokemon_form'

const mstp = state => {
  return {
    pokemon: {
      name: '',
      attack: '',
      defense: '',
      poke_type: 'fire',
      moves: [],
      image_url: ''
    },
    errors: state.errors
  }
}

const mdtp = dispatch => {
  return {
    action: poke => dispatch(createPokemon(poke))
  }
}

export default connect(
  mstp,
  mdtp
)(PokemonForm)
