import React, { Component } from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import BaseList from './../components/BaseList';
import PostList from './../components/PostList';

class Category extends Component {
  state = {
    category: {},
  }

  componentWillReceiveProps(props) {
    const categoryPath = props.match.params.category;

    if (categoryPath !== this.state.category.path) {
      this.props.fetchPosts(`/${categoryPath}/posts`);
      this.setState({
        category: props.categories.find((category) => category.path === categoryPath),
      });
    }
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

function mapStateToProps({ posts, postsLoading, categories }, ownProps) {
  return {
    posts: posts.filter((post) => post.category === ownProps.match.params.category),
    postsLoading,
    categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      fetchPosts: (url) => dispatch(fetchPosts(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
