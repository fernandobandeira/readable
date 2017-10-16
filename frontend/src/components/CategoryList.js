import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class CategoryList extends Component {
  state = { activeItem: 'bio' }

  changeRoute = ({ active }, path = null) => {
    if (!active) {
      if (path !== null) {
        return this.props.history.push(`/c/${path}`);
      }

      return this.props.history.push('/');
    }
  }

  render() {    
    const { categories, active } = this.props;    

    return (
      <Menu fluid vertical tabular>
          <Menu.Item 
            name='all' 
            key='all'
            active={active === undefined}
            onClick={(e, item) => this.changeRoute(item)}
          />
        {categories.map(category => (
          <Menu.Item 
            name={category.name} 
            key={category.path}
            active={category.path === active}
            onClick={(e, item) => this.changeRoute(item, category.path)}
          />
        ))}
      </Menu>
    );
  }
}

export default withRouter(CategoryList);
