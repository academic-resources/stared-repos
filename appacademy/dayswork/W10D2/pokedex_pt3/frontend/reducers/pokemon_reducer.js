import {
  RECEIVE_ALL_POKEMON,
  RECEIVE_POKEMON_DETAIL,
  RECEIVE_POKEMON
} from '../actions/pokemon_actions'
import { merge } from 'lodash'

const pokemonReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ALL_POKEMON:
      return merge({}, state, action.pokemon)

    case RECEIVE_POKEMON_DETAIL:
      const {
        detail: { pokemon }
      } = action
      const newState = Object.assign({}, state)
      newState[pokemon.id] = pokemon
      return newState

    case RECEIVE_POKEMON:
      const returnVal = merge({}, state, {
        [action.pokemon.id]: action.pokemon
      })
      return returnVal

    default:
      return state
  }
}

export default pokemonReducer
