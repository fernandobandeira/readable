import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import { initCategories, initPosts } from '../actions';
import CategoryList from './../components/CategoryList';
import PostTable from './../components/PostTable';

class Root extends Component {
  componentWillMount() {
    if (this.props.categories.length === 0) {      
      axios.get('/categories')
        .then(res => this.props.dispatch(initCategories(res.data.categories)));
    }    

    axios.get('/posts')
      .then(res => this.props.dispatch(initPosts(res.data)));
  }

  render() {    
    return (
      <Grid>
        <Grid.Column width={4}>
          <CategoryList categories={this.props.categories} active={this.props.match.params.category}>
          </CategoryList>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            <PostTable posts={this.props.posts}>
            </PostTable>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts,
  };
}

export default connect(mapStateToProps)(Root);
