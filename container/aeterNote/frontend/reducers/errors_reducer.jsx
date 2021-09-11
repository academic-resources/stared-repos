import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import notebookErrorsReducer from './notebook_errors_reducer';
import notesErrorReducer from './notes_error_reducer';
import tagErrorReducer from './tag_errors_reducer';

export default combineReducers({
  session: sessionErrorsReducer,
  notebooks: notebookErrorsReducer,
  notes: notesErrorReducer,
  tags: tagErrorReducer
});
