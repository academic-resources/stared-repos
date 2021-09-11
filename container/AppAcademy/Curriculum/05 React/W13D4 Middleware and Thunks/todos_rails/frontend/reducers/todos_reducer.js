import { RECEIVE_TODOS, RECEIVE_TODO } from '../actions/todo_action'

const initialState = {
  1: {
    id: 1,
    title: 'wash car',
    body: 'with soap',
    done: false
  },
  2: {
    id: 2,
    title: 'wash dog',
    body: 'with shampoo',
    done: true
  },
};
//Object.assign
const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_TODOS:
      return action.todos;

    case RECEIVE_TODO:
      const newTodo = { [action.todo.id]: action.todo }
      const newTodos = Object.assign({}, state, newTodo)
      return newTodos
      
    default:
      return state;
  }
}

export default todosReducer

