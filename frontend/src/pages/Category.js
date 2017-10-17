import React, { Component } from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import BaseList from './../components/BaseList';
import PostList from './../components/PostList';

class Category extends Component {

  componentWillReceiveProps(props) {
    const currentCategory = this.props.match.params.category;
    const newCategory = props.match.params.category;

    if (newCategory !== currentCategory) {
      this.fetchPosts(newCategory);
    }
  }

  componentWillMount() {
    this.fetchPosts(this.props.match.params.category);
  }

  fetchPosts(category) {
    this.props.fetchPosts(`/${category}/posts`);
  }

  render() {    
    return (
      <BaseList>
        <Segment>
          <Dimmer active={this.props.loading} inverted>
            <Loader></Loader>
          </Dimmer>

          <PostList posts={this.props.posts}>
          </PostList>
        </Segment>
      </BaseList>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {  
  return posts.postsList;
}

function mapDispatchToProps(dispatch) {
  return {
      fetchPosts: (url) => dispatch(fetchPosts(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
