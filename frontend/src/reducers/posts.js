import _ from 'lodash';
import {
  FETCH_POSTS,
  FETCH_CATEGORY_POSTS,
  FETCH_POST,
  SEND_VOTE,
  CHANGE_SORTING,
} from '../actions/posts';

const INITIAL_STATE = {
  byId: {},
  allIds: [],
  sorting: 'voteScore',
}

function getSortedIds(posts, sorting) {
  return _.sortBy(posts, [sorting])
    .reverse()
    .reduce((allIds, post) => {
      allIds.push(post.id);

      return allIds;
    }, []);
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        byId: action.payload,
        allIds: getSortedIds(action.payload, state.sorting),
      };
    case FETCH_CATEGORY_POSTS:
    case FETCH_POST:
    case SEND_VOTE:
      const byId = {
        ...state.byId,
        ...action.payload,
      };

      return {
        ...state,
        byId,
        allIds: getSortedIds(byId, state.sorting),
      };
    case CHANGE_SORTING:
      return {
        ...state,
        sorting: action.payload,
        allIds: getSortedIds(state.byId, action.payload),
      };
    default:
      return state;
  }
}
