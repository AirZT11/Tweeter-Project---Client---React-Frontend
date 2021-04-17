import React, {useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import {fetchFollowedUsers} from '../../actions/userActions';
import { withRouter } from 'react-router';
import UserCard from '../UserCard';

const FollowingContainer = ({user, followedUsers}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFollowedUsers(user))
  }, [user])

  return (
    <div>
      <h2>Following</h2>
      {followedUsers.map((user) => (
        <div key={user.id} className='tweet-body'>
          <UserCard user={user}/>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.userData.currentUser,
  followedUsers: state.userData.followedUsers
})

export default withRouter(connect(mapStateToProps, { fetchFollowedUsers })(FollowingContainer));