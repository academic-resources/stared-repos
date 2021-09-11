import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from '../middleware/thunk'
import rootReducer from '../reducers/root_reducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const configureStore = () => {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
  )
}

export default configureStore
