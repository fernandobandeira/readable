import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import { Route } from 'react-router-dom';
import Root from './pages/Root';

class App extends Component {
  render() {
    return (
      <Container style={{ marginTop: '40px' }}>
        <Route path="/" exact component={Root}/>
        <Route path="/c/:category" component={Root}/>
      </Container>
    );
  }
}

export default App;
