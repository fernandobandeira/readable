import _ from 'lodash'
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class PostTable extends Component {
  state = {
    column: undefined,
    posts: [],
    sortedPosts: [],
    direction: undefined,
  }

  componentWillReceiveProps({ posts }) {
    if (this.state.posts !== posts) {      
      const { column = 'voteScore', direction = 'descending' } = this.state;
      let sortedPosts = _.sortBy(posts, [column]);

      if (direction === 'descending') {
        sortedPosts = sortedPosts.reverse();
      }      

      this.setState({
        column,
        posts,
        sortedPosts,
        direction,
      });
    }
  }

  handleSort = clickedColumn => () => {
    const { column, sortedPosts, direction } = this.state;    

    if (column !== clickedColumn) {
      return this.setState({
        column: clickedColumn,
        sortedPosts: _.sortBy(sortedPosts, [clickedColumn]),
        direction: 'ascending',
      });
    }

    this.setState({
      sortedPosts: sortedPosts.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  }

  render() {    
    const { column, sortedPosts, direction } = this.state;

    return (
      <Table sortable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'title' ? direction : null}
              onClick={this.handleSort('title')}
            >
              Title
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'author' ? direction : null}
              onClick={this.handleSort('author')}
            >
              Author
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'category' ? direction : null}
              onClick={this.handleSort('category')}
            >
              Category
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'voteScore' ? direction : null}
              onClick={this.handleSort('voteScore')}
            >
              Vote Score
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sortedPosts.map((post) => (
            <Table.Row key={post.id}>
              <Table.Cell>{post.title}</Table.Cell>
              <Table.Cell>{post.author}</Table.Cell>
              <Table.Cell>{post.category}</Table.Cell>
              <Table.Cell>{post.voteScore}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default PostTable;
