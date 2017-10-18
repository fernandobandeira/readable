import axios from 'axios'

export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const SEND_COMMENT_VOTE = 'SEND_COMMENT_VOTE'
export const CHANGE_COMMENTS_SORTING = 'CHANGE_COMMENTS_SORTING'

function reduceComments (comments) {
  const commentsArray = comments instanceof Array ? comments : [comments]

  return commentsArray.reduce((cur, comment) => {
    if (!comment.deleted) {
      cur[comment.id] = comment
    }

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
