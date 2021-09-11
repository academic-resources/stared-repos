// @ts-nocheck
import { merge } from 'lodash'

import {
  TOGGLE_BOARDS_MENU,
  TOGGLE_PROFILE_MENU,
  TOGGLE_SEARCH_RESULTS_LIST,
  SET_SELECTED_HOME_MENU_ITEM,
  END_CARD_EDIT,
  EDIT_CARD
} from '../actions/ui_actions'

const navReducer = (state = {}, action) => {
  const draft = merge({}, state)


  switch (action.type) {
    case TOGGLE_BOARDS_MENU:
      draft.boards_menu = !draft.boards_menu
      return draft

    case TOGGLE_PROFILE_MENU:
      draft.profile_menu = !draft.profile_menu
      return draft

    case TOGGLE_SEARCH_RESULTS_LIST:
      draft.search_results_list = !draft.search_results_list
      return draft

    case SET_SELECTED_HOME_MENU_ITEM:
      draft.home_menu = action.selection
      return draft

    case EDIT_CARD:
      draft.card_editing = action.id
      return draft

    case END_CARD_EDIT:
      draft.card_editing = -1
      return draft

    default:
      return state
  }
}

export default navReducer
