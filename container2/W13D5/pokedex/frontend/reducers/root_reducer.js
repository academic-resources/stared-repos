import entitiesReducer from './entities_reducer'
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  entities: entitiesReducer
});


export default rootReducer;