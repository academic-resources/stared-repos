import React from 'react'
import { connect } from 'react-redux'
import { receiveTodo, removeTodo } from '../../actions/todo_actions'
import TodoDetailView from './todo_detail_view'

const mdtp = dispatch => ({
  removeTodo: todo => dispatch(removeTodo(todo)),
  receiveTodo: todo => dispatch(receiveTodo(todo))
})

class TodoListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: false
    }
    this.toggleDetail = this.toggleDetail.bind(this)
    this.updateStatus = this.updateStatus.bind(this)
  }

  toggleDetail() {
    this.setState({
      detail: !this.state.detail
    })
  }

  updateStatus(todo) {
    const newTodo = Object.assign({}, todo)
    newTodo.done = !newTodo.done
    this.props.receiveTodo(newTodo)
  }

  render() {
    const { todo, removeTodo } = this.props
    const buttonLabel = todo.done ? 'done' : 'undo'
    return (
      <li>
        <div>
          <div onClick={this.toggleDetail}> {todo.title}</div>
          <button onClick={() => this.updateStatus(todo)}>{buttonLabel}</button>
          {this.state.detail && (
            <div>
              <TodoDetailView todo={todo} removeTodo={removeTodo} />
            </div>
          )}
        </div>
      </li>
    )
  }
}

export default connect(
  null,
  mdtp
)(TodoListItem)
