import * as APIUtil from '../util/todo_api_util'
import { clearErrors, receiveErrors } from './error_actions'

// Action Types
export const RECEIVE_TODOS = 'RECEIVE_TODOS'
export const RECEIVE_TODO = 'RECEIVE_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'

// Action Creators
export const receiveTodos = todos => ({
  type: RECEIVE_TODOS,
  todos
})

export const receiveTodo = todo => ({
  type: RECEIVE_TODO,
  todo
})

export const removeTodo = todo => {
  return dispatch => {
    return APIUtil.removeTodo(todo).then(
      todo => {
        dispatch(fetchTodos())
      },
      e => dispatch(receiveErrors(e.responseJSON))
    )
  }
}

export const fetchTodos = () => {
  return dispatch => {
    return APIUtil.fetchTodos().then(
      todos => {
        dispatch(receiveTodos(todos))
      },
      e => console.log(e)
    )
  }
}

export const createTodo = todo => {
  return dispatch => {
    return APIUtil.createTodo(todo).then(
      todo => {
        dispatch(clearErrors())
        dispatch(receiveTodo(todo))
      },
      e => dispatch(receiveErrors(e.responseJSON))
    )
  }
}

export const updateTodo = todo => {
  return dispatch => {
    return APIUtil.updateTodo(todo).then(
      todo => {
        dispatch(clearErrors())
        dispatch(receiveTodo(todo))
      },
      e => dispatch(receiveErrors(e.responseJSON))
    )
  }
}



window.receiveTodos = receiveTodos
window.receiveTodo = receiveTodo
window.removeTodo = removeTodo
window.fetchTodos = fetchTodos

// Actions
// {
//     type: ACTION_TYPE
//     ...
// }
