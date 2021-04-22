import React from 'react';
import '../css/TweetList.css';
import '../css/SignIn.css'
import { connect } from 'react-redux';
import { deleteUser } from '../actions/userActions';
import { withRouter } from 'react-router';
import { setCurrentUser } from '../actions/userActions';
import { userInitialize } from '../actions/userActions';
import { tweetInitialize } from '../actions/tweetActions';
import { followInitialize } from '../actions/followActions';

const Settings = ({ currentUser, deleteUser, history, userInitialize, tweetInitialize, followInitialize }) => {
  let logout = () => {
    userInitialize();
    tweetInitialize();
    followInitialize();
    localStorage.clear();
    window.alert("Account has been deleted. Thank you for using our service!")
    history.push('/signUp')
  }

  let onClick = () => {
    deleteUser(currentUser.user, history)
    logout()
  }

  let confirmation = () => {
    let confirmDelete = window.confirm("Are you sure?")
    if(confirmDelete == true) onClick()
  }

  return (
    <div className="tweet-container">  
      <h1 className='feedHeader'>Settings</h1>
      <div className='signin-container'>
        <button  onClick={() => confirmation()} >Delete Account</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.userData.currentUser
})

export default withRouter(connect(mapStateToProps, { deleteUser, userInitialize, tweetInitialize, followInitialize })(Settings))