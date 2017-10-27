import React, { Component } from 'react'
import { Segment, Item, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types'
import { fetchPost, removePost } from '../actions/posts'
import { fetchComments } from '../actions/comments'
import PostVotes from '../components/PostVotes'
import CommentList from '../components/CommentList'

class Post extends Component {
  componentDidMount () {
    this.props.fetchComments(this.props.match.params.post)
    this.props.fetchPost(this.props.match.params.post)
  }

  handleRemove = () => {
    this.props.removePost({
      ...this.props.post,
      deleted: true
    })
    this.props.history.push(`/${this.props.post.category}/`)
  }

  render () {
    const { post, comments } = this.props

    return (
      <div>
        <Segment>
          <div style={{ float: 'right' }}>
            <Link to={`/post/${post.id}`}>
              <Button icon basic>
                <Icon name='edit' />
              </Button>
            </Link>
            <Button icon basic color='red' onClick={this.handleRemove}>
              <Icon name='remove' />
            </Button>
          </div>
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header>{post.title}</Item.Header>
                <Item.Meta>Posted by {post.author} on <Link to={`/${post.category}`}>{post.category}</Link> {moment(post.timestamp).fromNow()}</Item.Meta>
                <Item.Description>{post.body}</Item.Description>
                <Item.Extra>
                  <PostVotes post={post} />
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>

        <Segment>
          <CommentList comments={comments} post={post} sorting={this.props.commentsSorting} />
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = ({ posts, comments }, ownProps) => ({
  post: posts.byId[ownProps.match.params.post] || {},
  comments: comments.allIds.reduce((cur, id) => {
    if (comments.byId[id].parentId === ownProps.match.params.post) {
      cur.push(comments.byId[id])
    }

    return cur
  }, []),
  commentsSorting: comments.sorting
})

const mapDispatchToProps = dispatch => ({
  fetchPost: (id) => dispatch(fetchPost(id)),
  fetchComments: (post) => dispatch(fetchComments(post)),
  removePost: (post) => dispatch(removePost(post))
})

Post.propTypes = {
  post: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  fetchPost: PropTypes.func.isRequired,
  fetchComments: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  commentsSorting: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
