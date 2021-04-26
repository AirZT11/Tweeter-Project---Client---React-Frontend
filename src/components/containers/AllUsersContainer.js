import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import UserCard from '../UserCard';
import '../../css/TweetList.css'

const AllUsers = ({users}) => {

  return (
    <div>
        {users.map((user) => (
          <div key={user.id} className='tweet-body'>
            <UserCard user={user}/>
          </div>
        ))}
    </div>
  )
}

export default withRouter(AllUsers)