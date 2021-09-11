import { connect } from 'react-redux'
import TodoList from './todo_list'
import { allTodos } from '../../reducers/selectors'
import { createTodo } from '../../actions/todo_action'


//state?
const mapStateToProps = state => {
  const todos = allTodos(state)

  //create array for errors, pass it down in return
  return { todos,
           errors: state.errors }
}

const mapDispatchToProps = dispatch => ({
   createTodo: (todo) => dispatch(createTodo(todo))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
