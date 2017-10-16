import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import axios from 'axios';
import { initCategories } from '../actions';
import CategoryList from './../components/CategoryList';

class Root extends Component {  
  componentWillMount() {
    axios.get('/categories')
      .then(res => this.props.dispatch(initCategories(res.data.categories)));
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
            This is an stretched grid column. This segment will always match the tab height
          </Segment>
        </Grid.Column>
      </Grid>      
    );
  }
}

function mapStateToProps({ categories }) {  
  return {
    categories,
  };
}

export default connect(mapStateToProps)(Root);
