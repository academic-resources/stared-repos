import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root'
import { allTodos } from './reducers/selectors'

window.allTodos = allTodos

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root />, document.getElementById('content'))
})
