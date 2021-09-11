import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from '../middleware/thunk'
import rootReducer from '../reducers/root_reducer'

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk, logger))
}

export default configureStore
