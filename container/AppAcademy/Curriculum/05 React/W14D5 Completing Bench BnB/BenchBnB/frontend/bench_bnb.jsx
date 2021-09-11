import React from 'react';
import ReactDOM from 'react-dom';
// import * as APIUtil from './util/session_api_util'
import configureStore from './store/store'
import { login, signup, logout,  } from './actions/session_actions'
import Root from './components/root'
import { fetchBenches } from './actions/bench_actions'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let store
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    }
    store = configureStore(preloadedState)
    delete window.currentUser
  } else {
    store = configureStore()
  }
  window.login = login
  window.logout = logout
  window.signup = signup
  window.store = store
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.fetchBenches = fetchBenches

  ReactDOM.render(<Root store={ store } />, root);
});