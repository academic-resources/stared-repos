import React from 'react'
import { connect } from 'react-redux'
import { receiveSteps } from '../../actions/step_actions'
import { updateTodo, removeTodo } from '../../actions/todo_actions'
import TodoDetailView from './todo_detail_view'

const mdtp = dispatch => ({
  removeTodo: todo => dispatch(removeTodo(todo)),
  updateTodo: todo => dispatch(updateTodo(todo)),
  receiveSteps: steps => dispatch(receiveSteps(steps))
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
    this.props.updateTodo(newTodo)
  }

  render() {
    const { todo, removeTodo, receiveSteps } = this.props
    const buttonLabel = todo.done ? 'done' : 'undo'
    return (
      <li>
        <div>
          <div onClick={this.toggleDetail}> {todo.title}</div>
          <button onClick={() => this.updateStatus(todo)}>{buttonLabel}</button>
          {this.state.detail && (
            <div>
              <TodoDetailView
                todo={todo}
                removeTodo={removeTodo}
                receiveSteps={receiveSteps}
              />
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
