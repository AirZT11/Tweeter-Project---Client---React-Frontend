import React, { useEffect } from 'react';
import TweetList from './containers/TweetList';
import { connect } from 'react-redux';
import { fetchTweets } from '../actions/tweetActions';

const User = props => {
  const { fetchTweets, user } = props;

  useEffect(() => {
    fetchTweets()
  }, [fetchTweets])

  if (user) {
    return (
      <div>
        <div className='profile-card'>
          <span className='main-username'>{props.user.name}</span>
          <span className='sub-username'> @{props.user.username}</span><br />
          <button style={{float: 'right'}}>Follow</button>
          <span>{props.tweets.length} tweets</span><br />
          
          <span>Followers </span><br />
          <span>Following </span>
        </div>
        
        <br />
        <br />

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
})

export default connect(mapStateToProps, { fetchTweets })(User)