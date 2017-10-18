import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostsByCategory } from '../actions/posts';
import BaseList from './../components/BaseList';

class Category extends Component {

  componentWillReceiveProps(props) {
    const currentCategory = this.props.match.params.category;
    const newCategory = props.match.params.category;

    if (newCategory !== currentCategory) {
      this.props.fetchPostsByCategory(newCategory);
    }
  }

  componentWillMount() {
    this.props.fetchPostsByCategory(this.props.match.params.category);
  }

  render() {    
    return (
      <BaseList posts={this.props.posts} postsSorting={this.props.sorting}>
      </BaseList>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  const filteredPosts = posts.allIds.reduce((cur, id) => {
    const post = posts.byId[id];
    if (post.category === ownProps.match.params.category) {
      cur.push(post);
    }

    return cur;
  }, []);

  return {
    posts: filteredPosts,
    sorting: posts.sorting,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
