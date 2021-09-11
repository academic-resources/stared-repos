import React from 'react'
import {uniqueID} from '../../util/util'

class TodoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.update = this.update.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    const todo = this.state
    todo.id = uniqueID()
    this.props.receiveTodo(todo)
    this.setState({title: '', body: ''})
  }

  update(field) {
    return e => {
      this.setState({ 
        [field]: e.target.value
      })
    }
  }

  render () {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <label> Title 
          <input onChange={this.update('title')} type="text" value={this.state.title}/>
        </label>
        <label> Body:
          <input onChange={this.update('body')} type="text" value={this.state.body}/>
        </label>
        <input type="submit" value="Create Todo" />
      </form>
    )
  }


}

export default TodoForm