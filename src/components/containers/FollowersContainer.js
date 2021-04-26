import React, {useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import {fetchFollowers} from '../../actions/userActions';
import { withRouter } from 'react-router';
import UserCard from '../UserCard';

const FollowersContainer = ({user, followers}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFollowers(user))
  }, [user])

  return (
    <div>
      <h2>Followers</h2>
      {followers.map((user) => (
        <div key={user.id} className='tweet-body'>
          <UserCard user={user}/>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => ({
  currentUser: state.userData.currentUser,
  followers: state.userData.followers
})

export default withRouter(connect(mapStateToProps, { fetchFollowers })(FollowersContainer));