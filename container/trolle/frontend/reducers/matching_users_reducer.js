import { merge } from 'lodash'

import { RECEIVE_MATCHING_USERS } from '../actions/user_actions'

const matchingUsersReducer = (state = {}, action) => {
  const draft = merge({}, state)

  switch (action.type) {
    case RECEIVE_MATCHING_USERS:
      return action.users || {}

    default:
      return state
  }
}

export default matchingUsersReducer
