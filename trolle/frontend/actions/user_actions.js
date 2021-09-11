import * as ApiUtils from '../util/board_api_util'

import { RECEIVE_BOARD, getMembers } from './board_actions'

export const RECEIVE_MATCHING_USERS = 'RECEIVE_MATCHING_USERS'

export const getMatchingUsers = (matching_string, board_id) => dispatch => {
  return ApiUtils.getMatchingUsers(matching_string, board_id).then(
    ({ users }) =>
      dispatch({
        type: RECEIVE_MATCHING_USERS,
        users
      })
  )
}

export const inviteUsers = (user_ids, board_id) => (dispatch, getState) => {
  const currentUserId = getState().session.id

  ApiUtils.inviteUsers(user_ids, board_id).then(({ board }) => {
    dispatch({
      type: RECEIVE_BOARD,
      board,
      currentUserId
    })
    dispatch(getMembers(board.id))
    return board
  })
}
