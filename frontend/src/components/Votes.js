import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class Votes extends Component {
  render () {
    return (
      <span>
        <Icon
          name='like outline'
          color='green'
          style={{ cursor: 'pointer' }}
          onClick={() => this.props.sendVote('upVote')}
        />
        {this.props.voteScore}
        <Icon
          color='red'
          name='dislike outline'
          style={{ marginLeft: '.25rem', cursor: 'pointer' }}
          onClick={() => this.props.sendVote('downVote')}
        />
      </span>
    )
  }
}

Votes.propTypes = {
  voteScore: PropTypes.number,
  sendVote: PropTypes.func.isRequired
}

export default Votes
