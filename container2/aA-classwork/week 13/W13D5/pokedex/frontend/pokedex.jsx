import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store/store'
import Root from './components/root'
import {requestSinglePokemon, receivePokemon} from './actions/pokemon_actions'
import {HashRouter, Route} from 'react-router-dom'

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore()
  ReactDOM.render(<Root store={store}/>, document.getElementById('root'))
  window.getState = store.getState
  window.dispatch = store.dispatch
})

window.requestSinglePokemon = requestSinglePokemon
window.receivePokemon = receivePokemon
