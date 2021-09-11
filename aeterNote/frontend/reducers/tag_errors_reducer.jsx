import { RECEIVE_TAG_ERRORS, REMOVE_TAG_ERRORS } from "../actions/tag_actions";
import { LOGOUT } from "../actions/session_actions";
import { UPDATE_TAG_FORM_MODAL } from "../actions/ui_actions";

const tagsErrorReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TAG_ERRORS:
      return action.errors;
    case REMOVE_TAG_ERRORS:
    case UPDATE_TAG_FORM_MODAL:
    case LOGOUT:
      return [];
    default:
      return state;
  }
};

export default tagsErrorReducer;
