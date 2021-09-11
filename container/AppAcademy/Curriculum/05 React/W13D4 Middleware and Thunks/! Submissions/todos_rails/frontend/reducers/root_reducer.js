import { combineReducers } from 'redux'
import todosReducer from './todos_reducer'
import errorsReducer from './error_reducer';

const rootReducer = combineReducers ({
  todos: todosReducer,
  errors: errorsReducer
})

export default rootReducer