import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CHANGE_SORTING = 'CHANGE_SORTING';

function reducePosts(posts) {
  const postsArray = posts instanceof Array ? posts : [posts];

  return postsArray.reduce((cur, post) => {
    if (!post.deleted) {
      cur[post.id] = post;
    }

    return cur;
  }, {});
}

function sendThunkRequest(url, action) {
  return (dispatch) => {
    axios.get(url)
      .then((res) => {
        dispatch({
          type: action,
          payload: reducePosts(res.data),
        });
      });
  };
}

export function fetchPosts() {
  return sendThunkRequest('/posts', FETCH_POSTS);
}

export function fetchPostsByCategory(category) {
  return sendThunkRequest(`/${category}/posts`, FETCH_CATEGORY_POSTS);
}

export function fetchPost(id) {
  return sendThunkRequest(`/posts/${id}`, FETCH_POST);
}

export function changeSorting(sorting) {
  return {
    type: CHANGE_SORTING,
    payload: sorting,
  };
}
