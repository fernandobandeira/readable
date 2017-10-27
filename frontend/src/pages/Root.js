import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { onComponentDidMount } from 'react-redux-lifecycle'
import { fetchPosts } from '../actions/posts'
import BaseList from './../components/BaseList'

const Root = ({ posts, sorting }) => (
  <BaseList posts={posts} postsSorting={sorting} />
)

const mapStateToProps = ({ posts }) => ({
  posts: posts.allIds.map(id => posts.byId[id]),
  sorting: posts.sorting
})

Root.propTypes = {
  posts: PropTypes.array.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  sorting: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(
  onComponentDidMount(fetchPosts)(Root)
)
