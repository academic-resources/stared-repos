import { RECEIVE_ALL_POKEMON, RECEIVE_POKEMON } from '../actions/pokemon_actions'

export const pokemonReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ALL_POKEMON:
      return action.pokemons
    
    case RECEIVE_POKEMON:
      return [action.pokemon]
      
    default:
      return state
  }
}