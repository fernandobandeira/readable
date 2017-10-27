import React from 'react'
import { Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const Votes = ({ voteScore, sendVote }) => (
  <span>
    <Icon
      name='like outline'
      color='green'
      style={{ cursor: 'pointer' }}
      onClick={() => sendVote('upVote')}
    />
    {voteScore}
    <Icon
      color='red'
      name='dislike outline'
      style={{ marginLeft: '.25rem', cursor: 'pointer' }}
      onClick={() => sendVote('downVote')}
    />
  </span>
)

Votes.propTypes = {
  voteScore: PropTypes.number,
  sendVote: PropTypes.func.isRequired
}

export default Votes
