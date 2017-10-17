import { FETCH_POSTS, FETCH_POSTS_SUCCESS } from '../actions/posts';

const INITIAL_STATE = {
  postsList: {
    posts: [],
    loading: true,
  },
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return { 
        ...state,
        postsList: { 
          ...state.postsList,
          loading: true 
        }
      };
    case FETCH_POSTS_SUCCESS:
      return { 
        ...state, 
        postsList: { 
          posts: action.payload, 
          loading: false 
        }
      };
    default:
      return state;
  }
}
