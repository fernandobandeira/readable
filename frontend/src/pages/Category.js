import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPostsByCategory } from '../actions/posts'
import BaseList from './../components/BaseList'

class Category extends Component {
  componentWillReceiveProps (props) {
    const currentCategory = this.props.match.params.category
    const newCategory = props.match.params.category

    if (newCategory !== currentCategory) {
      this.props.fetchPostsByCategory(newCategory)
    }
  }

  componentDidMount () {
    this.props.fetchPostsByCategory(this.props.match.params.category)
  }

  render () {
    return (
      <BaseList posts={this.props.posts} postsSorting={this.props.sorting} />
    )
  }
}

const mapStateToProps = ({ posts }, ownProps) => ({
  posts: posts.allIds.reduce((cur, id) => {
    if (posts.byId[id].category === ownProps.match.params.category) {
      cur.push(posts.byId[id])
    }

    return cur
  }, []),
  sorting: posts.sorting
})

const mapDispatchToProps = dispatch => ({
  fetchPostsByCategory: category => dispatch(fetchPostsByCategory(category))
})

Category.propTypes = {
  sorting: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  fetchPostsByCategory: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
