import React from 'react'
import { connect } from 'react-redux'
import { createStep, fetchSteps } from '../../actions/step_actions'
import StepForm from './step_form'
import StepListItem from './step_list_item'

const mstp = (state, ownProps) => ({
  steps: stepsByTodoId(state, ownProps.todo_id)
})

const mdtp = dispatch => ({
  createStep: step => dispatch(createStep(step)),
  fetchSteps: todo_id => dispatch(fetchSteps(todo_id))
})

class StepList extends React.Component {
  componentDidMount() {
    const { fetchSteps } = this.props
    fetchSteps()
  }

  render() {
    const { steps, createStep, todo_id } = this.props
    return (
      <div>
        <ul>
          {steps.map(step => (
            <StepListItem key={step.id} step={step} />
          ))}
        </ul>
        <StepForm createStep={createStep} todo_id={todo_id} />
      </div>
    )
  }
}

export default connect(
  mstp,
  mdtp
)(StepList)
