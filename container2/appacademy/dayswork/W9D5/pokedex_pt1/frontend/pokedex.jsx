import React from 'react'
import ReactDOM from 'react-dom'
import { requestAllPokemon } from './actions/pokemon_actions'
import Root from './components/root'
import { selectAllPokemon } from './reducers/selectors'
import configureStore from './store/store'

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore()
  window.getState = store.getState
  window.dispatch = store.dispatch
  window.requestAllPokemon = requestAllPokemon
  window.selectAllPokemon = selectAllPokemon
  const root = document.getElementById('root')
  ReactDOM.render(<Root store={store} />, root)
})
