import { RECEIVE_POKEMON_ERRORS } from "../actions/pokemon_actions"
import merge from "lodash/merge"

const uiReducer = (state = {}, action) => {
  // debugger
  switch (action.type) {
    case RECEIVE_POKEMON_ERRORS:
      debugger
      let newState = { errors: action.errors }
      return merge({}, state, newState)
    default:
      return state
  }
}

export default uiReducer
