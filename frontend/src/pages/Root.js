import React, { Component } from 'react';
import { Grid, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchPosts, fetchCategories } from '../actions';
import CategoryList from './../components/CategoryList';
import PostTable from './../components/PostTable';

class Root extends Component {
  componentWillMount() {
    this.props.fetchPosts();
    this.props.fetchCategories();
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={4}>
          <Dimmer active={this.props.categoriesLoading} inverted>
            <Loader></Loader>
          </Dimmer>

          <CategoryList categories={this.props.categories} active={this.props.match.params.category}>
          </CategoryList>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            <Dimmer active={this.props.postsLoading} inverted>
              <Loader></Loader>
            </Dimmer>

            <PostTable posts={this.props.posts}>
            </PostTable>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps({ posts, postsLoading, categories, categoriesLoading }) {
  return {
    posts,
    postsLoading,
    categories,
    categoriesLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      fetchPosts: (url) => dispatch(fetchPosts(url)),
      fetchCategories: (url) => dispatch(fetchCategories(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
