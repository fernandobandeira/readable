import React, { Component } from 'react'
import { Comment, Header, Select, Button, Icon } from 'semantic-ui-react'
import moment from 'moment'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { sendCommentVote, changeSorting, removeComment } from '../actions/comments'
import Votes from '../components/Votes'

class CommentList extends Component {
  constructor () {
    super()
    this.sendCommentVote = this.sendCommentVote.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  sendCommentVote (id, option) {
    this.props.dispatch(sendCommentVote(id, option))
  }

  changeSorting (sorting) {
    this.props.dispatch(changeSorting(sorting))
  }

  handleRemove (comment) {
    this.props.dispatch(removeComment({
      ...comment,
      deleted: true
    }))
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
    const { comments, post } = this.props

    return (
      <div>
        <Link to={`/${post.category}/${post.id}/comment`}>
          <Button basic color='blue'>
            New Comment
          </Button>
        </Link>
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
                  <Link to={`/post/${post.id}/comment/${comment.id}`}>
                    <Button icon basic size='mini'>
                      <Icon name='edit' />
                    </Button>
                  </Link>
                  <Button icon basic color='red' size='mini' onClick={() => this.handleRemove(comment)}>
                    <Icon name='remove' />
                  </Button>
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

CommentList.propTypes = {
  post: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  sorting: PropTypes.string.isRequired
}

export default connect()(CommentList)
