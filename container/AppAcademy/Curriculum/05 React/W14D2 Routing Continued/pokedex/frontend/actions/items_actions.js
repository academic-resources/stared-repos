export const RECEIVE_ALL_ITEMS = 'RECEIVE_ALL_ITEMS';

import * as APIUtil from '../util/api_util'

export const receiveAllItems = (items) => ({
  type: RECEIVE_ALL_ITEMS,
  items
});

export const requestAllItems = (pokemonId) => {
  return dispatch => {
    APIUtil.fetchPokemon(pokemonId)
      .then(entity => {
        console.log(entity);
        return dispatch(receiveAllItems(entity.pokemon.items))
      })
  }
}