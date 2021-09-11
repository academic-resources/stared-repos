export const TOGGLE_BOARDS_MENU = 'TOGGLE_BOARDS_MENU'
export const TOGGLE_PROFILE_MENU = 'TOGGLE_PROFILE_MENU'
export const TOGGLE_SEARCH_RESULTS_LIST = 'TOGGLE_SEARCH_RESULTS_LIST'
export const SET_SELECTED_HOME_MENU_ITEM = 'SET_SELECTED_HOME_MENU_ITEM'
export const EDIT_CARD = 'EDIT_CARD'
export const END_CARD_EDIT = 'END_CARD_EDIT'


export const toggleBoardsMenu = () => ({
  type: TOGGLE_BOARDS_MENU
})

export const toggleProfileMenu = () => ({
  type: TOGGLE_PROFILE_MENU
})

export const toggleSearchResultsList = () => ({
  type: TOGGLE_SEARCH_RESULTS_LIST
})

export const setSelectedHomeMenuItem = selection => ({
  type: SET_SELECTED_HOME_MENU_ITEM,
  selection
})

export const editCard = id => ({
  type: EDIT_CARD,
  id
})

