import * as APIUtil from '../util/board_api_util'
import { RECEIVE_LISTS } from './list_actions'
import { RECEIVE_CARDS } from './card_actions'

export const RECEIVE_BOARD = 'RECEIVE_BOARD'
export const RECEIVE_BOARDS = 'RECEIVE_BOARDS'
export const UNSTAR_BOARD = 'UNSTAR_BOARD'
export const STAR_BOARD = 'STAR_BOARD'
export const RECEIVE_VALIDATION_ERRORS = 'RECEIVE_VALIDATION_ERRORS'
export const CLEAR_VALIDATION_ERRORS = 'CLEAR_VALIDATION_ERRORS'
export const GET_MEMBERS = 'GET_MEMBERS'
export const RECEIVE_MEMBERS = 'RECEIVE_MEMBERS'

export const createBoard = (board, team_id) => (dispatch, getState) => {
  const currentUserId = getState().session.id
  return APIUtil.createBoard(board).then(
    ({ board }) => {
      dispatch({
        type: RECEIVE_BOARD,
        board,
        currentUserId
      })
      return board
    },
    errors =>
      dispatch({
        type: RECEIVE_VALIDATION_ERRORS,
        errors
      })
  )
}

export const clearValidationErrors = () => ({
  type: CLEAR_VALIDATION_ERRORS
})

export const getBoards = () => (dispatch, getState) => {
  const currentUserId = getState().session.id
  return APIUtil.getBoards().then(
    ({ boards, recent_boards }) => {
      dispatch({
        type: RECEIVE_BOARDS,
        boards,
        recent_boards,
        currentUserId
      })
      return boards
    },
    errors =>
      dispatch({
        type: RECEIVE_VALIDATION_ERRORS,
        errors
      })
  )
}

export const starBoard = id => (dispatch, getState) => {
  const currentUserId = getState().session.id
  return APIUtil.starBoard(id).then(
    ({ board }) => {
      dispatch({
        type: RECEIVE_BOARD,
        board,
        currentUserId
      })
      dispatch({
        type: STAR_BOARD,
        board,
        currentUserId
      })
      return board
    },
    errors =>
      dispatch({
        type: RECEIVE_VALIDATION_ERRORS,
        errors
      })
  )
}

export const unStarBoard = id => (dispatch, getState) => {
  const currentUserId = getState().session.id
  return APIUtil.unStarBoard(id).then(
    ({ board }) => {
      dispatch({
        type: RECEIVE_BOARD,
        board,
        currentUserId
      })
      dispatch({
        type: UNSTAR_BOARD,
        board,
        currentUserId
      })
      return board
    },
    errors =>
      dispatch({
        type: RECEIVE_VALIDATION_ERRORS,
        errors
      })
  )
}

export const addBoardToRecent = id => (dispatch, getState) => {
  const currentUserId = getState().session.id
  return APIUtil.addBoardToRecent(id).then(
    ({ board }) => {
      dispatch({
        type: RECEIVE_BOARD,
        board,
        currentUserId
      })
      return board
    },
    errors =>
      dispatch({
        type: RECEIVE_VALIDATION_ERRORS,
        errors
      })
  )
}

export const updateBoard = board => (dispatch, getState) => {
  const currentUserId = getState().session.id
  return APIUtil.updateBoard(board).then(
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
      return board
    },
    errors =>
      dispatch({
        type: RECEIVE_VALIDATION_ERRORS,
        errors
      })
  )
}

export const getBoard = id => (dispatch, getState) => {
  const currentUserId = getState().session.id
  return APIUtil.getBoard(id).then(
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
      return board
    },
    errors =>
      dispatch({
        type: RECEIVE_VALIDATION_ERRORS,
        errors
      })
  )
}

export const getMembers = board_id => (dispatch, getState) => {
  return APIUtil.getMembers(board_id).then(
    ({ members }) => {
      dispatch({
        type: RECEIVE_MEMBERS,
        members
      })
      return members
    },
    errors =>
      dispatch({
        type: RECEIVE_VALIDATION_ERRORS,
        errors
      })
  )
}
