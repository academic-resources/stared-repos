import {
  UPDATE_NOTEBOOK_TAB,
  UPDATE_NOTEBOOK_FORM_MODAL,
  UPDATE_NOTEBOOK_SELECTED,
  UPDATE_SORT_OPTIONS,
  UPDATE_EDIT_NOTEBOOK,
  UPDATE_DELETE_WARNING,
  UPDATE_SELECTED_NOTE,
  UPDATE_NOTE_DELETE_WARNING,
  UPDATE_NOTEBOOK_SELECTOR,
  UPDATE_TAG_FORM_MODAL,
  UPDATE_TAG_SELECTED,
  UPDATE_TAG_DELETE_WARNING,
  UPDATE_TAG_TAB,
  CLOSE_TABS
  } from '../actions/ui_actions';

import {
  REMOVE_NOTEBOOK,
  RECEIVE_NOTEBOOK
} from '../actions/notebook_actions';

import {
  RECEIVE_NOTE,
  REMOVE_NOTE
} from '../actions/note_actions';

import { LOGOUT } from '../actions/session_actions';

const _defaultUi = {
  loading: false,
  fullpage_note: false,
  notebook_tab: false,
  tag_tab: false,
  notebook_form_modal: false,
  notebook_selected: false,
  sort_options: false,
  edit_notebook: false,
  delete_warning: false
};

const uiReducer = (state = _defaultUi, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch(action.type){
    case(UPDATE_NOTEBOOK_TAB):
      Object.assign(newState, { tag_tab: false });
      Object.assign(newState, { notebook_tab: !(newState.notebook_tab) });
      return newState;
    case(UPDATE_NOTEBOOK_FORM_MODAL):
      Object.assign(newState, { notebook_form_modal: !(newState.notebook_form_modal) });
      if (newState.notebook_selector) { Object.assign(newState, { notebook_selector: false }); }
      return newState;
    case(UPDATE_NOTEBOOK_SELECTED):
      Object.assign(newState, { current_notebook: action.notebookId });
      Object.assign(newState, { notebook_selected: Boolean(newState.current_notebook) });
      Object.assign(newState, { selected_note: false });
      if (newState.notebook_selector) { Object.assign(newState, { notebook_selector: false }); }
      return newState;
    case(UPDATE_SORT_OPTIONS):
      return Object.assign(newState, { sort_options: !(newState.sort_options) });
    case(UPDATE_EDIT_NOTEBOOK):
      return Object.assign(newState, { edit_notebook: !(newState.edit_notebook) });
    case(UPDATE_DELETE_WARNING):
      Object.assign(newState, { delete_warning: !(newState.delete_warning) });
      Object.assign(newState, { notebook_tab: !(newState.notebook_tab) });
      Object.assign(newState, { edit_notebook: false });
      return newState;
    case(UPDATE_SELECTED_NOTE):
      Object.assign(newState, { selected_note: action.noteId });
      return newState;
    case(RECEIVE_NOTE):
      Object.assign(newState, { notebook_tab: false });
      Object.assign(newState, { tag_tab: false });
      Object.assign(newState, { selected_note: action.note.id });
      return newState;
    case(REMOVE_NOTEBOOK):
      Object.assign(newState, { notebook_tab: !(newState.notebook_tab) });
      Object.assign(newState, { current_notebook: false });
      return newState;
    case(RECEIVE_NOTEBOOK):
      return Object.assign(newState, { current_notebook: action.notebook.id});
    case(UPDATE_NOTE_DELETE_WARNING):
      return Object.assign(newState, { note_delete_warning: !(newState.note_delete_warning)});
    case(REMOVE_NOTE):
      return Object.assign(newState, { selected_note: false });
    case(UPDATE_NOTEBOOK_SELECTOR):
      return Object.assign(newState, { notebook_selector: !(newState.notebook_selector)});
    case(UPDATE_TAG_FORM_MODAL):
      Object.assign(newState, { tag_form: !(newState.tag_form) });
      if (newState.tag_selector) { Object.assign(newState, { tag_selector: false }); }
      return newState;
    case(UPDATE_TAG_SELECTED):
      Object.assign(newState, { current_tag: action.tagId });
      Object.assign(newState, { tag_selected: Boolean(newState.current_tag) });
      Object.assign(newState, { selected_note: false });
      if (newState.tag_selector) { Object.assign(newState, { tag_selector: false }); }
      return newState;
    case(UPDATE_TAG_DELETE_WARNING):
      return Object.assign(newState, { tag_delete_warning: !(newState.tag_delete_warning) });
    case(UPDATE_TAG_TAB):
      Object.assign(newState, { tag_tab: !(newState.tag_tab) });
      Object.assign(newState, { notebook_tab: false });
      return newState;
    case(CLOSE_TABS):
      Object.assign(newState, { notebook_tab: false });
      Object.assign(newState, { tag_tab: false });
      return newState;
    case(LOGOUT):
      return {};
    default:
      return state;
  }
};

export default uiReducer;
