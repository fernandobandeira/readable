import {
  FETCH_CATEGORIES
} from '../actions/categories'

const INITIAL_STATE = {
  byId: {},
  allIds: []
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        byId: action.payload,
        allIds: Object.keys(action.payload)
      }
    default:
      return state
  }
}
