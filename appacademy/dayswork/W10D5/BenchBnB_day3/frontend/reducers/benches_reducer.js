import { RECEIVE_BENCHES } from '../actions/bench_action'

export default (state = {}, action) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_BENCHES:
      return action.benches
    default:
      return state
  }
}