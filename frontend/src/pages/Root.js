import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import BaseList from './../components/BaseList';
import PostList from './../components/PostList';

class Root extends Component {
  componentWillMount() {
    this.props.fetchPosts();    
  }

  render() {
    return (
      <BaseList>
        <Segment>
          <PostList posts={this.props.posts} sorting={this.props.sorting}>
          </PostList>
        </Segment>
      </BaseList>
    );
  }
}

function mapStateToProps({ posts }) {
  const reducedPosts = posts.allIds.reduce((cur, id) => {
    cur.push(posts.byId[id]);

    return cur;
  }, []);

  return {
    posts: reducedPosts,
    sorting: posts.sorting,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      fetchPosts: () => dispatch(fetchPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
