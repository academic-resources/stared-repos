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

export const removeTodo = todo => ({
  type: REMOVE_TODO,
  todo
})

window.receiveTodos = receiveTodos
window.receiveTodo = receiveTodo
window.removeTodo = removeTodo

// Actions
// {
//     type: ACTION_TYPE
//     ...
// }
