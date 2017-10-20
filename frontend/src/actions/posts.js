import axios from 'axios'
import uuid from 'uuid'

export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_CATEGORY_POSTS = 'FETCH_CATEGORY_POSTS'
export const FETCH_POST = 'FETCH_POST'
export const SEND_VOTE = 'SEND_VOTE'
export const CHANGE_SORTING = 'CHANGE_SORTING'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'

function reducePosts (posts) {
  const postsArray = posts instanceof Array ? posts : [posts]

  return postsArray.reduce((cur, post) => {
    cur[post.id] = post

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
  }
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

export function addPost (post) {
  return (dispatch) => {
    const data = {
      ...post,
      id: uuid().split('-').join(''),
      timestamp: Date.now()
    }

    dispatch({
      type: ADD_POST,
      payload: reducePosts(data)
    })

    axios.post(`/posts`, data)
      .then((res) => {
        dispatch({
          type: FETCH_POST,
          payload: reducePosts(res.data)
        })
      })
  }
}

export function editPost (post) {
  return (dispatch) => {
    dispatch({
      type: EDIT_POST,
      payload: reducePosts(post)
    })

    axios.put(`/posts/${post.id}`, {
      title: post.title,
      author: post.author,
      category: post.category,
      body: post.body
    })
      .then((res) => {
        dispatch({
          type: FETCH_POST,
          payload: reducePosts(res.data)
        })
      })
  }
}

export function removePost (post) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_POST,
      payload: reducePosts(post)
    })

    axios.delete(`/posts/${post.id}`)
      .then((res) => {
        dispatch({
          type: FETCH_POST,
          payload: reducePosts(res.data)
        })
      })
  }
}
