import entities_reducer from '../reducers/entities_reducer'

import * as APIUtil from '../util/card_api_util'

import { RECEIVE_BOARD, RECEIVE_VALIDATION_ERRORS } from './board_actions'
import { RECEIVE_LISTS } from './list_actions'
import { END_CARD_EDIT } from './ui_actions'

export const RECEIVE_CARDS = 'RECEIVE_CARDS'
export const RECEIVE_CARD = 'RECEIVE_CARD'

export const createCard = (card, list) => (dispatch, getState) => {
  const currentUserId = getState().session.id
  const cards = Object.values(getState().entities.cards)
    .filter(c => c.list_id === list.id)
    .sort((c1, c2) => c1.order - c2.order)
  let order
  if (cards.length === 0) {
    order = 1
  } else {
    order = cards[cards.length - 1]['order'] + 1
  }
  card.order = order
  return APIUtil.createCard(card, list).then(
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
      return cards
    },
    errors =>
      dispatch({
        type: RECEIVE_VALIDATION_ERRORS,
        errors
      })
  )
}

export const moveCard = data => (dispatch, getState) => {
  const currentUserId = getState().session.id
  return APIUtil.moveCard(data).then(
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

export const updateCard = card => (dispatch, getState) => {
  const currentUserId = getState().session.ider
  return APIUtil.updateCard(card).then(
    card => {
      dispatch({
        type: RECEIVE_CARD,
        card
      })
      dispatch({
        type: END_CARD_EDIT
      })
      return card
    },
    errors =>
      dispatch({
        type: RECEIVE_VALIDATION_ERRORS,
        errors
      })
  )
}

