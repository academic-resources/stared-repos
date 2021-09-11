import { createStore } from 'redux';
import rootReducer from '../reducers/root_reducer';
import { applyMiddleware } from 'redux'



const configureStore = (preloadedState = {}) => {
  const store = createStore(rootReducer, preloadedState, applyMiddleware(otherMiddleware, addLoggingToDispatch));
  store.subscribe(() => {
    localStorage.state = JSON.stringify(store.getState());
  });
  return store;
}

const addLoggingToDispatch = store => next => action => {
  console.log(store.getState())
  console.log(action)
  let result = next(action)
  console.log(result)
  console.log(store.getState())
  return result
}

const otherMiddleware = store => next => action => {
  console.log(action)
  return next(action)
}

export default configureStore;
