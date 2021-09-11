import { CHANGE_FILTER } from '../actions/filter_actions'

export default (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case CHANGE_FILTER:
      const newFilter = Object.assign({}, state)
      newFilter[action.filter] = action.value
      return newFilter
    default:
      return state
  }
}
