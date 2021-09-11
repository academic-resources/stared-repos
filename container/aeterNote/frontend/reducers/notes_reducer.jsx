import {
  RECEIVE_NOTES,
  RECEIVE_NOTE,
  REMOVE_NOTE
}from '../actions/note_actions';
import { LOGOUT } from '../actions/session_actions';

const _nullNotes = {};

const notesReducer = (state={}, action) => {

  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch(action.type){
    case(RECEIVE_NOTES):
      return action.notes;
    case(RECEIVE_NOTE):
      return Object.assign(newState, { [action.note.id]: action.note });
    case(REMOVE_NOTE):
      delete newState[action.noteId];
      return newState;
    case(LOGOUT):
      return {};
    default:
      return state;
  }
};

export default notesReducer;
