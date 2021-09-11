import { applyMiddleware, createStore } from 'redux'
import thunk from '../middleware/thunk'
import rootReducer from '../reducers/root_reducer'

const configureStore = createStore(rootReducer, {}, applyMiddleware(thunk))

export default configureStore
