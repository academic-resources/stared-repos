import { combineReducers } from 'redux';
import { GET_FRIENDS, ADD_FRIEND, REMOVE_FRIEND } from '../actions';

const friendsReducer = (friends = [], action) => {
  switch (action.type) {
    case GET_FRIENDS:
      return action.payload.data;
    case ADD_FRIEND:
      return action.payload.data;
    case REMOVE_FRIEND:
      return action.payload.data;
    default:
      return friends;
  }
};

const rootReducer = combineReducers({
  friends: friendsReducer
});

export default rootReducer;
