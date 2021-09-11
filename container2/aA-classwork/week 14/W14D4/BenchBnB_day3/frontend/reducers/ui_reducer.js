import { combineReducers } from 'redux'
import filterReducer from './filter_reducer'

export default combineReducers({
  filters: filterReducer
})
