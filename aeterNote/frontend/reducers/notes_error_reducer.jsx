import {
  RECEIVE_NOTE_ERRORS,
  REMOVE_NOTE_ERRORS,
  RECEIVE_NOTE,
  RECEIVE_NOTES
} from '../actions/note_actions';
import { LOGOUT } from '../actions/session_actions';


const notesErrorReducer = (state = [], action) => {

  Object.freeze(state);
  switch(action.type){
    case(RECEIVE_NOTE_ERRORS):
      return action.errors;
    case(REMOVE_NOTE_ERRORS):
    case(RECEIVE_NOTE):
    case(RECEIVE_NOTES):
    case(LOGOUT):
      return [];
    default:
      return state;
  }
};

export default notesErrorReducer;
