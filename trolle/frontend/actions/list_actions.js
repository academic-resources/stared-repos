import * as APIUtil from '../util/list_api_util'

import { RECEIVE_BOARD, RECEIVE_VALIDATION_ERRORS } from './board_actions'
import { RECEIVE_CARDS } from './card_actions'

export const RECEIVE_LISTS = 'RECEIVE_LISTS'

export const createList = (list, board) => (dispatch, getState) => {
  const currentUserId = getState().session.id
  return APIUtil.createList(list, board).then(
    ({ board, lists }) => {
      dispatch({
        type: RECEIVE_BOARD,
        board,
        currentUserId
      })
      dispatch({
        type: RECEIVE_LISTS,
        lists
      })
      return lists
    },
    errors =>
      dispatch({
        type: RECEIVE_VALIDATION_ERRORS,
        errors
      })
  )
}

export const updateList = list => (dispatch, getState) => {
  const currentUserId = getState().session.id
  return APIUtil.updateList(list).then(
    ({ board, lists, cards }) => {
      dispatch({
        type: RECEIVE_BOARD,
        board,
        currentUserId
      })
      dispatch({
        type: RECEIVE_LISTS,
        lists
      })
      dispatch({
        type: RECEIVE_CARDS,
        cards
      })
      return lists
    },
    errors =>
      dispatch({
        type: RECEIVE_VALIDATION_ERRORS,
        errors
      })
  )
}
