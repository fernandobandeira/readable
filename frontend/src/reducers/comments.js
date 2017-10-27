import _ from 'lodash'
import {
  FETCH_COMMENTS,
  FETCH_COMMENT,
  ADD_COMMENT,
  EDIT_COMMENT,
  REMOVE_COMMENT,
  SEND_COMMENT_VOTE,
  CHANGE_COMMENTS_SORTING
} from '../actions/comments'

const INITIAL_STATE = {
  byId: {},
  allIds: [],
  sorting: 'voteScore'
}

const getSortedIds = (comments, sorting) => (
  _.sortBy(comments, sorting)
  .reverse()
  .reduce((allIds, comment) => {
    if (!comment.deleted) {
      allIds.push(comment.id)
    }

    return allIds
  }, [])
)

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
    case SEND_COMMENT_VOTE:
    case FETCH_COMMENT:
    case ADD_COMMENT:
    case EDIT_COMMENT:
    case REMOVE_COMMENT:
      const byId = {
        ...state.byId,
        ...action.payload
      }

      return {
        ...state,
        byId,
        allIds: getSortedIds(byId, state.sorting)
      }
    case CHANGE_COMMENTS_SORTING:
      return {
        ...state,
        sorting: action.payload,
        allIds: getSortedIds(state.byId, action.payload)
      }
    default:
      return state
  }
}
