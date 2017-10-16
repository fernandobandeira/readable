import _ from 'lodash'
import React, { Component } from 'react';
import { Feed, Icon, Select } from 'semantic-ui-react';
import moment from 'moment';

class PostList extends Component {
  state = {
    column: undefined,
    posts: [],
    sortedPosts: [],
    direction: undefined,
  }

  componentWillReceiveProps({ posts }) {
    if (this.state.posts !== posts) {      
      const { column = 'voteScore' } = this.state;
      const sortedPosts = _.sortBy(posts, [column]);

      this.setState({
        column,
        posts,
        sortedPosts,
      });
    }
  }

  changeOrder(column) {
    this.setState({
      column: column,
      sortedPosts: _.sortBy(this.state.posts, [column]).reverse(),
    });
  }

  render() {    
    const { column, sortedPosts } = this.state;
    const sortOptions = [
      {
        key: 'voteScore',
        value: 'voteScore',
        text: 'Vote Score',
      },
      {
        key: 'timestamp',
        value: 'timestamp',
        text: 'Recent Posts',
      },
    ];

    return (
      <div>
        <div style={{ float: 'right' }}>
          Sort By:
          <Select 
            style={{ marginLeft: '15px', marginBottom: '15px' }}
            value={column}
            options={sortOptions}
            onChange={(e, { value }) => this.changeOrder(value)}
          />
        </div>
        <Feed>
          {sortedPosts.map((post) => (
            <Feed.Event key={post.id}>            
              <Feed.Content>
                <Feed.Summary>
                  <a>{post.title}</a> posted by {post.author}
                  <Feed.Date>{moment(post.timestamp).fromNow()}</Feed.Date>
                </Feed.Summary>
                <Feed.Extra text>
                  {post.body}
                </Feed.Extra>
                <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like' />
                    {post.voteScore} Likes
                  </Feed.Like>
                </Feed.Meta>
              </Feed.Content>
            </Feed.Event>
          ))}
        </Feed>
      </div>
    );
  }
}

export default PostList;
