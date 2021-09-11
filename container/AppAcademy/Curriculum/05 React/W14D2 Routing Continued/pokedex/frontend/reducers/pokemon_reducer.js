import { RECEIVE_ALL_POKEMON, RECEIVE_POKEMON } from '../actions/pokemon_actions'
import { merge } from 'lodash'

export const pokemonReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ALL_POKEMON:
      // merge with the old state, 
      // make sure the state is formatted correctly
      return merge({}, state, action.pokemon)
      
    case RECEIVE_POKEMON:
      const { pokemon } = action
      const selectedPokemon = {
        [pokemon.id]: pokemon,
      }
      return merge({}, state, selectedPokemon)
      
    default:
      return state
  }
}