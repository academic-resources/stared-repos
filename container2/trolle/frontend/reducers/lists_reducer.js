import { merge } from 'lodash'

import { RECEIVE_LISTS } from '../actions/list_actions'

const listsReducer = (state = {}, action) => {
  const draft = merge({}, state)

  switch (action.type) {
    case RECEIVE_LISTS:
      return action.lists || state

    default:
      return state
  }
}

export default listsReducer
