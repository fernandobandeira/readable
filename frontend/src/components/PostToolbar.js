import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { fetchComments } from '../actions/comments';
import PostVotes from './PostVotes';

class PostToolbar extends Component {
  componentWillMount() {
    this.props.fetchComments(this.props.post.id);
  }

  render() {
    return (
      <span>
        <PostVotes post={this.props.post}>
        </PostVotes>
        <Icon
          name='comments'
        />
        {this.props.comments.length} comments
        <Icon
          name='tag'
          style={{ marginLeft: '.25rem' }}
        />
        {this.props.post.category}
      </span>
    );
  }
}

function mapStateToProps({ comments }, ownProps) {
  const filteredComments = comments.allIds.reduce((cur, id) => {
    const comment = comments.byId[id];    
    if (comment.parentId === ownProps.post.id) {
      cur.push(comment);
    }

    return cur;
  }, []);  

  return {
    comments: filteredComments,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchComments: (post) => dispatch(fetchComments(post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostToolbar);
