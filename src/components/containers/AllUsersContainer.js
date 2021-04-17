import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import UserCard from '../UserCard';

const AllUsers = ({users}) => {

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id} className='tweet-body'>
            <UserCard user={user}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default withRouter(AllUsers)