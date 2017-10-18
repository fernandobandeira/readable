import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import BaseList from './../components/BaseList';

class Root extends Component {
  componentWillMount() {
    this.props.fetchPosts();    
  }

  render() {
    return (
      <BaseList posts={this.props.posts} postsSorting={this.props.sorting}>
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
