import React, { useEffect } from 'react';
import '../../css/TweetList.css';
import '../../css/Profile.css';
import '../../css/Popup.css';

import { Avatar } from '@material-ui/core';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { connect } from 'react-redux';
import { userTweets } from '../../actions/tweetActions';
import { fetchFollowedUsers, fetchFollowers } from '../../actions/userActions';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import TweetList from './TweetList';
import EditProfile from '../EditProfile';

const Profile = props => {
  const { userTweets, currentUser, tweets, fetchFollowedUsers, fetchFollowers, followedUsers, followers } = props;

  useEffect(() => {
    userTweets(currentUser);
    fetchFollowedUsers(currentUser.user);
    fetchFollowers(currentUser.user);
  }, [])

  // conditional function to check if user has profile pic
  let profilePic = '';
  if (currentUser.user.image) {
    profilePic = currentUser.user.image.url;
  } else {
    profilePic = null;
  }

  return (
    <div className='tweet-container'>
      <div className='feedHeader'>
          <h2>Profile</h2>
      </div>
      
      <div className='tweet-body'>
        <div className='profile-card'>
          <div className='profile-header'>
            <Avatar src={profilePic} />
            <span className='main-username'>{currentUser.user.name}</span>
            <span className='sub-username'> @{currentUser.user.username}</span><br />
          </div>

          {/* working on creating a edit profile popup feature */}
          <Popup trigger={<button className="button">Edit profile</button>} modal nested>
            {close => (
            <div className="modal">
              <button className="close" onClick={close}>&times;</button>
              <div className="header"> Edit Profile </div>
              <EditProfile currentUser={currentUser}></EditProfile>
              <button className="button" onClick={() => { close(); }} >close</button>
            </div>
            )}
          </Popup>

          <span>{tweets.length} tweets</span>

          <Link to={`/followers/${currentUser.user.id}`} style={{ textDecoration: 'none' }}>
            {followers.length} Followers
          </Link>

          <Link to={`/following/${currentUser.user.id}`} style={{ textDecoration: 'none' }}>
            {followedUsers.length} Following
          </Link>

        </div>
      </div>
      < TweetList tweets={tweets} />  
    </div>
  )
}

const mapStateToProps = state => ({
  tweets: state.tweetsData.userTweets,
  currentUser: state.userData.currentUser,
  followedUsers: state.userData.followedUsers,
  followers: state.userData.followers
})

export default withRouter(connect(mapStateToProps, { userTweets, fetchFollowedUsers, fetchFollowers })(Profile))