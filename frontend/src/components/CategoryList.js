import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import axios from 'axios';

class CategoryList extends Component {
  state = { activeItem: 'bio' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentWillMount() {
    axios.get('/categories')
      .then((res) => {
        console.log(res.data.categories);
      });
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu fluid vertical tabular>
        <Menu.Item name='bio' active={activeItem === 'bio'} onClick={this.handleItemClick} />
        <Menu.Item name='pics' active={activeItem === 'pics'} onClick={this.handleItemClick} />
        <Menu.Item name='companies' active={activeItem === 'companies'} onClick={this.handleItemClick} />
        <Menu.Item name='links' active={activeItem === 'links'} onClick={this.handleItemClick} />
      </Menu>
    );
  }
}

export default CategoryList;
