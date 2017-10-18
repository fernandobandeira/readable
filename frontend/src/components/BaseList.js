import React, { Component } from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchCategories } from '../actions/categories'
import CategoryList from './../components/CategoryList'
import PostList from './../components/PostList'

class BaseList extends Component {
  componentWillMount () {
    this.props.fetchCategories()
  }

  render () {
    const { categories, posts, postsSorting } = this.props

    return (
      <Grid>
        <Grid.Column width={4}>
          <CategoryList categories={categories} active={this.props.match.params.category} />
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            <PostList posts={posts} sorting={postsSorting} />
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps ({ categories }) {
  const reducedCategories = categories.allIds.reduce((cur, id) => {
    cur.push(categories.byId[id])

    return cur
  }, [])

  return {
    categories: reducedCategories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseList))
