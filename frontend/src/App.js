import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import Root from './pages/Root';
import Category from './pages/Category';
import Post from './pages/Post';

class App extends Component {
  render() {
    return (
      <Container style={{ marginTop: '40px' }}>
        <Route path="/" exact component={Root}/>
        <Route path="/:category" exact component={Category}/>
        <Route path="/:category/:post" component={Post}/>
      </Container>
    );
  }
}

export default App;
