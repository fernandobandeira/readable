import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { onComponentDidMount } from 'react-redux-lifecycle'
import { fetchCategories } from '../actions/categories'
import CategoryList from './../components/CategoryList'
import PostList from './../components/PostList'

const BaseList = ({ categories, posts, postsSorting, match }) => (
  <Grid>
    <Grid.Column width={4}>
      <CategoryList categories={categories} active={match.params.category} />
    </Grid.Column>

    <Grid.Column stretched width={12}>
      <Segment>
        <PostList posts={posts} sorting={postsSorting} />
      </Segment>
    </Grid.Column>
  </Grid>
)

const mapStateToProps = ({ categories }) => ({
  categories: categories.allIds.map(id => categories.byId[id])
})

BaseList.propTypes = {
  categories: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
  postsSorting: PropTypes.string.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

export default withRouter(
  connect(mapStateToProps)(
    onComponentDidMount(fetchCategories)(BaseList)
  )
)
