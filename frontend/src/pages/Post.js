import React, { Component } from 'react';
import { Segment, Item, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchPost } from '../actions/posts';

class Post extends Component {
  componentWillMount() {        
    this.props.fetchPost(this.props.match.params.post);
  }

  render() {
    return (
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>{this.props.post.title}</Item.Header>
              <Item.Meta>Posted by {this.props.post.author} {moment(this.props.post.timestamp).fromNow()}</Item.Meta>
              <Item.Description>{this.props.post.body}</Item.Description>
              <Item.Extra>
                <Icon color='green' name='check' /> 121 Votes
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {  
  return {
    post: posts.byId[ownProps.match.params.post] || {},
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPost: (id) => dispatch(fetchPost(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
