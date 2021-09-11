import {
  RECEIVE_NOTEBOOK,
  RECEIVE_NOTEBOOKS,
  REMOVE_NOTEBOOK
} from '../actions/notebook_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import {
  RECEIVE_NOTE,
  REMOVE_NOTE
} from '../actions/note_actions';
import { LOGOUT } from '../actions/session_actions';

const _nullNotebooks = {};

const notebookReducer = (state = _nullNotebooks, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch(action.type){
    case(RECEIVE_NOTEBOOKS):
      return action.notebooks;
    case(RECEIVE_NOTEBOOK):
      return Object.assign(newState, { [action.notebook.id]: action.notebook });
    case(REMOVE_NOTEBOOK):
      delete newState[action.notebookId];
      return newState;
    case(RECEIVE_NOTE):
      if (!newState[action.note.notebook_id].note_ids.includes(action.note.id)) {
        newState[action.note.notebook_id].note_ids.push(action.note.id);
      }
      return newState;
    case(REMOVE_NOTE):
      // const index = newState[action.note.notebook_id].note_ids.indexOf(action.note.id);
      // newState[action.note.notebook_id].note_ids.slice(index, 1);
      return newState;
    case(LOGOUT):
      return {};
    default:
      return newState;
  }
};

export default notebookReducer;
