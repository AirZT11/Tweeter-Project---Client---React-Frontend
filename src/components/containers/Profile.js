import React, { useEffect } from 'react';
import '../../css/TweetList.css';
import '../../css/Profile.css';
import '../../css/Popup.css';

import { Avatar } from '@material-ui/core';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import { connect } from 'react-redux';
import { userTweets } from '../../actions/tweetActions';
import { withRouter } from 'react-router';

import TweetList from './TweetList';
// import TweetForm from './TweetForm';
import EditProfile from '../EditProfile';

const Profile = props => {
  const { userTweets, currentUser, tweets } = props;

  useEffect(() => {
    console.log(currentUser)
    userTweets(currentUser)
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
            
            <span>{tweets.length} tweets</span><br />
            <span>Followers </span><br />
            <span>Following </span><br />
          
        </div>
          
          
        </div>
        {/* <div className='tweetBox'></div> */}

          {/* < TweetForm /> */}
          < TweetList tweets={tweets} />  
    </div>
  )
}

const mapStateToProps = state => ({
  tweets: state.tweetsData.userTweets,
  currentUser: state.userData.currentUser
})

export default withRouter(connect(mapStateToProps, { userTweets })(Profile))