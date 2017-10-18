import React, { Component } from 'react';
import { Segment, Item } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { fetchPost } from '../actions/posts';
import { fetchComments } from '../actions/comments';
import PostVotes from '../components/PostVotes';
import CommentList from '../components/CommentList';

class Post extends Component {
  componentWillMount() {    
    this.props.fetchComments(this.props.match.params.post);    
    this.props.fetchPost(this.props.match.params.post);
  }

  render() {
    const { post, comments } = this.props;

    return (
      <div>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header>{post.title}</Item.Header>
                <Item.Meta>Posted by {post.author} on <Link to={`/${post.category}`}>{post.category}</Link> {moment(post.timestamp).fromNow()}</Item.Meta>
                <Item.Description>{post.body}</Item.Description>
                <Item.Extra>
                  <PostVotes post={post}>
                  </PostVotes>
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>

        <Segment>
          <CommentList comments={comments} sorting={this.props.commentsSorting}>
          </CommentList>
        </Segment>
      </div>
    );
  }
}

function mapStateToProps({ posts, comments }, ownProps) {
  const filteredComments = comments.allIds.reduce((cur, id) => {
    const comment = comments.byId[id];
    if (comment.parentId === ownProps.match.params.post) {
      cur.push(comment);
    }

    return cur;
  }, []);

  return {
    post: posts.byId[ownProps.match.params.post] || {},
    comments: filteredComments,
    commentsSorting: comments.sorting,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (id) => dispatch(fetchPost(id)),
    fetchComments: (post) => dispatch(fetchComments(post)),    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
