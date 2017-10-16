import React, { Component } from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
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
          <Dimmer active={this.props.postsLoading} inverted>
            <Loader></Loader>
          </Dimmer>

          <PostList posts={this.props.posts}>
          </PostList>
        </Segment>
      </BaseList>
    );
  }
}

function mapStateToProps({ posts, postsLoading }) {
  return {
    posts,
    postsLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      fetchPosts: (url) => dispatch(fetchPosts(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
