import { combineReducers } from 'redux';
import { INIT_CATEGORIES } from '../actions';

function categories(state = [], action) {
  switch (action.type) {
    case INIT_CATEGORIES:
      return action.categories;
    default:
      return state;
  }  
}

export default combineReducers({
  categories,
});
