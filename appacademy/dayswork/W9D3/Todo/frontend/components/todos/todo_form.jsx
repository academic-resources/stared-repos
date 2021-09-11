import React from 'react'
import { uniqueId } from '../../util/util'

class TodoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: ''
    }
    this.updateTitle = this.updateTitle.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.updateBody = this.updateBody.bind(this)
  }

  handleSave(e) {
    e.preventDefault()
    const todo = {
      id: uniqueId(),
      title: this.state.title,
      body: this.state.body,
      done: false
    }
    const { receiveTodo } = this.props
    receiveTodo(todo)
    this.setState({
      title: '',
      body: ''
    })
  }

  updateTitle(e) {
    this.setState({
      title: e.currentTarget.value
    })
  }

  updateBody(e) {
    this.setState({
      body: e.currentTarget.value
    })
  }

  render() {
    return (
      <form className="todo-form">
        <label>
          <input
            className="input"
            value={this.state.title}
            onChange={this.updateTitle}
            placeholder="buy milk"
          />
        </label>
        <label>
          <textarea
            onChange={this.updateBody}
            className="input"
            cols="20"
            rows="5"
            required=""
            value={this.state.body}
          />
        </label>
        <button onClick={this.handleSave} className="create-button">
          Create Todo!
        </button>
      </form>
    )
  }
}

export default TodoForm
