import { connect } from 'react-redux'
import { createTodo, fetchTodos, receiveTodo } from '../../actions/todo_actions'
import { allErrors, allTodos } from '../../reducers/selectors'
import TodoList from './todo_list'

const mstp = state => ({
  todos: allTodos(state),
  errors: allErrors(state)
})

const mdtp = dispatch => ({
  receiveTodo: todo => dispatch(receiveTodo(todo)),
  fetchTodos: () => dispatch(fetchTodos()),
  createTodo: todo => dispatch(createTodo(todo))
})

export default connect(
  mstp,
  mdtp
)(TodoList)
