import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { LOGOUT } from '../actions/session_actions';

const _nullUser = Object.freeze({ currentUser: null });

const sessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch(action.type){
    case(RECEIVE_CURRENT_USER):
    case(LOGOUT):
      const currentUser = action.currentUser;
      return Object.assign(newState, { currentUser });
    default:
      return newState;
  }
};

export default sessionReducer;
