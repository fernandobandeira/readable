import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';

class PostToolbar extends Component {
  render() {
    return (
      <div>
        <Icon
          name='like outline'
          color='green'
          style={{ cursor: 'pointer' }}
        />                  
        {this.props.post.voteScore}               
        <Icon
          color='red'
          name='dislike outline' 
          style={{ marginLeft: '.25rem', cursor: 'pointer' }}
        />  
        <Icon
          name='comments' 
        />    
        0 comments
        <Icon
          name='tag'
          style={{ marginLeft: '.25rem' }}
        />
        { this.props.post.category }
      </div>
    );
  }
}

export default PostToolbar;
