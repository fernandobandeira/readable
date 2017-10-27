import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { Route, Switch } from 'react-router-dom'
import Root from './pages/Root'
import Category from './pages/Category'
import Post from './pages/Post'
import PostForm from './pages/PostForm'
import CommentForm from './pages/CommentForm'
import PageNotFound from './pages/PageNotFound'

class App extends Component {
  render () {
    return (
      <Container style={{ marginTop: '40px' }}>
        <Switch>
          <Route path='/' exact component={Root} />
          <Route path='/post/new' exact component={PostForm} />
          <Route path='/post/:post' exact component={PostForm} />
          <Route path='/:category' exact component={Category} />
          <Route path='/:category/:post' exact component={Post} />
          <Route path='/:category/:post/comment' exact component={CommentForm} />
          <Route path='/:category/:post/comment/:comment' exact component={CommentForm} />
          <Route path='*' component={PageNotFound} />
        </Switch>
      </Container>
    )
  }
}

export default App
