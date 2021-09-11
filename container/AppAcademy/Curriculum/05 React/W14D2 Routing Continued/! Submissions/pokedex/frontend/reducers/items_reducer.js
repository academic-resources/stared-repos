import { RECEIVE_ALL_ITEMS } from '../actions/pokemon_actions'
import * as APIUtil from '../util/api_util'

export const itemsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_ALL_ITEMS: 
      return action.items

    default:
      return state
  }
}