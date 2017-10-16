import React, { Component } from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import BaseList from './../components/BaseList';
import PostList from './../components/PostList';

class Category extends Component {
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

function mapStateToProps({ posts, postsLoading }, ownProps) {  
  return {
    posts: posts.filter((post) => post.category === ownProps.match.params.category),
    postsLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      fetchPosts: (url) => dispatch(fetchPosts(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
