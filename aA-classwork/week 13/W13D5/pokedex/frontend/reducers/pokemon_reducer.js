import {RECEIVE_ALL_POKEMON, RECEIVE_POKEMON} from '../actions/pokemon_actions'
import merge from 'lodash/merge'

const pokemonReducer = (state = {}, action) => {
  switch(action.type) {
    case RECEIVE_ALL_POKEMON:
      let pokemons = action.pokemon
      return merge({}, state, pokemons)
    case RECEIVE_POKEMON:
      let pokemon = action.pokemon
      return merge({}, state, pokemon)
    default:
      return state
  }
}

export default pokemonReducer