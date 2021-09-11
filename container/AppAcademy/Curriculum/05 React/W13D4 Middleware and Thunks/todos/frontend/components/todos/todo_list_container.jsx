import { connect } from 'react-redux'
import TodoList from './todo_list'
import { allTodos } from '../../reducers/selectors'

//state?
const mapStateToProps = state => {
  const todos = allTodos(state)
  return { todos }
}

const mapDispatchToProps = dispatch => ({
   receiveTodo: (todo) => dispatch(receiveTodo(todo))
  
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
