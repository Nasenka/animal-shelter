import { combineReducers } from 'redux';

import animals from './animals';
import todayAnimals from './todayAnimals';

export default combineReducers({
  animals,
  todayAnimals,
});
