import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/root_reducer'
import { midware } from '../middleware/thunk'


export const configureStore = createStore(rootReducer, applyMiddleware(midware))