import { RECEIVE_POKEMON_DETAIL } from '../actions/pokemon_actions'

const itemsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POKEMON_DETAIL:
      return action.detail.items

    default:
      return state
  }
}

export default itemsReducer
