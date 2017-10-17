import { 
  FETCH_COMMENTS,
} from '../actions/comments';

const INITIAL_STATE = {
  byId: {},
  allIds: [],
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      const byId = {
        ...state.byId,
        ...action.payload,
      };

      return {
        byId,
        allIds: Object.keys(byId),
      };
    default:
      return state;
  }
}
