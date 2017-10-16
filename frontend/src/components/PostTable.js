import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class PostTable extends Component {
  render() {
    const { posts } = this.props;

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Vote Score</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {posts.map((post) => (
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
