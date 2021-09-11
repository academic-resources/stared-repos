import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER,
  CLEAR_SESSION_ERRORS
} from '../actions/session_actions'
import { merge } from 'lodash'

export default (state = [], action) => {
  const draft = merge({}, state)

  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors
    case RECEIVE_CURRENT_USER:
      return []
    case CLEAR_SESSION_ERRORS:
      return []
    default:
      return state
  }
}
