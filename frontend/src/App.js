import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom'
import Root from './pages/Root'
import Category from './pages/Category'
import Post from './pages/Post'
import PostForm from './pages/PostForm'

class App extends Component {
  render () {
    return (
      <Container style={{ marginTop: '40px' }}>
        <Switch>
          <Route path='/' exact component={Root} />
          <Route path='/post/new' exact component={PostForm} />
          <Route path='/post/:post' exact component={PostForm} />
          <Route path='/:category' exact component={Category} />
          <Route path='/:category/:post' component={Post} />
        </Switch>
      </Container>
    )
  }
}

export default App
