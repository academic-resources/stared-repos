import { connect } from 'react-redux';
import TodoListForm from './todo_form'


const mapDispatchToProps = (dispatch) => ({
  receiveTodo: (todo) => dispatch(receiveTodo(todo))
});

export default connect(null, mapDispatchToProps)(TodoListForm);