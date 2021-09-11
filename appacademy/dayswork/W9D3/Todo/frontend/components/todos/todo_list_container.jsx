import { connect } from 'react-redux'
import { receiveTodo } from '../../actions/todo_actions'
import { allTodos } from '../../reducers/selectors'
import TodoList from './todo_list'

const mstp = state => ({
  todos: allTodos(state)
})

const mdtp = dispatch => ({
  receiveTodo: todo => dispatch(receiveTodo(todo))
})

export default connect(
  mstp,
  mdtp
)(TodoList)
