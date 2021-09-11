import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore as store } from './store/store'
import { receiveTodos, receiveTodo, fetchTodos} from './actions/todo_action'
// import App from './components/app'
import Root from './components/root'
import { allTodos } from './reducers/selectors'
// import { fetchTodos } from './util/todo_api_util'


document.addEventListener("DOMContentLoaded", ()=>{
    
    const root = document.getElementById("root");
    window.store = store
    window.receiveTodos = receiveTodos
    window.receiveTodo = receiveTodo
    window.allTodos = allTodos
    window.fetchTodos = fetchTodos;
    ReactDOM.render(<Root store={store} />, root);

});