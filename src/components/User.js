import React, { useEffect } from 'react';
import TweetList from './containers/TweetList';
import { Avatar } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchTweets } from '../actions/tweetActions';
import { follow } from '../actions/followActions';

const User = props => {
  const { fetchTweets, user, follow, currentUser } = props;

  useEffect(() => {
    fetchTweets()
  }, [])

  if (user) {
    return (
      <div className='tweet-container'>
        <div className='profile-card'>
          <div className='tweet-body'>
            <Avatar src={user.image.url} />
            <span className='main-username'>{user.name}</span>
            <span className='sub-username'> @{user.username}</span><br />
            
            {/* TODO: allow user to follow other users */}
            <button className='tweetButton' onClick={()=> follow(user)} style={{float: 'right'}}>Follow</button>
            
            <span>{props.tweets.length} tweets</span><br />
            
            <span>Followers </span><br />
            <span>Following </span>
          </div>
        </div>

        < TweetList 
            tweets={props.tweets} 
            handleDeleteTweet={props.handleDeleteTweet} 
        />  

      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

const mapStateToProps = (state, ownProps) => ({
  tweets: state.tweetsData.tweets.filter(t => t.user.id === ownProps.user.id),
  currentUser: state.userData.currentUser.user
})

export default connect(mapStateToProps, { fetchTweets, follow })(User)