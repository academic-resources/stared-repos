// @ts-nocheck
import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER
} from '../actions/session_actions'
import { merge } from 'lodash'

const _nullUser = Object.freeze({
  id: null
})

const sessionReducer = (state = _nullUser, action) => {
  const draft = merge({}, state)

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      draft.id = action.currentUser.id
      return draft

    case LOGOUT_CURRENT_USER:
      return _nullUser

    default:
      return state
  }
}

export default sessionReducer
