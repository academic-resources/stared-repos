import {
  RECEIVE_TODO,
  RECEIVE_TODOS,
  REMOVE_TODO
} from '../actions/todo_actions'

const initialState = {
  1: {
    id: 1,
    title: 'wash house',
    body: 'with soap',
    done: false
  },
  2: {
    id: 2,
    title: 'wash dog',
    body: 'with shampoo',
    done: true
  }
}

let newTodoList

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_TODOS:
      newTodoList = {}
      action.todos.forEach(todo => {
        newTodoList[todo.id] = todo
      })
      return newTodoList

    case RECEIVE_TODO:
      newTodoList = Object.assign({}, state)
      newTodoList[action.todo.id] = action.todo
      return newTodoList

    case REMOVE_TODO:
      newTodoList = Object.assign({}, state)
      delete newTodoList[action.todo.id]
      return newTodoList

    default:
      return state
  }
}

export default todosReducer
