import React from 'react'
import ReactDOM from 'react-dom'
import { fetchAllPokemon } from './util/api_util'
import { receiveAllPokemon, requestAllPokemon } from './actions/pokemon_actions'
import configureStore from './store/store'


document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  const root = document.getElementById('root');
  window.fetchAllPokemon = fetchAllPokemon;
  window.receiveAllPokemon = receiveAllPokemon;
  window.store = store;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.requestAllPokemon = requestAllPokemon;
  ReactDOM.render(<h1>Pokedex</h1>, root);
});
