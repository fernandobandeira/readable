import React, { Component } from 'react'
import { Segment, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchCategories } from '../actions/categories'
import { addPost, editPost, fetchPost } from '../actions/posts'

class PostForm extends Component {
  state = {
    id: '',
    title: '',
    author: '',
    category: '',
    body: ''
  }

  componentDidMount () {
    const id = this.props.match.params.post

    this.props.fetchCategories()
    if (id) {
      this.setState({ id })
      this.props.fetchPost(id)
    }
  }

  componentWillReceiveProps (props) {
    if (props.post.id && props.post !== this.props.post) {
      this.setState({
        title: props.post.title,
        author: props.post.author,
        category: props.post.category,
        body: props.post.body
      })
    }
  }

  handleSubmit = () => {
    if (this.state.id) {
      this.props.editPost({
        ...this.props.post,
        ...this.state
      })
    } else {
      this.props.addPost({
        deleted: false,
        voteScore: 1,
        ...this.state
      })
    }

    this.props.history.push(`/${this.state.category}/`)
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  render () {
    const { title, author, category, body } = this.state

    return (
      <Segment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input
              label='Title'
              placeholder='Title'
              name='title'
              required
              onChange={this.handleChange}
              value={title}
            />
            <Form.Input
              label='Author'
              placeholder='Author'
              name='author'
              required
              onChange={this.handleChange}
              value={author}
            />
            <Form.Select
              label='Category'
              options={this.props.categories}
              placeholder='Category'
              name='category'
              required
              onChange={this.handleChange}
              value={category}
            />
          </Form.Group>
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

const mapStateToProps = ({ posts, categories }, ownProps) => ({
  categories: categories.allIds.map((id) => ({
    key: categories.byId[id].path,
    text: categories.byId[id].name,
    value: categories.byId[id].path
  })),
  post: posts.byId[ownProps.match.params.post] || {}
})

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchPost: (id) => dispatch(fetchPost(id)),
  addPost: (post) => dispatch(addPost(post)),
  editPost: (post) => dispatch(editPost(post))
});

PostForm.propTypes = {
  categories: PropTypes.array.isRequired,
  post: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  fetchPost: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
