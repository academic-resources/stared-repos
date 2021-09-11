import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';

import resumeReducer from './resume';
import templateReducer from "./template";
import userReducer from "./user";

const rootReducer = {
  resume: resumeReducer,
  template: templateReducer,
  user: userReducer,
};

const finalReducer = storage.reducer(combineReducers(rootReducer));
const engine = createEngine('my-save-key');
const storageWare = storage.createMiddleware(engine);

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk, storageWare);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger, storageWare));
}

const store = createStore(finalReducer, enhancer);
const load = storage.createLoader(engine);

load(store)
  .then((newState) => console.log('Loaded state:', newState))
  .catch(() => console.log('Failed to load previous state'));

export default store;
