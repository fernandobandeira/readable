import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

class CategoryList extends Component {
  changeRoute ({ active }, path = null) {
    if (!active) {
      this.props.history.push(path ? `/${path}` : '/')
    }
  }

  render () {
    const { categories, active } = this.props

    return (
      <Menu fluid vertical tabular>
        <Menu.Item
          name='all'
          key='all'
          active={active === undefined}
          onClick={(e, item) => this.changeRoute(item)}
        />
        {categories.map(({name, path}) => (
          <Menu.Item
            name={name}
            key={path}
            active={path === active}
            onClick={(e, item) => this.changeRoute(item, path)}
          />
        ))}
      </Menu>
    )
  }
}

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  active: PropTypes.string,
  history: PropTypes.object.isRequired
}

export default withRouter(CategoryList)
