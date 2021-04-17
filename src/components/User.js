import React, { useEffect } from 'react';
import TweetList from './containers/TweetList';
import { Avatar } from '@material-ui/core';
import { connect, useDispatch } from 'react-redux';
import { fetchTweets, fetchUserSpecificTweets } from '../actions/tweetActions';
import { fetchFollowedUsers, fetchFollowers } from '../actions/userActions';
import { follow, unfollow } from '../actions/followActions';
import { Link } from 'react-router-dom';

const User = ({user, follow, unfollow, following, fetchUserSpecificTweets, tweets, followedUsers, followers}) => {
 
  const dispatch = useDispatch()
  
  useEffect(() => {
    fetchUserSpecificTweets(user);
    dispatch(fetchFollowedUsers(user));
    dispatch(fetchFollowers(user)); 
  }, [user])
  
  // checks if current user follows user
  const followsUser = () => {
    return following.includes(user.id)    
  }

  if (user) {
    return (
      <div className='tweet-container'>
        <div className='profile-card'>
          <div className='tweet-body'>
            <Avatar src={user.image.url} />
            <span className='main-username'>{user.name}</span>
            <span className='sub-username'> @{user.username}</span><br />
            
            {followsUser() ? 
            <button className='tweetButton' onClick={()=> unfollow(user)} style={{float: 'right'}}>Unfollow</button>
            :
            <button className='tweetButton' onClick={()=> follow(user)} style={{float: 'right'}}>Follow</button>}
            
            <span>{tweets.length} tweets</span><br />
            
            <Link to={`/following/${user.id}`} style={{ textDecoration: 'none' }}>
              {followedUsers.length} Following
            </Link>
            <br />
            <Link to={`/followers/${user.id}`} style={{ textDecoration: 'none' }}>
              {followers.length} Followers
            </Link>

          </div>
        </div>

        < TweetList tweets={tweets} />  

      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

const mapStateToProps = (state) => ({
  tweets: state.tweetsData.userSpecificTweets,
  following: state.followData.following,
  followedUsers: state.userData.followedUsers,
  followers: state.userData.followers
})

export default connect(mapStateToProps, { fetchTweets, follow, unfollow, fetchUserSpecificTweets, fetchFollowedUsers, fetchFollowers })(User)