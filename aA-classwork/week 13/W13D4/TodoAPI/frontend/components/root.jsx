import React from 'react'
import { Provider } from 'react-redux'
import store from '../store/store'
import App from './app'

window.store = store

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default Root
