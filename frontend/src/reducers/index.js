import { combineReducers } from 'redux';
import { 
  POSTS_LOADING, POSTS_FETCHED,
  CATEGORIES_LOADING, CATEGORIES_FETCHED,
} from '../actions';

function posts(state = [], action) {
  switch (action.type) {
    case POSTS_FETCHED:
      return action.posts;
    default:
      return state;
  }
}

function postsLoading(state = false, action) {
  switch (action.type) {
    case POSTS_LOADING:
      return action.loading;
    default:
      return state;
  }
}

function categories(state = [], action) {
  switch (action.type) {
    case CATEGORIES_FETCHED:
      return action.categories;
    default:
      return state;
  }
}

function categoriesLoading(state = false, action) {
  switch (action.type) {
    case CATEGORIES_LOADING:
      return action.loading;
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  postsLoading,
  categories,
  categoriesLoading,
});
