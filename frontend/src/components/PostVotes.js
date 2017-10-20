import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { sendVote } from '../actions/posts'
import Votes from './Votes'

class PostVotes extends Component {
  constructor () {
    super()
    this.sendVote = this.sendVote.bind(this)
  }

  sendVote (option) {
    this.props.dispatch(sendVote(this.props.post.id, option))
  }

  render () {
    return (
      <Votes voteScore={this.props.post.voteScore} sendVote={this.sendVote} />
    )
  }
}

PostVotes.propTypes = {
  post: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect()(PostVotes)
