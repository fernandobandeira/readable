import { 
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
} from '../actions/categories';

const INITIAL_STATE = {
  categoriesList: {
    categories: [],
    loading: true,
  },
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return { 
        ...state,
        categoriesList: { 
          ...state.categoriesList,
          loading: true
        }
      };
    case FETCH_CATEGORIES_SUCCESS:
      return { 
        ...state, 
        categoriesList: { 
          categories: action.payload, 
          loading: false 
        }
      };
    default:
      return state;
  }
}
