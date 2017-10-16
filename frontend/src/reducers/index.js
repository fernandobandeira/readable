import { combineReducers } from 'redux';
import { INIT_CATEGORIES, INIT_POSTS } from '../actions';

function categories(state = [], action) {
  switch (action.type) {
    case INIT_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}

function posts(state = [], action) {
  switch (action.type) {
    case INIT_POSTS:
      return action.posts;
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
});
