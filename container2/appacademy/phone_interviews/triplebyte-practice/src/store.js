import { createStore } from 'redux'
import root_reducer from './reducers/root_reducer'

export default createStore(
  root_reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
