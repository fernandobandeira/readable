import React, { Component } from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import BaseList from './../components/BaseList';
import PostTable from './../components/PostTable';

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

          <PostTable posts={this.props.posts}>
          </PostTable>
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
