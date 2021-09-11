import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/store.js';
import { receiveTodos, receiveTodo } from './actions/todo_actions';
import Root from './components/root';
import allTodos from './reducers/selectors';


const store = configureStore();

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  window.store = store;
  window.receiveTodos = receiveTodos;
  window.receiveTodo = receiveTodo;
  window.allTodos = allTodos;
  ReactDOM.render(<Root store={store}/>, root);
});

