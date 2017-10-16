import axios from 'axios';

export const POSTS_LOADING = 'POSTS_LOADING';
export const POSTS_FETCHED = 'POSTS_FETCHED';
export const CATEGORIES_LOADING = 'CATEGORIES_LOADING';
export const CATEGORIES_FETCHED = 'CATEGORIES_FETCHED';

export function postsLoading(loading) {
  return {
      type: POSTS_LOADING,
      loading,
  };
}

export function postsFetched(posts) {
  return {
      type: POSTS_FETCHED,
      posts,
  };
}

export function fetchPosts(url = '/posts') {
  return (dispatch) => {
      dispatch(postsLoading(true));

      axios.get(url)
        .then(res => {
          dispatch(postsFetched(res.data.filter((post) => !post.deleted)));
          dispatch(postsLoading(false));          
        });
  };
}

export function categoriesLoading(loading) {
  return {
      type: CATEGORIES_LOADING,
      loading,
  };
}

export function categoriesFetched(categories) {
  return {
      type: CATEGORIES_FETCHED,
      categories,
  };
}

export function fetchCategories(url = '/categories') {
  return (dispatch) => {
      dispatch(categoriesLoading(true));

      axios.get(url)
        .then(res => {
          dispatch(categoriesFetched(res.data.categories));
          dispatch(categoriesLoading(false));          
        });
  };
}
