import React from 'react'
import ReactDOM from 'react-dom'
import { fetchAllPokemon, fetchPokemon } from './util/api_util'
import { receiveAllPokemon, requestAllPokemon, receivePokemon, requestPokemon } from './actions/pokemon_actions'
import configureStore from './store/store'
import { selectAllPokemon } from './reducers/selectors'
import Root from './components/root'
import { HashRouter, Route } from 'react-router-dom'
import { requestAllItems } from './actions/items_actions'


document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  const root = document.getElementById('root');
  window.fetchPokemon = fetchPokemon;
  window.receivePokemon = receivePokemon;
  window.store = store;
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.requestPokemon = requestPokemon;
  window.selectAllPokemon = selectAllPokemon;
  window.requestAllItems = requestAllItems;
  ReactDOM.render(<Root store={store}/>, root);
});
