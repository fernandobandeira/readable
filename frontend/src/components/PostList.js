import React, { Component } from 'react'
import { Feed, Select, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PostToolbar from './PostToolbar'
import { changeSorting } from '../actions/posts'

class PostList extends Component {
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
        text: 'Recent Posts'
      },
      {
        key: 'title',
        value: 'title',
        text: 'Post Title'
      }
    ]
    const { posts, sorting } = this.props

    return (
      <div>
        <Link to='/post/new'>
          <Button basic color='blue'>
            New Post
          </Button>
        </Link>
        <div style={{ float: 'right' }}>
          Sort By:
          <Select
            style={{ marginLeft: '15px', marginBottom: '15px' }}
            value={sorting}
            options={sortOptions}
            onChange={(e, { value }) => this.changeSorting(value)}
          />
        </div>
        <Feed>
          {posts.map((post) => (
            <Feed.Event key={post.id}>
              <Feed.Content>
                <Feed.Summary>
                  <Link to={`/${post.category}/${post.id}`}>{post.title}</Link> by {post.author}
                  <Feed.Date>
                    {moment(post.timestamp).fromNow()}
                  </Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                  {post.body}
                </Feed.Extra>
                <Feed.Meta>
                  <PostToolbar post={post} />
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          ))}
        </Feed>
      </div>
    )
  }
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  sorting: PropTypes.string.isRequired
}

export default connect()(PostList)
