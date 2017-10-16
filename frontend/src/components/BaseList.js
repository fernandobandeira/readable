import React, { Component } from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCategories } from '../actions';
import CategoryList from './../components/CategoryList';

class BaseList extends Component {
  componentWillMount() {
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
          {this.props.children}
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps({ categories, categoriesLoading }) {
  return {
    categories,
    categoriesLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      fetchCategories: (url) => dispatch(fetchCategories(url)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseList));
