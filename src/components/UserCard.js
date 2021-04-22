import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { connect } from 'react-redux';
import { follow, unfollow } from '../actions/followActions';

const UserCard = ({user, follow, unfollow, following}) => {
  
  // checks if current user follows user
  const followsUser = () => {
    return following.includes(user.id)    
  }

  // conditional to check if user has profile pic
  let profilePic = '';
  if (user.image) { profilePic = user.image.url; } 
  else { profilePic = null; }

  return (
    <div className='tweet-card'>
      <Link to={`/user/${user.id}`} style={{ textDecoration: 'none' }}>
        <span><Avatar src={profilePic} /></span>
        <span className='main-username'>{user.username}</span>
        <span className='sub-username'> @{user.username}</span>
      </Link>

      {followsUser() ? 
        <button className='tweetButton' type='button' onClick={()=> unfollow(user)} style={{float: 'right'}}>Unfollow</button>
        :
        <button className='tweetButton' type='button' onClick={()=> follow(user)} style={{float: 'right'}}>Follow</button>}
        
    </div>
  )
}

const mapStateToProps = state => ({
  following: state.followData.following,
})

export default connect(mapStateToProps, { follow, unfollow })(UserCard);