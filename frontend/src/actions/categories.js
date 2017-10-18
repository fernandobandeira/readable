import axios from 'axios'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

export function fetchCategories () {
  return (dispatch) => {
    axios.get('/categories')
      .then((res) => {
        const payload = res.data.categories.reduce((cur, category) => {
          cur[category.path] = category

          return cur
        }, {})

        dispatch({
          type: FETCH_CATEGORIES,
          payload
        })
      })
  }
}
