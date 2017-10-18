import axios from 'axios'

export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS'
export const FETCH_POST = 'FETCH_POST'
export const SEND_VOTE = 'SEND_VOTE'
export const CHANGE_SORTING = 'CHANGE_SORTING'

function reducePosts (posts) {
  const postsArray = posts instanceof Array ? posts : [posts]

  return postsArray.reduce((cur, post) => {
    if (!post.deleted) {
      cur[post.id] = post
    }

    return cur
  }, {})
}

export function changeSorting (sorting) {
  return {
    type: CHANGE_SORTING,
    payload: sorting
  }
}

export function fetchPosts () {
  return (dispatch) => {
    axios.get('/posts')
      .then((res) => {
        dispatch({
          type: FETCH_POSTS,
          payload: reducePosts(res.data)
        })
      })
  };
}

export function fetchPostsByCategory (category) {
  return (dispatch) => {
    axios.get(`/${category}/posts`)
      .then((res) => {
        dispatch({
          type: FETCH_CATEGORY_POSTS,
          payload: reducePosts(res.data)
        })
      })
  }
}

export function fetchPost (id) {
  return (dispatch) => {
    axios.get(`/posts/${id}`)
      .then((res) => {
        dispatch({
          type: FETCH_POST,
          payload: reducePosts(res.data)
        })
      })
  }
}

export function sendVote (id, option) {
  return (dispatch) => {
    axios.post(`/posts/${id}`, { option })
      .then((res) => {
        dispatch({
          type: SEND_VOTE,
          payload: reducePosts(res.data)
        })
      })
  }
}
