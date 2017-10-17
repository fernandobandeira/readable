import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { fetchComments } from '../actions/comments';
import { sendVote } from '../actions/posts';

class PostToolbar extends Component {
  componentWillMount() {
    this.props.fetchComments(this.props.post.id);
  }

  sendVote(option) {    
    this.props.sendVote(this.props.post.id, option);
  }

  render() {
    return (
      <div>
        <Icon
          name='like outline'
          color='green'
          style={{ cursor: 'pointer' }}
          onClick={() => this.sendVote('upVote')}
        />                  
        {this.props.post.voteScore}               
        <Icon
          color='red'
          name='dislike outline' 
          style={{ marginLeft: '.25rem', cursor: 'pointer' }}
          onClick={() => this.sendVote('downVote')}
        />  
        <Icon
          name='comments'
        />    
        {this.props.comments.length} comments
        <Icon
          name='tag'
          style={{ marginLeft: '.25rem' }}
        />
        {this.props.post.category}
      </div>
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
    sendVote: (id, option) => dispatch(sendVote(id, option)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostToolbar);
