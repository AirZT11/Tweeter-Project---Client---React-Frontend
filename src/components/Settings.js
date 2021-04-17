import React from 'react';
import '../css/TweetList.css';
import { connect } from 'react-redux';
import { deleteUser } from '../actions/userActions';
import { withRouter } from 'react-router';

const Settings = ({ currentUser, deleteUser, history }) => {
  return (
    <div className="tweet-container">  
      <button className='tweetButton' onClick={() => deleteUser(currentUser.user, history)}>Delete Account</button>
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.userData.currentUser
})

export default withRouter(connect(mapStateToProps, { deleteUser })(Settings))