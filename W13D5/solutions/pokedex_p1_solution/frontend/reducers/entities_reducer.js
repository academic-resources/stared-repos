import { combineReducers } from 'redux';

import pokemon from './pokemon_reducer';
import items from './items_reducer';

export default combineReducers({
  items,
  pokemon
});
