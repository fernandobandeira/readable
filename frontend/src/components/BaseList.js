import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchCategories } from '../actions/categories';
import CategoryList from './../components/CategoryList';

class BaseList extends Component {
  componentWillMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={4}>
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

function mapStateToProps({ categories }) {
  const reducedCategories = categories.allIds.reduce((cur, id) => {
    cur.push(categories.byId[id]);

    return cur;
  }, []);

  return {
    categories: reducedCategories,    
  };
}

function mapDispatchToProps(dispatch) {
  return {
      fetchCategories: () => dispatch(fetchCategories()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseList));
