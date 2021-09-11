import { combineReducers } from 'redux'
import navReducer from './nav_reducer'
import matchingUsersReducer from './matching_users_reducer'

export default combineReducers({
  nav: navReducer,
  matching_users: matchingUsersReducer
})
