import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root'
import configureStore from './store/store'

// Genius!!!
// const applyMiddlewares = store => middlewares => {
//   let dispatch = store.dispatch
//   middlewares.forEach(mw => {
//     dispatch = mw(store)(dispatch)
//   })
//   return Object.assign({}, store, { dispatch })
// }

document.addEventListener('DOMContentLoaded', () => {
  const preloadedState = localStorage.state
    ? JSON.parse(localStorage.state)
    : {}
  let store = configureStore(preloadedState)
  const root = document.getElementById('content')
  ReactDOM.render(<Root store={store} />, root)
})
