import {
  RECEIVE_NOTEBOOK_ERRORS,
  REMOVE_NOTEBOOK_ERRORS,
  RECEIVE_NOTEBOOKS,
  RECEIVE_NOTEBOOK,
  REMOVE_NOTEBOOK,
} from "../actions/notebook_actions";
import {
  UPDATE_NOTEBOOK_FORM_MODAL,
  UPDATE_EDIT_NOTEBOOK,
} from "../actions/ui_actions";
import { LOGOUT } from "../actions/session_actions";

const notebookErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_NOTEBOOK_ERRORS:
      return action.errors;
    case RECEIVE_NOTEBOOK:
    case RECEIVE_NOTEBOOKS:
    case REMOVE_NOTEBOOK:
    case REMOVE_NOTEBOOK_ERRORS:
    case UPDATE_NOTEBOOK_FORM_MODAL:
    case UPDATE_EDIT_NOTEBOOK:
    case LOGOUT:
      return [];
    default:
      return state;
  }
};

export default notebookErrorsReducer;
