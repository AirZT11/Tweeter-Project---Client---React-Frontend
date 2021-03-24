import React, { useEffect } from 'react';
import TweetList from './containers/TweetList';
import { connect } from 'react-redux';
import { userTweets } from '../actions/tweetActions';
import { withRouter } from 'react-router';

const Profile = props => {
  const { userTweets, currentUser, tweets } = props;

  useEffect(() => {
    userTweets(currentUser)
  }, [userTweets])

    return (
      <div>
        <div className='profile-card'>
          <span className='main-username'>{currentUser.user.name}</span> 
          <span className='sub-username'> @{currentUser.user.username}</span><br />
          <span>{tweets.length} tweets</span><br />
          <span>Followers </span><br />
          <span>Following </span><br />
          
        </div>

        <h3>Your Submitted Tweets!</h3>
          < TweetList 
              tweets={tweets}
          />  
      </div>
    )
}

const mapStateToProps = state => ({
  tweets: state.tweetsData.userTweets,
  currentUser: state.userData.currentUser
})

export default withRouter(connect(mapStateToProps, { userTweets })(Profile))