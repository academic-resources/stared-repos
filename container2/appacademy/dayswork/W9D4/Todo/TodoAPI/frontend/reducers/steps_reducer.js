import {
  RECEIVE_STEP,
  RECEIVE_STEPS,
  REMOVE_STEP
} from '../actions/step_actions'

const initialState = {
  1: {
    id: 1,
    title: 'new stuff',
    body: 'with soap',
    done: false,
    todo_id: 1
  },
  2: {
    id: 2,
    title: 'something else',
    body: 'with shampoo',
    done: true,
    todo_id: 2
  }
}

let newStepList

const stepsReducer = (state = initialState, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_STEPS:
      newStepList = {}
      action.steps.forEach(step => {
        newStepList[step.id] = step
      })
      return newStepList

    case RECEIVE_STEP:
      newStepList = Object.assign({}, state)
      newStepList[action.step.id] = action.step
      return newStepList

    case REMOVE_STEP:
      newStepList = Object.assign({}, state)
      delete newStepList[action.step.id]
      return newStepList

    default:
      return state
  }
}

export default stepsReducer
