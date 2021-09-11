import {
  RECEIVE_ALL_POKEMON,
  RECEIVE_POKEMON,
  START_LOADING_ALL_POKEMON,
  START_LOADING_SINGLE_POKEMON,
  RECEIVE_POKEMON_ERRORS
} from "../actions/pokemon_actions"

const loadingReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ALL_POKEMON:
      return Object.assign({}, state, { indexLoading: false })
    case RECEIVE_POKEMON:
      return Object.assign({}, state, { detailLoading: false })
    case RECEIVE_POKEMON_ERRORS:
      return Object.assign({}, state, { detailLoading: false })
    case START_LOADING_ALL_POKEMON:
      return Object.assign({}, state, { indexLoading: true })
    case START_LOADING_SINGLE_POKEMON:
      return Object.assign({}, state, { detailLoading: true })
    default:
      return state
  }
}

export default loadingReducer
