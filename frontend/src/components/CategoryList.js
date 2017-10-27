import React from 'react'
import { Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const CategoryList = ({ categories, active , history }) => {
  const changeRoute = ({ active }, path = null) => {
    if (!active) {
      history.push(path ? `/${path}` : '/')
    }
  }

  return (
    <Menu fluid vertical tabular>
      <Menu.Item
        name='all'
        key='all'
        active={active === undefined}
        onClick={(e, item) => changeRoute(item)}
      />
      {categories.map(({name, path}) => (
        <Menu.Item
          name={name}
          key={path}
          active={path === active}
          onClick={(e, item) => changeRoute(item, path)}
        />
      ))}
    </Menu>
  )
}

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  active: PropTypes.string,
  history: PropTypes.object.isRequired
}

export default withRouter(CategoryList)
