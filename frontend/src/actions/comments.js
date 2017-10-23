import axios from 'axios'
import uuid from 'uuid'

export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const FETCH_COMMENT = 'FETCH_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const SEND_COMMENT_VOTE = 'SEND_COMMENT_VOTE'
export const CHANGE_COMMENTS_SORTING = 'CHANGE_COMMENTS_SORTING'

function reduceComments (comments) {
  const commentsArray = comments instanceof Array ? comments : [comments]

  return commentsArray.reduce((cur, comment) => {
    cur[comment.id] = comment

    return cur
  }, {})
}

export function changeSorting (sorting) {
  return {
    type: CHANGE_COMMENTS_SORTING,
    payload: sorting
  }
}

export function sendCommentVote (id, option) {
  return (dispatch) => {
    axios.post(`/comments/${id}`, { option })
      .then((res) => {
        dispatch({
          type: SEND_COMMENT_VOTE,
          payload: reduceComments(res.data)
        })
      })
  }
}

export function fetchComments (post) {
  return (dispatch) => {
    axios.get(`/posts/${post}/comments`)
      .then((res) => {
        dispatch({
          type: FETCH_COMMENTS,
          payload: reduceComments(res.data)
        })
      })
  }
}

export function fetchComment (id) {
  return (dispatch) => {
    axios.get(`/comments/${id}`)
      .then((res) => {
        dispatch({
          type: FETCH_COMMENT,
          payload: reduceComments(res.data)
        })
      })
  }
}

export function addComment (comment) {
  return (dispatch) => {
    const data = {
      ...comment,
      id: uuid().split('-').join(''),
      timestamp: Date.now()
    }

    dispatch({
      type: ADD_COMMENT,
      payload: reduceComments(data)
    })

    axios.post(`/comments`, data)
      .then((res) => {
        dispatch({
          type: FETCH_COMMENT,
          payload: reduceComments(res.data)
        })
      })
  }
}

export function editComment (comment) {
  return (dispatch) => {
    dispatch({
      type: EDIT_COMMENT,
      payload: reduceComments(comment)
    })

    axios.put(`/comments/${comment.id}`, {
      author: comment.author,
      body: comment.body
    })
      .then((res) => {
        dispatch({
          type: FETCH_COMMENT,
          payload: reduceComments(res.data)
        })
      })
  }
}

export function removeComment (comment) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_COMMENT,
      payload: reduceComments(comment)
    })

    axios.delete(`/comments/${comment.id}`)
      .then((res) => {
        dispatch({
          type: FETCH_COMMENT,
          payload: reduceComments(res.data)
        })
      })
  }
}
