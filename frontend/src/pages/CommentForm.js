import React, { Component } from 'react'
import { Segment, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchCategories } from '../actions/categories'
import { fetchPost } from '../actions/posts'
import { addComment, editComment, fetchComment } from '../actions/comments'

class CommentForm extends Component {
  constructor () {
    super()
    this.state = {
      id: '',
      author: '',
      body: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    const id = this.props.match.params.comment

    this.props.fetchPost(this.props.match.params.post)
    if (id) {
      this.setState({ id })
      this.props.fetchComment(id)
    }
  }

  componentWillReceiveProps (props) {
    if (props.comment.id && props.comment !== this.props.comment) {
      this.setState({
        author: props.comment.author,
        body: props.comment.body
      })
    }
  }

  handleSubmit () {
    const { post } = this.props

    if (this.state.id) {
      this.props.editComment({
        ...this.props.comment,
        ...this.state
      })
    } else {
      this.props.addComment({
        deleted: false,
        voteScore: 1,
        parentId: post.id,
        ...this.state
      })
    }

    this.props.history.push(`/${post.category}/${post.id}`)
  }

  handleChange (e, { name, value }) {
    this.setState({ [name]: value })
  }

  render () {
    const { author, body } = this.state

    return (
      <Segment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label='Author'
            placeholder='Author'
            name='author'
            required
            onChange={this.handleChange}
            value={author}
          />
          <Form.TextArea
            label='Body'
            placeholder='Body'
            name='body'
            required
            onChange={this.handleChange}
            value={body}
          />
          <Form.Button basic color='green'>Submit</Form.Button>
        </Form>
      </Segment>
    )
  }
}

function mapStateToProps ({ posts, comments }, ownProps) {
  return {
    post: posts.byId[ownProps.match.params.post] || {},
    comment: comments.byId[ownProps.match.params.comment] || {}
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPost: (id) => dispatch(fetchPost(id)),
    fetchComment: (id) => dispatch(fetchComment(id)),
    addComment: (comment) => dispatch(addComment(comment)),
    editComment: (comment) => dispatch(editComment(comment))
  }
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  fetchComment: PropTypes.func.isRequired,
  fetchPost: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
