import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { fetchComments } from '../actions/comments'
import PostVotes from './PostVotes'

class PostToolbar extends Component {
  componentDidMount () {
    this.props.fetchComments(this.props.post.id)
  }

  render () {
    const { post, comments } = this.props

    return (
      <span>
        <PostVotes post={post} />
        <Icon
          name='comments'
        />
        {comments.length} comments
        <Icon
          name='tag'
          style={{ marginLeft: '.25rem' }}
        />
        {post.category}
      </span>
    )
  }
}

function mapStateToProps ({ comments }, ownProps) {
  const filteredComments = comments.allIds.reduce((cur, id) => {
    const comment = comments.byId[id]
    if (comment.parentId === ownProps.post.id) {
      cur.push(comment)
    }

    return cur
  }, [])

  return {
    comments: filteredComments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchComments: (post) => dispatch(fetchComments(post))
  }
}

PostToolbar.propTypes = {
  post: PropTypes.object.isRequired,
  fetchComments: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PostToolbar)
