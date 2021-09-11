import React from 'react'
import ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import reducer from './reducers'
import App from './App'

import './style.scss'

const store = createStore(reducer, applyMiddleware(thunk))

const root = document.getElementById('root')

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    root
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./App', () => render(App))
  module.hot.accept('./reducers', () => store.replaceReducer(reducer))
}
