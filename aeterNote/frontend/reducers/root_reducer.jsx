import { combineReducers } from "redux";
import sessionReducer from "./session_reducer";
import notebooksReducer from "./notebooks_reducer";
import errorsReducer from "./errors_reducer";
import uiReducer from "./ui_reducer";
import notesReducer from "./notes_reducer";
import tagsReducer from "./tags_reducer";
import taggingsReducer from "./taggings_reducer";

export default combineReducers({
  session: sessionReducer,
  notebooks: notebooksReducer,
  notes: notesReducer,
  tags: tagsReducer,
  taggings: taggingsReducer,
  errors: errorsReducer,
  ui: uiReducer,
});
