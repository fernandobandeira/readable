import React, { Component } from 'react'
import { Comment, Header, Select } from 'semantic-ui-react'
import moment from 'moment'
import { connect } from 'react-redux'
import { sendCommentVote, changeSorting } from '../actions/comments'
import Votes from '../components/Votes'

class CommentList extends Component {
  constructor () {
    super()
    this.sendCommentVote = this.sendCommentVote.bind(this)
  }

  sendCommentVote (id, option) {
    this.props.dispatch(sendCommentVote(id, option))
  }

  changeSorting (sorting) {
    this.props.dispatch(changeSorting(sorting))
  }

  render () {
    const sortOptions = [
      {
        key: 'voteScore',
        value: 'voteScore',
        text: 'Vote Score'
      },
      {
        key: 'timestamp',
        value: 'timestamp',
        text: 'Recent Comments'
      }
    ]
    const { comments } = this.props

    return (
      <div>
        <div style={{ float: 'right' }}>
          Sort By:
          <Select
            style={{ marginLeft: '15px', marginBottom: '15px' }}
            value={this.props.sorting}
            options={sortOptions}
            onChange={(e, { value }) => this.changeSorting(value)}
          />
        </div>
        <Comment.Group style={{ clear: 'both' }}>
          <Header as='h3' dividing>{comments.length} Comments</Header>

          {comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Content>
                <Comment.Author as='a'>{comment.author}</Comment.Author>
                <Comment.Metadata>
                  <div>{moment(comment.timestamp).calendar()}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
                <Comment.Actions>
                  <Votes
                    voteScore={comment.voteScore}
                    sendVote={(option) => this.sendCommentVote(comment.id, option)}
                  />
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </div>
    )
  }
}

export default connect()(CommentList)
