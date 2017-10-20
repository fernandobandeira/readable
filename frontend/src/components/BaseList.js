import React, { Component } from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchCategories } from '../actions/categories'
import CategoryList from './../components/CategoryList'
import PostList from './../components/PostList'

class BaseList extends Component {
  componentDidMount () {
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

BaseList.propTypes = {
  categories: PropTypes.array.isRequired,
  posts: PropTypes.array.isRequired,
  postsSorting: PropTypes.string.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseList))
