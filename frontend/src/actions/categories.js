import axios from 'axios';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';

export function fetchCategories(url = '/categories') {
  return (dispatch) => {
      dispatch({ type: FETCH_CATEGORIES });

      axios.get(url)
        .then((res) => {
          dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            payload: res.data.categories,
          });
        });
  };
}
