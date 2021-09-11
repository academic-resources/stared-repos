import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root'
import { allTodos, allSteps, stepsByTodoId } from './reducers/selectors'

window.allTodos = allTodos
window.allSteps = allSteps
window.stepsByTodoId = stepsByTodoId

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root />, document.getElementById('content'))
})
