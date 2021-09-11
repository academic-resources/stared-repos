import { combineReducers } from 'redux';

import giphysReducer from './giphys_reducer';

const rootReducer = combineReducers ({
  giphys: giphysReducer
})

export default rootReducer
