export const RECEIVE_ALL_POKEMON = 'RECEIVE_ALL_POKEMON';
export const RECEIVE_POKEMON = 'RECEIVE_POKEMON';
import * as APIUtil from '../util/api_util'

export const receiveAllPokemon = (pokemons) => ({
  type: RECEIVE_ALL_POKEMON,
  pokemons
})

export const receivePokemon = (pokemon) => ({
  type: RECEIVE_POKEMON,
  pokemon
})

// thunk action creators

export const requestAllPokemon = () => {
  return dispatch => {
    APIUtil.fetchAllPokemon()
      .then(pokemons => dispatch(receiveAllPokemon(pokemons)))
  }
}

export const requestPokemon = (id) => {
  return dispatch => {
    APIUtil.fetchPokemon(id)
      .then(payload => dispatch(receivePokemon(payload.pokemon)))
  }
}