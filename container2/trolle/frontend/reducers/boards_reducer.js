import { merge } from 'lodash'

import { RECEIVE_BOARD, RECEIVE_BOARDS } from '../actions/board_actions'

const boardsReducer = (state = {}, action) => {
  const draft = merge({}, state)

  switch (action.type) {
    case RECEIVE_BOARDS:
      return action.boards || state

    case RECEIVE_BOARD:
      draft[action.board.id] = action.board
      return draft

    default:
      return state
  }
}

export default boardsReducer
