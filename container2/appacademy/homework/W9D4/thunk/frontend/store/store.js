import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../reducers/root_reducer'

const addLoggingToDispatch = store => next => action => {
  console.log({ store_before: store.getState() })
  console.log({ action })
  next(action)
  console.log({ store_after: store.getState() })
}

const sayHi = store => next => action => {
  console.log('Hi before!!')
  next(action)
  console.log('Hi after!!')
}

const configureStore = (preloadedState = {}) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(addLoggingToDispatch, sayHi)
  )
  store.subscribe(() => {
    localStorage.state = JSON.stringify(store.getState())
  })
  return store
}

export default configureStore
