import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPosts } from '../actions/posts'
import BaseList from './../components/BaseList'

class Root extends Component {
  componentDidMount () {
    this.props.fetchPosts()
  }

  render () {
    return (
      <BaseList posts={this.props.posts} postsSorting={this.props.sorting} />
    )
  }
}

function mapStateToProps ({ posts }) {
  const reducedPosts = posts.allIds.reduce((cur, id) => {
    if (!posts.byId[id].deleted) {
      cur.push(posts.byId[id])
    }

    return cur
  }, [])

  return {
    posts: reducedPosts,
    sorting: posts.sorting
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: () => dispatch(fetchPosts())
  }
};

Root.propTypes = {
  posts: PropTypes.array.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  sorting: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
