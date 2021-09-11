import React from 'react'
import { uniqueId } from '../../util/util'

class StepForm extends React.Component {
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
    const step = {
      id: uniqueId(),
      title: this.state.title,
      body: this.state.body,
      todo_id: this.props.todo_id,
      done: false
    }
    const { createStep } = this.props
    createStep(step)
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
      <form className="step-form">
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
          Create Step!
        </button>
      </form>
    )
  }
}

export default StepForm
