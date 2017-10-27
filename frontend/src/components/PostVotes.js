import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { sendVote } from '../actions/posts'
import Votes from './Votes'

const PostVotes = ({ post, dispatch }) => (
  <Votes voteScore={post.voteScore} sendVote={option => dispatch(sendVote(post.id, option))} />
)

PostVotes.propTypes = {
  post: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect()(PostVotes)
