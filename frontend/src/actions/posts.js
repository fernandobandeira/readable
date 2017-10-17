import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';

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
