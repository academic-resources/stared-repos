import * as APIUtil from '../util/step_api_util'
import { clearErrors, receiveErrors } from './error_actions'

export const RECEIVE_STEPS = 'RECEIVE_STEPS'
export const RECEIVE_STEP = 'RECEIVE_STEP'
export const REMOVE_STEP = 'REMOVE_STEP'

// Action Creators
export const receiveSteps = steps => ({
  type: RECEIVE_STEPS,
  steps
})

export const receiveStep = step => ({
  type: RECEIVE_STEP,
  step
})

export const fetchSteps = todo_id => {
  return dispatch => {
    return APIUtil.fetchSteps(todo_id).then(
      steps => {
        dispatch(receiveSteps(steps))
      },
      e => console.log(e)
    )
  }
}

export const removeStep = step => {
  return dispatch => {
    return APIUtil.removeStep(step).then(
      step => {
        dispatch(fetchSteps(step.todo_id))
      },
      e => dispatch(receiveErrors(e.responseJSON))
    )
  }
}

export const createStep = step => {
  return dispatch => {
    return APIUtil.createStep(step).then(
      step => {
        dispatch(clearErrors())
        dispatch(receiveStep(step))
      },
      e => dispatch(receiveErrors(e.responseJSON))
    )
  }
}

export const updateStep = step => {
  return dispatch => {
    return APIUtil.updateStep(step).then(
      step => {
        dispatch(clearErrors())
        dispatch(fetchSteps(step.todo_id))
      },
      e => dispatch(receiveErrors(e.responseJSON))
    )
  }
}

window.receiveSteps = receiveSteps
window.receiveStep = receiveStep
window.removeStep = removeStep
