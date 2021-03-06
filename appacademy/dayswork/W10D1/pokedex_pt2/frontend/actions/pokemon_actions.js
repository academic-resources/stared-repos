import * as APIUtil from "../util/api_util";
export const RECEIVE_ALL_POKEMON = "RECEIVE_ALL_POKEMON";
export const RECEIVE_POKEMON_DETAIL = "RECEIVE_POKEMON_DETAIL";
export const RECEIVE_POKEMON = "RECEIVE_POKEMON";

export const receiveAllPokemon = (pokemon) => {
  return {
    type: RECEIVE_ALL_POKEMON,
    pokemon,
  };
};

export const receivePokemonDetail = (detail) => {
  return {
    type: RECEIVE_POKEMON_DETAIL,
    detail,
  };
};

export const receivePokemon = (pokemon) => {
  return {
    type: RECEIVE_POKEMON,
    pokemon,
  };
};

export const requestAllPokemon = () => {
  return (dispatch) => {
    APIUtil.fetchAllPokemon().then((pokemon) => {
      dispatch(receiveAllPokemon(pokemon));
    });
  };
};

export const requestSinglePokemon = (id) => {
  return (dispatch) => {
    APIUtil.fetchPokemonDetail(id).then((detail) => {
      dispatch(receivePokemonDetail(detail));
    });
  };
};

export const createPokemon = (pokemon) => {
  return (dispatch) => {
    APIUtil.createPokemon(pokemon).then((poke) => {
      dispatch(receivePokemon(poke));
    });
  };
};
