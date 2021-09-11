import { combineReducers } from "redux"
import entitiesReducer from "./entities_reducer"
import uiReducer from "./ui_reducer"
import loadingReducer from "./loading_reducer"

const rootReducer = combineReducers({
  entities: entitiesReducer,
  ui: uiReducer,
  loading: loadingReducer
})

export default rootReducer
