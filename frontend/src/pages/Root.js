import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import CategoryList from './../components/CategoryList';

class Root extends Component {
  state = { activeItem: 'bio' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (      
      <Grid>
        <Grid.Column width={4}>
          <CategoryList>
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

export default Root;
