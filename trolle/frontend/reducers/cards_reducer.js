import { merge } from 'lodash'

import { RECEIVE_CARDS, RECEIVE_CARD } from '../actions/card_actions'

export default (state = {}, action) => {
  const draft = merge({}, state)

  switch (action.type) {
    case RECEIVE_CARDS:
      return action.cards || {}

    case RECEIVE_CARD:
      draft[action.card.id] = action.card
      return draft

    default:
      return state
  }
}
