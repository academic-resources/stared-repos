import { combineReducers } from 'redux'

import users from './users_reducer'
import cards from './cards_reducer'
import teams from './teams_reducer'
import boards from './boards_reducer'
import lists from './lists_reducer'

export default combineReducers({
  users,
  cards,
  teams,
  boards,
  lists
})
