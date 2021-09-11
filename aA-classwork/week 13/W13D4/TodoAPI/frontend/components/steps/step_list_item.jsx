import React from 'react'
import { connect } from 'react-redux'
import { createStep, removeStep, updateStep } from '../../actions/step_actions'

const mdtp = dispatch => ({
  removeStep: step => dispatch(removeStep(step)),
  createStep: step => dispatch(createStep(step)),
  updateStep: step => dispatch(updateStep(step))
})

class StepListItem extends React.Component {
  constructor(props) {
    super(props)
    this.updateStatus = this.updateStatus.bind(this)
  }

  updateStatus(step) {
    const newStep = Object.assign({}, step)
    newStep.done = !newStep.done
    this.props.updateStep(newStep)
  }

  render() {
    const { step } = this.props
    const buttonLabel = step.done ? 'done' : 'undo'
    return (
      <li>
        <div>
          <div>{step.title}</div>
          <div>{step.body}</div>
          <button onClick={() => this.updateStatus(step)}>{buttonLabel}</button>
        </div>
      </li>
    )
  }
}

export default connect(
  null,
  mdtp
)(StepListItem)
