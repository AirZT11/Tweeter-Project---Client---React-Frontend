import React, { useState } from 'react';
import '../css/TweetList.css';
import '../css/Popup.css';
import Popup from 'reactjs-popup';
import { Portal }  from 'react-portal';
import 'reactjs-popup/dist/index.css';
import { connect } from 'react-redux';
import { deleteUser } from '../actions/userActions';
import { withRouter } from 'react-router';

const Settings = ({ currentUser, deleteUser }) => {
  return (
    <div className="tweet-container">  
      <button className='tweetButton' onClick={() => deleteUser(currentUser.user)}>Delete Account</button>
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.userData.currentUser
})

export default withRouter(connect(mapStateToProps, { deleteUser })(Settings))