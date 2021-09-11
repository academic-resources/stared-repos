export const RECEIVE_ALL_POKEMON = "RECEIVE_ALL_POKEMON"
export const RECEIVE_POKEMON = "RECEIVE_POKEMON"
export const RECEIVE_POKEMON_ERRORS = "RECEIVE_POKEMON_ERRORS"
export const START_LOADING_ALL_POKEMON = "START_LOADING_ALL_POKEMON"
export const START_LOADING_SINGLE_POKEMON = "START_LOADING_SINGLE_POKEMON"
import * as APIUtil from "../util/api_util"

export const receiveAllPokemon = pokemon => ({
  type: RECEIVE_ALL_POKEMON,
  pokemon
})

export const receivePokemon = pokemon => ({
  type: RECEIVE_POKEMON,
  pokemon
})

export const receivePokemonErrors = errors => {
  debugger
  return {
    type: RECEIVE_POKEMON_ERRORS,
    errors
  }
}

const startLoadingAllPokemon = () => ({
  type: START_LOADING_ALL_POKEMON
})

const startLoadingSinglePokemon = () => ({
  type: START_LOADING_SINGLE_POKEMON
})

export const requestAllPokemon = () => dispatch => {
  dispatch(startLoadingAllPokemon())
  return APIUtil.fetchAllPokemon().then(pokemon =>
    dispatch(receiveAllPokemon(pokemon))
  )
}

export const requestSinglePokemon = id => dispatch => {
  dispatch(startLoadingSinglePokemon())
  return APIUtil.fetchPokemonById(id).then(pokemon =>
    dispatch(receivePokemon(pokemon))
  )
}

export const createPokemon = pokemon => dispatch =>
  APIUtil.sendPokemonInfo(pokemon).then(
    pokemon => {
      dispatch(receivePokemon(pokemon))
      return pokemon
    },
    err => {
      debugger
      dispatch(receivePokemonErrors(err.responseJSON))
    }
  )
