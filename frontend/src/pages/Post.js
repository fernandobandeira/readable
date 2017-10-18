import React, { Component } from 'react';
import { Segment, Item, Icon, Comment, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchPost } from '../actions/posts';
import { fetchComments, sendCommentVote } from '../actions/comments';
import PostVotes from '../components/PostVotes';
import Votes from '../components/Votes';

class Post extends Component {
  componentWillMount() {    
    this.props.fetchComments(this.props.match.params.post);    
    this.props.fetchPost(this.props.match.params.post);
  }

  render() {
    return (
      <div>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header>{this.props.post.title}</Item.Header>
                <Item.Meta>Posted by {this.props.post.author} {moment(this.props.post.timestamp).fromNow()}</Item.Meta>
                <Item.Description>{this.props.post.body}</Item.Description>
                <Item.Extra>
                  <PostVotes post={this.props.post}>
                  </PostVotes>
                  <span>
                    <Icon
                      name='tag'
                      style={{ marginLeft: '.25rem' }}
                    />
                    {this.props.post.category}
                  </span>
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>

        <Segment>
          <Comment.Group>
            <Header as='h3' dividing>{this.props.comments.length} Comments</Header>

            {this.props.comments.map((comment) => (
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
                      sendVote={(option) => this.props.sendCommentVote(comment.id, option)}
                    >
                    </Votes>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            ))}
          </Comment.Group>
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (id) => dispatch(fetchPost(id)),
    fetchComments: (post) => dispatch(fetchComments(post)),
    sendCommentVote: (id, option) => dispatch(sendCommentVote(id, option)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
