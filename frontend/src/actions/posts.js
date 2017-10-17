import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';

export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';

export function fetchPosts(url = '/posts') {
  return (dispatch) => {
      dispatch({ type: FETCH_POSTS });

      axios.get(url)
        .then((res) => {
          const posts = res.data.filter((post) => !post.deleted);

          dispatch({
            type: FETCH_POSTS_SUCCESS,
            payload: posts,
          });
        });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
      dispatch({ type: FETCH_POST });

      axios.get(`/posts/${id}`)
        .then((res) => {
          dispatch({
            type: FETCH_POST_SUCCESS,
            payload: res.data,
          });
        });
  };
}
