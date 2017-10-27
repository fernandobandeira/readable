import axios from 'axios'

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES'

export const fetchCategories = () => dispatch => {
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
