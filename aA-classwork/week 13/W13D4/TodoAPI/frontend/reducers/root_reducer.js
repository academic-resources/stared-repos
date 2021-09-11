import { combineReducers } from 'redux'
import errorsReducer from './errors_reducer'
import stepsReducer from './steps_reducer'
import todosReducer from './todos_reducer'

const rootReducer = combineReducers({
  todos: todosReducer,
  steps: stepsReducer,
  errors: errorsReducer
})

export default rootReducer
