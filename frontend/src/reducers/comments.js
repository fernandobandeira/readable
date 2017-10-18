import _ from 'lodash'
import {
  FETCH_COMMENTS,
  SEND_COMMENT_VOTE,
  CHANGE_COMMENTS_SORTING
} from '../actions/comments'

const INITIAL_STATE = {
  byId: {},
  allIds: [],
  sorting: 'voteScore'
}

function getSortedIds (comments, sorting) {
  return _.sortBy(comments, sorting)
    .reverse()
    .reduce((allIds, comment) => {
      allIds.push(comment.id)

      return allIds
    }, [])
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
    case SEND_COMMENT_VOTE:
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
